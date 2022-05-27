"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AztecSdk = void 0;
const account_id_1 = require("@aztec/barretenberg/account_id");
const asset_1 = require("@aztec/barretenberg/asset");
const blockchain_1 = require("@aztec/barretenberg/blockchain");
const client_proofs_1 = require("@aztec/barretenberg/client_proofs");
const crypto_1 = require("@aztec/barretenberg/crypto");
const rollup_provider_1 = require("@aztec/barretenberg/rollup_provider");
const blockchain_2 = require("@aztec/blockchain");
const events_1 = require("events");
const controllers_1 = require("../controllers");
const core_sdk_1 = require("../core_sdk");
const signer_1 = require("../signer");
const user_1 = require("../user");
const aztec_sdk_user_1 = require("./aztec_sdk_user");
const group_user_txs_1 = require("./group_user_txs");
class AztecSdk extends events_1.EventEmitter {
    constructor(core, blockchain, provider) {
        super();
        this.core = core;
        this.blockchain = blockchain;
        this.provider = provider;
        // Forward all core sdk events.
        for (const e in core_sdk_1.SdkEvent) {
            const event = core_sdk_1.SdkEvent[e];
            this.core.on(event, (...args) => this.emit(event, ...args));
        }
    }
    async run() {
        await this.core.run();
    }
    async destroy() {
        await this.core.destroy();
        this.removeAllListeners();
    }
    async awaitSynchronised() {
        return this.core.awaitSynchronised();
    }
    async isUserSynching(userId) {
        return this.core.isUserSynching(userId);
    }
    async awaitUserSynchronised(userId) {
        return this.core.awaitUserSynchronised(userId);
    }
    async awaitSettlement(txId, timeout) {
        return this.core.awaitSettlement(txId, timeout);
    }
    async awaitDefiDepositCompletion(txId, timeout) {
        return this.core.awaitDefiDepositCompletion(txId, timeout);
    }
    async awaitDefiFinalisation(txId, timeout) {
        return this.core.awaitDefiFinalisation(txId, timeout);
    }
    async awaitDefiSettlement(txId, timeout) {
        return this.core.awaitDefiSettlement(txId, timeout);
    }
    getLocalStatus() {
        return this.core.getLocalStatus();
    }
    async getRemoteStatus() {
        return this.core.getRemoteStatus();
    }
    async getTxFees(assetId) {
        return this.core.getTxFees(assetId);
    }
    async getLatestAccountNonce(publicKey) {
        return this.core.getLatestAccountNonce(publicKey);
    }
    async getRemoteLatestAccountNonce(publicKey) {
        return this.core.getRemoteLatestAccountNonce(publicKey);
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
    async userExists(userId) {
        return this.core.userExists(userId);
    }
    async addUser(privateKey, accountNonce, noSync = false) {
        const userData = await this.core.addUser(privateKey, accountNonce, noSync);
        return new aztec_sdk_user_1.AztecSdkUser(userData.id, this);
    }
    async removeUser(userId) {
        return this.core.removeUser(userId);
    }
    /**
     * Returns a AztecSdkUser for a locally resolved user.
     */
    async getUser(userId) {
        const userData = await this.getUserData(userId); // Check that the user's been added to the sdk.
        return new aztec_sdk_user_1.AztecSdkUser(userData.id, this);
    }
    async getUserData(userId) {
        return this.core.getUserData(userId);
    }
    getUsersData() {
        return this.core.getUsersData();
    }
    async createSchnorrSigner(privateKey) {
        const publicKey = await this.core.derivePublicKey(privateKey);
        return new signer_1.SchnorrSigner(this.core, publicKey, privateKey);
    }
    derivePublicKey(privateKey) {
        return this.core.derivePublicKey(privateKey);
    }
    getAssetIdByAddress(address, gasLimit) {
        return this.blockchain.getAssetIdByAddress(address, gasLimit);
    }
    getAssetIdBySymbol(symbol, gasLimit) {
        return this.blockchain.getAssetIdBySymbol(symbol, gasLimit);
    }
    fromBaseUnits({ assetId, value }, symbol = false, precision) {
        if ((0, asset_1.isVirtualAsset)(assetId)) {
            const nonce = assetId - 2 ** 29;
            const v = value.toLocaleString('en');
            return symbol ? `${v} (nonce ${nonce})` : v;
        }
        const v = this.blockchain.getAsset(assetId).fromBaseUnits(value, precision);
        return symbol ? `${v} ${this.getAssetInfo(assetId).symbol}` : v;
    }
    toBaseUnits(assetId, value) {
        if ((0, asset_1.isVirtualAsset)(assetId)) {
            return { assetId, value: BigInt(value.replaceAll(',', '')) };
        }
        return { assetId, value: this.blockchain.getAsset(assetId).toBaseUnits(value) };
    }
    getAssetInfo(assetId) {
        return this.blockchain.getAsset(assetId).getStaticInfo();
    }
    async isFeePayingAsset(assetId) {
        if ((0, asset_1.isVirtualAsset)(assetId)) {
            return false;
        }
        return (await this.core.getLocalStatus()).feePayingAssetIds.includes(assetId);
    }
    isVirtualAsset(assetId) {
        return (0, asset_1.isVirtualAsset)(assetId);
    }
    async mint(assetId, value, account, provider) {
        return this.blockchain.getAsset(assetId).mint(value, account, { provider });
    }
    async setSupportedAsset(assetAddress, assetGasLimit, options) {
        return this.blockchain.setSupportedAsset(assetAddress, assetGasLimit, options);
    }
    getBridgeAddressId(address, gasLimit) {
        return this.blockchain.getBridgeAddressId(address, gasLimit);
    }
    async setSupportedBridge(bridgeAddress, bridgeGasLimit, options) {
        return this.blockchain.setSupportedBridge(bridgeAddress, bridgeGasLimit, options);
    }
    async processAsyncDefiInteraction(interactionNonce, options) {
        return this.blockchain.processAsyncDefiInteraction(interactionNonce, options);
    }
    async getTransactionFees(assetId, txType) {
        const fees = await this.core.getTxFees(assetId);
        const txSettlementFees = fees[txType];
        if (await this.isFeePayingAsset(assetId)) {
            return txSettlementFees;
        }
        const [feeTxTransferFee] = fees[blockchain_1.TxType.TRANSFER];
        return txSettlementFees.map(({ value, ...rest }) => ({ value: value + feeTxTransferFee.value, ...rest }));
    }
    async getDepositFees(assetId) {
        return this.getTransactionFees(assetId, blockchain_1.TxType.DEPOSIT);
    }
    createDepositController(userId, userSigner, value, fee, from, to = userId, provider = this.provider) {
        return new controllers_1.DepositController(userId, userSigner, value, fee, from, to, this.core, this.blockchain, provider);
    }
    async getWithdrawFees(assetId, recipient) {
        const txType = recipient && (await this.isContract(recipient)) ? blockchain_1.TxType.WITHDRAW_TO_CONTRACT : blockchain_1.TxType.WITHDRAW_TO_WALLET;
        return this.getTransactionFees(assetId, txType);
    }
    createWithdrawController(userId, userSigner, value, fee, to) {
        return new controllers_1.WithdrawController(userId, userSigner, value, fee, to, this.core);
    }
    async getTransferFees(assetId) {
        return this.getTransactionFees(assetId, blockchain_1.TxType.TRANSFER);
    }
    createTransferController(userId, userSigner, value, fee, to) {
        return new controllers_1.TransferController(userId, userSigner, value, fee, to, this.core);
    }
    async getDefiFees(bridgeId, userId, depositValue) {
        if (depositValue && depositValue.assetId !== bridgeId.inputAssetIdA) {
            throw new Error('Inconsistent asset ids.');
        }
        const defiFees = await this.core.getDefiFees(bridgeId);
        const { assetId: feeAssetId, value: minDefiFee } = defiFees[0];
        const requireFeePayingTx = feeAssetId !== bridgeId.inputAssetIdA;
        const requireJoinSplitTx = await (async () => {
            var _a, _b;
            if (!userId || !depositValue) {
                return true;
            }
            const { value } = depositValue;
            const privateInput = value + (!requireFeePayingTx ? minDefiFee : BigInt(0));
            if (bridgeId.inputAssetIdB === undefined) {
                const notes = await this.core.pickNotes(userId, bridgeId.inputAssetIdA, privateInput);
                return notes.reduce((sum, n) => sum + n.value, BigInt(0)) !== privateInput;
            }
            return (((_a = (await this.core.pickNote(userId, bridgeId.inputAssetIdA, privateInput))) === null || _a === void 0 ? void 0 : _a.value) !== privateInput ||
                ((_b = (await this.core.pickNote(userId, bridgeId.inputAssetIdB, value))) === null || _b === void 0 ? void 0 : _b.value) !== value);
        })();
        const [minTransferFee] = (await this.core.getTxFees(feeAssetId))[blockchain_1.TxType.TRANSFER];
        // Always include the fee for an extra join split tx if the user is willing to pay higher fee.
        const additionalFees = [
            minTransferFee.value * BigInt(+requireFeePayingTx + +requireJoinSplitTx),
            minTransferFee.value * BigInt(+requireFeePayingTx + 1),
            minTransferFee.value * BigInt(+requireFeePayingTx + 1),
        ];
        return defiFees.map((defiFee, i) => ({
            ...defiFee,
            value: defiFee.value + additionalFees[i],
        }));
    }
    createDefiController(userId, userSigner, bridgeId, value, fee) {
        return new controllers_1.DefiController(userId, userSigner, bridgeId, value, fee, this.core);
    }
    async generateAccountRecoveryData(alias, publicKey, trustedThirdPartyPublicKeys, accountNonce) {
        const nonce = accountNonce !== undefined ? accountNonce : (await this.core.getLatestAccountNonce(publicKey)) + 1;
        const accountId = new account_id_1.AccountId(publicKey, nonce);
        const socialRecoverySigner = await this.createSchnorrSigner((0, crypto_1.randomBytes)(32));
        const recoveryPublicKey = socialRecoverySigner.getPublicKey();
        return Promise.all(trustedThirdPartyPublicKeys.map(async (trustedThirdPartyPublicKey) => {
            const signingData = await this.core.createAccountProofSigningData(recoveryPublicKey, alias, nonce, false, publicKey, undefined, trustedThirdPartyPublicKey);
            const signature = await socialRecoverySigner.signMessage(signingData);
            const recoveryData = new user_1.RecoveryData(accountId, signature);
            return new user_1.RecoveryPayload(trustedThirdPartyPublicKey, recoveryPublicKey, recoveryData);
        }));
    }
    async getRegisterFees({ assetId, value: depositValue }) {
        const txFees = await this.core.getTxFees(assetId);
        const [depositFee] = txFees[blockchain_1.TxType.DEPOSIT];
        return txFees[blockchain_1.TxType.ACCOUNT].map(({ value, ...rest }) => ({
            ...rest,
            value: value || depositValue ? value + depositFee.value : value,
        }));
    }
    createRegisterController(userId, userSigner, alias, signingPublicKey, recoveryPublicKey, deposit, fee, depositor, provider = this.provider) {
        return new controllers_1.RegisterController(userId, userSigner, alias, signingPublicKey, recoveryPublicKey, deposit, fee, depositor, this.core, this.blockchain, provider);
    }
    async getRecoverAccountFees(assetId) {
        return this.getAccountFee(assetId);
    }
    createRecoverAccountController(recoveryPayload, fee) {
        return new controllers_1.RecoverAccountController(recoveryPayload, fee, this.core);
    }
    async getAddSigningKeyFees(assetId) {
        return this.getAccountFee(assetId);
    }
    createAddSigningKeyController(userId, userSigner, signingPublicKey1, signingPublicKey2, fee) {
        return new controllers_1.AddSigningKeyController(userId, userSigner, signingPublicKey1, signingPublicKey2, fee, this.core);
    }
    async getMigrateAccountFees(assetId) {
        return this.getAccountFee(assetId);
    }
    createMigrateAccountController(userId, userSigner, newSigningPublicKey, recoveryPublicKey, newAccountPrivateKey, fee) {
        return new controllers_1.MigrateAccountController(userId, userSigner, newSigningPublicKey, recoveryPublicKey, newAccountPrivateKey, fee, this.core);
    }
    async depositFundsToContract({ assetId, value }, from, provider = this.provider) {
        return this.blockchain.depositPendingFunds(assetId, value, undefined, {
            signingAddress: from,
            provider,
        });
    }
    async getUserPendingDeposit(assetId, account) {
        return this.blockchain.getUserPendingDeposit(assetId, account);
    }
    async getUserPendingFunds(assetId, account) {
        const deposited = await this.getUserPendingDeposit(assetId, account);
        const txs = await this.getRemoteUnsettledPaymentTxs();
        const unsettledDeposit = txs
            .filter(tx => tx.proofData.proofData.proofId === client_proofs_1.ProofId.DEPOSIT &&
            tx.proofData.publicAssetId === assetId &&
            tx.proofData.publicOwner.equals(account))
            .reduce((sum, tx) => sum + BigInt(tx.proofData.publicValue), BigInt(0));
        return deposited - unsettledDeposit;
    }
    async isContract(address) {
        return this.blockchain.isContract(address);
    }
    validateSignature(publicOwner, signature, signingData) {
        return (0, blockchain_2.validateSignature)(publicOwner, signature, signingData);
    }
    async getTransactionReceipt(txHash, interval = 1, timeout) {
        return this.blockchain.getTransactionReceipt(txHash, interval, timeout);
    }
    async flushRollup(userId, userSigner) {
        const fee = (await this.getTransferFees(0))[rollup_provider_1.TxSettlementTime.INSTANT];
        const feeProofInput = await this.core.createPaymentProofInput(userId, fee.assetId, BigInt(0), BigInt(0), fee.value, BigInt(0), BigInt(0), undefined, undefined, userSigner.getPublicKey(), 2);
        feeProofInput.signature = await userSigner.signMessage(feeProofInput.signingData);
        const feeProofOutput = await this.core.createPaymentProof(feeProofInput, 0);
        const [txId] = await this.core.sendProofs([feeProofOutput]);
        await this.core.awaitSettlement(txId);
    }
    async getSigningKeys(userId) {
        return this.core.getSigningKeys(userId);
    }
    // Deprecated.
    async getPublicBalance(assetId, ethAddress) {
        return this.blockchain.getAsset(assetId).balanceOf(ethAddress);
    }
    // Rename to getPublicBalance().
    async getPublicBalanceAv(assetId, ethAddress) {
        return { assetId, value: await this.blockchain.getAsset(assetId).balanceOf(ethAddress) };
    }
    async getBalances(userId) {
        return this.core.getBalances(userId);
    }
    // Deprecated.
    async getBalance(assetId, userId) {
        return this.core.getBalance(assetId, userId);
    }
    // Rename to getBalance().
    async getBalanceAv(assetId, userId) {
        return { assetId, value: await this.core.getBalance(assetId, userId) };
    }
    async getFormattedBalance(assetId, userId, symbol = true, precision) {
        return this.fromBaseUnits(await this.getBalanceAv(assetId, userId), symbol, precision);
    }
    async getSpendableSum(assetId, userId, excludePendingNotes) {
        return this.core.getSpendableSum(assetId, userId, excludePendingNotes);
    }
    async getSpendableSums(userId, excludePendingNotes) {
        return this.core.getSpendableSums(userId, excludePendingNotes);
    }
    async getMaxSpendableValue(assetId, userId, numNotes, excludePendingNotes) {
        if (numNotes !== undefined && (numNotes > 2 || numNotes < 1)) {
            throw new Error(`numNotes can only be 1 or 2. Got ${numNotes}.`);
        }
        return this.core.getMaxSpendableValue(assetId, userId, numNotes, excludePendingNotes);
    }
    async getUserTxs(userId) {
        const txs = await this.core.getUserTxs(userId);
        return (0, group_user_txs_1.groupUserTxs)(txs);
    }
    async getPaymentTxs(userId) {
        return (await this.getUserTxs(userId)).filter(tx => [client_proofs_1.ProofId.DEPOSIT, client_proofs_1.ProofId.WITHDRAW, client_proofs_1.ProofId.SEND].includes(tx.proofId));
    }
    async getAccountTxs(userId) {
        return (await this.getUserTxs(userId)).filter(tx => tx.proofId === client_proofs_1.ProofId.ACCOUNT);
    }
    async getDefiTxs(userId) {
        return (await this.getUserTxs(userId)).filter(tx => tx.proofId === client_proofs_1.ProofId.DEFI_DEPOSIT);
    }
    async getRemoteUnsettledAccountTxs() {
        return this.core.getRemoteUnsettledAccountTxs();
    }
    async getRemoteUnsettledPaymentTxs() {
        return this.core.getRemoteUnsettledPaymentTxs();
    }
    async getAccountFee(assetId) {
        const txFees = await this.core.getTxFees(assetId);
        const [minFee, ...fees] = txFees[blockchain_1.TxType.ACCOUNT];
        const [transferFee] = txFees[blockchain_1.TxType.TRANSFER];
        return [{ ...minFee, value: minFee.value ? minFee.value + transferFee.value : minFee.value }, ...fees];
    }
}
exports.AztecSdk = AztecSdk;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXp0ZWNfc2RrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2F6dGVjX3Nkay9henRlY19zZGsudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsK0RBQTJEO0FBRTNELHFEQUF1RTtBQUN2RSwrREFBMEc7QUFFMUcscUVBQTREO0FBQzVELHVEQUF5RDtBQUN6RCx5RUFBdUU7QUFFdkUsa0RBQWdGO0FBQ2hGLG1DQUFzQztBQUN0QyxnREFTd0I7QUFDeEIsMENBQXlEO0FBQ3pELHNDQUFrRDtBQUNsRCxrQ0FBd0Q7QUFFeEQscURBQWdEO0FBQ2hELHFEQUFnRDtBQVNoRCxNQUFhLFFBQVMsU0FBUSxxQkFBWTtJQUN4QyxZQUNVLElBQXNCLEVBQ3RCLFVBQW9DLEVBQ3BDLFFBQTBCO1FBRWxDLEtBQUssRUFBRSxDQUFDO1FBSkEsU0FBSSxHQUFKLElBQUksQ0FBa0I7UUFDdEIsZUFBVSxHQUFWLFVBQVUsQ0FBMEI7UUFDcEMsYUFBUSxHQUFSLFFBQVEsQ0FBa0I7UUFJbEMsK0JBQStCO1FBQy9CLEtBQUssTUFBTSxDQUFDLElBQUksbUJBQVEsRUFBRTtZQUN4QixNQUFNLEtBQUssR0FBSSxtQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNuQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxHQUFHLElBQVcsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDO1NBQ3BFO0lBQ0gsQ0FBQztJQUVNLEtBQUssQ0FBQyxHQUFHO1FBQ2QsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFFTSxLQUFLLENBQUMsT0FBTztRQUNsQixNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDMUIsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7SUFDNUIs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