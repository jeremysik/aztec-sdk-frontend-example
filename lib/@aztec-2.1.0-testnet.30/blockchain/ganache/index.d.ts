import { EthAddress } from '@aztec/barretenberg/address';
import { TxHash } from '@aztec/barretenberg/blockchain';
import { EthereumProvider } from '@aztec/barretenberg/blockchain';
import { ElementBridgeData } from '@aztec/bridge-clients/client-dest/src/client/element/element-bridge-data';
export declare const abis: {
    [key: string]: any;
};
export declare function retrieveEvents(contractAddress: EthAddress, contractName: string, provider: EthereumProvider, eventName: string, from: number, to?: number): Promise<import("@ethersproject/abi").LogDescription[]>;
export declare function decodeError(contractAddress: EthAddress, contractName: string, txHash: TxHash, provider: EthereumProvider): Promise<import("@aztec/barretenberg/blockchain").RevertError | undefined>;
export declare function decodeContractSelector(contractAddress: string, contractName: string, selector: string, provider: EthereumProvider): Promise<import("../contracts/decode_error").Fragment>;
export declare function getContractSelectors(contractAddress: EthAddress, contractName: string, provider: EthereumProvider, type?: string): Promise<{
    [key: string]: import("../contracts/decode_error").Fragment;
}>;
export declare const createElementBridgeData: (rollupAddress: EthAddress, elementBridgeAddress: EthAddress, provider: EthereumProvider) => Promise<ElementBridgeData>;
export declare function profileElement(rollupAddress: EthAddress, elementAddress: EthAddress, provider: EthereumProvider, from: number, to?: number): Promise<void>;
//# sourceMappingURL=index.d.ts.map