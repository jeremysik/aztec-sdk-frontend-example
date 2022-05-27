/// <reference types="node" />
import { AccountId } from '@aztec/barretenberg/account_id';
import { EthAddress, GrumpkinAddress } from '@aztec/barretenberg/address';
import { BridgeId } from '@aztec/barretenberg/bridge_id';
import { JoinSplitTx, ProofId } from '@aztec/barretenberg/client_proofs';
import { Grumpkin } from '@aztec/barretenberg/ecc';
import { NoteAlgorithms, TreeNote } from '@aztec/barretenberg/note_algorithms';
import { WorldState } from '@aztec/barretenberg/world_state';
import { Database } from '../database';
import { Note } from '../note';
import { UserData } from '../user';
export declare class JoinSplitTxFactory {
    private noteAlgos;
    private worldState;
    private grumpkin;
    private db;
    constructor(noteAlgos: NoteAlgorithms, worldState: WorldState, grumpkin: Grumpkin, db: Database);
    createTx(user: UserData, proofId: ProofId, assetId: number, inputNotes: Note[], signingPubKey: GrumpkinAddress, { publicValue, publicOwner, outputNoteValue1, outputNoteValue2, newNoteOwner, bridgeId, defiDepositValue, allowChain, }?: {
        publicValue?: bigint | undefined;
        publicOwner?: EthAddress | undefined;
        outputNoteValue1?: bigint | undefined;
        outputNoteValue2?: bigint | undefined;
        newNoteOwner?: AccountId | undefined;
        bridgeId?: BridgeId | undefined;
        defiDepositValue?: bigint | undefined;
        allowChain?: number | undefined;
    }): Promise<{
        tx: JoinSplitTx;
        viewingKeys: import("@aztec/barretenberg/viewing_key").ViewingKey[];
        partialStateSecretEphPubKey: GrumpkinAddress | undefined;
    }>;
    private getAccountPathAndIndex;
    generateNewNote(treeNote: TreeNote, privateKey: Buffer, { allowChain, gibberish }?: {
        allowChain?: boolean | undefined;
        gibberish?: boolean | undefined;
    }): Note;
    private createNote;
    private createClaimNote;
    private createEphemeralPrivKey;
    private createEphemeralKeyPair;
}
//# sourceMappingURL=join_split_tx_factory.d.ts.map