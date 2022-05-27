"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentProofCreator = void 0;
const account_id_1 = require("@aztec/barretenberg/account_id");
const client_proofs_1 = require("@aztec/barretenberg/client_proofs");
const debug_1 = require("@aztec/barretenberg/debug");
const offchain_tx_data_1 = require("@aztec/barretenberg/offchain_tx_data");
const tx_id_1 = require("@aztec/barretenberg/tx_id");
const core_tx_1 = require("../core_tx");
const join_split_tx_factory_1 = require("./join_split_tx_factory");
const debug = (0, debug_1.createLogger)('bb:payment_proof_creator');
class PaymentProofCreator {
    constructor(prover, noteAlgos, worldState, grumpkin, db) {
        this.prover = prover;
        this.txFactory = new join_split_tx_factory_1.JoinSplitTxFactory(noteAlgos, worldState, grumpkin, db);
    }
    async createProofInput(user, inputNotes, privateInput, recipientPrivateOutput, senderPrivateOutput, publicInput, publicOutput, assetId, newNoteOwner, publicOwner, spendingPublicKey, allowChain) {
        if (publicInput && publicOutput) {
            throw new Error('Public values cannot be both greater than zero.');
        }
        if (publicOutput + recipientPrivateOutput + senderPrivateOutput > publicInput + privateInput) {
            throw new Error('Total output cannot be larger than total input.');
        }
        if (publicInput + publicOutput && !publicOwner) {
            throw new Error('Public owner undefined.');
        }
        if (recipientPrivateOutput && !newNoteOwner) {
            throw new Error('Note recipient undefined.');
        }
        const proofId = (() => {
            if (publicInput > 0) {
                return client_proofs_1.ProofId.DEPOSIT;
            }
            if (publicOutput > 0) {
                return client_proofs_1.ProofId.WITHDRAW;
            }
            return client_proofs_1.ProofId.SEND;
        })();
        const totalInputNoteValue = inputNotes.reduce((sum, note) => sum + note.value, BigInt(0));
        const changeValue = totalInputNoteValue > privateInput ? totalInputNoteValue - privateInput : BigInt(0);
        const proofInput = await this.txFactory.createTx(user, proofId, assetId, inputNotes, spendingPublicKey, {
            publicValue: publicInput + publicOutput,
            publicOwner,
            outputNoteValue1: recipientPrivateOutput,
            outputNoteValue2: changeValue + senderPrivateOutput,
            newNoteOwner,
            allowChain,
        });
        const signingData = await this.prover.computeSigningData(proofInput.tx);
        return { ...proofInput, signingData };
    }
    async createProof(user, { tx, signature, viewingKeys }, txRefNo) {
        debug('creating proof...');
        const start = new Date().getTime();
        const proof = await this.prover.createProof(tx, signature);
        debug(`created proof: ${new Date().getTime() - start}ms`);
        debug(`proof size: ${proof.length}`);
        const proofData = new client_proofs_1.ProofData(proof);
        const txId = new tx_id_1.TxId(proofData.txId);
        const { inputNotes, outputNotes, proofId, publicValue, publicOwner } = tx;
        const privateInput = inputNotes.reduce((sum, n) => sum + n.value, BigInt(0));
        const { value: recipientPrivateOutput } = outputNotes[0];
        const { assetId, value: senderPrivateOutput } = outputNotes[1];
        const newNoteOwner = new account_id_1.AccountId(outputNotes[0].ownerPubKey, outputNotes[0].accountNonce);
        const userId = new account_id_1.AccountId(outputNotes[1].ownerPubKey, outputNotes[1].accountNonce);
        const coreTx = new core_tx_1.CorePaymentTx(txId, userId, proofId, assetId, publicValue, publicOwner, privateInput, recipientPrivateOutput, senderPrivateOutput, newNoteOwner === null || newNoteOwner === void 0 ? void 0 : newNoteOwner.equals(userId), true, // isSender
        txRefNo, new Date());
        const offchainTxData = new offchain_tx_data_1.OffchainJoinSplitData(viewingKeys, txRefNo);
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
exports.PaymentProofCreator = PaymentProofCreator;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF5bWVudF9wcm9vZl9jcmVhdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3Byb29mcy9wYXltZW50X3Byb29mX2NyZWF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsK0RBQTJEO0FBRTNELHFFQUF3RjtBQUN4RixxREFBeUQ7QUFHekQsMkVBQTZFO0FBQzdFLHFEQUFpRDtBQUVqRCx3Q0FBd0Q7QUFJeEQsbUVBQTZEO0FBRzdELE1BQU0sS0FBSyxHQUFHLElBQUEsb0JBQVksRUFBQywwQkFBMEIsQ0FBQyxDQUFDO0FBRXZELE1BQWEsbUJBQW1CO0lBRzlCLFlBQ1UsTUFBdUIsRUFDL0IsU0FBeUIsRUFDekIsVUFBc0IsRUFDdEIsUUFBa0IsRUFDbEIsRUFBWTtRQUpKLFdBQU0sR0FBTixNQUFNLENBQWlCO1FBTS9CLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSwwQ0FBa0IsQ0FBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUMvRSxDQUFDO0lBRU0sS0FBSyxDQUFDLGdCQUFnQixDQUMzQixJQUFjLEVBQ2QsVUFBa0IsRUFDbEIsWUFBb0IsRUFDcEIsc0JBQThCLEVBQzlCLG1CQUEyQixFQUMzQixXQUFtQixFQUNuQixZQUFvQixFQUNwQixPQUFlLEVBQ2YsWUFBbUMsRUFDbkMsV0FBbUMsRUFDbkMsaUJBQWtDLEVBQ2xDLFVBQWtCO1FBRWxCLElBQUksV0FBVyxJQUFJLFlBQVksRUFBRTtZQUMvQixNQUFNLElBQUksS0FBSyxDQUFDLGlEQUFpRCxDQUFDLENBQUM7U0FDcEU7UUFFRCxJQUFJLFlBQVksR0FBRyxzQkFBc0IsR0FBRyxtQkFBbUIsR0FBRyxXQUFXLEdBQUcsWUFBWSxFQUFFO1lBQzVGLE1BQU0sSUFBSSxLQUFLLENBQUMsaURBQWlELENBQUMsQ0FBQztTQUNwRTtRQUVELElBQUksV0FBVyxHQUFHLFlBQVksSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUM5QyxNQUFNLElBQUksS0FBSyxDQUFDLHlCQUF5QixDQUFDLENBQUM7U0FDNUM7UUFFRCxJQUFJLHNCQUFzQixJQUFJLENBQUMsWUFBWSxFQUFFO1lBQzNDLE1BQU0sSUFBSSxLQUFLLENBQUMsMkJBQTJCLENBQUMsQ0FBQztTQUM5QztRQUVELE1BQU0sT0FBTyxHQUFHLENBQUMsR0FBRyxFQUFFO1lBQ3BCLElBQUksV0FBVyxHQUFHLENBQUMsRUFBRTtnQkFDbkIsT0FBTyx1QkFBTyxDQUFDLE9BQU8sQ0FBQzthQUN4QjtZQUNELElBQUksWUFBWSxHQUFHLENBQUMsRUFBRTtnQkFDcEIsT0FBTyx1QkFBTyxDQUFDLFFBQVEsQ0FBQzthQUN6QjtZQUNELE9BQU8sdUJBQU8sQ0FBQyxJQUFJLENBQUM7UUFDdEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUVMLE1BQU0sbUJBQW1CLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzFGLE1BQU0sV0FBVyxHQUFHLG1CQUFtQixHQUFHLFlBQVksQ0FBQyxDQUFDLENBQUMsbUJBQW1CLEdBQUcsWUFBWSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFeEcsTUFBTSxVQUFVLEdBQUcsTUFBTSxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsaUJBQWlCLEVBQUU7WUFDdEcsV0FBVyxFQUFFLFdBQVcsR0FBRyxZQUFZO1lBQ3ZDLFdBQVc7WUFDWCxnQkFBZ0IsRUFBRSxzQkFBc0I7WUFDeEMsZ0JBQWdCLEVBQUUsV0FBVyxHQUFHLG1CQUFtQjtZQUNuRCxZQUFZO1lBQ1osVUFBVTtTQUNYLENBQUMsQ0FBQztRQUVILE1BQU0sV0FBVyxHQUFHLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUM7UUFFeEUsT0FBTyxFQUFFLEdBQUcsVUFBVSxFQUFFLFdBQVcsRUFBRSxDQUFDO0lBQ3hDLENBQUM7SUFFTSxLQUFLLENBQUMsV0FBVyxDQUFDLElBQWMsRUFBRSxFQUFFLEVBQUUsRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUF1QixFQUFFLE9BQWU7UUFDM0csS0FBSyxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFDM0IsTUFBTSxLQUFLLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNuQyxNQUFNLEtBQUssR0FBRyxNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLEVBQUUsRUFBRSxTQUFVLENBQUMsQ0FBQztRQUM1RCxLQUFLLENBQUMsa0JBQWtCLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLEdBQUcsS0FBSyxJQUFJLENBQUMsQ0FBQztRQUMxRCxLQUFLLENBQUMsZUFBZSxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztRQUVyQyxNQUFNLFNBQVMsR0FBRyxJQUFJLHlCQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdkMsTUFBTSxJQUFJLEdBQUcsSUFBSSxZQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXRDLE1BQU0sRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLE9BQU8sRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFLEdBQUcsRUFBRSxDQUFDO1FBQzFFLE1BQU0sWUFBWSxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM3RSxNQUFNLEVBQUUsS0FBSyxFQUFFLHNCQUFzQixFQUFFLEdBQUcsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3pELE1BQU0sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLG1CQUFtQixFQUFFLEdBQUcsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQy9ELE1BQU0sWUFBWSxHQUFHLElBQUksc0JBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUM1RixNQUFNLE1BQU0sR0FBRyxJQUFJLHNCQUFTLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDdEYsTUFBTSxNQUFNLEdBQUcsSUFBSSx1QkFBUyxDQUMxQixJQUFJLEVBQ0osTUFBTSxFQUNOLE9BQU8sRUFDUCxPQUFPLEVBQ1AsV0FBVyxFQUNYLFdBQVcsRUFDWCxZQUFZLEVBQ1osc0JBQXNCLEVBQ3RCLG1CQUFtQixFQUNuQixZQUFZLGFBQVosWUFBWSx1QkFBWixZQUFZLENBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUM1QixJQUFJLEVBQUUsV0FBVztRQUNqQixPQUFPLEVBQ1AsSUFBSSxJQUFJLEVBQUUsQ0FDWCxDQUFDO1FBQ0YsTUFBTSxjQUFjLEdBQUcsSUFBSSx3Q0FBcUIsQ0FBQyxXQUFXLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFFdkUsT0FBTztZQUNMLEVBQUUsRUFBRSxNQUFNO1lBQ1YsU0FBUztZQUNULGNBQWM7WUFDZCxXQUFXLEVBQUU7Z0JBQ1gsSUFBSSxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsRUFBRSxVQUFVLEVBQUUsU0FBUyxDQUFDLG1CQUFtQixFQUFFLENBQUM7Z0JBQzlHLElBQUksQ0FBQyxTQUFTLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLEVBQUUsVUFBVSxFQUFFLFNBQVMsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO2FBQy9HO1NBQ0YsQ0FBQztJQUNKLENBQUM7Q0FDRjtBQWpIRCxrREFpSEMifQ==