"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MigrateAccountController = void 0;
const create_tx_ref_no_1 = require("./create_tx_ref_no");
const filter_undefined_1 = require("./filter_undefined");
class MigrateAccountController {
    constructor(userId, userSigner, newSigningPublicKey, recoveryPublicKey, newAccountPrivateKey, fee, core) {
        this.userId = userId;
        this.userSigner = userSigner;
        this.newSigningPublicKey = newSigningPublicKey;
        this.recoveryPublicKey = recoveryPublicKey;
        this.newAccountPrivateKey = newAccountPrivateKey;
        this.fee = fee;
        this.core = core;
    }
    async createProof() {
        const user = await this.core.getUserData(this.userId);
        if (!user.aliasHash) {
            throw new Error('User not registered or not fully synced.');
        }
        const requireFeePayingTx = this.fee.value;
        const txRefNo = requireFeePayingTx ? (0, create_tx_ref_no_1.createTxRefNo)() : 0;
        const signingPublicKey = this.userSigner.getPublicKey();
        const proofInput = await this.core.createAccountProofInput(this.userId, user.aliasHash, false, signingPublicKey, this.newSigningPublicKey, this.recoveryPublicKey, this.newAccountPrivateKey);
        proofInput.signature = await this.userSigner.signMessage(proofInput.signingData);
        this.proofOutput = await this.core.createAccountProof(proofInput, txRefNo);
        if (requireFeePayingTx) {
            const feeProofInput = await this.core.createPaymentProofInput(this.userId, this.fee.assetId, BigInt(0), BigInt(0), this.fee.value, BigInt(0), BigInt(0), undefined, undefined, signingPublicKey, 2);
            feeProofInput.signature = await this.userSigner.signMessage(feeProofInput.signingData);
            this.feeProofOutput = await this.core.createPaymentProof(feeProofInput, txRefNo);
        }
    }
    async send() {
        if (!this.proofOutput) {
            throw new Error('Call createProof() first.');
        }
        [this.txId] = await this.core.sendProofs((0, filter_undefined_1.filterUndefined)([this.proofOutput, this.feeProofOutput]));
        return this.txId;
    }
    async awaitSettlement(timeout) {
        if (!this.txId) {
            throw new Error(`Call ${!this.proofOutput ? 'createProof()' : 'send()'} first.`);
        }
        await this.core.awaitSettlement(this.txId, timeout);
    }
}
exports.MigrateAccountController = MigrateAccountController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWlncmF0ZV9hY2NvdW50X2NvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29udHJvbGxlcnMvbWlncmF0ZV9hY2NvdW50X2NvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBT0EseURBQW1EO0FBQ25ELHlEQUFxRDtBQUVyRCxNQUFhLHdCQUF3QjtJQUtuQyxZQUNrQixNQUFpQixFQUNoQixVQUFrQixFQUNuQixtQkFBb0MsRUFDcEMsaUJBQThDLEVBQzlDLG9CQUF3QyxFQUN4QyxHQUFlLEVBQ2QsSUFBc0I7UUFOdkIsV0FBTSxHQUFOLE1BQU0sQ0FBVztRQUNoQixlQUFVLEdBQVYsVUFBVSxDQUFRO1FBQ25CLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBaUI7UUFDcEMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUE2QjtRQUM5Qyx5QkFBb0IsR0FBcEIsb0JBQW9CLENBQW9CO1FBQ3hDLFFBQUcsR0FBSCxHQUFHLENBQVk7UUFDZCxTQUFJLEdBQUosSUFBSSxDQUFrQjtJQUN0QyxDQUFDO0lBRUcsS0FBSyxDQUFDLFdBQVc7UUFDdEIsTUFBTSxJQUFJLEdBQUcsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdEQsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDbkIsTUFBTSxJQUFJLEtBQUssQ0FBQywwQ0FBMEMsQ0FBQyxDQUFDO1NBQzdEO1FBRUQsTUFBTSxrQkFBa0IsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQztRQUMxQyxNQUFNLE9BQU8sR0FBRyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsSUFBQSxnQ0FBYSxHQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUV6RCxNQUFNLGdCQUFnQixHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxFQUFFLENBQUM7UUFFeEQsTUFBTSxVQUFVLEdBQUcsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLHVCQUF1QixDQUN4RCxJQUFJLENBQUMsTUFBTSxFQUNYLElBQUksQ0FBQyxTQUFTLEVBQ2QsS0FBSyxFQUNMLGdCQUFnQixFQUNoQixJQUFJLENBQUMsbUJBQW1CLEVBQ3hCLElBQUksQ0FBQyxpQkFBaUIsRUFDdEIsSUFBSSxDQUFDLG9CQUFvQixDQUMxQixDQUFDO1FBQ0YsVUFBVSxDQUFDLFNBQVMsR0FBRyxNQUFNLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNqRixJQUFJLENBQUMsV0FBVyxHQUFHLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxVQUFVLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFFM0UsSUFBSSxrQkFBa0IsRUFBRTtZQUN0QixNQUFNLGFBQWEsR0FBRyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsdUJBQXVCLENBQzNELElBQUksQ0FBQyxNQUFNLEVBQ1gsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQ2hCLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFDVCxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQ1QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQ2QsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUNULE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFDVCxTQUFTLEVBQ1QsU0FBUyxFQUNULGdCQUFnQixFQUNoQixDQUFDLENBQ0YsQ0FBQztZQUNGLGFBQWEsQ0FBQyxTQUFTLEdBQUcsTUFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDdkYsSUFBSSxDQUFDLGNBQWMsR0FBRyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsYUFBYSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1NBQ2xGO0lBQ0gsQ0FBQztJQUVELEtBQUssQ0FBQyxJQUFJO1FBQ1IsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDckIsTUFBTSxJQUFJLEtBQUssQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO1NBQzlDO1FBQ0QsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFBLGtDQUFlLEVBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbkcsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQ25CLENBQUM7SUFFRCxLQUFLLENBQUMsZUFBZSxDQUFDLE9BQWdCO1FBQ3BDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ2QsTUFBTSxJQUFJLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxRQUFRLFNBQVMsQ0FBQyxDQUFDO1NBQ2xGO1FBQ0QsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ3RELENBQUM7Q0FDRjtBQXZFRCw0REF1RUMifQ==