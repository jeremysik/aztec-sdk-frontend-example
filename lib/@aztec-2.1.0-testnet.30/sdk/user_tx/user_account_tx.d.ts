/// <reference types="node" />
import { AccountId, AliasHash } from '@aztec/barretenberg/account_id';
import { AssetValue } from '@aztec/barretenberg/asset';
import { ProofId } from '@aztec/barretenberg/client_proofs';
import { TxId } from '@aztec/barretenberg/tx_id';
export declare class UserAccountTx {
    readonly txId: TxId;
    readonly userId: AccountId;
    readonly aliasHash: AliasHash;
    readonly newSigningPubKey1: Buffer | undefined;
    readonly newSigningPubKey2: Buffer | undefined;
    readonly migrated: boolean;
    readonly fee: AssetValue;
    readonly created: Date;
    readonly settled?: Date | undefined;
    readonly proofId = ProofId.ACCOUNT;
    constructor(txId: TxId, userId: AccountId, aliasHash: AliasHash, newSigningPubKey1: Buffer | undefined, newSigningPubKey2: Buffer | undefined, migrated: boolean, fee: AssetValue, created: Date, settled?: Date | undefined);
}
//# sourceMappingURL=user_account_tx.d.ts.map