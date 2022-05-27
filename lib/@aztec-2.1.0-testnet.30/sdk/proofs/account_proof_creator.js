"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountProofCreator = void 0;
const account_id_1 = require("@aztec/barretenberg/account_id");
const address_1 = require("@aztec/barretenberg/address");
const client_proofs_1 = require("@aztec/barretenberg/client_proofs");
const offchain_tx_data_1 = require("@aztec/barretenberg/offchain_tx_data");
const tx_id_1 = require("@aztec/barretenberg/tx_id");
const debug_1 = require("@aztec/barretenberg/debug");
const core_tx_1 = require("../core_tx");
const debug = (0, debug_1.createLogger)('bb:account_proof');
class AccountProofCreator {
    constructor(prover, worldState, db) {
        this.prover = prover;
        this.worldState = worldState;
        this.db = db;
    }
    async createAccountTx(signingPubKey, aliasHash, accountNonce, migrate, accountPublicKey, newAccountPublicKey, newSigningPubKey1, newSigningPubKey2, accountIndex = 0) {
        const merkleRoot = this.worldState.getRoot();
        const accountPath = await this.worldState.getHashPath(accountIndex);
        const accountAliasId = new account_id_1.AccountAliasId(aliasHash, accountNonce);
        return new client_proofs_1.AccountTx(merkleRoot, accountPublicKey, newAccountPublicKey || accountPublicKey, newSigningPubKey1 || address_1.GrumpkinAddress.ZERO, newSigningPubKey2 || address_1.GrumpkinAddress.ZERO, accountAliasId, migrate, accountIndex, accountPath, signingPubKey);
    }
    async computeSigningData(tx) {
        return this.prover.computeSigningData(tx);
    }
    async createProofInput(aliasHash, accountNonce, migrate, accountPublicKey, signingPubKey, newAccountPublicKey, newSigningPubKey1, newSigningPubKey2) {
        var _a;
        const accountIndex = accountNonce !== 0
            ? (_a = (await this.db.getUserSigningKey(new account_id_1.AccountId(accountPublicKey, accountNonce), signingPubKey))) === null || _a === void 0 ? void 0 : _a.treeIndex
            : 0;
        if (accountIndex === undefined) {
            throw new Error('Unknown signing key.');
        }
        const tx = await this.createAccountTx(signingPubKey, aliasHash, accountNonce, migrate, accountPublicKey, newAccountPublicKey, newSigningPubKey1, newSigningPubKey2, accountIndex);
        const signingData = await this.prover.computeSigningData(tx);
        return { tx, signingData };
    }
    async createProof({ tx, signature }, txRefNo) {
        debug('creating proof...');
        const start = new Date().getTime();
        const proof = await this.prover.createAccountProof(tx, signature);
        debug(`created proof: ${new Date().getTime() - start}ms`);
        debug(`proof size: ${proof.length}`);
        const proofData = new client_proofs_1.ProofData(proof);
        const txId = new tx_id_1.TxId(proofData.txId);
        const { accountAliasId: { aliasHash, accountNonce }, newAccountPublicKey, newSigningPubKey1, newSigningPubKey2, migrate, } = tx;
        const newNonce = accountNonce + +migrate;
        const accountOwner = new account_id_1.AccountId(newAccountPublicKey, newNonce);
        const newAccountAliasId = new account_id_1.AccountAliasId(aliasHash, newNonce);
        const coreTx = new core_tx_1.CoreAccountTx(txId, accountOwner, aliasHash, newSigningPubKey1 === null || newSigningPubKey1 === void 0 ? void 0 : newSigningPubKey1.x(), newSigningPubKey2 === null || newSigningPubKey2 === void 0 ? void 0 : newSigningPubKey2.x(), migrate, txRefNo, new Date());
        const offchainTxData = new offchain_tx_data_1.OffchainAccountData(newAccountPublicKey, newAccountAliasId, newSigningPubKey1 === null || newSigningPubKey1 === void 0 ? void 0 : newSigningPubKey1.x(), newSigningPubKey2 === null || newSigningPubKey2 === void 0 ? void 0 : newSigningPubKey2.x(), txRefNo);
        return { tx: coreTx, proofData, offchainTxData, outputNotes: [] };
    }
}
exports.AccountProofCreator = AccountProofCreator;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3VudF9wcm9vZl9jcmVhdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3Byb29mcy9hY2NvdW50X3Byb29mX2NyZWF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsK0RBQXNGO0FBQ3RGLHlEQUE4RDtBQUM5RCxxRUFBd0Y7QUFDeEYsMkVBQTJFO0FBQzNFLHFEQUFpRDtBQUVqRCxxREFBeUQ7QUFDekQsd0NBQTJDO0FBSzNDLE1BQU0sS0FBSyxHQUFHLElBQUEsb0JBQVksRUFBQyxrQkFBa0IsQ0FBQyxDQUFDO0FBRS9DLE1BQWEsbUJBQW1CO0lBQzlCLFlBQW9CLE1BQXFCLEVBQVUsVUFBc0IsRUFBVSxFQUFZO1FBQTNFLFdBQU0sR0FBTixNQUFNLENBQWU7UUFBVSxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQVUsT0FBRSxHQUFGLEVBQUUsQ0FBVTtJQUFHLENBQUM7SUFFNUYsS0FBSyxDQUFDLGVBQWUsQ0FDMUIsYUFBOEIsRUFDOUIsU0FBb0IsRUFDcEIsWUFBb0IsRUFDcEIsT0FBZ0IsRUFDaEIsZ0JBQWlDLEVBQ2pDLG1CQUFxQyxFQUNyQyxpQkFBbUMsRUFDbkMsaUJBQW1DLEVBQ25DLFlBQVksR0FBRyxDQUFDO1FBRWhCLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDN0MsTUFBTSxXQUFXLEdBQUcsTUFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUNwRSxNQUFNLGNBQWMsR0FBRyxJQUFJLDJCQUFjLENBQUMsU0FBUyxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBRW5FLE9BQU8sSUFBSSx5QkFBUyxDQUNsQixVQUFVLEVBQ1YsZ0JBQWdCLEVBQ2hCLG1CQUFtQixJQUFJLGdCQUFnQixFQUN2QyxpQkFBaUIsSUFBSSx5QkFBZSxDQUFDLElBQUksRUFDekMsaUJBQWlCLElBQUkseUJBQWUsQ0FBQyxJQUFJ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