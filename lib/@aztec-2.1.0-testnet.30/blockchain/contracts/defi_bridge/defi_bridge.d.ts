import { EthAddress } from '@aztec/barretenberg/address';
import { EthereumProvider, SendTxOptions } from '@aztec/barretenberg/blockchain';
import { Contract } from 'ethers';
export declare class DefiBridge {
    address: EthAddress;
    private defaultOptions;
    readonly contract: Contract;
    private provider;
    constructor(address: EthAddress, provider: EthereumProvider, defaultOptions?: SendTxOptions);
    finalise(inputAsset: EthAddress, outputAssetA: EthAddress, outputAssetB: EthAddress, bitConfig: number, interactionNonce: number, options?: SendTxOptions): Promise<import("@aztec/barretenberg/blockchain").TxHash>;
}
//# sourceMappingURL=defi_bridge.d.ts.map