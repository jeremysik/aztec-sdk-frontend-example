"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MangoCoreSdk = void 0;
const account_id_1 = require("@aztec/barretenberg/account_id");
const address_1 = require("@aztec/barretenberg/address");
const events_1 = require("events");
const core_sdk_1 = require("../../core_sdk");
const proofs_1 = require("../../proofs");
/**
 * Implements the standard CoreSdkSerializedInterface.
 * Check permission for apis that access user data.
 * If permission has been granted for the origin, it then forwards the calls onto a CoreSdkServerStub.
 */
class MangoCoreSdk extends events_1.EventEmitter {
    constructor(core, origin, leveldb) {
        super();
        this.core = core;
        this.origin = origin;
        this.leveldb = leveldb;
        // Broadcast all core sdk events.
        for (const e in core_sdk_1.SdkEvent) {
            const event = core_sdk_1.SdkEvent[e];
            this.core.on(event, (...args) => this.emit(event, ...args));
        }
    }
    async init(options) {
        await this.core.init(options);
    }
    async run() {
        await this.core.run();
    }
    async destroy() {
        await this.core.destroy();
        await this.leveldb.close();
    }
    async getLocalStatus() {
        return this.core.getLocalStatus();
    }
    async getRemoteStatus() {
        return this.core.getRemoteStatus();
    }
    async getTxFees(assetId) {
        return this.core.getTxFees(assetId);
    }
    async getDefiFees(bridgeId) {
        return this.core.getDefiFees(bridgeId);
    }
    async getLatestAccountNonce(publicKey) {
        return this.core.getLatestAccountNonce(publicKey);
    }
    async getRemoteLatestAccountNonce(publicKey) {
        return this.core.getLatestAccountNonce(publicKey);
    }
    async getLatestAliasNonce(alias) {
        return this.core.getLatestAliasNonce(alias);
    }
    async getRemoteLatestAliasNonce(alias) {
        return this.core.getRemoteLatestAliasNonce(alias);
    }
    async getAccountId(alias, accountNonce) {
        return this.core.getAccountId(alias, accountNonce);
    }
    async getRemoteAccountId(alias, accountNonce) {
        return this.core.getRemoteAccountId(alias, accountNonce);
    }
    async isAliasAvailable(alias) {
        return this.core.isAliasAvailable(alias);
    }
    async isRemoteAliasAvailable(alias) {
        return this.core.isRemoteAliasAvailable(alias);
    }
    async computeAliasHash(alias) {
        return this.core.computeAliasHash(alias);
    }
    async createPaymentProofInput(userId, assetId, publicInput, publicOutput, privateInput, recipientPrivateOutput, senderPrivateOutput, noteRecipient, publicOwner, spendingPublicKey, allowChain) {
        await this.checkPermission(userId);
        return this.core.createPaymentProofInput(userId, assetId, publicInput, publicOutput, privateInput, recipientPrivateOutput, senderPrivateOutput, noteRecipient, publicOwner, spendingPublicKey, allowChain);
    }
    async createPaymentProof(input, txRefNo) {
        const { tx: { outputNotes }, } = (0, proofs_1.joinSplitProofInputFromJson)(input);
        const userId = new account_id_1.AccountId(outputNotes[1].ownerPubKey, outputNotes[1].accountNonce);
        await this.checkPermission(userId.toString());
        return this.core.createPaymentProof(input, txRefNo);
    }
    async createAccountProofSigningData(signingPubKey, alias, accountNonce, migrate, accountPublicKey, newAccountPublicKey, newSigningPubKey1, newSigningPubKey2) {
        return this.core.createAccountProofSigningData(signingPubKey, alias, accountNonce, migrate, accountPublicKey, newAccountPublicKey, newSigningPubKey1, newSigningPubKey2);
    }
    async createAccountProofInput(userId, aliasHash, migrate, signingPublicKey, newSigningPublicKey1, newSigningPublicKey2, newAccountPrivateKey) {
        await this.checkPermission(userId);
        return this.core.createAccountProofInput(userId, aliasHash, migrate, signingPublicKey, newSigningPublicKey1, newSigningPublicKey2, newAccountPrivateKey);
    }
    async createAccountProof(input, txRefNo) {
        const { tx: { accountAliasId, accountPublicKey }, } = (0, proofs_1.accountProofInputFromJson)(input);
        const userId = new account_id_1.AccountId(accountPublicKey, accountAliasId.accountNonce);
        await this.checkPermission(userId.toString());
        return this.core.createAccountProof(input, txRefNo);
    }
    async createDefiProofInput(userId, bridgeId, depositValue, inputNotes, spendingPublicKey) {
        await this.checkPermission(userId);
        return this.core.createDefiProofInput(userId, bridgeId, depositValue, inputNotes, spendingPublicKey);
    }
    async createDefiProof(input, txRefNo) {
        const { tx: { outputNotes }, } = (0, proofs_1.joinSplitProofInputFromJson)(input);
        const userId = new account_id_1.AccountId(outputNotes[1].ownerPubKey, outputNotes[1].accountNonce);
        await this.checkPermission(userId.toString());
        return this.core.createDefiProof(input, txRefNo);
    }
    async sendProofs(proofs) {
        const { tx: { userId }, } = (0, proofs_1.proofOutputFromJson)(proofs[0]);
        await this.checkPermission(userId.toString());
        return this.core.sendProofs(proofs);
    }
    async awaitSynchronised() {
        await this.core.awaitSynchronised();
    }
    async isUserSynching(userId) {
        await this.checkPermission(userId);
        return this.core.isUserSynching(userId);
    }
    async awaitUserSynchronised(userId) {
        await this.checkPermission(userId);
        await this.core.awaitUserSynchronised(userId);
    }
    async awaitSettlement(txId, timeout) {
        await this.core.awaitSettlement(txId, timeout);
    }
    async awaitDefiDepositCompletion(txId, timeout) {
        await this.core.awaitDefiDepositCompletion(txId, timeout);
    }
    async awaitDefiFinalisation(txId, timeout) {
        await this.core.awaitDefiFinalisation(txId, timeout);
    }
    async awaitDefiSettlement(txId, timeout) {
        await this.core.awaitDefiSettlement(txId, timeout);
    }
    async getDefiInteractionNonce(txId) {
        return this.core.getDefiInteractionNonce(txId);
    }
    async userExists(userId) {
        return (await this.hasPermission(userId)) && (await this.core.userExists(userId));
    }
    async getUserData(userId) {
        await this.checkPermission(userId);
        return this.core.getUserData(userId);
    }
    async getUsersData() {
        const usersData = await this.core.getUsersData();
        const permissions = await Promise.all(usersData.map(u => this.hasPermission(u.id)));
        return usersData.filter((_, i) => permissions[i]);
    }
    async derivePublicKey(privateKey) {
        return this.core.derivePublicKey(privateKey);
    }
    async constructSignature(message, privateKey) {
        return this.core.constructSignature(message, privateKey);
    }
    async addUser(privateKey, accountNonce, noSync) {
        let addUserError;
        try {
            const userData = await this.core.addUser(privateKey, accountNonce, noSync);
            await this.addPermission(userData.id);
            return userData;
        }
        catch (e) {
            // User probably already exists.
            addUserError = e;
        }
        // Get user data.
        // It will throw if the user doesn't exist, which means something went wrong while calling core.addUser().
        const publicKey = await this.core.derivePublicKey(privateKey);
        const nonce = accountNonce !== null && accountNonce !== void 0 ? accountNonce : (await this.core.getLatestAccountNonce(publicKey));
        const userId = new account_id_1.AccountId(address_1.GrumpkinAddress.fromString(publicKey), nonce).toString();
        try {
            const userData = await this.core.getUserData(userId);
            await this.addPermission(userId);
            return userData;
        }
        catch (e) {
            throw addUserError;
        }
    }
    async removeUser(userId) {
        await this.checkPermission(userId);
        await this.core.removeUser(userId);
        await this.removePermission(userId);
    }
    async getSigningKeys(userId) {
        await this.checkPermission(userId);
        return this.core.getSigningKeys(userId);
    }
    async getBalances(userId) {
        await this.checkPermission(userId);
        return this.core.getBalances(userId);
    }
    async getBalance(assetId, userId) {
        await this.checkPermission(userId);
        return this.core.getBalance(assetId, userId);
    }
    async getSpendableSum(assetId, userId, excludePendingNotes) {
        await this.checkPermission(userId);
        return this.core.getSpendableSum(assetId, userId, excludePendingNotes);
    }
    async getSpendableSums(userId, excludePendingNotes) {
        await this.checkPermission(userId);
        return this.core.getSpendableSums(userId, excludePendingNotes);
    }
    async getMaxSpendableValue(assetId, userId, numNotes, excludePendingNotes) {
        await this.checkPermission(userId);
        return this.core.getMaxSpendableValue(assetId, userId, numNotes, excludePendingNotes);
    }
    async pickNotes(userId, assetId, value, excludePendingNotes) {
        await this.checkPermission(userId);
        return this.core.pickNotes(userId, assetId, value, excludePendingNotes);
    }
    async pickNote(userId, assetId, value, excludePendingNotes) {
        await this.checkPermission(userId);
        return this.core.pickNote(userId, assetId, value, excludePendingNotes);
    }
    async getUserTxs(userId) {
        await this.checkPermission(userId);
        return this.core.getUserTxs(userId);
    }
    async getRemoteUnsettledAccountTxs() {
        return this.core.getRemoteUnsettledAccountTxs();
    }
    async getRemoteUnsettledPaymentTxs() {
        return this.core.getRemoteUnsettledPaymentTxs();
    }
    async checkPermission(userId) {
        if (!this.hasPermission(userId)) {
            throw new Error(`User not found: ${userId}`);
        }
    }
    async hasPermission(userId) {
        const key = this.getKey(userId);
        return await this.leveldb.get(key).catch(() => false);
    }
    async addPermission(userId) {
        const key = this.getKey(userId);
        await this.leveldb.put(key, true);
    }
    async removePermission(userId) {
        const key = this.getKey(userId);
        await this.leveldb.del(key);
    }
    getKey(userId) {
        return `${this.origin}:${userId}`;
    }
}
exports.MangoCoreSdk = MangoCoreSdk;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFuZ29fY29yZV9zZGsuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29yZV9zZGtfZmxhdm91cnMvbWFuZ29fY29yZV9zZGsvbWFuZ29fY29yZV9zZGsudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsK0RBQTJEO0FBQzNELHlEQUE4RDtBQUM5RCxtQ0FBc0M7QUFFdEMsNkNBQXlHO0FBRXpHLHlDQU9zQjtBQUV0Qjs7OztHQUlHO0FBQ0gsTUFBYSxZQUFhLFNBQVEscUJBQVk7SUFDNUMsWUFBb0IsSUFBdUIsRUFBVSxNQUFjLEVBQVUsT0FBZ0I7UUFDM0YsS0FBSyxFQUFFLENBQUM7UUFEVSxTQUFJLEdBQUosSUFBSSxDQUFtQjtRQUFVLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxZQUFPLEdBQVAsT0FBTyxDQUFTO1FBRzNGLGlDQUFpQztRQUNqQyxLQUFLLE1BQU0sQ0FBQyxJQUFJLG1CQUFRLEVBQUU7WUFDeEIsTUFBTSxLQUFLLEdBQUksbUJBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbkMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUMsR0FBRyxJQUFXLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQztTQUNwRTtJQUNILENBQUM7SUFFTSxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQXVCO1FBQ3ZDLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUVNLEtBQUssQ0FBQyxHQUFHO1FBQ2QsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFFTSxLQUFLLENBQUMsT0FBTztRQUNsQixNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDMUIsTUFBTSxJQUFJ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