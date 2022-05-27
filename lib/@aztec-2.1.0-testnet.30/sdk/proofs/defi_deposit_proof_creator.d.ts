/// <reference types="node" />
import { GrumpkinAddress } from '@aztec/barretenberg/address';
import { BridgeId } from '@aztec/barretenberg/bridge_id';
import { JoinSplitProver, ProofData } from '@aztec/barretenberg/client_proofs';
import { Grumpkin } from '@aztec/barretenberg/ecc';
import { NoteAlgorithms } from '@aztec/barretenberg/note_algorithms';
import { OffchainDefiDepositData } from '@aztec/barretenberg/offchain_tx_data';
import { WorldState } from '@aztec/barretenberg/world_state';
import { CoreDefiTx } from '../core_tx';
import { Database } from '../database';
import { Note } from '../note';
import { UserData } from '../user';
import { JoinSplitProofInput } from './proof_input';
export declare class DefiDepositProofCreator {
    private prover;
    private noteAlgos;
    private txFactory;
    constructor(prover: JoinSplitProver, noteAlgos: NoteAlgorithms, worldState: WorldState, grumpkin: Grumpkin, db: Database);
    createProofInput(user: UserData, bridgeId: BridgeId, depositValue: bigint, inputNotes: Note[], spendingPublicKey: GrumpkinAddress): Promise<{
        signingData: Buffer;
        tx: import("@aztec/barretenberg/client_proofs").JoinSplitTx;
        viewingKeys: import("@aztec/barretenberg/viewing_key").ViewingKey[];
        partialStateSecretEphPubKey: GrumpkinAddress | undefined;
    }>;
    createProof(user: UserData, { tx, signature, partialStateSecretEphPubKey, viewingKeys }: JoinSplitProofInput, txRefNo: number): Promise<{
        tx: CoreDefiTx;
        proofData: ProofData;
        offchainTxData: OffchainDefiDepositData;
        outputNotes: Note[];
    }>;
}
//# sourceMappingURL=defi_deposit_proof_creator.d.ts.map