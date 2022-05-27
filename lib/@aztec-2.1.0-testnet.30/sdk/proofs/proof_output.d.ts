/// <reference types="node" />
import { ProofData } from '@aztec/barretenberg/client_proofs';
import { OffchainAccountData, OffchainDefiDepositData, OffchainJoinSplitData } from '@aztec/barretenberg/offchain_tx_data';
import { CoreAccountTx, CoreAccountTxJson, CoreDefiTx, CoreDefiTxJson, CorePaymentTx, CorePaymentTxJson } from '../core_tx';
import { Note, NoteJson } from '../note';
export interface ProofOutput {
    tx: CorePaymentTx | CoreAccountTx | CoreDefiTx;
    proofData: ProofData;
    offchainTxData: OffchainJoinSplitData | OffchainAccountData | OffchainDefiDepositData;
    outputNotes: Note[];
    signature?: Buffer;
}
export interface ProofOutputJson {
    tx: CorePaymentTxJson | CoreAccountTxJson | CoreDefiTxJson;
    proofData: Uint8Array;
    offchainTxData: Uint8Array;
    outputNotes: NoteJson[];
    signature?: Uint8Array;
}
export declare const proofOutputToJson: ({ tx, proofData, offchainTxData, outputNotes, signature, }: ProofOutput) => ProofOutputJson;
export declare const proofOutputFromJson: ({ tx, proofData, offchainTxData, outputNotes, signature, }: ProofOutputJson) => ProofOutput;
//# sourceMappingURL=proof_output.d.ts.map