import { AssetValue, BridgeDataFieldGetters, AuxDataConfig, AztecAsset } from '../bridge-data';
import { EthereumProvider } from '@aztec/barretenberg/blockchain';
import { EthAddress } from '@aztec/barretenberg/address';
export declare class AsyncUniswapBridgeData implements BridgeDataFieldGetters {
    private bridgeContract;
    private constructor();
    static create(uniSwapAddress: EthAddress, provider: EthereumProvider): AsyncUniswapBridgeData;
    getInteractionPresentValue(interactionNonce: bigint): Promise<AssetValue[]>;
    getAuxData(inputAssetA: AztecAsset, inputAssetB: AztecAsset, outputAssetA: AztecAsset, outputAssetB: AztecAsset): Promise<bigint[]>;
    auxDataConfig: AuxDataConfig[];
    getExpectedOutput(inputAssetA: AztecAsset, inputAssetB: AztecAsset, outputAssetA: AztecAsset, outputAssetB: AztecAsset, auxData: bigint, precision: bigint): Promise<bigint[]>;
    getMarketSize(inputAssetA: AztecAsset, inputAssetB: AztecAsset, outputAssetA: AztecAsset, outputAssetB: AztecAsset, auxData: bigint): Promise<AssetValue[]>;
    getAuxDataLP(data: bigint[]): Promise<bigint[]>;
    getExpiration(interactionNonce: bigint): Promise<bigint>;
    hasFinalised(interactionNonce: bigint): Promise<Boolean>;
}
//# sourceMappingURL=async-uniswap-bridge-data.d.ts.map