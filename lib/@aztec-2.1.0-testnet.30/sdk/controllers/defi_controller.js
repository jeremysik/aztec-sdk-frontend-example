"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefiController = void 0;
const bridge_id_1 = require("@aztec/barretenberg/bridge_id");
const create_tx_ref_no_1 = require("./create_tx_ref_no");
const filter_undefined_1 = require("./filter_undefined");
class DefiController {
    constructor(userId, userSigner, bridgeId, depositValue, fee, core) {
        this.userId = userId;
        this.userSigner = userSigner;
        this.bridgeId = bridgeId;
        this.depositValue = depositValue;
        this.fee = fee;
        this.core = core;
        if (!depositValue.value) {
            throw new Error('Deposit value must be greater than 0.');
        }
        if (depositValue.assetId !== bridgeId.inputAssetIdA) {
            throw new Error(`Incorrect deposit asset. Expect ${bridgeId.inputAssetIdA}. Got ${depositValue.assetId}.`);
        }
        (0, bridge_id_1.validateBridgeId)(bridgeId);
    }
    async createProof() {
        const { assetId, value } = this.depositValue;
        const hasTwoAssets = this.bridgeId.numInputAssets === 2;
        const requireFeePayingTx = !!this.fee.value && this.fee.assetId !== assetId;
        const privateInput = value + (!requireFeePayingTx ? this.fee.value : BigInt(0));
        const note1 = hasTwoAssets ? await this.core.pickNote(this.userId, assetId, privateInput) : undefined;
        let notes = note1 ? [note1] : await this.core.pickNotes(this.userId, assetId, privateInput);
        if (!notes.length) {
            throw new Error(`Failed to find no more than 2 notes of asset ${assetId} that sum to ${privateInput}.`);
        }
        const totalInputNoteValue = notes.reduce((sum, note) => sum + note.value, BigInt(0));
        const changeValue = totalInputNoteValue - privateInput;
        let requireJoinSplitTx = !!changeValue || (hasTwoAssets && notes.length > 1);
        let joinSplitTargetNote = requireJoinSplitTx ? 1 : 0;
        if (hasTwoAssets) {
            const secondAssetId = this.bridgeId.inputAssetIdB;
            const excludePendingNotes = requireJoinSplitTx || notes.some(n => n.pending);
            const note2 = await this.core.pickNote(this.userId, secondAssetId, value, excludePendingNotes);
            const notes2 = note2
                ? [note2]
                : await this.core.pickNotes(this.userId, secondAssetId, value, excludePendingNotes);
            if (!notes2.length) {
                throw new Error(`Failed to find no more than 2 notes of asset ${secondAssetId} that sum to ${value}.`);
            }
            const totalInputNoteValue2 = notes2.reduce((sum, note) => sum + note.value, BigInt(0));
            const changeValue2 = totalInputNoteValue2 - value;
            if (changeValue2 || notes2.length > 1) {
                if (requireJoinSplitTx) {
                    throw new Error(`Cannot find a note with the exact value for asset ${secondAssetId}. Require ${value}.`);
                }
                requireJoinSplitTx = true;
                joinSplitTargetNote = 2;
            }
            notes = [...notes, ...notes2];
        }
        const spendingPublicKey = this.userSigner.getPublicKey();
        const txRefNo = requireFeePayingTx || requireJoinSplitTx ? (0, create_tx_ref_no_1.createTxRefNo)() : 0;
        // Create a defi deposit tx with 0 change value.
        if (!requireJoinSplitTx) {
            const proofInput = await this.core.createDefiProofInput(this.userId, this.bridgeId, value, notes, spendingPublicKey);
            proofInput.signature = await this.userSigner.signMessage(proofInput.signingData);
            this.proofOutput = await this.core.createDefiProof(proofInput, txRefNo);
        }
        else {
            // Create a join split tx to generate an output note with the exact value for the defi deposit plus fee.
            // When depositing two different input assets, this tx should pay for the fee if it's fee-paying asset.
            {
                const changeNoteAssetId = joinSplitTargetNote === 2 ? this.bridgeId.inputAssetIdB : assetId;
                const noteValue = joinSplitTargetNote === 2 ? value : privateInput;
                const proofInput = await this.core.createPaymentProofInput(this.userId, changeNoteAssetId, BigInt(0), BigInt(0), noteValue, // private input
                noteValue, BigInt(0), this.userId, undefined, spendingPublicKey, 3);
                proofInput.signature = await this.userSigner.signMessage(proofInput.signingData);
                this.jsProofOutput = await this.core.createPaymentProof(proofInput, txRefNo);
            }
            // Use the first output note from the above j/s tx as the input note.
            {
                const inputNotes = [this.jsProofOutput.outputNotes[0]];
                if (hasTwoAssets) {
                    if (joinSplitTargetNote === 2) {
                        inputNotes.unshift(notes[0]);
                    }
                    else {
                        inputNotes.push(notes[notes.length - 1]);
                    }
                }
                const proofInput = await this.core.createDefiProofInput(this.userId, this.bridgeId, value, inputNotes, spendingPublicKey);
                proofInput.signature = await this.userSigner.signMessage(proofInput.signingData);
                this.proofOutput = await this.core.createDefiProof(proofInput, txRefNo);
            }
        }
        if (requireFeePayingTx) {
            const proofInput = await this.core.createPaymentProofInput(this.userId, this.fee.assetId, BigInt(0), BigInt(0), this.fee.value, BigInt(0), BigInt(0), undefined, undefined, spendingPublicKey, 2);
            proofInput.signature = await this.userSigner.signMessage(proofInput.signingData);
            this.feeProofOutput = await this.core.createPaymentProof(proofInput, txRefNo);
        }
    }
    async send() {
        if (!this.proofOutput) {
            throw new Error('Call createProof() first.');
        }
        const txIds = await this.core.sendProofs((0, filter_undefined_1.filterUndefined)([this.jsProofOutput, this.proofOutput, this.feeProofOutput]));
        this.txId = txIds[this.jsProofOutput ? 1 : 0];
        return this.txId;
    }
    async awaitDefiDepositCompletion(timeout) {
        if (!this.txId) {
            throw new Error(`Call ${!this.proofOutput ? 'createProof()' : 'send()'} first.`);
        }
        await this.core.awaitDefiDepositCompletion(this.txId, timeout);
    }
    async awaitDefiFinalisation(timeout) {
        if (!this.txId) {
            throw new Error(`Call ${!this.proofOutput ? 'createProof()' : 'send()'} first.`);
        }
        await this.core.awaitDefiFinalisation(this.txId, timeout);
    }
    async awaitSettlement(timeout) {
        if (!this.txId) {
            throw new Error(`Call ${!this.proofOutput ? 'createProof()' : 'send()'} first.`);
        }
        await this.core.awaitDefiSettlement(this.txId, timeout);
    }
    async getInteractionNonce() {
        if (!this.txId) {
            throw new Error(`Call ${!this.proofOutput ? 'createProof()' : 'send()'} first.`);
        }
        return this.core.getDefiInteractionNonce(this.txId);
    }
}
exports.DefiController = DefiController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmaV9jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbnRyb2xsZXJzL2RlZmlfY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFQSw2REFBMkU7QUFLM0UseURBQW1EO0FBQ25ELHlEQUFxRDtBQUVyRCxNQUFhLGNBQWM7SUFNekIsWUFDa0IsTUFBaUIsRUFDaEIsVUFBa0IsRUFDbkIsUUFBa0IsRUFDbEIsWUFBd0IsRUFDeEIsR0FBZSxFQUNkLElBQXNCO1FBTHZCLFdBQU0sR0FBTixNQUFNLENBQVc7UUFDaEIsZUFBVSxHQUFWLFVBQVUsQ0FBUTtRQUNuQixhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQ2xCLGlCQUFZLEdBQVosWUFBWSxDQUFZO1FBQ3hCLFFBQUcsR0FBSCxHQUFHLENBQVk7UUFDZCxTQUFJLEdBQUosSUFBSSxDQUFrQjtRQUV2QyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRTtZQUN2QixNQUFNLElBQUksS0FBSyxDQUFDLHVDQUF1QyxDQUFDLENBQUM7U0FDMUQ7UUFFRCxJQUFJLFlBQVksQ0FBQyxPQUFPLEtBQUssUUFBUSxDQUFDLGFBQWEsRUFBRTtZQUNuRCxNQUFNLElBQUksS0FBSyxDQUFDLG1DQUFtQyxRQUFRLENBQUMsYUFBYSxTQUFTLFlBQVksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO1NBQzVHO1FBRUQsSUFBQSw0QkFBZ0IsRUFBQyxRQUFRLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBRU0sS0FBSyxDQUFDLFdBQVc7UUFDdEIsTUFBTSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO1FBQzdDLE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsY0FBYyxLQUFLLENBQUMsQ0FBQztRQUN4RCxNQUFNLGtCQUFrQixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssSUFB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