/// <reference types="node" />
import { AccountId } from '@aztec/barretenberg/account_id';
import { SigningKey } from '../database';
export declare class UserKeyDao implements SigningKey {
    constructor(init?: SigningKey);
    key: Buffer;
    accountId: AccountId;
    treeIndex: number;
    hashPath: Buffer;
}
//# sourceMappingURL=user_key_dao.d.ts.map