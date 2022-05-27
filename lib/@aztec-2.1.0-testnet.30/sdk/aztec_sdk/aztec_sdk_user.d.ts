/// <reference types="node" />
import { AccountId } from '@aztec/barretenberg/account_id';
import { AztecSdk } from './aztec_sdk';
export declare class AztecSdkUser {
    id: AccountId;
    private sdk;
    constructor(id: AccountId, sdk: AztecSdk);
    isSynching(): Promise<boolean>;
    awaitSynchronised(): Promise<void>;
    getSigningKeys(): Promise<Buffer[]>;
    getUserData(): Promise<import("..").UserData>;
    getBalance(assetId: number): Promise<bigint>;
    getSpendableSum(assetId: number, excludePendingNotes?: boolean): Promise<bigint>;
    getSpendableSums(excludePendingNotes?: boolean): Promise<import("@aztec/barretenberg/asset").AssetValue[]>;
    getMaxSpendableValue(assetId: number, numNotes?: number, excludePendingNotes?: boolean): Promise<bigint>;
    getTxs(): Promise<(import("..").UserAccountTx | import("..").UserDefiTx | import("..").UserDefiClaimTx | import("..").UserPaymentTx)[]>;
    getPaymentTxs(): Promise<import("..").UserPaymentTx[]>;
    getAccountTxs(): Promise<import("..").UserAccountTx[]>;
    getDefiTxs(): Promise<import("..").UserDefiTx[]>;
}
//# sourceMappingURL=aztec_sdk_user.d.ts.map