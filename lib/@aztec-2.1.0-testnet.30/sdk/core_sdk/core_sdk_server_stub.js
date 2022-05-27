"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoreSdkServerStub = void 0;
const account_id_1 = require("@aztec/barretenberg/account_id");
const address_1 = require("@aztec/barretenberg/address");
const asset_1 = require("@aztec/barretenberg/asset");
const bridge_id_1 = require("@aztec/barretenberg/bridge_id");
const rollup_provider_1 = require("@aztec/barretenberg/rollup_provider");
const tx_id_1 = require("@aztec/barretenberg/tx_id");
const events_1 = require("events");
const core_tx_1 = require("../core_tx");
const note_1 = require("../note");
const proofs_1 = require("../proofs");
const user_1 = require("../user");
const sdk_status_1 = require("./sdk_status");
/**
 * Implements the standard CoreSdkSerializedInterface (actually the interface is derived from this, but same thing).
 * Translates the CoreSdkSerializedInterface from serial types such as string, UInt8Array into normal types such
 * as bigint, Buffer etc.
 * It forwards the calls onto an implementation of CoreSdkInterface.
 */
class CoreSdkServerStub {
    constructor(core) {
        this.core = core;
        this.eventDelegator = new events_1.EventEmitter();
        // Broadcast all core sdk events.
        for (const e in sdk_status_1.SdkEvent) {
            const event = sdk_status_1.SdkEvent[e];
            this.core.on(event, (...args) => {
                switch (event) {
                    case sdk_status_1.SdkEvent.UPDATED_USER_STATE: {
                        const [userId] = args;
                        this.eventDelegator.emit(event, userId.toString());
                        break;
                    }
                    default:
                        this.eventDelegator.emit(event, ...args);
                }
            });
        }
    }
    async init(options) {
        await this.core.init(options);
    }
    on(event, listener) {
        this.eventDelegator.on(event, listener);
    }
    async run() {
        await this.core.run();
    }
    async destroy() {
        await this.core.destroy();
    }
    async getLocalStatus() {
        const status = await this.core.getLocalStatus();
        return (0, sdk_status_1.sdkStatusToJson)(status);
    }
    async getRemoteStatus() {
        const status = await this.core.getRemoteStatus();
        return (0, rollup_provider_1.rollupProviderStatusToJson)(status);
    }
    async getTxFees(assetId) {
        const txFees = await this.core.getTxFees(assetId);
        return txFees.map(fees => fees.map(asset_1.assetValueToJson));
    }
    async getDefiFees(bridgeId) {
        const fees = await this.core.getDefiFees(bridge_id_1.BridgeId.fromString(bridgeId));
        return fees.map(asset_1.assetValueToJson);
    }
    async getLatestAccountNonce(publicKey) {
        return this.core.getLatestAccountNonce(address_1.GrumpkinAddress.fromString(publicKey));
    }
    async getRemoteLatestAccountNonce(publicKey) {
        return this.core.getLatestAccountNonce(address_1.GrumpkinAddress.fromString(publicKey));
    }
    async getLatestAliasNonce(alias) {
        return this.core.getLatestAliasNonce(alias);
    }
    async getRemoteLatestAliasNonce(alias) {
        return this.core.getRemoteLatestAliasNonce(alias);
    }
    async getAccountId(alias, accountNonce) {
        const accountId = await this.core.getAccountId(alias, accountNonce);
        return accountId ? accountId.toString() : undefined;
    }
    async getRemoteAccountId(alias, accountNonce) {
        const accountId = await this.core.getRemoteAccountId(alias, accountNonce);
        return accountId ? accountId.toString() : undefined;
    }
    async isAliasAvailable(alias) {
        return this.core.isAliasAvailable(alias);
    }
    async isRemoteAliasAvailable(alias) {
        return this.core.isRemoteAliasAvailable(alias);
    }
    async computeAliasHash(alias) {
        return (await this.core.computeAliasHash(alias)).toString();
    }
    async createPaymentProofInput(userId, assetId, publicInput, publicOutput, privateInput, recipientPrivateOutput, senderPrivateOutput, noteRecipient, publicOwner, spendingPublicKey, allowChain) {
        const proofInput = await this.core.createPaymentProofInput(account_id_1.AccountId.fromString(userId), assetId, BigInt(publicInput), BigInt(publicOutput), BigInt(privateInput), BigInt(recipientPrivateOutput), BigInt(senderPrivateOutput), noteRecipient ? account_id_1.AccountId.fromString(noteRecipient) : undefined, publicOwner ? address_1.EthAddress.fromString(publicOwner) : undefined, address_1.GrumpkinAddress.fromString(spendingPublicKey), allowChain);
        return (0, proofs_1.joinSplitProofInputToJson)(proofInput);
    }
    async createPaymentProof(input, txRefNo) {
        const proofOutput = await this.core.createPaymentProof((0, proofs_1.joinSplitProofInputFromJson)(input), txRefNo);
        return (0, proofs_1.proofOutputToJson)(proofOutput);
    }
    async createAccountProofSigningData(signingPubKey, alias, accountNonce, migrate, accountPublicKey, newAccountPublicKey, newSigningPubKey1, newSigningPubKey2) {
        const signingData = await this.core.createAccountProofSigningData(address_1.GrumpkinAddress.fromString(signingPubKey), alias, accountNonce, migrate, address_1.GrumpkinAddress.fromString(accountPublicKey), newAccountPublicKey ? address_1.GrumpkinAddress.fromString(newAccountPublicKey) : undefined, newSigningPubKey1 ? address_1.GrumpkinAddress.fromString(newSigningPubKey1) : undefined, newSigningPubKey2 ? address_1.GrumpkinAddress.fromString(newSigningPubKey2) : undefined);
        return new Uint8Array(signingData);
    }
    async createAccountProofInput(userId, aliasHash, migrate, signingPublicKey, newSigningPublicKey1, newSigningPublicKey2, newAccountPrivateKey) {
        const proofInput = await this.core.createAccountProofInput(account_id_1.AccountId.fromString(userId), account_id_1.AliasHash.fromString(aliasHash), migrate, address_1.GrumpkinAddress.fromString(signingPublicKey), newSigningPublicKey1 ? address_1.GrumpkinAddress.fromString(newSigningPublicKey1) : undefined, newSigningPublicKey2 ? address_1.GrumpkinAddress.fromString(newSigningPublicKey2) : undefined, newAccountPrivateKey ? Buffer.from(newAccountPrivateKey) : undefined);
        return (0, proofs_1.accountProofInputToJson)(proofInput);
    }
    async createAccountProof(proofInput, txRefNo) {
        const proofOutput = await this.core.createAccountProof((0, proofs_1.accountProofInputFromJson)(proofInput), txRefNo);
        return (0, proofs_1.proofOutputToJson)(proofOutput);
    }
    async createDefiProofInput(userId, bridgeId, depositValue, inputNotes, spendingPublicKey) {
        const proofInput = await this.core.createDefiProofInput(account_id_1.AccountId.fromString(userId), bridge_id_1.BridgeId.fromString(bridgeId), BigInt(depositValue), inputNotes.map(n => (0, note_1.noteFromJson)(n)), address_1.GrumpkinAddress.fromString(spendingPublicKey));
        return (0, proofs_1.joinSplitProofInputToJson)(proofInput);
    }
    async createDefiProof(input, txRefNo) {
        const proofOutput = await this.core.createDefiProof((0, proofs_1.joinSplitProofInputFromJson)(input), txRefNo);
        return (0, proofs_1.proofOutputToJson)(proofOutput);
    }
    async sendProofs(proofs) {
        const txIds = await this.core.sendProofs(proofs.map(proofs_1.proofOutputFromJson));
        return txIds.map(txId => txId.toString());
    }
    async awaitSynchronised() {
        await this.core.awaitSynchronised();
    }
    async isUserSynching(userId) {
        return this.core.isUserSynching(account_id_1.AccountId.fromString(userId));
    }
    async awaitUserSynchronised(userId) {
        await this.core.awaitUserSynchronised(account_id_1.AccountId.fromString(userId));
    }
    async awaitSettlement(txId, timeout) {
        await this.core.awaitSettlement(tx_id_1.TxId.fromString(txId), timeout);
    }
    async awaitDefiDepositCompletion(txId, timeout) {
        await this.core.awaitDefiDepositCompletion(tx_id_1.TxId.fromString(txId), timeout);
    }
    async awaitDefiFinalisation(txId, timeout) {
        await this.core.awaitDefiFinalisation(tx_id_1.TxId.fromString(txId), timeout);
    }
    async awaitDefiSettlement(txId, timeout) {
        await this.core.awaitDefiSettlement(tx_id_1.TxId.fromString(txId), timeout);
    }
    async getDefiInteractionNonce(txId) {
        return this.core.getDefiInteractionNonce(tx_id_1.TxId.fromString(txId));
    }
    async userExists(userId) {
        return this.core.userExists(account_id_1.AccountId.fromString(userId));
    }
    async getUserData(userId) {
        const userData = await this.core.getUserData(account_id_1.AccountId.fromString(userId));
        return (0, user_1.userDataToJson)(userData);
    }
    async getUsersData() {
        const usersData = await this.core.getUsersData();
        return usersData.map(user_1.userDataToJson);
    }
    async derivePublicKey(privateKey) {
        const publicKey = await this.core.derivePublicKey(Buffer.from(privateKey));
        return publicKey.toString();
    }
    async constructSignature(message, privateKey) {
        const signature = await this.core.constructSignature(Buffer.from(message), Buffer.from(privateKey));
        return signature.toString();
    }
    async addUser(privateKey, accountNonce, noSync) {
        const userData = await this.core.addUser(Buffer.from(privateKey), accountNonce, noSync);
        return (0, user_1.userDataToJson)(userData);
    }
    async removeUser(userId) {
        await this.core.removeUser(account_id_1.AccountId.fromString(userId));
    }
    async getSigningKeys(userId) {
        const keys = await this.core.getSigningKeys(account_id_1.AccountId.fromString(userId));
        return keys.map(k => new Uint8Array(k));
    }
    async getBalances(userId) {
        const balances = await this.core.getBalances(account_id_1.AccountId.fromString(userId));
        return balances.map(asset_1.assetValueToJson);
    }
    async getBalance(assetId, userId) {
        const balance = await this.core.getBalance(assetId, account_id_1.AccountId.fromString(userId));
        return balance.toString();
    }
    async getSpendableSum(assetId, userId, excludePendingNotes) {
        const sum = await this.core.getSpendableSum(assetId, account_id_1.AccountId.fromString(userId), excludePendingNotes);
        return sum.toString();
    }
    async getSpendableSums(userId, excludePendingNotes) {
        const sums = await this.core.getSpendableSums(account_id_1.AccountId.fromString(userId), excludePendingNotes);
        return sums.map(asset_1.assetValueToJson);
    }
    async getMaxSpendableValue(assetId, userId, numNotes, excludePendingNotes) {
        const value = await this.core.getMaxSpendableValue(assetId, account_id_1.AccountId.fromString(userId), numNotes, excludePendingNotes);
        return value.toString();
    }
    async pickNotes(userId, assetId, value, excludePendingNotes) {
        return (await this.core.pickNotes(account_id_1.AccountId.fromString(userId), assetId, BigInt(value), excludePendingNotes)).map(note_1.noteToJson);
    }
    async pickNote(userId, assetId, value, excludePendingNotes) {
        const note = await this.core.pickNote(account_id_1.AccountId.fromString(userId), assetId, BigInt(value), excludePendingNotes);
        return note ? (0, note_1.noteToJson)(note) : undefined;
    }
    async getUserTxs(userId) {
        const txs = await this.core.getUserTxs(account_id_1.AccountId.fromString(userId));
        return txs.map(core_tx_1.coreUserTxToJson);
    }
    async getRemoteUnsettledAccountTxs() {
        const txs = await this.core.getRemoteUnsettledAccountTxs();
        return txs.map(rollup_provider_1.accountTxToJson);
    }
    async getRemoteUnsettledPaymentTxs() {
        const txs = await this.core.getRemoteUnsettledPaymentTxs();
        return txs.map(rollup_provider_1.joinSplitTxToJson);
    }
}
exports.CoreSdkServerStub = CoreSdkServerStub;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZV9zZGtfc2VydmVyX3N0dWIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29yZV9zZGsvY29yZV9zZGtfc2VydmVyX3N0dWIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsK0RBQXNFO0FBQ3RFLHlEQUEwRTtBQUMxRSxxREFBNkQ7QUFDN0QsNkRBQXlEO0FBQ3pELHlFQUFxSDtBQUNySCxxREFBaUQ7QUFDakQsbUNBQXNDO0FBQ3RDLHdDQUE4QztBQUM5QyxrQ0FBNkQ7QUFDN0Qsc0NBVW1CO0FBQ25CLGtDQUF5QztBQUd6Qyw2Q0FBeUQ7QUFFekQ7Ozs7O0dBS0c7QUFDSCxNQUFhLGlCQUFpQjtJQUc1QixZQUFvQixJQUFzQjtRQUF0QixTQUFJLEdBQUosSUFBSSxDQUFrQjtRQUZsQyxtQkFBYyxHQUFHLElBQUkscUJBQVksRUFBRSxDQUFDO1FBRzFDLGlDQUFpQztRQUNqQyxLQUFLLE1BQU0sQ0FBQyxJQUFJLHFCQUFRLEVBQUU7WUFDeEIsTUFBTSxLQUFLLEdBQUkscUJBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbkMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUMsR0FBRyxJQUFXLEVBQUUsRUFBRTtnQkFDckMsUUFBUSxLQUFLLEVBQUU7b0JBQ2IsS0FBSyxxQkFBUSxDQUFDLGtCQUFrQixDQUFDLENBQUM7d0JBQ2hDLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUM7d0JBQ3RCLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQzt3QkFDbkQsTUFBTTtxQkFDUDtvQkFDRDt3QkFDRSxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztpQkFDNUM7WUFDSCxDQUFDLENBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQztJQUVNLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBdUI7UUFDdkMsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBRU0sRUFBRSxDQUFDLEtBQWUsRUFBRSxRQUFrQztRQUMzRCxJQUFJLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUVNLEtBQUssQ0FBQyxHQUFHO1FBQ2QsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFFTSxLQUFLLENBQUMsT0FBTztRQUNsQixNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDNUIsQ0FBQztJQUVNLEtBQUssQ0FBQyxjQUFjO1FBQ3pCLE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUNoRCxPQUFPLElBQUEsNEJBQWUsRUFBQyxNQUFNLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBRU0sS0FBSyxDQUFDLGVBQWU7UUFDMUIsTUFBTSxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ2pELE9BQU8sSUFBQSw0Q0FBMEIsRUFBQyxNQUFNLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBRU0sS0FBSyxDQUFDLFNBQVMsQ0FBQyxPQUFlO1FBQ3BDLE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDbEQsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyx3QkFBZ0IsQ0FBQyxDQUFDLENBQUM7SUFDeEQsQ0FBQztJQUVNLEtBQUssQ0FBQyxXQUFXLENBQUMsUUFBZ0I7UUFDdkMsTUFBTSxJQUFJLEdBQUcsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxvQkFBUSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQ3hFLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyx3QkFBZ0IsQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFFTSxLQUFLLENBQUMscUJBQXFCLENBQUMsU0FBaUI7UUFDbEQsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLHlCQUFlLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7SUFDaEYsQ0FBQztJQUVNLEtBQUssQ0FBQywyQkFBMkIsQ0FBQyxTQUFpQjtRQUN4RCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMseUJBQWUsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztJQUNoRixDQUFDO0lBRU0sS0FBSyxDQUFDLG1CQUFtQixDQUFDLEtBQWE7UUFDNUMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzlDLENBQUM7SUFFTSxLQUFLLENBQUMseUJBQXlCLENBQUMsS0FBYTtRQUNsRCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMseUJBQXlCLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDcEQsQ0FBQztJQUVNLEtBQUssQ0FBQyxZQUFZLENBQUMsS0FBYSxFQUFFLFlBQXFCO1FBQzVELE1BQU0sU0FBUyxHQUFHLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBQ3BFLE9BQU8sU0FBUyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztJQUN0RCxDQUFDO0lBRU0sS0FBSyxDQUFDLGtCQUFrQixDQUFDLEtBQWEsRUFBRSxZQUFxQjtRQUNsRSxNQUFNLFNBQVMsR0FBRyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsS0FBSyxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBQzFFLE9BQU8sU0FBUyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztJQUN0RCxDQUFDO0lBRU0sS0FBSyxDQUFDLGdCQUFnQixDQUFDLEtBQWE7UUFDekMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFFTSxLQUFLLENBQUMsc0JBQXNCLENBQUMsS0FBYTtRQUMvQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDakQsQ0FBQztJQUVNLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFhO1FBQ3pDLE9BQU8sQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUM5RCxDQUFDO0lBRU0sS0FBSyxDQUFDLHVCQUF1QixDQUNsQyxNQUFjLEVBQ2QsT0FBZSxFQUNmLFdBQW1CLEVBQ25CLFlBQW9CLEVBQ3BCLFlBQW9CLEVBQ3BCLHNCQUE4QixFQUM5QixtQkFBMkIsRUFDM0IsYUFBaUMsRUFDakMsV0FBK0IsRUFDL0IsaUJBQXlCLEVBQ3pCLFVBQWtCO1FBRWxCLE1BQU0sVUFBVSxHQUFHLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyx1QkFBdUIsQ0FDeEQsc0JBQVMsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEVBQzVCLE9BQU8sRUFDUCxNQUFNLENBQUMsV0FBVyxDQUFDLEVBQ25CLE1BQU0sQ0FBQyxZQUFZLENBQUMsRUFDcEIsTUFBTSxDQUFDLFlBQVksQ0FBQyxFQUNwQixNQUFNLENBQUMsc0JBQXNCLENBQUMsRUFDOUIsTUFBTSxDQUFDLG1CQUFtQixDQUFDLEVBQzNCLGFBQWEsQ0FBQyxDQUFDLENBQUMsc0JBQVMsQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFDL0QsV0FBVyxDQUFDLENBQUMsQ0FBQyxvQkFBVSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxFQUM1RCx5QkFBZSxDQUFDLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxFQUM3QyxVQUFVLENBQ1gsQ0FBQztRQUNGLE9BQU8sSUFBQSxrQ0FBeUIsRUFBQyxVQUFVLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBRU0sS0FBSyxDQUFDLGtCQUFrQixDQUFDLEtBQThCLEVBQUUsT0FBZTtRQUM3RSxNQUFNLFdBQVcsR0FBRyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBQSxvQ0FBMkIsRUFBQyxLQUFLLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNwRyxPQUFPLElBQUEsMEJBQWlCLEVBQUMsV0FBVyxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUVNLEtBQUssQ0FBQyw2QkFBNkIsQ0FDeEMsYUFBcUIsRUFDckIsS0FBYSxFQUNiLFlBQW9CLEVBQ3BCLE9BQWdCLEVBQ2hCLGdCQUF3QixFQUN4QixtQkFBNEIsRUFDNUIsaUJBQTBCLEVBQzFCLGlCQUEwQjtRQUUxQixNQUFNLFdBQVcsR0FBRyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsNkJBQTZCLENBQy9ELHlCQUFlLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxFQUN6QyxLQUFLLEVBQ0wsWUFBWSxFQUNaLE9BQU8sRUFDUCx5QkFBZSxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUM1QyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMseUJBQWUsQ0FBQyxVQUFVLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxFQUNqRixpQkFBaUIsQ0FBQyxDQUFDLENBQUMseUJBQWUsQ0FBQyxVQUFVLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxFQUM3RSxpQkFBaUIsQ0FBQyxDQUFDLENBQUMseUJBQWUsQ0FBQyxVQUFVLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUM5RSxDQUFDO1FBQ0YsT0FBTyxJQUFJLFVBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRU0sS0FBSyxDQUFDLHVCQUF1QixDQUNsQyxNQUFjLEVBQ2QsU0FBaUIsRUFDakIsT0FBZ0IsRUFDaEIsZ0JBQXdCLEVBQ3hCLG9CQUF3QyxFQUN4QyxvQkFBd0MsRUFDeEMsb0JBQTRDO1FBRTVDLE1BQU0sVUFBVSxHQUFHLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyx1QkFBdUIsQ0FDeEQsc0JBQVMsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEVBQzVCLHNCQUFTLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxFQUMvQixPQUFPLEVBQ1AseUJBQWUsQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsRUFDNUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLHlCQUFlLENBQUMsVUFBVSxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFDbkYsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLHlCQUFlLENBQUMsVUFBVSxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFDbkYsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUNyRSxDQUFDO1FBQ0YsT0FBTyxJQUFBLGdDQUF1QixFQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFFTSxLQUFLLENBQUMsa0JBQWtCLENBQUMsVUFBaUMsRUFBRSxPQUFlO1FBQ2hGLE1BQU0sV0FBVyxHQUFHLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFBLGtDQUF5QixFQUFDLFVBQVUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ3ZHLE9BQU8sSUFBQSwwQkFBaUIsRUFBQyxXQUFXLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBRU0sS0FBSyxDQUFDLG9CQUFvQixDQUMvQixNQUFjLEVBQ2QsUUFBZ0IsRUFDaEIsWUFBb0IsRUFDcEIsVUFBc0IsRUFDdEIsaUJBQXlCO1FBRXpCLE1BQU0sVUFBVSxHQUFHLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FDckQsc0JBQVMsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEVBQzVCLG9CQUFRLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxFQUM3QixNQUFNLENBQUMsWUFBWSxDQUFDLEVBQ3BCLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFBLG1CQUFZLEVBQUMsQ0FBQyxDQUFDLENBQUMsRUFDcEMseUJBQWUsQ0FBQyxVQUFVLENBQUMsaUJBQWlCLENBQUMsQ0FDOUMsQ0FBQztRQUNGLE9BQU8sSUFBQSxrQ0FBeUIsRUFBQyxVQUFVLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBRU0sS0FBSyxDQUFDLGVBQWUsQ0FBQyxLQUE4QixFQUFFLE9BQWU7UUFDMUUsTUFBTSxXQUFXLEdBQUcsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFBLG9DQUEyQixFQUFDLEtBQUssQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ2pHLE9BQU8sSUFBQSwwQkFBaUIsRUFBQyxXQUFXLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBRU0sS0FBSyxDQUFDLFVBQVUsQ0FBQyxNQUF5QjtRQUMvQyxNQUFNLEtBQUssR0FBRyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsNEJBQW1CLENBQUMsQ0FBQyxDQUFDO1FBQzFFLE9BQU8sS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFFTSxLQUFLLENBQUMsaUJBQWlCO1FBQzVCLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0lBQ3RDLENBQUM7SUFFTSxLQUFLLENBQUMsY0FBYyxDQUFDLE1BQWM7UUFDeEMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxzQkFBUyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ2hFLENBQUM7SUFFTSxLQUFLLENBQUMscUJBQXFCLENBQUMsTUFBYztRQUMvQyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsc0JBQVMsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUN0RSxDQUFDO0lBRU0sS0FBSyxDQUFDLGVBQWUsQ0FBQyxJQUFZLEVBQUUsT0FBZ0I7UUFDekQsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxZQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ2xFLENBQUM7SUFFTSxLQUFLLENBQUMsMEJBQTBCLENBQUMsSUFBWSxFQUFFLE9BQWdCO1FBQ3BFLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxZQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQzdFLENBQUM7SUFFTSxLQUFLLENBQUMscUJBQXFCLENBQUMsSUFBWSxFQUFFLE9BQWdCO1FBQy9ELE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxZQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ3hFLENBQUM7SUFFTSxLQUFLLENBQUMsbUJBQW1CLENBQUMsSUFBWSxFQUFFLE9BQWdCO1FBQzdELE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxZQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ3RFLENBQUM7SUFFTSxLQUFLLENBQUMsdUJBQXVCLENBQUMsSUFBWTtRQUMvQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsWUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ2xFLENBQUM7SUFFTSxLQUFLLENBQUMsVUFBVSxDQUFDLE1BQWM7UUFDcEMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxzQkFBUyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQzVELENBQUM7SUFFTSxLQUFLLENBQUMsV0FBVyxDQUFDLE1BQWM7UUFDckMsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxzQkFBUyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQzNFLE9BQU8sSUFBQSxxQkFBYyxFQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFFTSxLQUFLLENBQUMsWUFBWTtRQUN2QixNQUFNLFNBQVMsR0FBRyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDakQsT0FBTyxTQUFTLENBQUMsR0FBRyxDQUFDLHFCQUFjLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRU0sS0FBSyxDQUFDLGVBQWUsQ0FBQyxVQUFzQjtRQUNqRCxNQUFNLFNBQVMsR0FBRyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztRQUMzRSxPQUFPLFNBQVMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUM5QixDQUFDO0lBRU0sS0FBSyxDQUFDLGtCQUFrQixDQUFDLE9BQW1CLEVBQUUsVUFBc0I7UUFDekUsTUFBTSxTQUFTLEdBQUcsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1FBQ3BHLE9BQU8sU0FBUyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQzlCLENBQUM7SUFFTSxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQXNCLEVBQUUsWUFBcUIsRUFBRSxNQUFnQjtRQUNsRixNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsWUFBWSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3hGLE9BQU8sSUFBQSxxQkFBYyxFQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFFTSxLQUFLLENBQUMsVUFBVSxDQUFDLE1BQWM7UUFDcEMsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxzQkFBUyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQzNELENBQUM7SUFFTSxLQUFLLENBQUMsY0FBYyxDQUFDLE1BQWM7UUFDeEMsTUFBTSxJQUFJLEdBQUcsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxzQkFBUyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQzFFLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUVNLEtBQUssQ0FBQyxXQUFXLENBQUMsTUFBYztRQUNyQyxNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLHNCQUFTLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDM0UsT0FBTyxRQUFRLENBQUMsR0FBRyxDQUFDLHdCQUFnQixDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUVNLEtBQUssQ0FBQyxVQUFVLENBQUMsT0FBZSxFQUFFLE1BQWM7UUFDckQsTUFBTSxPQUFPLEdBQUcsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsc0JBQVMsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUNsRixPQUFPLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUM1QixDQUFDO0lBRU0sS0FBSyxDQUFDLGVBQWUsQ0FBQyxPQUFlLEVBQUUsTUFBYyxFQUFFLG1CQUE2QjtRQUN6RixNQUFNLEdBQUcsR0FBRyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sRUFBRSxzQkFBUyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsRUFBRSxtQkFBbUIsQ0FBQyxDQUFDO1FBQ3hHLE9BQU8sR0FBRyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFFTSxLQUFLLENBQUMsZ0JBQWdCLENBQUMsTUFBYyxFQUFFLG1CQUE2QjtRQUN6RSxNQUFNLElBQUksR0FBRyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsc0JBQVMsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztRQUNqRyxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsd0JBQWdCLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBRU0sS0FBSyxDQUFDLG9CQUFvQixDQUFDLE9BQWUsRUFBRSxNQUFjLEVBQUUsUUFBaUIsRUFBRSxtQkFBNkI7UUFDakgsTUFBTSxLQUFLLEdBQUcsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUNoRCxPQUFPLEVBQ1Asc0JBQVMsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEVBQzVCLFFBQVEsRUFDUixtQkFBbUIsQ0FDcEIsQ0FBQztRQUNGLE9BQU8sS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFFTSxLQUFLLENBQUMsU0FBUyxDQUFDLE1BQWMsRUFBRSxPQUFlLEVBQUUsS0FBYSxFQUFFLG1CQUE2QjtRQUNsRyxPQUFPLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxzQkFBUyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxHQUFHLENBQy9HLGlCQUFVLENBQ1gsQ0FBQztJQUNKLENBQUM7SUFFTSxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQWMsRUFBRSxPQUFlLEVBQUUsS0FBYSxFQUFFLG1CQUE2QjtRQUNqRyxNQUFNLElBQUksR0FBRyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLHNCQUFTLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztRQUNqSCxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBQSxpQkFBVSxFQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7SUFDN0MsQ0FBQztJQUVNLEtBQUssQ0FBQyxVQUFVLENBQUMsTUFBYztRQUNwQyxNQUFNLEdBQUcsR0FBRyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLHNCQUFTLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDckUsT0FBTyxHQUFHLENBQUMsR0FBRyxDQUFDLDBCQUFnQixDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUVNLEtBQUssQ0FBQyw0QkFBNEI7UUFDdkMsTUFBTSxHQUFHLEdBQUcsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLDRCQUE0QixFQUFFLENBQUM7UUFDM0QsT0FBTyxHQUFHLENBQUMsR0FBRyxDQUFDLGlDQUFlLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBRU0sS0FBSyxDQUFDLDRCQUE0QjtRQUN2QyxNQUFNLEdBQUcsR0FBRyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsNEJBQTRCLEVBQUUsQ0FBQztRQUMzRCxPQUFPLEdBQUcsQ0FBQyxHQUFHLENBQUMsbUNBQWlCLENBQUMsQ0FBQztJQUNwQyxDQUFDO0NBQ0Y7QUExVUQsOENBMFVDIn0=