import { AssetValue, AuxDataConfig, AztecAsset, BridgeDataFieldGetters } from '../bridge-data';
export declare class ExampleBridgeData implements BridgeDataFieldGetters {
    constructor();
    getInteractionPresentValue(interactionNonce: bigint): Promise<AssetValue[]>;
    getAuxData(inputAssetA: AztecAsset, inputAssetB: AztecAsset, outputAssetA: AztecAsset, outputAssetB: AztecAsset): Promise<bigint[]>;
    auxDataConfig: AuxDataConfig[];
    getExpectedOutput(inputAssetA: AztecAsset, inputAssetB: AztecAsset, outputAssetA: AztecAsset, outputAssetB: AztecAsset, auxData: bigint, precision: bigint): Promise<bigint[]>;
    getMarketSize(inputAssetA: AztecAsset, inputAssetB: AztecAsset, outputAssetA: AztecAsset, outputAssetB: AztecAsset, auxData: bigint): Promise<AssetValue[]>;
}
//# sourceMappingURL=example-bridge-data.d.ts.map