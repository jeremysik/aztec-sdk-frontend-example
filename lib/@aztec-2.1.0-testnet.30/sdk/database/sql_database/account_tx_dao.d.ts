/// <reference types="node" />
import { AccountId, AliasHash } from '@aztec/barretenberg/account_id';
import { TxId } from '@aztec/barretenberg/tx_id';
export declare class AccountTxDao {
    txId: TxId;
    userId: AccountId;
    aliasHash: AliasHash;
    newSigningPubKey1?: Buffer;
    newSigningPubKey2?: Buffer;
    migrated: boolean;
    txRefNo: number;
    created: Date;
    settled?: Date;
    afterLoad(): void;
}
//# sourceMappingURL=account_tx_dao.d.ts.map