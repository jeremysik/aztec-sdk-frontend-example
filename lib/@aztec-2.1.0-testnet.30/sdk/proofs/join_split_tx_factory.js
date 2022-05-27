"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JoinSplitTxFactory = void 0;
const account_id_1 = require("@aztec/barretenberg/account_id");
const address_1 = require("@aztec/barretenberg/address");
const bridge_id_1 = require("@aztec/barretenberg/bridge_id");
const client_proofs_1 = require("@aztec/barretenberg/client_proofs");
const crypto_1 = require("@aztec/barretenberg/crypto");
const ecc_1 = require("@aztec/barretenberg/ecc");
const merkle_tree_1 = require("@aztec/barretenberg/merkle_tree");
const note_algorithms_1 = require("@aztec/barretenberg/note_algorithms");
const world_state_1 = require("@aztec/barretenberg/world_state");
const note_1 = require("../note");
class JoinSplitTxFactory {
    constructor(noteAlgos, worldState, grumpkin, db) {
        this.noteAlgos = noteAlgos;
        this.worldState = worldState;
        this.grumpkin = grumpkin;
        this.db = db;
    }
    async createTx(user, proofId, assetId, inputNotes, signingPubKey, { publicValue = BigInt(0), publicOwner = address_1.EthAddress.ZERO, outputNoteValue1 = BigInt(0), outputNoteValue2 = BigInt(0), newNoteOwner = user.id, bridgeId = bridge_id_1.BridgeId.ZERO, defiDepositValue = BigInt(0), allowChain = 0, } = {}) {
        if (inputNotes.reduce((count, n) => count + (n.allowChain ? 1 : 0), 0) > 1) {
            throw new Error('Cannot chain from more than one pending note.');
        }
        const { id: accountId, aliasHash, privateKey, publicKey, accountNonce } = user;
        if (accountNonce && !aliasHash) {
            throw new Error('Alias hash not found.');
        }
        const accountAliasId = aliasHash ? new account_id_1.AccountAliasId(aliasHash, accountNonce) : account_id_1.AccountAliasId.random();
        const { path: accountPath, index: accountIndex } = await this.getAccountPathAndIndex(accountId, signingPubKey);
        const numInputNotes = inputNotes.length;
        const notes = [...inputNotes];
        const inputTreeNotes = notes.map(n => n.treeNote);
        // Add gibberish notes to ensure we have two notes.
        for (let i = notes.length; i < 2; ++i) {
            const treeNote = note_algorithms_1.TreeNote.createFromEphPriv(publicKey, // owner
            BigInt(0), // value
            assetId, accountNonce, (0, crypto_1.randomBytes)(32), // inputNullifier - this is a dummy input nullifier for the dummy note.
            this.createEphemeralPrivKey(), this.grumpkin);
            inputTreeNotes.push(treeNote);
            notes.push(this.generateNewNote(treeNote, privateKey, { gibberish: true }));
        }
        const inputNoteIndices = notes.map(n => n.index || 0);
        // For each input note we need to
        // Determine if there is a hash path stored with the note
        // If there is then concatenate that path with the hash path returned from the data tree for that note's subtree
        // If there isn't then generate a 'zero' hash path of the full data tree depth
        const inputNotePaths = await Promise.all(notes.map(async (note, index) => {
            if (note.hashPath) {
                const immutableHashPath = merkle_tree_1.HashPath.fromBuffer(note.hashPath);
                return await this.worldState.buildFullHashPath(inputNoteIndices[index], immutableHashPath);
            }
            return this.worldState.buildZeroHashPath(world_state_1.WorldStateConstants.DATA_TREE_DEPTH);
        }));
        const inputNoteNullifiers = notes.map(n => n.nullifier);
        const newNotes = [
            this.createNote(assetId, outputNoteValue1, newNoteOwner, inputNoteNullifiers[0]),
            this.createNote(assetId, outputNoteValue2, accountId, inputNoteNullifiers[1]),
        ];
        const outputNotes = newNotes.map(n => n.note);
        const claimNote = proofId === client_proofs_1.ProofId.DEFI_DEPOSIT
            ? this.createClaimNote(bridgeId, defiDepositValue, accountId, inputNoteNullifiers[0])
            : { note: note_algorithms_1.ClaimNoteTxData.EMPTY, ephPubKey: undefined };
        const propagatedInputIndex = 1 + inputNotes.findIndex(n => n.allowChain);
        const backwardLink = propagatedInputIndex ? inputNotes[propagatedInputIndex - 1].commitment : Buffer.alloc(32);
        const dataRoot = this.worldState.getRoot();
        // For now, we will use the account key as the signing key (no account note required).
        const tx = new client_proofs_1.JoinSplitTx(proofId, publicValue, publicOwner, assetId, numInputNotes, inputNoteIndices, dataRoot, inputNotePaths, inputTreeNotes, outputNotes, claimNote.note, privateKey, accountAliasId, accountIndex, accountPath, signingPubKey, backwardLink, allowChain);
        const viewingKeys = proofId === client_proofs_1.ProofId.DEFI_DEPOSIT ? [newNotes[1].viewingKey] : [newNotes[0].viewingKey, newNotes[1].viewingKey];
        return { tx, viewingKeys, partialStateSecretEphPubKey: claimNote.ephPubKey };
    }
    async getAccountPathAndIndex(accountId, signingPubKey) {
        if (accountId.accountNonce === 0) {
            return {
                path: this.worldState.buildZeroHashPath(world_state_1.WorldStateConstants.DATA_TREE_DEPTH),
                index: 0,
            };
        }
        else {
            const signingKey = await this.db.getUserSigningKey(accountId, signingPubKey);
            if (signingKey === undefined) {
                throw new Error('Unknown signing key.');
            }
            const immutableHashPath = merkle_tree_1.HashPath.fromBuffer(signingKey.hashPath);
            const path = await this.worldState.buildFullHashPath(signingKey.treeIndex, immutableHashPath);
            return {
                path,
                index: signingKey.treeIndex,
            };
        }
    }
    generateNewNote(treeNote, privateKey, { allowChain = false, gibberish = false } = {}) {
        const commitment = this.noteAlgos.valueNoteCommitment(treeNote);
        const nullifier = this.noteAlgos.valueNoteNullifier(commitment, privateKey, !gibberish);
        return new note_1.Note(treeNote, commitment, nullifier, allowChain, false);
    }
    createNote(assetId, value, owner, inputNullifier, sender) {
        const { ephPrivKey } = this.createEphemeralKeyPair();
        const creatorPubKey = sender ? sender.publicKey.x() : Buffer.alloc(32);
        const note = note_algorithms_1.TreeNote.createFromEphPriv(owner.publicKey, value, assetId, owner.accountNonce, inputNullifier, ephPrivKey, this.grumpkin, creatorPubKey);
        const viewingKey = note.createViewingKey(ephPrivKey, this.grumpkin);
        return { note, viewingKey };
    }
    createClaimNote(bridgeId, value, owner, inputNullifier) {
        const { ephPrivKey, ephPubKey } = this.createEphemeralKeyPair();
        const noteSecret = (0, note_algorithms_1.deriveNoteSecret)(owner.publicKey, ephPrivKey, this.grumpkin);
        const note = new note_algorithms_1.ClaimNoteTxData(value, bridgeId, noteSecret, inputNullifier);
        // ephPubKey is returned for the defi deposit use case, where we'd like to avoid creating a viewing key for the
        // partial claim note's partialState, since all we want to transmit is the ephPubKey (which we can do via offchain tx data).
        return { note, ephPubKey };
    }
    createEphemeralPrivKey() {
        return this.grumpkin.getRandomFr();
    }
    createEphemeralKeyPair() {
        const ephPrivKey = this.grumpkin.getRandomFr();
        const ephPubKey = new address_1.GrumpkinAddress(this.grumpkin.mul(ecc_1.Grumpkin.one, ephPrivKey));
        return { ephPrivKey, ephPubKey };
    }
}
exports.JoinSplitTxFactory = JoinSplitTxFactory;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiam9pbl9zcGxpdF90eF9mYWN0b3J5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3Byb29mcy9qb2luX3NwbGl0X3R4X2ZhY3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsK0RBQTJFO0FBQzNFLHlEQUEwRTtBQUMxRSw2REFBeUQ7QUFDekQscUVBQXlFO0FBQ3pFLHVEQUF5RDtBQUN6RCxpREFBbUQ7QUFDbkQsaUVBQTJEO0FBQzNELHlFQUFrSDtBQUNsSCxpRUFBa0Y7QUFFbEYsa0NBQStCO0FBRy9CLE1BQWEsa0JBQWtCO0lBQzdCLFlBQ1UsU0FBeUIsRUFDekIsVUFBc0IsRUFDdEIsUUFBa0IsRUFDbEIsRUFBWTtRQUhaLGNBQVMsR0FBVCxTQUFTLENBQWdCO1FBQ3pCLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdEIsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUNsQixPQUFFLEdBQUYsRUFBRSxDQUFVO0lBQ25CLENBQUM7SUFFSixLQUFLLENBQUMsUUFBUSxDQUNaLElBQWMsRUFDZCxPQUFnQixFQUNoQixPQUFlLEVBQ2YsVUFBa0IsRUFDbEIsYUFBOEIsRUFDOUIsRUFDRSxXQUFXLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUN2QixXQUFXLEdBQUcsb0JBQVUsQ0FBQyxJQUFJLEVBQzdCLGdCQUFnQixHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFDNUIsZ0JBQWdCLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUM1QixZQUFZLEdBQUcsSUFBSSxDQUFDLEVBQUUsRUFDdEIsUUFBUSxHQUFHLG9CQUFRLENBQUMsSUFBSSxFQUN4QixnQkFBZ0IsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQzVCLFVBQVUsR0FBRyxDQUFDLEdBQ2YsR0FBRyxFQUFFO1FBRU4sSUFBSSxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsS0FBSyxHQUFHLENBQUMs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