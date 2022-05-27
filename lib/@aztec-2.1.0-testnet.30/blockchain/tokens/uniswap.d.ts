import { EthereumProvider } from '@aztec/barretenberg/blockchain';
import { EthAddress } from '@aztec/barretenberg/address';
export declare const addressesAreSame: (a: string, b: string) => boolean;
export declare const fixEthersStackTrace: (err: Error) => never;
export declare class Uniswap {
    private provider;
    private contract;
    private ethersProvider;
    constructor(provider: EthereumProvider);
    static isSupportedAsset(assetAddress: EthAddress): boolean;
    getAddress(): string;
    swapFromEth(spender: EthAddress, recipient: EthAddress, token: {
        erc20Address: EthAddress;
        amount: bigint;
    }, amountInMaximum: bigint): Promise<bigint>;
}
//# sourceMappingURL=uniswap.d.ts.map