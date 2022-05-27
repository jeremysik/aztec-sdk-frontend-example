/// <reference types="node" />
import { EthAddress } from '@aztec/barretenberg/address';
export declare enum SdkEvent {
    UPDATED_USERS = "SDKEVENT_UPDATED_USERS",
    UPDATED_USER_STATE = "SDKEVENT_UPDATED_USER_STATE",
    UPDATED_WORLD_STATE = "SDKEVENT_UPDATED_WORLD_STATE",
    DESTROYED = "SDKEVENT_DESTROYED"
}
export interface SdkStatus {
    serverUrl: string;
    chainId: number;
    rollupContractAddress: EthAddress;
    feePayingAssetIds: number[];
    syncedToRollup: number;
    latestRollupId: number;
    dataSize: number;
    dataRoot: Buffer;
}
export interface SdkStatusJson {
    serverUrl: string;
    chainId: number;
    rollupContractAddress: string;
    feePayingAssetIds: number[];
    syncedToRollup: number;
    latestRollupId: number;
    dataSize: number;
    dataRoot: string;
}
export declare const sdkStatusToJson: (status: SdkStatus) => SdkStatusJson;
export declare const sdkStatusFromJson: (json: SdkStatusJson) => SdkStatus;
//# sourceMappingURL=sdk_status.d.ts.map