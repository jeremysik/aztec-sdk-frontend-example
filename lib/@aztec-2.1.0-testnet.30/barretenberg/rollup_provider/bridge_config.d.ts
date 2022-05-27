export interface BridgeConfig {
    bridgeId: bigint;
    numTxs: number;
    gas: number;
    rollupFrequency: number;
}
export interface BridgeConfigJson {
    bridgeId: string;
    numTxs: number;
    rollupFrequency: number;
    gas: number;
}
export declare const bridgeConfigToJson: ({ bridgeId, ...rest }: BridgeConfig) => BridgeConfigJson;
export declare const bridgeConfigFromJson: ({ bridgeId, ...rest }: BridgeConfigJson) => BridgeConfig;
//# sourceMappingURL=bridge_config.d.ts.map