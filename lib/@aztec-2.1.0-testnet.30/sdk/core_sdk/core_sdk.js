"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoreSdk = void 0;
const account_id_1 = require("@aztec/barretenberg/account_id");
const address_1 = require("@aztec/barretenberg/address");
const client_proofs_1 = require("@aztec/barretenberg/client_proofs");
const crs_1 = require("@aztec/barretenberg/crs");
const crypto_1 = require("@aztec/barretenberg/crypto");
const debug_1 = require("@aztec/barretenberg/debug");
const ecc_1 = require("@aztec/barretenberg/ecc");
const environment_1 = require("@aztec/barretenberg/environment");
const fifo_1 = require("@aztec/barretenberg/fifo");
const merkle_tree_1 = require("@aztec/barretenberg/merkle_tree");
const note_algorithms_1 = require("@aztec/barretenberg/note_algorithms");
const offchain_tx_data_1 = require("@aztec/barretenberg/offchain_tx_data");
const rollup_proof_1 = require("@aztec/barretenberg/rollup_proof");
const timer_1 = require("@aztec/barretenberg/timer");
const world_state_1 = require("@aztec/barretenberg/world_state");
const events_1 = require("events");
const block_context_1 = require("../block_context/block_context");
const core_tx_1 = require("../core_tx");
const proofs_1 = require("../proofs");
const serial_queue_1 = require("../serial_queue");
const user_state_1 = require("../user_state");
const sdk_status_1 = require("./sdk_status");
const debug = (0, debug_1.createLogger)('bb:core_sdk');
var SdkInitState;
(function (SdkInitState) {
    SdkInitState["UNINITIALIZED"] = "UNINITIALIZED";
    SdkInitState["INITIALIZED"] = "INITIALIZED";
    SdkInitState["RUNNING"] = "RUNNING";
    SdkInitState["DESTROYED"] = "DESTROYED";
})(SdkInitState || (SdkInitState = {}));
/**
 * CoreSdk is responsible for keeping everything in sync and proof construction.
 * A serial queue is used to ensure initialisation, synching, proof construction, and block processing, are synchronised.
 * init() should be called before making any other calls to construct the basic components.
 * run() should be called once a client wants to start synching, or requesting proof construction.
 * Takes ownership of injected components (should destroy them etc).
 */
