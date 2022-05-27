/// <reference types="node" />
import { AccountId, AliasHash } from '@aztec/barretenberg/account_id';
import { ProofId } from '@aztec/barretenberg/client_proofs';
import { TxId } from '@aztec/barretenberg/tx_id';
export declare class CoreAccountTx {
    readonly txId: TxId;
    readonly userId: AccountId;
    readonly aliasHash: AliasHash;
    readonly newSigningPubKey1: Buffer | undefined;
    readonly newSigningPubKey2: Buffer | undefined;
    readonly migrated: boolean;
    readonly txRefNo: number;
    readonly created: Date;
    readonly settled?: Date | undefined;
    readonly proofId = ProofId.ACCOUNT;
    constructor(txId: TxId, userId: AccountId, aliasHash: AliasHash, newSigningPubKey1: Buffer | undefined, newSigningPubKey2: Buffer | undefined, migrated: boolean, txRefNo: number, created: Date, settled?: Date | undefined);
}
export interface CoreAccountTxJson {
    proofId: number;
    txId: string;
    userId: string;
    aliasHash: string;
    newSigningPubKey1: string | undefined;
    newSigningPubKey2: string | undefined;
    migrated: boolean;
    txRefNo: number;
    created: Date;
    settled?: Date;
}
export declare const coreAccountTxToJson: (tx: CoreAccountTx) => CoreAccountTxJson;
export declare const coreAccountTxFromJson: (json: CoreAccountTxJson) => CoreAccountTx;
//# sourceMappingURL=core_account_tx.d.ts.map