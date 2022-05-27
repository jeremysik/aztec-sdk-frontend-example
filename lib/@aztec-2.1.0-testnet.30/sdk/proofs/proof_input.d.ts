/// <reference types="node" />
import { GrumpkinAddress } from '@aztec/barretenberg/address';
import { AccountTx, JoinSplitTx } from '@aztec/barretenberg/client_proofs';
import { SchnorrSignature } from '@aztec/barretenberg/crypto';
import { ViewingKey } from '@aztec/barretenberg/viewing_key';
export interface AccountProofInput {
    tx: AccountTx;
    signingData: Buffer;
    signature?: SchnorrSignature;
}
export interface AccountProofInputJson {
    tx: Uint8Array;
    signingData: Uint8Array;
    signature?: string;
}
export declare const accountProofInputToJson: ({ tx, signingData, signature }: AccountProofInput) => AccountProofInputJson;
export declare const accountProofInputFromJson: ({ tx, signingData, signature, }: AccountProofInputJson) => AccountProofInput;
export interface JoinSplitProofInput {
    tx: JoinSplitTx;
    viewingKeys: ViewingKey[];
    partialStateSecretEphPubKey?: GrumpkinAddress;
    signingData: Buffer;
    signature?: SchnorrSignature;
}
export interface JoinSplitProofInputJson {
    tx: Uint8Array;
    viewingKeys: string[];
    partialStateSecretEphPubKey?: string;
    signingData: Uint8Array;
    signature?: string;
}
export declare const joinSplitProofInputToJson: ({ tx, viewingKeys, partialStateSecretEphPubKey, signingData, signature, }: JoinSplitProofInput) => JoinSplitProofInputJson;
export declare const joinSplitProofInputFromJson: ({ tx, viewingKeys, partialStateSecretEphPubKey, signingData, signature, }: JoinSplitProofInputJson) => JoinSplitProofInput;
//# sourceMappingURL=proof_input.d.ts.map