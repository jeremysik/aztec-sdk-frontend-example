"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddSigningKeyController = void 0;
const create_tx_ref_no_1 = require("./create_tx_ref_no");
const filter_undefined_1 = require("./filter_undefined");
class AddSigningKeyController {
    constructor(userId, userSigner, signingPublicKey1, signingPublicKey2, fee, core) {
        this.userId = userId;
        this.userSigner = userSigner;
        this.signingPublicKey1 = signingPublicKey1;
        this.signingPublicKey2 = signingPublicKey2;
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
        const proofInput = await this.core.createAccountProofInput(this.userId, user.aliasHash, false, signingPublicKey, this.signingPublicKey1, this.signingPublicKey2, undefined);
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
exports.AddSigningKeyController = AddSigningKeyController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkX3NpZ25pbmdfa2V5X2NvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29udHJvbGxlcnMvYWRkX3NpZ25pbmdfa2V5X2NvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBT0EseURBQW1EO0FBQ25ELHlEQUFxRDtBQUVyRCxNQUFhLHVCQUF1QjtJQUtsQyxZQUNrQixNQUFpQixFQUNoQixVQUFrQixFQUNuQixpQkFBa0MsRUFDbEMsaUJBQThDLEVBQzlDLEdBQWUsRUFDZCxJQUFzQjtRQUx2QixXQUFNLEdBQU4sTUFBTSxDQUFXO1FBQ2hCLGVBQVUsR0FBVixVQUFVLENBQVE7UUFDbkIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFpQjtRQUNsQyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQTZCO1FBQzlDLFFBQUcsR0FBSCxHQUFHLENBQVk7UUFDZCxTQUFJLEdBQUosSUFBSSxDQUFrQjtJQUN0QyxDQUFDO0lBRUcsS0FBSyxDQUFDLFdBQVc7UUFDdEIsTUFBTSxJQUFJLEdBQUcsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdEQsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDbkIsTUFBTSxJQUFJLEtBQUssQ0FBQywwQ0FBMEMsQ0FBQyxDQUFDO1NBQzdEO1FBRUQsTUFBTSxrQkFBa0IsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQztRQUMxQyxNQUFNLE9BQU8sR0FBRyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsSUFBQSxnQ0FBYSxHQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUV6RCxNQUFNLGdCQUFnQixHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxFQUFFLENBQUM7UUFFeEQsTUFBTSxVQUFVLEdBQUcsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLHVCQUF1QixDQUN4RCxJQUFJLENBQUMsTUFBTSxFQUNYLElBQUksQ0FBQyxTQUFTLEVBQ2QsS0FBSyxFQUNMLGdCQUFnQixFQUNoQixJQUFJLENBQUMsaUJBQWlCLEVBQ3RCLElBQUksQ0FBQyxpQkFBaUIsRUFDdEIsU0FBUyxDQUNWLENBQUM7UUFDRixVQUFVLENBQUMsU0FBUyxHQUFHLE1BQU0sSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ2pGLElBQUksQ0FBQyxXQUFXLEdBQUcsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFVBQVUsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUUzRSxJQUFJLGtCQUFrQixFQUFFO1lBQ3RCLE1BQU0sYUFBYSxHQUFHLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyx1QkFBdUIsQ0FDM0QsSUFBSSxDQUFDLE1BQU0sRUFDWCxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFDaEIsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUNULE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFDVCxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssRUFDZCxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQ1QsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUNULFNBQVMsRUFDVCxTQUFTLEVBQ1QsZ0JBQWdCLEVBQ2hCLENBQUMsQ0FDRixDQUFDO1lBQ0YsYUFBYSxDQUFDLFNBQVMsR0FBRyxNQUFNLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUN2RixJQUFJLENBQUMsY0FBYyxHQUFHLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxhQUFhLEVBQUUsT0FBTyxDQUFDLENBQUM7U0FDbEY7SUFDSCxDQUFDO0lBRUQsS0FBSyxDQUFDLElBQUk7UUFDUixJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUNyQixNQUFNLElBQUksS0FBSyxDQUFDLDJCQUEyQixDQUFDLENBQUM7U0FDOUM7UUFDRCxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUEsa0NBQWUsRUFBQyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNuRyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDbkIsQ0FBQztJQUVELEtBQUssQ0FBQyxlQUFlLENBQUMsT0FBZ0I7UUFDcEMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDZCxNQUFNLElBQUksS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLFFBQVEsU0FBUyxDQUFDLENBQUM7U0FDbEY7UUFDRCxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDdEQsQ0FBQztDQUNGO0FBdEVELDBEQXNFQyJ9