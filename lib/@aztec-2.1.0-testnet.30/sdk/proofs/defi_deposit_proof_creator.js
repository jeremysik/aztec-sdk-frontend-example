"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefiDepositProofCreator = void 0;
const client_proofs_1 = require("@aztec/barretenberg/client_proofs");
const debug_1 = require("@aztec/barretenberg/debug");
const offchain_tx_data_1 = require("@aztec/barretenberg/offchain_tx_data");
const tx_id_1 = require("@aztec/barretenberg/tx_id");
const core_tx_1 = require("../core_tx");
const join_split_tx_factory_1 = require("./join_split_tx_factory");
const debug = (0, debug_1.createLogger)('bb:defi_deposit_proof_creator');
class DefiDepositProofCreator {
    constructor(prover, noteAlgos, worldState, grumpkin, db) {
        this.prover = prover;
        this.noteAlgos = noteAlgos;
        this.txFactory = new join_split_tx_factory_1.JoinSplitTxFactory(noteAlgos, worldState, grumpkin, db);
    }
    async createProofInput(user, bridgeId, depositValue, inputNotes, spendingPublicKey) {
        const assetId = bridgeId.inputAssetIdA;
        const proofInput = await this.txFactory.createTx(user, client_proofs_1.ProofId.DEFI_DEPOSIT, assetId, inputNotes, spendingPublicKey, {
            bridgeId,
            defiDepositValue: depositValue,
        });
        const signingData = await this.prover.computeSigningData(proofInput.tx);
        return { ...proofInput, signingData };
    }
    async createProof(user, { tx, signature, partialStateSecretEphPubKey, viewingKeys }, txRefNo) {
        debug('creating proof...');
        const start = new Date().getTime();
        const proof = await this.prover.createProof(tx, signature);
        debug(`created proof: ${new Date().getTime() - start}ms`);
        debug(`proof size: ${proof.length}`);
        const proofData = new client_proofs_1.ProofData(proof);
        const txId = new tx_id_1.TxId(proofData.txId);
        const { outputNotes, claimNote: { value: depositValue, bridgeId, partialStateSecret }, inputNotes, } = tx;
        const privateInput = bridgeId.numInputAssets > 1 ? inputNotes[0].value : inputNotes.reduce((sum, n) => sum + n.value, BigInt(0));
        const txFee = privateInput - depositValue;
        const coreTx = new core_tx_1.CoreDefiTx(txId, user.id, bridgeId, depositValue, txFee, partialStateSecret, txRefNo, new Date());
        const partialState = this.noteAlgos.valueNotePartialCommitment(partialStateSecret, user.id);
        const offchainTxData = new offchain_tx_data_1.OffchainDefiDepositData(bridgeId, partialState, partialStateSecretEphPubKey, depositValue, txFee, viewingKeys[0], // contains [value, asset_id, accountNonce, creatorPubKey] of the change note (returned to the sender)
        txRefNo);
        return {
            tx: coreTx,
            proofData,
            offchainTxData,
            outputNotes: [
                this.txFactory.generateNewNote(outputNotes[0], user.privateKey, { allowChain: proofData.allowChainFromNote1 }),
                this.txFactory.generateNewNote(outputNotes[1], user.privateKey, { allowChain: proofData.allowChainFromNote2 }),
            ],
        };
    }
}
exports.DefiDepositProofCreator = DefiDepositProofCreator;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmaV9kZXBvc2l0X3Byb29mX2NyZWF0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcHJvb2ZzL2RlZmlfZGVwb3NpdF9wcm9vZl9jcmVhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUVBLHFFQUF3RjtBQUN4RixxREFBeUQ7QUFHekQsMkVBQStFO0FBQy9FLHFEQUFpRDtBQUVqRCx3Q0FBd0M7QUFJeEMsbUVBQTZEO0FBRzdELE1BQU0sS0FBSyxHQUFHLElBQUEsb0JBQVksRUFBQywrQkFBK0IsQ0FBQyxDQUFDO0FBRTVELE1BQWEsdUJBQXVCO0lBR2xDLFlBQ1UsTUFBdUIsRUFDdkIsU0FBeUIsRUFDakMsVUFBc0IsRUFDdEIsUUFBa0IsRUFDbEIsRUFBWTtRQUpKLFdBQU0sR0FBTixNQUFNLENBQWlCO1FBQ3ZCLGNBQVMsR0FBVCxTQUFTLENBQWdCO1FBS2pDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSwwQ0FBa0IsQ0FBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUMvRSxDQUFDO0lBRU0sS0FBSyxDQUFDLGdCQUFnQixDQUMzQixJQUFjLEVBQ2QsUUFBa0IsRUFDbEIsWUFBb0IsRUFDcEIsVUFBa0IsRUFDbEIsaUJBQWtDO1FBRWxDLE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUM7UUFDdkMsTUFBTSxVQUFVLEdBQUcsTUFBTSxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FDOUMsSUFBSSxFQUNKLHVCQUFPLENBQUMsWUFBWSxFQUNwQixPQUFPLEVBQ1AsVUFBVSxFQUNWLGlCQUFpQixFQUNqQjtZQUNFLFFBQVE7WUFDUixnQkFBZ0IsRUFBRSxZQUFZO1NBQy9CLENBQ0YsQ0FBQztRQUVGLE1BQU0sV0FBVyxHQUFHLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUM7UUFFeEUs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