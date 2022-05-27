export interface BridgeStatus {
    bridgeId: bigint;
    numTxs: number;
    gasThreshold: number;
    gasAccrued: number;
    rollupFrequency: number;
    nextRollupNumber?: number;
    nextPublishTime?: Date;
}
export interface BridgeStatusJson {
    bridgeId: string;
    numTxs: number;
    gasThreshold: number;
    gasAccrued: number;
    rollupFrequency: number;
    nextRollupNumber?: number;
    nextPublishTime?: string;
}
export declare function bridgeStatusToJson({ bridgeId, nextPublishTime, ...rest }: BridgeStatus): BridgeStatusJson;
export declare function bridgeStatusFromJson({ bridgeId, nextPublishTime, ...rest }: BridgeStatusJson): BridgeStatus;
//# sourceMappingURL=bridge_status.d.ts.map