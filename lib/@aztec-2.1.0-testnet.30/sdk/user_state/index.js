"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserStateFactory = exports.UserState = exports.UserStateEvent = void 0;
const account_id_1 = require("@aztec/barretenberg/account_id");
const address_1 = require("@aztec/barretenberg/address");
const bigint_buffer_1 = require("@aztec/barretenberg/bigint_buffer");
const bridge_id_1 = require("@aztec/barretenberg/bridge_id");
const client_proofs_1 = require("@aztec/barretenberg/client_proofs");
const debug_1 = require("@aztec/barretenberg/debug");
const fifo_1 = require("@aztec/barretenberg/fifo");
const note_algorithms_1 = require("@aztec/barretenberg/note_algorithms");
const offchain_tx_data_1 = require("@aztec/barretenberg/offchain_tx_data");
const rollup_proof_1 = require("@aztec/barretenberg/rollup_proof");
const tx_id_1 = require("@aztec/barretenberg/tx_id");
const events_1 = require("events");
const core_tx_1 = require("../core_tx");
const note_1 = require("../note");
const note_picker_1 = require("../note_picker");
const block_context_1 = require("../block_context/block_context");
const debug = (0, debug_1.createLogger)('bb:user_state');
var UserStateEvent;
(function (UserStateEvent) {
    UserStateEvent["UPDATED_USER_STATE"] = "UPDATED_USER_STATE";
})(UserStateEvent = exports.UserStateEvent || (exports.UserStateEvent = {}));
var SyncState;
(function (SyncState) {
    SyncState[SyncState["OFF"] = 0] = "OFF";
    SyncState[SyncState["SYNCHING"] = 1] = "SYNCHING";
    SyncState[SyncState["MONITORING"] = 2] = "MONITORING";
})(SyncState || (SyncState = {}));
class UserState extends events_1.EventEmitter {
    constructor(user, grumpkin, noteAlgos, db, rollupProvider, pedersen) {
        super();
        this.user = user;
        this.grumpkin = grumpkin;
        this.noteAlgos = noteAlgos;
        this.db = db;
        this.rollupProvider = rollupProvider;
        this.pedersen = pedersen;
        this.notePickers = [];
        this.blockQueue = new fifo_1.MemoryFifo();
        this.syncState = SyncState.OFF;
    }
    debug(...args) {
        debug(`${this.user.id.toShortString()}:`, ...args);
    }
    /**
     * Load/refresh user state.
     */
    async init() {
        await this.resetData();
        await this.refreshNotePicker();
    }
    /**
     * First handles all historical blocks.
     * Then starts processing blocks added to queue via `processBlock()`.
     * Blocks may already be being added to the queue before we start synching. This means we may try to
     * process the same block twice, but will never miss a block. The block handler will filter duplicates.
     * New blocks are wrapped into a block context by the given factory
     * Where possible, required blocks should be taken from the provided shared block contexts
     * as this will utilise shared resources with other user states
     */
    async startSync(sharedBlockContexts) {
        if (this.syncState !== SyncState.OFF) {
            return;
        }
        const start = new Date().getTime();
        this.debug(`starting sync from rollup block ${this.user.syncedToRollup + 1}...`);
        this.syncState = SyncState.SYNCHING;
        // only request blocks that we haven't been given, make maximum use of the provided shared blocks
        const firstBlockRequiredByUs = this.user.syncedToRollup + 1;
        if (!sharedBlockContexts.length ||
            firstBlockRequiredByUs > sharedBlockContexts[sharedBlockContexts.length - 1].block.rollupId) {
            // no shared blocks provided that we can use, just request the blocks we need from the rollup provider
            const blocks = await this.rollupProvider.getBlocks(firstBlockRequiredByUs);
            await this.handleBlocks(blocks.map(x => new block_context_1.BlockContext(x, this.pedersen)));
        }
        else {
            // request the blocks that we specifically need, then filter out the overlapping blocks
            const blocks = await this.rollupProvider.getBlocks(firstBlockRequiredByUs);
            const blocksBeforeShared = blocks.filter(b => b.rollupId < sharedBlockContexts[0].block.rollupId);
            const blocksAfterShared = blocks.filter(b => b.rollupId > sharedBlockContexts[sharedBlockContexts.length].block.rollupId);
            const allBlocks = [
                ...blocksBeforeShared.map(x => new block_context_1.BlockContext(x, this.pedersen)),
                ...sharedBlockContexts,
                ...blocksAfterShared.map(x => new block_context_1.BlockContext(x, this.pedersen)),
            ];
            await this.handleBlocks(allBlocks);
        }
        this.debug(`sync complete in ${new Date().getTime() - start}ms.`);
        this.syncingPromise = this.blockQueue.process(async (block) => this.handleBlocks([block]));
        this.syncState = SyncState.MONITORING;
    }
    /**
     * Stops processing queued blocks. Blocks until any processing is complete.
     */
    stopSync(flush = false) {
        if (this.syncState === SyncState.OFF) {
            return;
        }
        this.debug(`stopping sync.`);
        flush ? this.blockQueue.end() : this.blockQueue.cancel();
        this.syncState = SyncState.OFF;
        return this.syncingPromise;
    }
    isSyncing() {
        return this.syncState === SyncState.SYNCHING;
    }
    async awaitSynchronised() {
        while (this.syncState === SyncState.SYNCHING) {
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }
    getUser() {
        return this.user;
    }
    processBlock(block) {
        this.blockQueue.put(block);
    }
    // will have 1 or multiple blocks when syncing user state
    async handleBlocks(blockContexts) {
        blockContexts = blockContexts.filter(b => b.block.rollupId > this.user.syncedToRollup);
        if (blockContexts.length == 0) {
            return;
        }
        const rollupProofData = blockContexts.map(b => rollup_proof_1.RollupProofData.fromBuffer(b.block.rollupProofData));
        const innerProofs = rollupProofData.map(p => p.innerProofData.filter(i => !i.isPadding())).flat();
        const offchainTxDataBuffers = blockContexts.map(b => b.block.offchainTxData).flat();
        const viewingKeys = [];
        const noteCommitments = [];
        const inputNullifiers = [];
        const offchainJoinSplitData = [];
        const offchainAccountData = [];
        const offchainDefiDepositData = [];
        innerProofs.forEach((proof, i) => {
            switch (proof.proofId) {
                case client_proofs_1.ProofId.DEPOSIT:
                case client_proofs_1.ProofId.WITHDRAW:
                case client_proofs_1.ProofId.SEND: {
                    const offchainTxData = offchain_tx_data_1.OffchainJoinSplitData.fromBuffer(offchainTxDataBuffers[i]);
                    viewingKeys.push(...offchainTxData.viewingKeys);
                    const { noteCommitment1, noteCommitment2, nullifier1: inputNullifier1, nullifier2: inputNullifier2, } = innerProofs[i];
                    noteCommitments.push(noteCommitment1);
                    noteCommitments.push(noteCommitment2);
                    inputNullifiers.push(inputNullifier1);
                    inputNullifiers.push(inputNullifier2);
                    offchainJoinSplitData.push(offchainTxData);
                    break;
                }
                case client_proofs_1.ProofId.ACCOUNT: {
                    offchainAccountData.push(offchain_tx_data_1.OffchainAccountData.fromBuffer(offchainTxDataBuffers[i]));
                    break;
                }
                case client_proofs_1.ProofId.DEFI_DEPOSIT: {
                    const offchainTxData = offchain_tx_data_1.OffchainDefiDepositData.fromBuffer(offchainTxDataBuffers[i]);
                    viewingKeys.push(offchainTxData.viewingKey);
                    const { noteCommitment2, nullifier2: inputNullifier2 } = innerProofs[i];
                    noteCommitments.push(noteCommitment2);
                    inputNullifiers.push(inputNullifier2);
                    offchainDefiDepositData.push(offchainTxData);
                    break;
                }
            }
        });
        const viewingKeysBuf = Buffer.concat(viewingKeys.flat().map(vk => vk.toBuffer()));
        const decryptedTreeNotes = await (0, note_algorithms_1.batchDecryptNotes)(viewingKeysBuf, this.user.privateKey, this.noteAlgos, this.grumpkin);
        const treeNotes = (0, note_algorithms_1.recoverTreeNotes)(decryptedTreeNotes, inputNullifiers, noteCommitments, this.user.privateKey, this.grumpkin, this.noteAlgos);
        let treeNoteStartIndex = 0;
        for (let blockIndex = 0; blockIndex < blockContexts.length; ++blockIndex) {
            const blockContext = blockContexts[blockIndex];
            const proofData = rollupProofData[blockIndex];
            for (let i = 0; i < proofData.innerProofData.length; ++i) {
                const proof = proofData.innerProofData[i];
                if (proof.isPadding()) {
                    continue;
                }
                const noteStartIndex = proofData.dataStartIndex + i * 2;
                switch (proof.proofId) {
                    case client_proofs_1.ProofId.DEPOSIT:
                    case client_proofs_1.ProofId.WITHDRAW:
                    case client_proofs_1.ProofId.SEND: {
                        const [offchainTxData] = offchainJoinSplitData.splice(0, 1);
                        const [note1, note2] = treeNotes.slice(treeNoteStartIndex, treeNoteStartIndex + 2);
                        treeNoteStartIndex += 2;
                        if (!note1 && !note2) {
                            continue;
                        }
                        await this.handlePaymentTx(blockContext, proof, offchainTxData, noteStartIndex, note1, note2);
                        break;
                    }
                    case client_proofs_1.ProofId.ACCOUNT: {
                        const [offchainTxData] = offchainAccountData.splice(0, 1);
                        await this.handleAccountTx(blockContext, proof, offchainTxData, noteStartIndex);
                        break;
                    }
                    case client_proofs_1.ProofId.DEFI_DEPOSIT: {
                        const note2 = treeNotes[treeNoteStartIndex];
                        treeNoteStartIndex++;
                        const [offchainTxData] = offchainDefiDepositData.splice(0, 1);
                        if (!note2) {
                            // Both notes should be owned by the same user.
                            continue;
                        }
                        await this.handleDefiDepositTx(blockContext, proofData, proof, offchainTxData, noteStartIndex, note2);
                        break;
                    }
                    case client_proofs_1.ProofId.DEFI_CLAIM:
                        await this.handleDefiClaimTx(blockContext, proof, noteStartIndex);
                        break;
                }
            }
            this.user = { ...this.user, syncedToRollup: proofData.rollupId };
            await this.processDefiInteractionResults(blockContext);
        }
        await this.db.updateUser(this.user);
        this.emit(UserStateEvent.UPDATED_USER_STATE, this.user.id);
    }
    async resetData() {
        const pendingTxs = await this.rollupProvider.getPendingTxs();
        const pendingUserTxIds = await this.db.getPendingUserTxs(this.user.id);
        for (const userTxId of pendingUserTxIds) {
            if (!pendingTxs.some(tx => tx.txId.equals(userTxId))) {
                await this.db.removeUserTx(userTxId, this.user.id);
            }
        }
        const pendingNotes = await this.db.getUserPendingNotes(this.user.id);
        for (const note of pendingNotes) {
            if (!pendingTxs.some(tx => tx.noteCommitment1.equals(note.commitment) || tx.noteCommitment2.equals(note.commitment))) {
                await this.db.removeNote(note.nullifier);
            }
        }
    }
    async handleAccountTx(blockContext, proof, offchainTxData, noteStartIndex) {
        const { created } = blockContext.block;
        const tx = this.recoverAccountTx(proof, offchainTxData, created);
        if (!tx.userId.equals(this.user.id)) {
            return;
        }
        const { txId, userId, newSigningPubKey1, newSigningPubKey2, aliasHash } = tx;
        if (newSigningPubKey1) {
            this.debug(`added signing key ${newSigningPubKey1.toString('hex')}.`);
            const hashPath = await blockContext.getBlockSubtreeHashPath(noteStartIndex);
            await this.db.addUserSigningKey({
                accountId: userId,
                key: newSigningPubKey1,
                treeIndex: noteStartIndex,
                hashPath: hashPath.toBuffer(),
            });
        }
        if (newSigningPubKey2) {
            this.debug(`added signing key ${newSigningPubKey2.toString('hex')}.`);
            const hashPath = await blockContext.getBlockSubtreeHashPath(noteStartIndex + 1);
            await this.db.addUserSigningKey({
                accountId: userId,
                key: newSigningPubKey2,
                treeIndex: noteStartIndex + 1,
                hashPath: hashPath.toBuffer(),
            });
        }
        if (!this.user.aliasHash || !this.user.aliasHash.equals(aliasHash)) {
            this.debug(`updated alias hash ${aliasHash.toString()}.`);
            this.user = { ...this.user, aliasHash };
            await this.db.updateUser(this.user);
        }
        const savedTx = await this.db.getAccountTx(txId);
        if (savedTx) {
            this.debug(`settling account tx: ${txId.toString()}`);
            await this.db.settleAccountTx(txId, blockContext.block.created);
        }
        else {
            this.debug(`recovered account tx: ${txId.toString()}`);
            await this.db.addAccountTx(tx);
        }
    }
    async handlePaymentTx(blockContext, proof, offchainTxData, noteStartIndex, note1, note2) {
        const { created } = blockContext.block;
        const { noteCommitment1, noteCommitment2, nullifier1, nullifier2 } = proof;
        const newNote = note1
            ? await this.processSettledNote(noteStartIndex, note1, noteCommitment1, blockContext)
            : undefined;
        const changeNote = note2
            ? await this.processSettledNote(noteStartIndex + 1, note2, noteCommitment2, blockContext)
            : undefined;
        if (!newNote && !changeNote) {
            // Neither note was decrypted (change note should always belong to us for txs we created).
            return;
        }
        const destroyedNote1 = await this.nullifyNote(nullifier1);
        const destroyedNote2 = await this.nullifyNote(nullifier2);
        await this.refreshNotePicker();
        const txId = new tx_id_1.TxId(proof.txId);
        const savedTx = await this.db.getPaymentTx(txId, this.user.id);
        if (savedTx) {
            this.debug(`settling payment tx: ${txId}`);
            await this.db.settlePaymentTx(txId, this.user.id, created);
        }
        else {
            const tx = this.recoverPaymentTx(proof, offchainTxData, created, newNote, changeNote, destroyedNote1, destroyedNote2);
            this.debug(`received or recovered payment tx: ${txId}`);
            await this.db.addPaymentTx(tx);
        }
    }
    async handleDefiDepositTx(blockContext, rollupProofData, proof, offchainTxData, noteStartIndex, treeNote2) {
        const { interactionResult, created } = blockContext.block;
        const { noteCommitment1, noteCommitment2 } = proof;
        const note2 = await this.processSettledNote(noteStartIndex + 1, treeNote2, noteCommitment2, blockContext);
        if (!note2) {
            // Owned by the account with a different nonce.
            return;
        }
        const { bridgeId, partialStateSecretEphPubKey } = offchainTxData;
        const partialStateSecret = (0, note_algorithms_1.deriveNoteSecret)(partialStateSecretEphPubKey, this.user.privateKey, this.grumpkin);
        const txId = new tx_id_1.TxId(proof.txId);
        const { rollupId, bridgeIds } = rollupProofData;
        const interactionNonce = rollup_proof_1.RollupProofData.NUM_BRIDGE_CALLS_PER_BLOCK * rollupId +
            bridgeIds.findIndex(bridge => bridge.equals(bridgeId.toBuffer()));
        const isAsync = interactionResult.every(n => n.nonce !== interactionNonce);
        await this.addClaim(txId, noteCommitment1, partialStateSecret, interactionNonce);
        const { nullifier1, nullifier2 } = proof;
        await this.nullifyNote(nullifier1);
        await this.nullifyNote(nullifier2);
        await this.refreshNotePicker();
        const savedTx = await this.db.getDefiTx(txId);
        if (savedTx) {
            this.debug(`found defi tx, awaiting claim for settlement: ${txId}`);
            await this.db.settleDefiDeposit(txId, interactionNonce, isAsync, created);
        }
        else {
            const tx = this.recoverDefiTx(proof, offchainTxData, created, interactionNonce, isAsync);
            this.debug(`recovered defi tx: ${txId}`);
            await this.db.addDefiTx(tx);
        }
    }
    async processDefiInteractionResults(blockContext) {
        const { interactionResult, created } = blockContext.block;
        for (const event of interactionResult) {
            const defiTxs = await this.db.getDefiTxsByNonce(this.user.id, event.nonce);
            for (const tx of defiTxs) {
                const outputValueA = !event.result
                    ? BigInt(0)
                    : (event.totalOutputValueA * tx.depositValue) / event.totalInputValue;
                const outputValueB = !event.result
                    ? BigInt(0)
                    : (event.totalOutputValueB * tx.depositValue) / event.totalInputValue;
                await this.db.updateDefiTxFinalisationResult(tx.txId, event.result, outputValueA, outputValueB, created);
            }
        }
    }
    async handleDefiClaimTx(blockContext, proof, noteStartIndex) {
        const { nullifier1 } = proof;
        const claimTxId = new tx_id_1.TxId(proof.txId);
        this.debug(`found claim tx: ${claimTxId}`);
        const claim = await this.db.getClaimTx(nullifier1);
        if (!(claim === null || claim === void 0 ? void 0 : claim.userId.equals(this.user.id))) {
            return;
        }
        const { created } = blockContext.block;
        const { defiTxId, userId, secret, interactionNonce } = claim;
        const { noteCommitment1, noteCommitment2, nullifier2 } = proof;
        const { bridgeId, depositValue, outputValueA, outputValueB, success } = (await this.db.getDefiTx(defiTxId));
        // When generating output notes, set creatorPubKey to 0 (it's a DeFi txn, recipient of note is same as creator of claim note)
        if (!success) {
            {
                const treeNote = new note_algorithms_1.TreeNote(userId.publicKey, depositValue, bridgeId.inputAssetIdA, userId.accountNonce, secret, Buffer.alloc(32), nullifier1);
                await this.processSettledNote(noteStartIndex, treeNote, noteCommitment1, blockContext);
            }
            if (bridgeId.numInputAssets === 2) {
                const treeNote = new note_algorithms_1.TreeNote(userId.publicKey, depositValue, bridgeId.inputAssetIdB, userId.accountNonce, secret, Buffer.alloc(32), nullifier2);
                await this.processSettledNote(noteStartIndex + 1, treeNote, noteCommitment2, blockContext);
            }
        }
        if (outputValueA) {
            const treeNote = new note_algorithms_1.TreeNote(userId.publicKey, outputValueA, bridgeId.firstOutputVirtual ? bridge_id_1.virtualAssetIdFlag + interactionNonce : bridgeId.outputAssetIdA, userId.accountNonce, secret, Buffer.alloc(32), nullifier1);
            await this.processSettledNote(noteStartIndex, treeNote, noteCommitment1, blockContext);
        }
        if (outputValueB) {
            const treeNote = new note_algorithms_1.TreeNote(userId.publicKey, outputValueB, bridgeId.secondOutputVirtual ? bridge_id_1.virtualAssetIdFlag + interactionNonce : bridgeId.outputAssetIdB, userId.accountNonce, secret, Buffer.alloc(32), nullifier2);
            await this.processSettledNote(noteStartIndex + 1, treeNote, noteCommitment2, blockContext);
        }
        await this.refreshNotePicker();
        await this.db.settleDefiTx(defiTxId, created, claimTxId);
        this.debug(`settled defi tx: ${defiTxId}`);
    }
    async processSettledNote(index, treeNote, commitment, blockContext) {
        const { ownerPubKey, value, accountNonce } = treeNote;
        const noteOwner = new account_id_1.AccountId(ownerPubKey, accountNonce);
        if (!noteOwner.equals(this.user.id)) {
            return;
        }
        const hashPath = await blockContext.getBlockSubtreeHashPath(index);
        const nullifier = this.noteAlgos.valueNoteNullifier(commitment, this.user.privateKey);
        const note = new note_1.Note(treeNote, commitment, nullifier, false, // allowChain
        false, // nullified
        index, hashPath.toBuffer());
        if (value) {
            await this.db.addNote(note);
            this.debug(`successfully decrypted note at index ${index} with value ${value} of asset ${treeNote.assetId}.`);
        }
        return note;
    }
    async nullifyNote(nullifier) {
        const note = await this.db.getNoteByNullifier(nullifier);
        if (!note || !note.owner.equals(this.user.id)) {
            return;
        }
        await this.db.nullifyNote(nullifier);
        this.debug(`nullified note at index ${note.index} with value ${note.value}.`);
        return note;
    }
    async addClaim(defiTxId, commitment, noteSecret, interactionNonce) {
        const nullifier = this.noteAlgos.claimNoteNullifier(commitment);
        await this.db.addClaimTx({
            defiTxId,
            userId: this.user.id,
            secret: noteSecret,
            nullifier,
            interactionNonce,
        });
    }
    recoverPaymentTx(proof, offchainTxData, blockCreated, valueNote, changeNote, destroyedNote1, destroyedNote2) {
        const proofId = proof.proofId;
        const assetId = proof.assetId.readUInt32BE(28);
        const publicValue = (0, bigint_buffer_1.toBigIntBE)(proof.publicValue);
        const publicOwner = publicValue ? new address_1.EthAddress(proof.publicOwner) : undefined;
        const noteValue = (note) => (note ? note.value : BigInt(0));
        const privateInput = noteValue(destroyedNote1) + noteValue(destroyedNote2);
        const recipientPrivateOutput = noteValue(valueNote);
        const senderPrivateOutput = noteValue(changeNote);
        const { txRefNo } = offchainTxData;
        return new core_tx_1.CorePaymentTx(new tx_id_1.TxId(proof.txId), this.user.id, proofId, assetId, publicValue, publicOwner, privateInput, recipientPrivateOutput, senderPrivateOutput, !!valueNote, !!changeNote, txRefNo, new Date(), blockCreated);
    }
    recoverAccountTx(proof, offchainTxData, blockCreated) {
        const { nullifier1 } = proof;
        const { accountPublicKey, accountAliasId, spendingPublicKey1, spendingPublicKey2, txRefNo } = offchainTxData;
        const txId = new tx_id_1.TxId(proof.txId);
        const userId = new account_id_1.AccountId(accountPublicKey, accountAliasId.accountNonce);
        const migrated = !!(0, bigint_buffer_1.toBigIntBE)(nullifier1);
        return new core_tx_1.CoreAccountTx(txId, userId, accountAliasId.aliasHash, (0, bigint_buffer_1.toBigIntBE)(spendingPublicKey1) ? spendingPublicKey1 : undefined, (0, bigint_buffer_1.toBigIntBE)(spendingPublicKey2) ? spendingPublicKey2 : undefined, migrated, txRefNo, new Date(), blockCreated);
    }
    recoverDefiTx(proof, offchainTxData, blockCreated, interactionNonce, isAsync) {
        const { bridgeId, depositValue, txFee, partialStateSecretEphPubKey, txRefNo } = offchainTxData;
        const txId = new tx_id_1.TxId(proof.txId);
        const partialStateSecret = (0, note_algorithms_1.deriveNoteSecret)(partialStateSecretEphPubKey, this.user.privateKey, this.grumpkin);
        return new core_tx_1.CoreDefiTx(txId, this.user.id, bridgeId, depositValue, txFee, partialStateSecret, txRefNo, new Date(), blockCreated, interactionNonce, isAsync);
    }
    async refreshNotePicker() {
        const notesMap = new Map();
        const notes = await this.db.getUserNotes(this.user.id);
        notes.forEach(note => {
            const assetNotes = notesMap.get(note.assetId) || [];
            notesMap.set(note.assetId, [...assetNotes, note]);
        });
        const assetIds = [...notesMap.keys()].sort((a, b) => (a > b ? 1 : -1));
        this.notePickers = assetIds.map(assetId => ({ assetId, notePicker: new note_picker_1.NotePicker(notesMap.get(assetId)) }));
    }
    async pickNotes(assetId, value, excludePendingNotes) {
        const { notePicker } = this.notePickers.find(np => np.assetId === assetId) || {};
        if (!notePicker) {
            return [];
        }
        const pendingNullifiers = await this.rollupProvider.getPendingNoteNullifiers();
        return notePicker.pick(value, pendingNullifiers, excludePendingNotes);
    }
    async pickNote(assetId, value, excludePendingNotes) {
        const { notePicker } = this.notePickers.find(np => np.assetId === assetId) || {};
        if (!notePicker) {
            return;
        }
        const pendingNullifiers = await this.rollupProvider.getPendingNoteNullifiers();
        return notePicker.pickOne(value, pendingNullifiers, excludePendingNotes);
    }
    async getSpendableSum(assetId, excludePendingNotes) {
        const { notePicker } = this.notePickers.find(np => np.assetId === assetId) || {};
        if (!notePicker) {
            return BigInt(0);
        }
        const pendingNullifiers = await this.rollupProvider.getPendingNoteNullifiers();
        return notePicker.getSpendableSum(pendingNullifiers, excludePendingNotes);
    }
    async getSpendableSums(excludePendingNotes) {
        const pendingNullifiers = await this.rollupProvider.getPendingNoteNullifiers();
        return this.notePickers
            .map(({ assetId, notePicker }) => ({
            assetId,
            value: notePicker.getSpendableSum(pendingNullifiers, excludePendingNotes),
        }))
            .filter(assetValue => assetValue.value > BigInt(0));
    }
    async getMaxSpendableValue(assetId, numNotes, excludePendingNotes) {
        const { notePicker } = this.notePickers.find(np => np.assetId === assetId) || {};
        if (!notePicker) {
            return BigInt(0);
        }
        const pendingNullifiers = await this.rollupProvider.getPendingNoteNullifiers();
        return notePicker.getMaxSpendableValue(pendingNullifiers, numNotes, excludePendingNotes);
    }
    getBalance(assetId) {
        const { notePicker } = this.notePickers.find(np => np.assetId === assetId) || {};
        return notePicker ? notePicker.getSum() : BigInt(0);
    }
    getBalances() {
        return this.notePickers
            .map(({ assetId, notePicker }) => ({ assetId, value: notePicker.getSum() }))
            .filter(assetValue => assetValue.value > BigInt(0));
    }
    async addProof({ tx, outputNotes }) {
        switch (tx.proofId) {
            case client_proofs_1.ProofId.DEPOSIT:
            case client_proofs_1.ProofId.WITHDRAW:
            case client_proofs_1.ProofId.SEND:
                this.debug(`adding pending payment tx: ${tx.txId}`);
                await this.db.addPaymentTx(tx);
                break;
            case client_proofs_1.ProofId.ACCOUNT:
                this.debug(`adding pending account tx: ${tx.txId}`);
                await this.db.addAccountTx(tx);
                break;
            case client_proofs_1.ProofId.DEFI_DEPOSIT:
                this.debug(`adding pending defi tx: ${tx.txId}`);
                await this.db.addDefiTx(tx);
                break;
        }
        const note1 = outputNotes[0] && (await this.processPendingNote(outputNotes[0]));
        const note2 = outputNotes[1] && (await this.processPendingNote(outputNotes[1]));
        if ((note1 === null || note1 === void 0 ? void 0 : note1.value) || (note2 === null || note2 === void 0 ? void 0 : note2.value)) {
            await this.refreshNotePicker();
        }
        // No need to do anything with proof.backwardLink (i.e., mark a note as chained).
        // Rollup provider will return the nullifiers of pending notes, which will be excluded when the sdk is picking notes.
        this.emit(UserStateEvent.UPDATED_USER_STATE, this.user.id);
    }
    async processPendingNote(note) {
        const { ownerPubKey, value, accountNonce } = note.treeNote;
        const noteOwner = new account_id_1.AccountId(ownerPubKey, accountNonce);
        if (!noteOwner.equals(this.user.id)) {
            return;
        }
        if (value) {
            await this.db.addNote(note);
            debug(`user ${this.user.id} adding pending note with value ${value}, allowChain = ${note.allowChain}.`);
        }
        return note;
    }
}
exports.UserState = UserState;
class UserStateFactory {
    constructor(grumpkin, noteAlgos, db, rollupProvider, pedersen) {
        this.grumpkin = grumpkin;
        this.noteAlgos = noteAlgos;
        this.db = db;
        this.rollupProvider = rollupProvider;
        this.pedersen = pedersen;
    }
    createUserState(user) {
        return new UserState(user, this.grumpkin, this.noteAlgos, this.db, this.rollupProvider, this.pedersen);
    }
}
exports.UserStateFactory = UserStateFactory;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXNlcl9zdGF0ZS9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwrREFBMkQ7QUFDM0QseURBQXlEO0FBQ3pELHFFQUErRDtBQUMvRCw2REFBbUU7QUFDbkUscUVBQTREO0FBQzVELHFEQUF5RDtBQUV6RCxtREFBc0Q7QUFDdEQseUVBTTZDO0FBQzdDLDJFQUk4QztBQUM5QyxtRUFBbUY7QUFFbkYscURBQWlEO0FBRWpELG1DQUFzQztBQUN0Qyx3Q0FBc0Y7QUFFdEYsa0NBQStCO0FBQy9CLGdEQUE0QztBQUc1QyxrRUFBOEQ7QUFHOUQsTUFBTSxLQUFLLEdBQUcsSUFBQSxvQkFBWSxFQUFDLGVBQWUsQ0FBQyxDQUFDO0FBRTVDLElBQVksY0FFWDtBQUZELFdBQVksY0FBYztJQUN4QiwyREFBeUMsQ0FBQTtBQUMzQyxDQUFDLEVBRlcsY0FBYyxHQUFkLHNCQUFjLEtBQWQsc0JBQWMsUUFFekI7QUFFRCxJQUFLLFNBSUo7QUFKRCxXQUFLLFNBQVM7SUFDWix1Q0FBRyxDQUFBO0lBQ0gsaURBQVEsQ0FBQTtJQUNSLHFEQUFVLENBQUE7QUFDWixDQUFDLEVBSkksU0FBUyxLQUFULFNBQVMsUUFJYjtBQUVELE1BQWEsU0FBVSxTQUFRLHFCQUFZO0lBTXpDLFlBQ1UsSUFBYyxFQUNkLFFBQWtCLEVBQ2xCLFNBQXlCLEVBQ3pCLEVBQVksRUFDWixjQUE4QixFQUM5QixRQUFrQjtRQUUxQixLQUFLLEVBQUUsQ0FBQztRQVBBLFNBQUksR0FBSixJQUFJLENBQVU7UUFDZCxhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQ2xCLGNBQVMsR0FBVCxTQUFTLENBQWdCO1FBQ3pCLE9BQUUsR0FBRixFQUFFLENBQVU7UUFDWixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQVhwQixnQkFBVyxHQUFrRCxFQUFFLENBQUM7UUFDaEUsZUFB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