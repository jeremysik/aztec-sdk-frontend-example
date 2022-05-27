"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransferController = void 0;
const create_tx_ref_no_1 = require("./create_tx_ref_no");
const filter_undefined_1 = require("./filter_undefined");
class TransferController {
    constructor(userId, userSigner, assetValue, fee, to, core) {
        this.userId = userId;
        this.userSigner = userSigner;
        this.assetValue = assetValue;
        this.fee = fee;
        this.to = to;
        this.core = core;
        if (!assetValue.value) {
            throw new Error('Value must be greater than 0.');
        }
    }
    async createProof() {
        const { assetId, value } = this.assetValue;
        const requireFeePayingTx = this.fee.value && this.fee.assetId !== assetId;
        const privateInput = value + (!requireFeePayingTx ? this.fee.value : BigInt(0));
        const txRefNo = requireFeePayingTx ? (0, create_tx_ref_no_1.createTxRefNo)() : 0;
        const spendingPublicKey = this.userSigner.getPublicKey();
        const proofInput = await this.core.createPaymentProofInput(this.userId, assetId, BigInt(0), BigInt(0), privateInput, value, BigInt(0), this.to, undefined, spendingPublicKey, 2);
        proofInput.signature = await this.userSigner.signMessage(proofInput.signingData);
        this.proofOutput = await this.core.createPaymentProof(proofInput, txRefNo);
        if (requireFeePayingTx) {
            const feeProofInput = await this.core.createPaymentProofInput(this.userId, this.fee.assetId, BigInt(0), BigInt(0), this.fee.value, BigInt(0), BigInt(0), undefined, undefined, spendingPublicKey, 2);
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
exports.TransferController = TransferController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNmZXJfY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250cm9sbGVycy90cmFuc2Zlcl9jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQU1BLHlEQUFtRDtBQUNuRCx5REFBcUQ7QUFFckQsTUFBYSxrQkFBa0I7SUFLN0IsWUFDa0IsTUFBaUIsRUFDaEIsVUFBa0IsRUFDbkIsVUFBc0IsRUFDdEIsR0FBZSxFQUNmLEVBQWEsRUFDWixJQUFzQjtRQUx2QixXQUFNLEdBQU4sTUFBTSxDQUFXO1FBQ2hCLGVBQVUsR0FBVixVQUFVLENBQVE7UUFDbkIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0QixRQUFHLEdBQUgsR0FBRyxDQUFZO1FBQ2YsT0FBRSxHQUFGLEVBQUUsQ0FBVztRQUNaLFNBQUksR0FBSixJQUFJLENBQWtCO1FBRXZDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFO1lBQ3JCLE1BQU0sSUFBSSxLQUFLLENBQUMsK0JBQStCLENBQUMsQ0FBQztTQUNsRDtJQUNILENBQUM7SUFFTSxLQUFLLENBQUMsV0FBVztRQUN0QixNQUFNLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7UUFDM0MsTUFBTSxrQkFBa0IsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sS0FBSyxPQUFPLENBQUM7UUFDMUUsTUFBTSxZQUFZLEdBQUcsS0FBSyxHQUFHLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2hGLE1BQU0sT0FBTyxHQUFHLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxJQUFBLGdDQUFhLEdBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxD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