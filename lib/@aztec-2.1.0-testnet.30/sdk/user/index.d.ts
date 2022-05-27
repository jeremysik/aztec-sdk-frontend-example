/// <reference types="node" />
import { AccountId, AliasHash } from '@aztec/barretenberg/account_id';
import { GrumpkinAddress } from '@aztec/barretenberg/address';
export * from './recovery_payload';
export interface UserData {
    id: AccountId;
    privateKey: Buffer;
    publicKey: GrumpkinAddress;
    accountNonce: number;
    aliasHash?: AliasHash;
    syncedToRollup: number;
}
export interface UserDataJson {
    id: string;
    privateKey: string;
    publicKey: string;
    accountNonce: number;
    aliasHash?: string;
    syncedToRollup: number;
}
export declare const userDataToJson: ({ id, privateKey, publicKey, aliasHash, ...rest }: UserData) => UserDataJson;
export declare const userDataFromJson: ({ id, privateKey, publicKey, aliasHash, ...rest }: UserDataJson) => UserData;
//# sourceMappingURL=index.d.ts.map