import { EthereumProvider } from '@aztec/barretenberg/blockchain';
import { BananaCoreSdkOptions, StrawberryCoreSdkOptions, VanillaCoreSdkOptions } from '../core_sdk_flavours';
import { AztecSdk } from './aztec_sdk';
export declare enum SdkFlavour {
    PLAIN = 0,
    SHARED_WORKER = 1,
    HOSTED = 2
}
declare type BlockchainOptions = {
    minConfirmation?: number;
};
export declare type CreateSharedWorkerSdkOptions = BlockchainOptions & BananaCoreSdkOptions;
export declare type CreateHostedSdkOptions = BlockchainOptions & StrawberryCoreSdkOptions;
export declare type CreatePlainSdkOptions = BlockchainOptions & VanillaCoreSdkOptions;
export declare type CreateSdkOptions = CreateSharedWorkerSdkOptions & CreateHostedSdkOptions & CreatePlainSdkOptions & {
    flavour?: SdkFlavour;
};
/**
 * Creates an AztecSdk that is backed by a CoreSdk that runs inside a shared worker.
 */
export declare function createSharedWorkerSdk(ethereumProvider: EthereumProvider, options: CreateSharedWorkerSdkOptions): Promise<AztecSdk>;
/**
 * Creates an AztecSdk that is backed by a CoreSdk that is hosted on another domain, via an iframe.
 */
export declare function createHostedAztecSdk(ethereumProvider: EthereumProvider, options: CreateHostedSdkOptions): Promise<AztecSdk>;
/**
 * Creates an AztecSdk that is backed directly by a CoreSdk (no iframe, no shared worker).
 */
export declare function createPlainAztecSdk(ethereumProvider: EthereumProvider, options: CreatePlainSdkOptions): Promise<AztecSdk>;
export declare function createAztecSdk(ethereumProvider: EthereumProvider, options: CreateSdkOptions): Promise<AztecSdk>;
export {};
//# sourceMappingURL=create_aztec_sdk.d.ts.map