class CoreSdk extends events_1.EventEmitter {
    constructor(leveldb, db, rollupProvider, barretenberg, pedersen, pippenger, fftFactory, workerPool) {
        super();
        this.leveldb = leveldb;
        this.db = db;
        this.rollupProvider = rollupProvider;
        this.barretenberg = barretenberg;
        this.pedersen = pedersen;
        this.pippenger = pippenger;
        this.fftFactory = fftFactory;
        this.workerPool = workerPool;
        this.userStates = [];
        this.blockQueue = new fifo_1.MemoryFifo();
        this.sdkStatus = {
            serverUrl: '',
            chainId: -1,
            rollupContractAddress: address_1.EthAddress.ZERO,
            feePayingAssetIds: [0],
            syncedToRollup: -1,
            latestRollupId: -1,
            dataRoot: Buffer.alloc(0),
            dataSize: 0,
        };
        this.initState = SdkInitState.UNINITIALIZED;
    }
    /**
     * Basic initialisation of the sdk.
     * Call run() to actually start syncing etc.
     * If multiple calls to init occur (e.g. many tabs calling into a shared worker),
     * each blocks until the first call completes.
     */
    async init(options) {
        var _a, _b;
        if (this.initState !== SdkInitState.UNINITIALIZED) {
            throw new Error('Already initialized.');
        }
        try {
            // Take copy so we can modify internally.
            this.options = { useMutex: true, ...options };
            this.serialQueue = this.options.useMutex
                ? new serial_queue_1.MutexSerialQueue(this.db, 'aztec_core_sdk')
                : new serial_queue_1.MemorySerialQueue();
            this.noteAlgos = new note_algorithms_1.NoteAlgorithms(this.barretenberg);
            this.blake2s = new crypto_1.Blake2s(this.barretenberg);
            this.grumpkin = new ecc_1.Grumpkin(this.barretenberg);
            this.schnorr = new crypto_1.Schnorr(this.barretenberg);
            this.userStateFactory = new user_state_1.UserStateFactory(this.grumpkin, this.noteAlgos, this.db, this.rollupProvider, this.pedersen);
            this.worldState = new world_state_1.WorldState(this.leveldb, this.pedersen);
            const { blockchainStatus: { chainId, rollupContractAddress }, runtimeConfig: { feePayingAssetIds }, rollupSize, } = await this.getRemoteStatus();
            // Clear all data if contract changed.
            const rca = await this.getLocalRollupContractAddress();
            if (rca && !rca.equals(rollupContractAddress)) {
                debug('Erasing database...');
                await this.leveldb.clear();
                await this.db.clear();
            }
            // TODO: Refactor all leveldb saved config into a little PersistentConfig class with getters/setters.
            await this.leveldb.put('rollupContractAddress', rollupContractAddress.toBuffer());
            // Ensures we can get the list of users and access current known balances.
            await this.initUserStates();
            // Allows us to query the merkle tree roots etc.
            // 2 notes per tx
            const subtreeDepth = Math.ceil(Math.log2(rollupSize * world_state_1.WorldStateConstants.NUM_NEW_DATA_TREE_NOTES_PER_TX));
            await this.worldState.init(subtreeDepth);
            this.sdkStatus = {
                ...this.sdkStatus,
                serverUrl: options.serverUrl,
                chainId,
                rollupContractAddress: rollupContractAddress,
                feePayingAssetIds,
                dataSize: this.worldState.getSize(),
                dataRoot: this.worldState.getRoot(),
                syncedToRollup: await this.getSyncedToRollup(),
                latestRollupId: +(await this.leveldb.get('latestRollupId').catch(() => -1)),
            };
            this.updateInitState(SdkInitState.INITIALIZED);
        }
        catch (err) {
            // If initialisation fails, we should destroy the components we've taken ownership of.
            await this.leveldb.close();
            await this.db.close();
            await ((_a = this.workerPool) === null || _a === void 0 ? void 0 : _a.destroy());
            (_b = this.serialQueue) === null || _b === void 0 ? void 0 : _b.cancel();
            throw err;
        }
    }
    async destroy() {
        var _a;
        debug('Destroying...');
        // The serial queue will cancel itself. This ensures that anything currently in the queue finishes, and ensures
        // that once the await to push() returns, nothing else is on, or can be added to the queue.
        await this.serialQueue.push(async () => this.serialQueue.cancel());
        await this.stopReceivingBlocks();
        await Promise.all(this.userStates.map(us => this.stopSyncingUserState(us)));
        await this.leveldb.close();
        await this.db.close();
        await ((_a = this.workerPool) === null || _a === void 0 ? void 0 : _a.destroy());
        this.updateInitState(SdkInitState.DESTROYED);
        this.emit(sdk_status_1.SdkEvent.DESTROYED);
        this.removeAllListeners();
        debug('Destroyed.');
    }
    async getLocalStatus() {
        return { ...this.sdkStatus };
    }
    async getRemoteStatus() {
        return await this.rollupProvider.getStatus();
    }
    async getTxFees(assetId) {
        return this.rollupProvider.getTxFees(assetId);
    }
    async getDefiFees(bridgeId) {
        return this.rollupProvider.getDefiFees(bridgeId);
    }
    /**
     * Return the latest nonce for a given public key, derived from chain data.
     */
    async getLatestAccountNonce(publicKey) {
        return (await this.db.getLatestNonceByAddress(publicKey)) || 0;
    }
    async getRemoteLatestAccountNonce(publicKey) {
        return (await this.rollupProvider.getLatestAccountNonce(publicKey)) || 0;
    }
    async getLatestAliasNonce(alias) {
        var _a;
        const aliasHash = await this.computeAliasHash(alias);
        return (_a = (await this.db.getLatestNonceByAliasHash(aliasHash))) !== null && _a !== void 0 ? _a : 0;
    }
    async getRemoteLatestAliasNonce(alias) {
        return this.rollupProvider.getLatestAliasNonce(alias);
    }
    async getAccountId(alias, accountNonce) {
        const aliasHash = await this.computeAliasHash(alias);
        return this.db.getAccountId(aliasHash, accountNonce);
    }
    async getRemoteAccountId(alias, accountNonce) {
        return this.rollupProvider.getAccountId(alias, accountNonce);
    }
    async isAliasAvailable(alias) {
        return !(await this.getLatestAliasNonce(alias));
    }
    async isRemoteAliasAvailable(alias) {
        return !(await this.rollupProvider.getLatestAliasNonce(alias));
    }
    async computeAliasHash(alias) {
        return account_id_1.AliasHash.fromAlias(alias, this.blake2s);
    }
    async getDefiInteractionNonce(txId) {
        const tx = await this.db.getDefiTx(txId);
        if (!tx) {
            throw new Error('Unknown txId');
        }
        return tx.interactionNonce;
    }
    async userExists(userId) {
        return !!(await this.db.getUser(userId));
    }
    async getUserData(userId) {
        return this.getUserState(userId).getUser();
    }
    async getUsersData() {
        return this.userStates.map(us => us.getUser());
    }
    async derivePublicKey(privateKey) {
        return new address_1.GrumpkinAddress(this.grumpkin.mul(ecc_1.Grumpkin.one, privateKey));
    }
    async constructSignature(message, privateKey) {
        return this.schnorr.constructSignature(message, privateKey);
    }
    async addUser(privateKey, accountNonce, noSync = false) {
        return this.serialQueue.push(async () => {
            const publicKey = await this.derivePublicKey(privateKey);
            if (accountNonce === undefined) {
                accountNonce = await this.getLatestAccountNonce(publicKey);
            }
            const id = new account_id_1.AccountId(publicKey, accountNonce);
            if (await this.db.getUser(id)) {
                throw new Error(`User already exists: ${id}`);
            }
            let syncedToRollup = -1;
            if (noSync) {
                const { blockchainStatus: { nextRollupId }, } = await this.getRemoteStatus();
                syncedToRollup = nextRollupId - 1;
            }
            const aliasHash = accountNonce > 0 ? await this.db.getAliasHashByAddress(publicKey) : undefined;
            const user = { id, privateKey, publicKey, accountNonce, aliasHash, syncedToRollup };
            await this.db.addUser(user);
            const userState = this.userStateFactory.createUserState(user);
            await userState.init();
            this.userStates.push(userState);
            this.startSyncingUserState(userState, []);
            this.emit(sdk_status_1.SdkEvent.UPDATED_USERS);
            return userState.getUser();
        });
    }
    async removeUser(userId) {
        const userState = this.getUserState(userId);
        this.userStates = this.userStates.filter(us => us !== userState);
        this.stopSyncingUserState(userState);
        await this.db.removeUser(userId);
        this.emit(sdk_status_1.SdkEvent.UPDATED_USERS);
    }
    async getSigningKeys(userId) {
        const keys = await this.db.getUserSigningKeys(userId);
        return keys.map(k => k.key);
    }
    async getBalances(userId) {
        return this.getUserState(userId).getBalances();
    }
    async getBalance(assetId, userId) {
        const userState = this.getUserState(userId);
        return userState.getBalance(assetId);
    }
    async getSpendableSum(assetId, userId, excludePendingNotes) {
        const userState = this.getUserState(userId);
        return userState.getSpendableSum(assetId, excludePendingNotes);
    }
    async getSpendableSums(userId, excludePendingNotes) {
        const userState = this.getUserState(userId);
        return userState.getSpendableSums(excludePendingNotes);
    }
    async getMaxSpendableValue(assetId, userId, numNotes, excludePendingNotes) {
        const userState = this.getUserState(userId);
        return userState.getMaxSpendableValue(assetId, numNotes, excludePendingNotes);
    }
    async pickNotes(userId, assetId, value, excludePendingNotes) {
        return this.getUserState(userId).pickNotes(assetId, value, excludePendingNotes);
    }
    async pickNote(userId, assetId, value, excludePendingNotes) {
        return this.getUserState(userId).pickNote(assetId, value, excludePendingNotes);
    }
    async getUserTxs(userId) {
        return this.db.getUserTxs(userId);
    }
    async getRemoteUnsettledAccountTxs() {
        return this.rollupProvider.getUnsettledAccountTxs();
    }
    async getRemoteUnsettledPaymentTxs() {
        return this.rollupProvider.getUnsettledPaymentTxs();
    }
    /**
     * Kicks off data tree updates, user note decryptions, alias table updates, proving key construction.
     * Moves the sdk into RUNNING state.
     */
    async run() {
        if (this.initState === SdkInitState.RUNNING) {
            return;
        }
        if (this.serialQueue.length()) {
            throw new Error('`run` must be called before other proof-generating apis.');
        }
        this.updateInitState(SdkInitState.RUNNING);
        this.serialQueue.push(async () => {
            const { useKeyCache } = this.options;
            const { proverless, blockchainStatus: { verifierContractAddress }, } = await this.getRemoteStatus();
            const vca = await this.getLocalVerifierContractAddress();
            const forceCreate = (vca && !vca.equals(verifierContractAddress)) || !useKeyCache;
            const maxCircuitSize = Math.max(client_proofs_1.JoinSplitProver.getCircuitSize(), client_proofs_1.AccountProver.getCircuitSize());
            const crsData = await this.getCrsData(maxCircuitSize);
            await this.pippenger.init(crsData);
            await this.genesisSync();
            const receivedBlockContexts = await this.startReceivingBlocks();
            this.userStates.forEach(us => this.startSyncingUserState(us, receivedBlockContexts));
            await this.createJoinSplitProofCreators(forceCreate, proverless);
            await this.createAccountProofCreator(forceCreate, proverless);
            // Makes the saved proving keys considered valid. Hence set this after they're saved.
            await this.leveldb.put('verifierContractAddress', verifierContractAddress.toBuffer());
        });
    }
    // -------------------------------------------------------
    // PUBLIC METHODS FROM HERE ON REQUIRE run() TO BE CALLED.
    // -------------------------------------------------------
    async createPaymentProofInput(userId, assetId, publicInput, publicOutput, privateInput, recipientPrivateOutput, senderPrivateOutput, noteRecipient, publicOwner, spendingPublicKey, allowChain) {
        return this.serialQueue.push(async () => {
            this.assertInitState(SdkInitState.RUNNING);
            const userState = this.getUserState(userId);
            const user = userState.getUser();
            const notes = privateInput ? await userState.pickNotes(assetId, privateInput) : [];
            if (privateInput && !notes.length) {
                throw new Error(`Failed to find no more than 2 notes that sum to ${privateInput}.`);
            }
            return this.paymentProofCreator.createProofInput(user, notes, privateInput, recipientPrivateOutput, senderPrivateOutput, publicInput, publicOutput, assetId, noteRecipient, publicOwner, spendingPublicKey, allowChain);
        });
    }
    async createPaymentProof(input, txRefNo) {
        return this.serialQueue.push(async () => {
            this.assertInitState(SdkInitState.RUNNING);
            const { outputNotes } = input.tx;
            const userId = new account_id_1.AccountId(outputNotes[1].ownerPubKey, outputNotes[1].accountNonce);
            const userState = this.getUserState(userId);
            const user = userState.getUser();
            return this.paymentProofCreator.createProof(user, input, txRefNo);
        });
    }
    async createAccountProofSigningData(signingPubKey, alias, accountNonce, migrate, accountPublicKey, newAccountPublicKey, newSigningPubKey1, newSigningPubKey2) {
        return this.serialQueue.push(async () => {
            this.assertInitState(SdkInitState.RUNNING);
            const aliasHash = await this.computeAliasHash(alias);
            const tx = await this.accountProofCreator.createAccountTx(signingPubKey, aliasHash, accountNonce, migrate, accountPublicKey, newAccountPublicKey, newSigningPubKey1, newSigningPubKey2);
            return this.accountProofCreator.computeSigningData(tx);
        });
    }
    async createAccountProofInput(userId, aliasHash, migrate, signingPublicKey, newSigningPublicKey1, newSigningPublicKey2, newAccountPrivateKey) {
        return this.serialQueue.push(async () => {
            this.assertInitState(SdkInitState.RUNNING);
            const newAccountPublicKey = newAccountPrivateKey ? await this.derivePublicKey(newAccountPrivateKey) : undefined;
            return this.accountProofCreator.createProofInput(aliasHash, userId.accountNonce, migrate, userId.publicKey, signingPublicKey, newAccountPublicKey, newSigningPublicKey1, newSigningPublicKey2);
        });
    }
    async createAccountProof(input, txRefNo) {
        return this.serialQueue.push(async () => {
            this.assertInitState(SdkInitState.RUNNING);
            return this.accountProofCreator.createProof(input, txRefNo);
        });
    }
    async createDefiProofInput(userId, bridgeId, depositValue, inputNotes, spendingPublicKey) {
        return this.serialQueue.push(async () => {
            this.assertInitState(SdkInitState.RUNNING);
            const userState = this.getUserState(userId);
            const user = userState.getUser();
            return this.defiDepositProofCreator.createProofInput(user, bridgeId, depositValue, inputNotes, spendingPublicKey);
        });
    }
    async createDefiProof(input, txRefNo) {
        return this.serialQueue.push(async () => {
            this.assertInitState(SdkInitState.RUNNING);
            const { outputNotes } = input.tx;
            const userId = new account_id_1.AccountId(outputNotes[1].ownerPubKey, outputNotes[1].accountNonce);
            const userState = this.getUserState(userId);
            const user = userState.getUser();
            return this.defiDepositProofCreator.createProof(user, input, txRefNo);
        });
    }
    async sendProofs(proofs) {
        return this.serialQueue.push(async () => {
            this.assertInitState(SdkInitState.RUNNING);
            // Get userState before sending proofs to make sure that the tx owner has been added to the sdk.
            const [{ tx: { userId }, },] = proofs;
            const userState = this.getUserState(userId);
            if (proofs.some(({ tx }) => !tx.userId.equals(userId))) {
                throw new Error('Inconsistent tx owners.');
            }
            const txs = proofs.map(({ proofData, offchainTxData, signature }) => ({
                proofData: proofData.rawProofData,
                offchainTxData: offchainTxData.toBuffer(),
                depositSignature: signature,
            }));
            const txIds = await this.rollupProvider.sendTxs(txs);
            for (const proof of proofs) {
                await userState.addProof(proof);
                // Add the payment proof to recipient's account if they are not the sender.
                if ([client_proofs_1.ProofId.DEPOSIT, client_proofs_1.ProofId.SEND].includes(proof.tx.proofId)) {
                    const recipient = proof.outputNotes[0].owner;
                    if (!recipient.equals(userId)) {
                        const recipientTx = (0, core_tx_1.createCorePaymentTxForRecipient)(proof.tx, recipient);
                        try {
                            await this.getUserState(recipient).addProof({ ...proof, tx: recipientTx });
                        }
                        catch (e) {
                            // Recipient's account is not added.
                        }
                    }
                }
            }
            return txIds;
        });
    }
    async awaitSynchronised() {
        this.assertInitState(SdkInitState.RUNNING);
        while (true) {
            try {
                if (await this.isSynchronised()) {
                    return;
                }
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
            catch (err) {
                debug(err);
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
        }
    }
    async isUserSynching(userId) {
        this.assertInitState(SdkInitState.RUNNING);
        return this.getUserState(userId).isSyncing();
    }
    async awaitUserSynchronised(userId) {
        this.assertInitState(SdkInitState.RUNNING);
        await this.getUserState(userId).awaitSynchronised();
    }
    async awaitSettlement(txId, timeout) {
        this.assertInitState(SdkInitState.RUNNING);
        const started = new Date().getTime();
        while (true) {
            if (timeout && new Date().getTime() - started > timeout * 1000) {
                throw new Error(`Timeout awaiting tx settlement: ${txId}`);
            }
            if (await this.db.isUserTxSettled(txId)) {
                break;
            }
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }
    async awaitDefiDepositCompletion(txId, timeout) {
        this.assertInitState(SdkInitState.RUNNING);
        const started = new Date().getTime();
        while (true) {
            if (timeout && new Date().getTime() - started > timeout * 1000) {
                throw new Error(`Timeout awaiting defi interaction: ${txId}`);
            }
            const tx = await this.db.getDefiTx(txId);
            if (!tx) {
                throw new Error('Unknown txId.');
            }
            if (tx.settled) {
                break;
            }
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }
    async awaitDefiFinalisation(txId, timeout) {
        this.assertInitState(SdkInitState.RUNNING);
        const started = new Date().getTime();
        while (true) {
            if (timeout && new Date().getTime() - started > timeout * 1000) {
                throw new Error(`Timeout awaiting defi interaction: ${txId}`);
            }
            const tx = await this.db.getDefiTx(txId);
            if (!tx) {
                throw new Error('Unknown txId.');
            }
            if (tx.finalised) {
                break;
            }
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }
    async awaitDefiSettlement(txId, timeout) {
        this.assertInitState(SdkInitState.RUNNING);
        const started = new Date().getTime();
        while (true) {
            if (timeout && new Date().getTime() - started > timeout * 1000) {
                throw new Error(`Timeout awaiting defi interaction: ${txId}`);
            }
            const tx = await this.db.getDefiTx(txId);
            if (!tx) {
                throw new Error('Unknown txId.');
            }
            if (tx.claimSettled) {
                break;
            }
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }
    // ---------------
    // PRIVATE METHODS
    // ---------------
    getUserState(userId) {
        const userState = this.userStates.find(us => us.getUser().id.equals(userId));
        if (!userState) {
            throw new Error(`User not found: ${userId}`);
        }
        return userState;
    }
    async isSynchronised() {
        const providerStatus = await this.rollupProvider.getStatus();
        const localDataRoot = this.worldState.getRoot();
        return localDataRoot.equals(providerStatus.blockchainStatus.dataRoot);
    }
    assertInitState(state) {
        if (this.initState !== state) {
            throw new Error(`Init state ${this.initState} !== ${state}`);
        }
    }
    updateInitState(initState) {
        this.initState = initState;
    }
    async getLocalRollupContractAddress() {
        const result = await this.leveldb.get('rollupContractAddress').catch(() => undefined);
        return result ? new address_1.EthAddress(result) : undefined;
    }
    async getLocalVerifierContractAddress() {
        const result = await this.leveldb.get('verifierContractAddress').catch(() => undefined);
        return result ? new address_1.EthAddress(result) : undefined;
    }
    async getSyncedToRollup() {
        return +(await this.leveldb.get('syncedToRollup').catch(() => -1));
    }
    async getCrsData(circuitSize) {
        debug('downloading crs data...');
        const crs = new crs_1.Crs(circuitSize);
        await crs.download();
        debug('done.');
        return Buffer.from(crs.getData());
    }
    async initUserStates() {
        debug('initializing user states...');
        const users = await this.db.getUsers();
        this.userStates = users.map(u => this.userStateFactory.createUserState(u));
        await Promise.all(this.userStates.map(us => us.init()));
    }
    async startSyncingUserState(userState, blockContexts) {
        userState.on(user_state_1.UserStateEvent.UPDATED_USER_STATE, (id) => {
            this.emit(sdk_status_1.SdkEvent.UPDATED_USER_STATE, id);
        });
        await userState.startSync(blockContexts);
    }
    async stopSyncingUserState(userState) {
        userState.removeAllListeners();
        await userState.stopSync();
    }
    async createJoinSplitProofCreators(recreateKeys, proverless) {
        const fft = await this.fftFactory.createFft(client_proofs_1.JoinSplitProver.getCircuitSize(proverless));
        const unrolledProver = new client_proofs_1.UnrolledProver(this.barretenberg, this.pippenger, fft);
        const joinSplitProver = new client_proofs_1.JoinSplitProver(unrolledProver, proverless);
        this.paymentProofCreator = new proofs_1.PaymentProofCreator(joinSplitProver, this.noteAlgos, this.worldState, this.grumpkin, this.db);
        this.defiDepositProofCreator = new proofs_1.DefiDepositProofCreator(joinSplitProver, this.noteAlgos, this.worldState, this.grumpkin, this.db);
        await this.createJoinSplitProvingKey(joinSplitProver, recreateKeys);
    }
    async createAccountProofCreator(forceCreate, proverless) {
        const fft = await this.fftFactory.createFft(client_proofs_1.AccountProver.getCircuitSize(proverless));
        const unrolledProver = new client_proofs_1.UnrolledProver(this.barretenberg, this.pippenger, fft);
        const accountProver = new client_proofs_1.AccountProver(unrolledProver, proverless);
        this.accountProofCreator = new proofs_1.AccountProofCreator(accountProver, this.worldState, this.db);
        await this.createAccountProvingKey(accountProver, forceCreate);
    }
    async createJoinSplitProvingKey(joinSplitProver, forceCreate) {
        if (!forceCreate) {
            const provingKey = await this.db.getKey('join-split-proving-key');
            if (provingKey) {
                debug('loading join-split proving key...');
                await joinSplitProver.loadKey(provingKey);
                return;
            }
        }
        debug('computing join-split proving key...');
        const start = new Date().getTime();
        await joinSplitProver.computeKey();
        if (this.options.useKeyCache) {
            debug('saving join-split proving key...');
            const newProvingKey = await joinSplitProver.getKey();
            await this.db.addKey('join-split-proving-key', newProvingKey);
        }
        else {
            await this.db.deleteKey('join-split-proving-key');
        }
        debug(`complete: ${new Date().getTime() - start}ms`);
    }
    async createAccountProvingKey(accountProver, forceCreate) {
        if (!forceCreate) {
            const provingKey = await this.db.getKey('account-proving-key');
            if (provingKey) {
                debug('loading account proving key...');
                await accountProver.loadKey(provingKey);
                return;
            }
        }
        debug('computing account proving key...');
        const start = new Date().getTime();
        await accountProver.computeKey();
        if (this.options.useKeyCache) {
            debug('saving account proving key...');
            const newProvingKey = await accountProver.getKey();
            await this.db.addKey('account-proving-key', newProvingKey);
        }
        else {
            await this.db.deleteKey('account-proving-key');
        }
        debug(`complete: ${new Date().getTime() - start}ms`);
    }
    async syncAliasesAndKeys(accounts, hashPathMap) {
        const aliases = new Array();
        const uniqueSigningKeys = new Map();
        // There can be duplicate account/nonce/signing key combinations.
        // We need to just keep the most recent one.
        // This loop simulates upserts by keeping the most recent version before inserting into the DB.
        let noteIndex = 0;
        for (let i = 0; i < accounts.length; i++) {
            const { alias: { address, accountNonce }, signingKeys: { signingKey1, signingKey2 }, } = accounts[i];
            const accountId = new account_id_1.AccountId(new address_1.GrumpkinAddress(address), accountNonce);
            const signingKeys = [signingKey1, signingKey2];
            for (let j = 0; j < signingKeys.length; j++) {
                const key = signingKeys[j];
                const keyVal = key.toString('hex') + ' - ' + accountId.toString();
                const sk = { treeIndex: noteIndex, key, accountId, hashPath: hashPathMap[noteIndex].toBuffer() };
                uniqueSigningKeys.set(keyVal, sk);
                noteIndex++;
            }
            aliases.push({
                aliasHash: new account_id_1.AliasHash(accounts[i].alias.aliasHash),
                address: new address_1.GrumpkinAddress(accounts[i].alias.address),
                latestNonce: accounts[i].alias.accountNonce,
            });
        }
        const keys = [...uniqueSigningKeys.values()];
        debug(`synching with ${aliases.length} aliases`);
        const aliasesTimer = new timer_1.Timer();
        await this.db.setAliases(aliases);
        debug(`aliases saved in ${aliasesTimer.s()}s`);
        debug(`synching with ${keys.length} signing keys`);
        const keysTimer = new timer_1.Timer();
        await this.db.addUserSigningKeys(keys);
        debug(`signing keys saved in ${keysTimer.s()}s`);
    }
    // Returns a mapping of tree index to hash path for all account notes
    async syncCommitments(accounts) {
        const { rollupSize } = await this.getRemoteStatus();
        const commitments = accounts.flatMap(x => [x.notes.note1, x.notes.note2]);
        const size = 1 << Math.ceil(Math.log2(rollupSize));
        // 2 notes per tx
        const notesInSubtree = size * world_state_1.WorldStateConstants.NUM_NEW_DATA_TREE_NOTES_PER_TX;
        let noteIndex = 0;
        const hashPathMap = {};
        const roots = [];
        const subTreeTimer = new timer_1.Timer();
        debug(`building immutable sub-trees from commitments...`);
        while (commitments.length > 0) {
            const slice = commitments.splice(0, notesInSubtree);
            const zeroNotes = Array(notesInSubtree - slice.length).fill(merkle_tree_1.MemoryMerkleTree.ZERO_ELEMENT);
            const fullTreeNotes = [...slice, ...zeroNotes];
            const merkleSubTree = await merkle_tree_1.MemoryMerkleTree.new(fullTreeNotes, this.pedersen);
            for (let i = 0; i < notesInSubtree; i++) {
                hashPathMap[noteIndex++] = merkleSubTree.getHashPath(i);
            }
            roots.push(merkleSubTree.getRoot());
        }
        debug(`${roots.length} sub-trees created in ${subTreeTimer.s()}s, adding roots to data tree...`);
        const dataTreeTimer = new timer_1.Timer();
        await this.worldState.insertElements(0, roots);
        debug(`data tree sync completed in ${dataTreeTimer.s()}s`);
        return hashPathMap;
    }
    async genesisSync() {
        const syncedToRollup = await this.getSyncedToRollup();
        if (syncedToRollup >= 0) {
            return;
        }
        debug('initialising genesis state from server...');
        const genesisTimer = new timer_1.Timer();
        const initialState = await this.rollupProvider.getInitialWorldState();
        const accounts = environment_1.InitHelpers.parseAccountTreeData(initialState.initialAccounts);
        const hashPathMap = await this.syncCommitments(accounts);
        await this.syncAliasesAndKeys(accounts, hashPathMap);
        debug(`genesis sync completed in ${genesisTimer.s()}s`);
    }
    /**
     * Kicks off the process of listening for blocks, also ensures we are fully synced
     * Produces a set of block context objects that can be passed to user states for their sync process
     * Returns the set of generated shared block contexts
     */
    async startReceivingBlocks() {
        this.rollupProvider.on('block', b => this.blockQueue.put(b));
        this.processBlocksPromise = this.processBlockQueue();
        const receivedBlockContexts = await this.sync();
        const syncedToRollup = await this.getSyncedToRollup();
        await this.rollupProvider.start(+syncedToRollup + 1);
        debug(`started processing blocks, generated ${receivedBlockContexts.length} shared blocks...`);
        return receivedBlockContexts;
    }
    async stopReceivingBlocks() {
        await this.rollupProvider.stop();
        this.rollupProvider.removeAllListeners();
        this.blockQueue.cancel();
        await this.processBlocksPromise;
    }
    /**
     * Called when data root is not as expected. We need to save parts of leveldb we don't want to lose, erase the db,
     * and rebuild the merkle tree.
     */
    async eraseAndRebuildDataTree() {
        debug('erasing and rebuilding data tree...');
        const rca = await this.getLocalRollupContractAddress();
        const vca = await this.getLocalVerifierContractAddress();
        await this.leveldb.clear();
        await this.leveldb.put('rollupContractAddress', rca.toBuffer());
        if (vca) {
            await this.leveldb.put('verifierContractAddress', vca.toBuffer());
        }
        const { rollupSize } = await this.getRemoteStatus();
        // 2 notes per tx
        const subtreeDepth = Math.ceil(Math.log2(rollupSize * world_state_1.WorldStateConstants.NUM_NEW_DATA_TREE_NOTES_PER_TX));
        await this.worldState.init(subtreeDepth);
        const initialState = await this.rollupProvider.getInitialWorldState();
        const accounts = environment_1.InitHelpers.parseAccountTreeData(initialState.initialAccounts);
        await this.syncCommitments(accounts);
        await this.sync();
    }
    async sync() {
        const syncedToRollup = await this.getSyncedToRollup();
        const blocks = await this.rollupProvider.getBlocks(syncedToRollup + 1);
        debug(`blocks received from rollup provider: ${blocks.length}`);
        // For debugging.
        const oldRoot = this.worldState.getRoot();
        const oldSize = this.worldState.getSize();
        if (!blocks.length) {
            // TODO: Ugly hotfix. Find root cause.
            // If no new blocks, we expect our local data root to be equal to that on falafel.
            const { dataRoot: expectedDataRoot, dataSize: expectedDataSize } = (await this.getRemoteStatus())
                .blockchainStatus;
            if (!oldRoot.equals(expectedDataRoot)) {
                debug(`old root ${oldRoot.toString('hex')}, Expected root ${expectedDataRoot.toString('hex')}`);
                await this.eraseAndRebuildDataTree();
                await this.rollupProvider.clientLog({
                    message: 'Invalid dataRoot.',
                    synchingFromRollup: syncedToRollup,
                    blocksReceived: blocks.length,
                    currentRoot: oldRoot.toString('hex'),
                    currentSize: oldSize,
                    expectedDataRoot: expectedDataRoot.toString('hex'),
                    expectedDataSize,
                });
            }
            return [];
        }
        const rollups = blocks.map(b => rollup_proof_1.RollupProofData.fromBuffer(b.rollupProofData));
        const offchainTxData = blocks.map(b => b.offchainTxData);
        // For debugging.
        const expectedDataRoot = rollups[rollups.length - 1].newDataRoot;
        const expectedDataSize = rollups[0].dataStartIndex + rollups.reduce((a, r) => a + r.rollupSize * 2, 0);
        debug('synchronising data...');
        debug(`adding ${blocks.length}, sub-roots to data tree starting at index ${rollups[0].dataStartIndex}...`);
        await this.worldState.insertElements(rollups[0].dataStartIndex, blocks.map(block => block.subtreeRoot));
        await this.processAliases(rollups, offchainTxData);
        await this.updateStatusRollupInfo(rollups[rollups.length - 1]);
        debug('done.');
        // TODO: Ugly hotfix. Find root cause.
        // We expect our data root to be equal to the new data root in the last block we processed.
        if (!this.worldState.getRoot().equals(expectedDataRoot)) {
            await this.eraseAndRebuildDataTree();
            this.rollupProvider.clientLog({
                message: 'Invalid dataRoot.',
                synchingFromRollup: syncedToRollup,
                blocksReceived: blocks.length,
                oldRoot: oldRoot.toString('hex'),
                oldSize,
                newRoot: this.worldState.getRoot().toString('hex'),
                newSize: this.worldState.getSize(),
                expectedDataRoot: expectedDataRoot.toString('hex'),
                expectedDataSize,
            });
            return [];
        }
        const blockContexts = blocks.map(block => new block_context_1.BlockContext(block, this.pedersen));
        // Forward the block on to each UserState for processing.
        for (const context of blockContexts) {
            this.userStates.forEach(us => us.processBlock(context));
        }
        return blockContexts;
    }
    async updateStatusRollupInfo(rollup) {
        const rollupId = rollup.rollupId;
        const latestRollupId = this.rollupProvider.getLatestRollupId();
        await this.leveldb.put('syncedToRollup', rollupId.toString());
        await this.leveldb.put('latestRollupId', latestRollupId.toString());
        this.sdkStatus.syncedToRollup = rollupId;
        this.sdkStatus.latestRollupId = latestRollupId;
        this.sdkStatus.dataRoot = this.worldState.getRoot();
        this.sdkStatus.dataSize = this.worldState.getSize();
        this.emit(sdk_status_1.SdkEvent.UPDATED_WORLD_STATE, rollupId, latestRollupId);
    }
    async processBlockQueue() {
        while (true) {
            const block = await this.blockQueue.get();
            if (!block) {
                break;
            }
            await this.serialQueue.push(async () => {
                await this.worldState.syncFromDb().catch(() => { });
                const rollup = rollup_proof_1.RollupProofData.fromBuffer(block.rollupProofData);
                await this.worldState.insertElement(rollup.dataStartIndex, block.subtreeRoot);
                await this.processAliases([rollup], [block.offchainTxData]);
                await this.updateStatusRollupInfo(rollup);
                const blockContext = new block_context_1.BlockContext(block, this.pedersen);
                // Forward the block on to each UserState for processing.
                this.userStates.forEach(us => us.processBlock(blockContext));
            });
        }
    }
    async processAliases(rollups, offchainTxData) {
        const processRollup = (rollup, offchainData) => {
            const aliases = [];
            for (let i = 0; i < rollup.innerProofData.length; ++i) {
                const proof = rollup.innerProofData[i];
                if (proof.proofId !== client_proofs_1.ProofId.ACCOUNT) {
                    continue;
                }
                const { accountPublicKey, accountAliasId, spendingPublicKey1 } = offchain_tx_data_1.OffchainAccountData.fromBuffer(offchainData[i]);
                const commitment = this.noteAlgos.accountNoteCommitment(accountAliasId, accountPublicKey, spendingPublicKey1);
                // Only need to check one commitment to make sure the accountAliasId and accountPublicKey pair is valid.
                if (commitment.equals(proof.noteCommitment1)) {
                    aliases.push({
                        address: accountPublicKey,
                        aliasHash: accountAliasId.aliasHash,
                        latestNonce: accountAliasId.accountNonce,
                    });
                }
            }
            return aliases;
        };
        const aliases = rollups.map((rollup, i) => processRollup(rollup, offchainTxData[i])).flat();
        await this.db.setAliases(aliases);
    }
}
exports.CoreSdk = CoreSdk;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZV9zZGsuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29yZV9zZGsvY29yZV9zZGsudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsK0RBQXNFO0FBQ3RFLHlEQUEwRTtBQUcxRSxxRUFBNEc7QUFDNUcsaURBQThDO0FBQzlDLHVEQUF3RTtBQUN4RSxxREFBeUQ7QUFDekQsaURBQW1EO0FBQ25ELGlFQUEyRTtBQUUzRSxtREFBc0Q7QUFDdEQsaUVBQTZFO0FBQzdFLHlFQUFxRTtBQUNyRSwyRUFBMkU7QUFFM0UsbUVBQW1FO0FBRW5FLHFEQUFrRDtBQUdsRCxpRUFBa0Y7QUFDbEYsbUNBQXNDO0FBRXRDLGtFQUE4RDtBQUM5RCx3Q0FBNEU7QUFHNUUsc0NBT21CO0FBQ25CLGtEQUFtRjtBQUNuRiw4Q0FBNEU7QUFHNUUsNkNBQW1EO0FBRW5ELE1BQU0sS0FBSyxHQUFHLElBQUEsb0JBQVksRUFBQyxhQUFhLENBQUMsQ0FBQztBQUUxQyxJQUFLLFlBS0o7QUFMRCxXQUFLLFlBQVk7SUFDZiwrQ0FBK0IsQ0FBQTtJQUMvQiwyQ0FBMkIsQ0FBQTtJQUMzQixtQ0FBbUIsQ0FBQTtJQUNuQix1Q0FBdUIsQ0FBQTtBQUN6QixDQUFDLEVBTEksWUFBWSxLQUFaLFlBQVksUUFLaEI7QUFFRDs7Ozs7O0dBTUc7QUFDSCxNQUFhLE9BQVEsU0FBUSxxQkFBWTtJQTJCdkMsWUFDVSxPQUFnQixFQUNoQixFQUFZLEVBQ1osY0FBOEIsRUFDOUIsWUFBOEIsRUFDOUIsUUFBa0IsRUFDbEIsU0FBb0IsRUFDcEIsVUFBc0IsRUFDdEIsVUFBdUI7UUFFL0IsS0FBSyxFQUFFLENBQUM7UUFUQSxZQUFPLEdBQVAsT0FBTyxDQUFTO1FBQ2hCLE9BQUUsR0FBRixFQUFFLENBQVU7UUFDWixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsaUJBQVksR0FBWixZQUFZLENBQWtCO1FBQzlCLGFBQVEsR0FBUixRQUFRLENBQVU7UUFDbEIsY0FB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