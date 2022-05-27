export interface AssetValue {
    assetId: number;
    value: bigint;
}
export interface AssetValueJson {
    assetId: number;
    value: string;
}
export declare const assetValueToJson: (assetValue: AssetValue) => AssetValueJson;
export declare const assetValueFromJson: (json: AssetValueJson) => AssetValue;
export declare const isVirtualAsset: (assetId: number) => boolean;
//# sourceMappingURL=index.d.ts.map