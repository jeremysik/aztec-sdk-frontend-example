import { AliasHash } from '@aztec/barretenberg/account_id';
import { GrumpkinAddress } from '@aztec/barretenberg/address';
import { Alias } from '../database';
export declare class AliasDao implements Alias {
    constructor(init?: Alias);
    aliasHash: AliasHash;
    address: GrumpkinAddress;
    latestNonce: number;
}
//# sourceMappingURL=alias_dao.d.ts.map