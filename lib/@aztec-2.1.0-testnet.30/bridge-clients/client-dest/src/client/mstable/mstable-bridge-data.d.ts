import { AuxDataConfig, AztecAsset, BridgeDataFieldGetters } from '../bridge-data';
import { EthereumProvider } from '@aztec/barretenberg/blockchain';
import { EthAddress } from '@aztec/barretenberg/address';
export declare class MStableBridgeData implements BridgeDataFieldGetters {
    private mStableSavingsContract;
    private mStableAssetContract;
    private dai;
    scalingFactor: bigint;
    private constructor();
    static create(provider: EthereumProvider, mStableSavingsAddress: EthAddress, mStableAssetAddress: EthAddress): MStableBridgeData;
    getAuxData(inputAssetA: AztecAsset, inputAssetB: AztecAsset, outputAssetA: AztecAsset, outputAssetB: AztecAsset): Promise<bigint[]>;
    auxDataConfig: AuxDataConfig[];
    getExpectedOutput(inputAssetA: AztecAsset, inputAssetB: AztecAsset, outputAssetA: AztecAsset, outputAssetB: AztecAsset, auxData: bigint, precision: bigint): Promise<bigint[]>;
    getExpectedYield(inputAssetA: AztecAsset, inputAssetB: AztecAsset, outputAssetA: AztecAsset, outputAssetB: AztecAsset, auxData: bigint, precision: bigint): Promise<number[]>;
}
//# sourceMappingURL=mstable-bridge-data.d.ts.map