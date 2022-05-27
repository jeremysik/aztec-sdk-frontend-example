/// <reference types="node" />
import { AliasHash } from '@aztec/barretenberg/account_id';
import { GrumpkinAddress } from '@aztec/barretenberg/address';
import { AccountProver, AccountTx } from '@aztec/barretenberg/client_proofs';
import { WorldState } from '@aztec/barretenberg/world_state';
import { Database } from '../database';
import { AccountProofInput } from './proof_input';
import { ProofOutput } from './proof_output';
export declare class AccountProofCreator {
    private prover;
    private worldState;
    private db;
    constructor(prover: AccountProver, worldState: WorldState, db: Database);
    createAccountTx(signingPubKey: GrumpkinAddress, aliasHash: AliasHash, accountNonce: number, migrate: boolean, accountPublicKey: GrumpkinAddress, newAccountPublicKey?: GrumpkinAddress, newSigningPubKey1?: GrumpkinAddress, newSigningPubKey2?: GrumpkinAddress, accountIndex?: number): Promise<AccountTx>;
    computeSigningData(tx: AccountTx): Promise<Buffer>;
    createProofInput(aliasHash: AliasHash, accountNonce: number, migrate: boolean, accountPublicKey: GrumpkinAddress, signingPubKey: GrumpkinAddress, newAccountPublicKey: GrumpkinAddress | undefined, newSigningPubKey1: GrumpkinAddress | undefined, newSigningPubKey2: GrumpkinAddress | undefined): Promise<AccountProofInput>;
    createProof({ tx, signature }: AccountProofInput, txRefNo: number): Promise<ProofOutput>;
}
//# sourceMappingURL=account_proof_creator.d.ts.map