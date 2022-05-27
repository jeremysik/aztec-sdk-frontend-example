/// <reference types="node" />
import { AccountId } from '@aztec/barretenberg/account_id';
import { EthAddress, GrumpkinAddress } from '@aztec/barretenberg/address';
import { JoinSplitProver, ProofData } from '@aztec/barretenberg/client_proofs';
import { Grumpkin } from '@aztec/barretenberg/ecc';
import { NoteAlgorithms } from '@aztec/barretenberg/note_algorithms';
import { OffchainJoinSplitData } from '@aztec/barretenberg/offchain_tx_data';
import { WorldState } from '@aztec/barretenberg/world_state';
import { CorePaymentTx as PaymentTx } from '../core_tx';
import { Database } from '../database';
import { Note } from '../note';
import { UserData } from '../user';
import { JoinSplitProofInput } from './proof_input';
export declare class PaymentProofCreator {
    private prover;
    private txFactory;
    constructor(prover: JoinSplitProver, noteAlgos: NoteAlgorithms, worldState: WorldState, grumpkin: Grumpkin, db: Database);
    createProofInput(user: UserData, inputNotes: Note[], privateInput: bigint, recipientPrivateOutput: bigint, senderPrivateOutput: bigint, publicInput: bigint, publicOutput: bigint, assetId: number, newNoteOwner: AccountId | undefined, publicOwner: EthAddress | undefined, spendingPublicKey: GrumpkinAddress, allowChain: number): Promise<{
        signingData: Buffer;
        tx: import("@aztec/barretenberg/client_proofs").JoinSplitTx;
        viewingKeys: import("@aztec/barretenberg/viewing_key").ViewingKey[];
        partialStateSecretEphPubKey: GrumpkinAddress | undefined;
    }>;
    createProof(user: UserData, { tx, signature, viewingKeys }: JoinSplitProofInput, txRefNo: number): Promise<{
        tx: PaymentTx;
        proofData: ProofData;
        offchainTxData: OffchainJoinSplitData;
        outputNotes: Note[];
    }>;
}
//# sourceMappingURL=payment_proof_creator.d.ts.map