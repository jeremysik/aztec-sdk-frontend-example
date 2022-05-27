"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoreSdkClientStub = void 0;
const tslib_1 = require("tslib");
const account_id_1 = require("@aztec/barretenberg/account_id");
const address_1 = require("@aztec/barretenberg/address");
const asset_1 = require("@aztec/barretenberg/asset");
const crypto_1 = require("@aztec/barretenberg/crypto");
const rollup_provider_1 = require("@aztec/barretenberg/rollup_provider");
const tx_id_1 = require("@aztec/barretenberg/tx_id");
const events_1 = tslib_1.__importDefault(require("events"));
const core_tx_1 = require("../core_tx");
const note_1 = require("../note");
const proofs_1 = require("../proofs");
const user_1 = require("../user");
const sdk_status_1 = require("./sdk_status");
/**
 * Implements the standard CoreSdkInterface.
 * Translates the CoreSdkInterface from normal types such as bigint, Buffer, AccountId, etc. into types
 * that can be serialized over a MessageChannel.
 * It forwards the calls onto an implementation of CoreSdkSerializedInterface.
 */
class CoreSdkClientStub extends events_1.default {
    constructor(backend) {
        super();
        this.backend = backend;
        // Forward all core sdk events.
        for (const e in sdk_status_1.SdkEvent) {
            const event = sdk_status_1.SdkEvent[e];
            this.backend.on(event, (...args) => {
                switch (event) {
                    case sdk_status_1.SdkEvent.UPDATED_USER_STATE: {
                        const [userId] = args;
                        this.emit(event, account_id_1.AccountId.fromString(userId));
                        break;
                    }
                    default:
                        this.emit(event, ...args);
                }
            });
        }
    }
    async init(options) {
        await this.backend.init(options);
    }
    async run() {
        await this.backend.run();
    }
    async destroy() {
        await this.backend.destroy();
    }
    async getLocalStatus() {
        const json = await this.backend.getLocalStatus();
        return (0, sdk_status_1.sdkStatusFromJson)(json);
    }
    async getRemoteStatus() {
        const json = await this.backend.getRemoteStatus();
        return (0, rollup_provider_1.rollupProviderStatusFromJson)(json);
    }
    async getTxFees(assetId) {
        const txFees = await this.backend.getTxFees(assetId);
        return txFees.map(fees => fees.map(asset_1.assetValueFromJson));
    }
    async getDefiFees(bridgeId) {
        const fees = await this.backend.getDefiFees(bridgeId.toString());
        return fees.map(asset_1.assetValueFromJson);
    }
    async getLatestAccountNonce(publicKey) {
        return this.backend.getLatestAccountNonce(publicKey.toString());
    }
    async getRemoteLatestAccountNonce(publicKey) {
        return this.backend.getRemoteLatestAccountNonce(publicKey.toString());
    }
    async getLatestAliasNonce(alias) {
        return this.backend.getLatestAliasNonce(alias);
    }
    async getRemoteLatestAliasNonce(alias) {
        return this.backend.getRemoteLatestAliasNonce(alias);
    }
    async getAccountId(alias, accountNonce) {
        const accountId = await this.backend.getAccountId(alias, accountNonce);
        return accountId ? account_id_1.AccountId.fromString(accountId) : undefined;
    }
    async getRemoteAccountId(alias, accountNonce) {
        const accountId = await this.backend.getRemoteAccountId(alias, accountNonce);
        return accountId ? account_id_1.AccountId.fromString(accountId) : undefined;
    }
    async isAliasAvailable(alias) {
        return this.backend.isAliasAvailable(alias);
    }
    async isRemoteAliasAvailable(alias) {
        return this.backend.isRemoteAliasAvailable(alias);
    }
    async computeAliasHash(alias) {
        const hash = await this.backend.computeAliasHash(alias);
        return account_id_1.AliasHash.fromString(hash);
    }
    async createPaymentProofInput(userId, assetId, publicInput, publicOutput, privateInput, recipientPrivateOutput, senderPrivateOutput, noteRecipient, publicOwner, spendingPublicKey, allowChain) {
        const json = await this.backend.createPaymentProofInput(userId.toString(), assetId, publicInput.toString(), publicOutput.toString(), privateInput.toString(), recipientPrivateOutput.toString(), senderPrivateOutput.toString(), noteRecipient ? noteRecipient.toString() : undefined, publicOwner ? publicOwner.toString() : undefined, spendingPublicKey.toString(), allowChain);
        return (0, proofs_1.joinSplitProofInputFromJson)(json);
    }
    async createPaymentProof(input, txRefNo) {
        const json = await this.backend.createPaymentProof((0, proofs_1.joinSplitProofInputToJson)(input), txRefNo);
        return (0, proofs_1.proofOutputFromJson)(json);
    }
    async createAccountProofSigningData(signingPubKey, alias, accountNonce, migrate, accountPublicKey, newAccountPublicKey, newSigningPubKey1, newSigningPubKey2) {
        const signingData = await this.backend.createAccountProofSigningData(signingPubKey.toString(), alias, accountNonce, migrate, accountPublicKey.toString(), newAccountPublicKey ? newAccountPublicKey.toString() : undefined, newSigningPubKey1 ? newSigningPubKey1.toString() : undefined, newSigningPubKey2 ? newSigningPubKey2.toString() : undefined);
        return Buffer.from(signingData);
    }
    async createAccountProofInput(userId, aliasHash, migrate, signingPublicKey, newSigningPublicKey1, newSigningPublicKey2, newAccountPrivateKey) {
        const json = await this.backend.createAccountProofInput(userId.toString(), aliasHash.toString(), migrate, signingPublicKey.toString(), newSigningPublicKey1 ? newSigningPublicKey1.toString() : undefined, newSigningPublicKey2 ? newSigningPublicKey2.toString() : undefined, newAccountPrivateKey ? new Uint8Array(newAccountPrivateKey) : undefined);
        return (0, proofs_1.accountProofInputFromJson)(json);
    }
    async createAccountProof(proofInput, txRefNo) {
        const json = await this.backend.createAccountProof((0, proofs_1.accountProofInputToJson)(proofInput), txRefNo);
        return (0, proofs_1.proofOutputFromJson)(json);
    }
    async createDefiProofInput(userId, bridgeId, depositValue, inputNotes, spendingPublicKey) {
        const json = await this.backend.createDefiProofInput(userId.toString(), bridgeId.toString(), depositValue.toString(), inputNotes.map(n => (0, note_1.noteToJson)(n)), spendingPublicKey.toString());
        return (0, proofs_1.joinSplitProofInputFromJson)(json);
    }
    async createDefiProof(input, txRefNo) {
        const json = await this.backend.createDefiProof((0, proofs_1.joinSplitProofInputToJson)(input), txRefNo);
        return (0, proofs_1.proofOutputFromJson)(json);
    }
    async sendProofs(proofs) {
        const txIds = await this.backend.sendProofs(proofs.map(proofs_1.proofOutputToJson));
        return txIds.map(tx_id_1.TxId.fromString);
    }
    async awaitSynchronised() {
        await this.backend.awaitSynchronised();
    }
    async isUserSynching(userId) {
        return this.backend.isUserSynching(userId.toString());
    }
    async awaitUserSynchronised(userId) {
        await this.backend.awaitUserSynchronised(userId.toString());
    }
    async awaitSettlement(txId, timeout) {
        await this.backend.awaitSettlement(txId.toString(), timeout);
    }
    async awaitDefiDepositCompletion(txId, timeout) {
        await this.backend.awaitDefiDepositCompletion(txId.toString(), timeout);
    }
    async awaitDefiFinalisation(txId, timeout) {
        await this.backend.awaitDefiFinalisation(txId.toString(), timeout);
    }
    async awaitDefiSettlement(txId, timeout) {
        await this.backend.awaitDefiSettlement(txId.toString(), timeout);
    }
    async getDefiInteractionNonce(txId) {
        return this.backend.getDefiInteractionNonce(txId.toString());
    }
    async userExists(userId) {
        return this.backend.userExists(userId.toString());
    }
    async getUserData(userId) {
        const json = await this.backend.getUserData(userId.toString());
        return (0, user_1.userDataFromJson)(json);
    }
    async getUsersData() {
        const json = await this.backend.getUsersData();
        return json.map(user_1.userDataFromJson);
    }
    async derivePublicKey(privateKey) {
        const publicKey = await this.backend.derivePublicKey(new Uint8Array(privateKey));
        return address_1.GrumpkinAddress.fromString(publicKey);
    }
    async constructSignature(message, privateKey) {
        const signature = await this.backend.constructSignature(new Uint8Array(message), new Uint8Array(privateKey));
        return crypto_1.SchnorrSignature.fromString(signature);
    }
    async addUser(privateKey, accountNonce, noSync) {
        const json = await this.backend.addUser(new Uint8Array(privateKey), accountNonce, noSync);
        return (0, user_1.userDataFromJson)(json);
    }
    async removeUser(userId) {
        await this.backend.removeUser(userId.toString());
    }
    async getSigningKeys(userId) {
        const keys = await this.backend.getSigningKeys(userId.toString());
        return keys.map(k => Buffer.from(k));
    }
    async getBalances(userId) {
        const balances = await this.backend.getBalances(userId.toString());
        return balances.map(asset_1.assetValueFromJson);
    }
    async getBalance(assetId, userId) {
        const balanceStr = await this.backend.getBalance(assetId, userId.toString());
        return BigInt(balanceStr);
    }
    async getSpendableSum(assetId, userId, excludePendingNotes) {
        const valueStr = await this.backend.getSpendableSum(assetId, userId.toString(), excludePendingNotes);
        return BigInt(valueStr);
    }
    async getSpendableSums(userId, excludePendingNotes) {
        const sums = await this.backend.getSpendableSums(userId.toString(), excludePendingNotes);
        return sums.map(asset_1.assetValueFromJson);
    }
    async getMaxSpendableValue(assetId, userId, numNotes, excludePendingNotes) {
        const valueStr = await this.backend.getMaxSpendableValue(assetId, userId.toString(), numNotes, excludePendingNotes);
        return BigInt(valueStr);
    }
    async pickNotes(userId, assetId, value, excludePendingNotes) {
        return (await this.backend.pickNotes(userId.toString(), assetId, value.toString(), excludePendingNotes)).map(note_1.noteFromJson);
    }
    async pickNote(userId, assetId, value, excludePendingNotes) {
        const note = await this.backend.pickNote(userId.toString(), assetId, value.toString(), excludePendingNotes);
        return note ? (0, note_1.noteFromJson)(note) : undefined;
    }
    async getUserTxs(userId) {
        const txs = await this.backend.getUserTxs(userId.toString());
        return txs.map(core_tx_1.coreUserTxFromJson);
    }
    async getRemoteUnsettledAccountTxs() {
        const txs = await this.backend.getRemoteUnsettledAccountTxs();
        return txs.map(rollup_provider_1.accountTxFromJson);
    }
    async getRemoteUnsettledPaymentTxs() {
        const txs = await this.backend.getRemoteUnsettledPaymentTxs();
        return txs.map(rollup_provider_1.joinSplitTxFromJson);
    }
}
exports.CoreSdkClientStub = CoreSdkClientStub;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZV9zZGtfY2xpZW50X3N0dWIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29yZV9zZGsvY29yZV9zZGtfY2xpZW50X3N0dWIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLCtEQUFzRTtBQUN0RSx5REFBMEU7QUFDMUUscURBQStEO0FBRS9ELHVEQUE4RDtBQUM5RCx5RUFJNkM7QUFDN0MscURBQWlEO0FBQ2pELDREQUFrQztBQUNsQyx3Q0FBZ0Q7QUFDaEQsa0NBQXlEO0FBQ3pELHNDQVVtQjtBQUNuQixrQ0FBMkM7QUFJM0MsNkNBQTJEO0FBRTNEOzs7OztHQUtHO0FBQ0gsTUFBYSxpQkFBa0IsU0FBUSxnQkFBWTtJQUNqRCxZQUFvQixPQUFtQztRQUNyRCxLQUFLLEVBQUUsQ0FBQztRQURVLFlBQU8sR0FBUCxPQUFPLENBQTRCO1FBR3JELCtCQUErQjtRQUMvQixLQUFLLE1BQU0sQ0FBQyxJQUFJLHFCQUFRLEVBQUU7WUFDeEIsTUFBTSxLQUFLLEdBQUkscUJBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbkMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUMsR0FBRyxJQUFXLEVBQUUsRUFBRTtnQkFDeEMsUUFBUSxLQUFLLEVBQUU7b0JBQ2IsS0FBSyxxQkFBUSxDQUFDLGtCQUFrQixDQUFDLENBQUM7d0JBQ2hDLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUM7d0JBQ3RCLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLHNCQUFTLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7d0JBQy9DLE1BQU07cUJBQ1A7b0JBQ0Q7d0JBQ0UsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztpQkFDN0I7WUFDSCxDQUFDLENBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQztJQUVNLEtBQUssQ0FBQyxJQUFJ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