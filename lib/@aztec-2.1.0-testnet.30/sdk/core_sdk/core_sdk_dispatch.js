"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoreSdkDispatch = void 0;
const events_1 = require("events");
/**
 * Implements the serialized core sdk interface.
 * Transalates each individual api call, to a DispatchMsg sent to the given handler.
 */
class CoreSdkDispatch extends events_1.EventEmitter {
    constructor(handler) {
        super();
        this.handler = handler;
    }
    async request(fn, args = []) {
        return await this.handler({ fn, args });
    }
    async init(options) {
        await this.request('init', [options]);
    }
    async run() {
        await this.request('run');
    }
    async destroy() {
        await this.request('destroy');
    }
    async getLocalStatus() {
        return this.request('getLocalStatus');
    }
    async getRemoteStatus() {
        return this.request('getRemoteStatus');
    }
    async getTxFees(assetId) {
        return this.request('getTxFees', [assetId]);
    }
    async getDefiFees(bridgeId) {
        return this.request('getDefiFees', [bridgeId]);
    }
    async getLatestAccountNonce(publicKey) {
        return this.request('getLatestAccountNonce', [publicKey]);
    }
    async getRemoteLatestAccountNonce(publicKey) {
        return this.request('getRemoteLatestAccountNonce', [publicKey]);
    }
    async getLatestAliasNonce(alias) {
        return this.request('getLatestAliasNonce', [alias]);
    }
    async getRemoteLatestAliasNonce(alias) {
        return this.request('getRemoteLatestAliasNonce', [alias]);
    }
    async getAccountId(alias, accountNonce) {
        return await this.request('getAccountId', [alias, accountNonce]);
    }
    async getRemoteAccountId(alias, accountNonce) {
        return await this.request('getRemoteAccountId', [alias, accountNonce]);
    }
    async isAliasAvailable(alias) {
        return this.request('isAliasAvailable', [alias]);
    }
    async isRemoteAliasAvailable(alias) {
        return this.request('isRemoteAliasAvailable', [alias]);
    }
    async computeAliasHash(alias) {
        return this.request('computeAliasHash', [alias]);
    }
    async createPaymentProofInput(userId, assetId, publicInput, publicOutput, privateInput, recipientPrivateOutput, senderPrivateOutput, noteRecipient, publicOwner, spendingPublicKey, allowChain) {
        return this.request('createPaymentProofInput', [
            userId,
            assetId,
            publicInput,
            publicOutput,
            privateInput,
            recipientPrivateOutput,
            senderPrivateOutput,
            noteRecipient,
            publicOwner,
            spendingPublicKey,
            allowChain,
        ]);
    }
    async createPaymentProof(input, txRefNo) {
        return this.request('createPaymentProof', [input, txRefNo]);
    }
    async createAccountProofSigningData(signingPubKey, alias, accountNonce, migrate, accountPublicKey, newAccountPublicKey, newSigningPubKey1, newSigningPubKey2) {
        return this.request('createAccountProofSigningData', [
            signingPubKey,
            alias,
            accountNonce,
            migrate,
            accountPublicKey,
            newAccountPublicKey,
            newSigningPubKey1,
            newSigningPubKey2,
        ]);
    }
    async createAccountProofInput(userId, aliasHash, migrate, signingPublicKey, newSigningPublicKey1, newSigningPublicKey2, newAccountPrivateKey) {
        return this.request('createAccountProofInput', [
            userId,
            aliasHash,
            migrate,
            signingPublicKey,
            newSigningPublicKey1,
            newSigningPublicKey2,
            newAccountPrivateKey,
        ]);
    }
    async createAccountProof(proofInput, txRefNo) {
        return this.request('createAccountProof', [proofInput, txRefNo]);
    }
    async createDefiProofInput(userId, bridgeId, depositValue, inputNotes, spendingPublicKey) {
        return this.request('createDefiProof', [userId, bridgeId, depositValue, inputNotes, spendingPublicKey]);
    }
    async createDefiProof(input, txRefNo) {
        return this.request('createDefiProof', [input, txRefNo]);
    }
    async sendProofs(proofs) {
        return this.request('sendProofs', [proofs]);
    }
    async awaitSynchronised() {
        return this.request('awaitSynchronised');
    }
    async isUserSynching(userId) {
        return this.request('isUserSynching', [userId]);
    }
    async awaitUserSynchronised(userId) {
        return this.request('awaitUserSynchronised', [userId]);
    }
    async awaitSettlement(txId, timeout) {
        return this.request('awaitSettlement', [txId, timeout]);
    }
    async awaitDefiDepositCompletion(txId, timeout) {
        return this.request('awaitDefiDepositCompletion', [txId, timeout]);
    }
    async awaitDefiFinalisation(txId, timeout) {
        return this.request('awaitDefiFinalisation', [txId, timeout]);
    }
    async awaitDefiSettlement(txId, timeout) {
        return this.request('awaitDefiSettlement', [txId, timeout]);
    }
    async getDefiInteractionNonce(txId) {
        return this.request('getDefiInteractionNonce', [txId]);
    }
    async userExists(userId) {
        return this.request('userExists', [userId]);
    }
    getUserData(userId) {
        return this.request('getUserData', [userId]);
    }
    getUsersData() {
        return this.request('getUsersData');
    }
    derivePublicKey(privateKey) {
        return this.request('derivePublicKey', [privateKey]);
    }
    async constructSignature(message, privateKey) {
        return this.request('constructSignature', [message, privateKey]);
    }
    async addUser(privateKey, accountNonce, noSync) {
        return this.request('addUser', [privateKey, accountNonce, noSync]);
    }
    async removeUser(userId) {
        return this.request('removeUser', [userId]);
    }
    async getSigningKeys(userId) {
        return this.request('getSigningKeys', [userId]);
    }
    getBalances(userId) {
        return this.request('getBalances', [userId]);
    }
    getBalance(assetId, userId) {
        return this.request('getBalance', [assetId, userId]);
    }
    async getSpendableSum(assetId, userId, excludePendingNotes) {
        return this.request('getSpendableSum', [assetId, userId, excludePendingNotes]);
    }
    async getSpendableSums(userId, excludePendingNotes) {
        return this.request('getSpendableSums', [userId, excludePendingNotes]);
    }
    async getMaxSpendableValue(assetId, userId, numNotes, excludePendingNotes) {
        return this.request('getMaxSpendableValue', [assetId, userId, numNotes, excludePendingNotes]);
    }
    async pickNotes(userId, assetId, value, excludePendingNotes) {
        return this.request('pickNotes', [userId, assetId, value, excludePendingNotes]);
    }
    async pickNote(userId, assetId, value, excludePendingNotes) {
        return this.request('pickNote', [userId, assetId, value, excludePendingNotes]);
    }
    async getUserTxs(userId) {
        return this.request('getUserTxs', [userId]);
    }
    async getRemoteUnsettledAccountTxs() {
        return this.request('getRemoteUnsettledAccountTxs');
    }
    async getRemoteUnsettledPaymentTxs() {
        return this.request('getRemoteUnsettledPaymentTxs');
    }
}
exports.CoreSdkDispatch = CoreSdkDispatch;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZV9zZGtfZGlzcGF0Y2guanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29yZV9zZGsvY29yZV9zZGtfZGlzcGF0Y2gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsbUNBQXNDO0FBT3RDOzs7R0FHRztBQUNILE1BQWEsZUFBZ0IsU0FBUSxxQkFBWTtJQUMvQyxZQUFvQixPQUEyQztRQUM3RCxLQUFLLEVBQUUsQ0FBQztRQURVLFlBQU8sR0FBUCxPQUFPLENBQW9DO0lBRS9ELENBQUM7SUFFTyxLQUFLLENBQUMsT0FBTyxDQUFDLEVBQVUsRUFBRSxPQUFjLEVBQUU7UUFDaEQsT0FBTyxNQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBRU0sS0FBSyxDQUFDLElBQUksQ0FBQyxPQUF1QjtRQUN2QyxNQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBRU0sS0FBSyxDQUFDLEdBQUc7UUFDZCxNQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUVNLEtBQUssQ0FBQyxPQUFPO1FBQ2xCLE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBRU0sS0FBSyxDQUFDLGNBQWM7UUFDekIsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUVNLEtBQUssQ0FBQyxlQUFlO1FBQzFCLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFFTSxLQUFLLENBQUMsU0FBUyxDQUFDLE9BQWU7UUFDcEMsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxD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