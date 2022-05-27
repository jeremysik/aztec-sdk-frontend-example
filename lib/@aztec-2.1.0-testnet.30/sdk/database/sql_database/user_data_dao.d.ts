/// <reference types="node" />
import { AccountId, AliasHash } from '@aztec/barretenberg/account_id';
import { GrumpkinAddress } from '@aztec/barretenberg/address';
import { UserData } from '../../user';
export declare class UserDataDao implements UserData {
    id: AccountId;
    publicKey: GrumpkinAddress;
    privateKey: Buffer;
    accountNonce: number;
    aliasHash?: AliasHash;
    syncedToRollup: number;
}
//# sourceMappingURL=user_data_dao.d.ts.map