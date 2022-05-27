import { AssetValue, AuxDataConfig, AztecAsset, BridgeDataFieldGetters } from '../bridge-data';
import { EthereumProvider } from '@aztec/barretenberg/blockchain';
import { EthAddress } from '@aztec/barretenberg/address';
export declare class SyncUniswapBridgeData implements BridgeDataFieldGetters {
    private bridgeContract;
    private constructor();
    static create(uniSwapAddress: EthAddress, provider: EthereumProvider): SyncUniswapBridgeData;
    getInteractionPresentValue(interactionNonce: bigint): Promise<AssetValue[]>;
    getAuxData(inputAssetA: AztecAsset, inputAssetB: AztecAsset, outputAssetA: AztecAsset, outputAssetB: AztecAsset): Promise<bigint[]>;
    getAuxDataLP(data: bigint[]): Promise<bigint[]>;
    auxDataConfig: AuxDataConfig[];
    enumToInt(inputAsset: AztecAsset): bigint;
    getExpectedOutput(inputAssetA: AztecAsset, inputAssetB: AztecAsset, outputAssetA: AztecAsset, outputAssetB: AztecAsset, auxData: bigint, precision: bigint): Promise<bigint[]>;
    getMarketSize(inputAssetA: AztecAsset, inputAssetB: AztecAsset, outputAssetA: AztecAsset, outputAssetB: AztecAsset, auxData: bigint): Promise<AssetValue[]>;
}
//# sourceMappingURL=uniswap-bridge-data.d.ts.map