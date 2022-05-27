"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterController = void 0;
const account_id_1 = require("@aztec/barretenberg/account_id");
const core_tx_1 = require("../core_tx");
const create_tx_ref_no_1 = require("./create_tx_ref_no");
const deposit_controller_1 = require("./deposit_controller");
class RegisterController {
    constructor(userId, userSigner, alias, signingPublicKey, recoveryPublicKey, deposit, fee, depositor, core, blockchain, provider) {
        this.userId = userId;
        this.userSigner = userSigner;
        this.alias = alias;
        this.signingPublicKey = signingPublicKey;
        this.recoveryPublicKey = recoveryPublicKey;
        this.deposit = deposit;
        this.fee = fee;
        this.depositor = depositor;
        this.core = core;
        if (userId.accountNonce !== 0) {
            throw new Error('Registration proof can only be created by account with nonce 0.');
        }
        if (deposit.value && fee.value && deposit.assetId !== fee.assetId) {
            throw new Error('Inconsistent asset ids.');
        }
        this.newUserId = new account_id_1.AccountId(userId.publicKey, 1);
        if (deposit.value || fee.value) {
            this.depositController = new deposit_controller_1.DepositController(userId, this.userSigner, deposit, fee, depositor, this.newUserId, core, blockchain, provider);
        }
    }
    async getPendingFunds() {
        return this.depositController.getPendingFunds();
    }
    async getRequiredFunds() {
        return this.depositController.getRequiredFunds();
    }
    async getPublicAllowance() {
        return this.depositController.getPublicAllowance();
    }
    async approve() {
        return this.depositController.approve();
    }
    async depositFundsToContract() {
        return this.depositController.depositFundsToContract();
    }
    async depositFundsToContractWithPermit(deadline) {
        return this.depositController.depositFundsToContractWithPermit(deadline);
    }
    async depositFundsToContractWithProofApproval() {
        return this.depositController.depositFundsToContractWithProofApproval();
    }
    async depositFundsToContractWithPermitAndProofApproval(deadline) {
        return this.depositController.depositFundsToContractWithPermitAndProofApproval(deadline);
    }
    async awaitDepositFundsToContract() {
        return this.depositController.awaitDepositFundsToContract();
    }
    async createProof() {
        const aliasHash = await this.core.computeAliasHash(this.alias);
        const txRefNo = this.depositController ? (0, create_tx_ref_no_1.createTxRefNo)() : 0;
        const signingPublicKey = this.userSigner.getPublicKey();
        const proofInput = await this.core.createAccountProofInput(this.userId, aliasHash, true, signingPublicKey, this.signingPublicKey, this.recoveryPublicKey, undefined);
        proofInput.signature = await this.userSigner.signMessage(proofInput.signingData);
        this.proofOutput = await this.core.createAccountProof(proofInput, txRefNo);
        if (this.depositController) {
            await this.depositController.createProof(txRefNo);
        }
    }
    getTxId() {
        var _a;
        return (_a = this.depositController) === null || _a === void 0 ? void 0 : _a.getTxId();
    }
    getSigningData() {
        var _a;
        return (_a = this.depositController) === null || _a === void 0 ? void 0 : _a.getSigningData();
    }
    async isProofApproved() {
        return this.depositController.isProofApproved();
    }
    async approveProof() {
        return this.depositController.approveProof();
    }
    async sign() {
        return this.depositController.sign();
    }
    isSignatureValid() {
        return this.depositController.isSignatureValid();
    }
    async send() {
        if (!this.proofOutput) {
            throw new Error('Call createProof() first.');
        }
        if (!this.depositController) {
            [this.txId] = await this.core.sendProofs([this.proofOutput]);
        }
        else {
            const [{ tx, ...proofOutputData }] = this.depositController.getProofs();
            const recipientTx = (0, core_tx_1.createCorePaymentTxForRecipient)(tx, this.newUserId);
            const feeProofOutput = { tx: recipientTx, ...proofOutputData };
            [this.txId] = await this.core.sendProofs([this.proofOutput, feeProofOutput]);
        }
        return this.txId;
    }
    async awaitSettlement(timeout) {
        if (!this.txId) {
            throw new Error(`Call ${!this.proofOutput ? 'createProof()' : 'send()'} first.`);
        }
        await this.core.awaitSettlement(this.txId, timeout);
    }
}
exports.RegisterController = RegisterController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaXN0ZXJfY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250cm9sbGVycy9yZWdpc3Rlcl9jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLCtEQUEyRDtBQU8zRCx3Q0FBNEU7QUFHNUUseURBQW1EO0FBQ25ELDZEQUF5RDtBQUV6RCxNQUFhLGtCQUFrQjtJQU03QixZQUNrQixNQUFpQixFQUNoQixVQUFrQixFQUNuQixLQUFhLEVBQ2IsZ0JBQWlDLEVBQ2pDLGlCQUE4QyxFQUM5QyxPQUFtQixFQUNuQixHQUFlLEVBQ2YsU0FBcUIsRUFDcEIsSUFBc0IsRUFDdkMsVUFBb0MsRUFDcEMsUUFBMEI7UUFWVixXQUFNLEdBQU4sTUFBTSxDQUFXO1FBQ2hCLGVBQVUsR0FBVixVQUFVLENBQVE7UUFDbkIsVUFBSyxHQUFMLEtBQUssQ0FBUTtRQUNiLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBaUI7UUFDakMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUE2QjtRQUM5QyxZQUFPLEdBQVAsT0FBTyxDQUFZO1FBQ25CLFFBQUcsR0FBSCxHQUFHLENBQVk7UUFDZixjQUFTLEdBQVQsU0FBUyxDQUFZO1FBQ3BCLFNBQUksR0FBSixJQUFJLENBQWtCO1FBSXZDLElBQUksTUFBTSxDQUFDLFlBQVksS0FBSyxDQUFDLEVBQUU7WUFDN0IsTUFBTSxJQUFJLEtBQUssQ0FBQyxpRUFBaUUsQ0FBQyxDQUFDO1NBQ3BGO1FBRUQsSUFBSSxPQUFPLENBQUMsS0FBSyxJQUFJLEdBQUcsQ0FBQyxLQUFLLElBQUksT0FBTyxDQUFDLE9BQU8sS0FBSyxHQUFHLENBQUMsT0FBTyxFQUFFO1lBQ2pFLE1BQU0sSUFBSSxLQUFLLENBQUMseUJBQXlCLENBQUMsQ0FBQztTQUM1QztRQUVELElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxzQkFBUyxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUM7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