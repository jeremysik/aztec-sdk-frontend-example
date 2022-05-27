import { EthAddress } from '@aztec/barretenberg/address';
import { Asset, EthereumProvider, SendTxOptions, TxHash } from '@aztec/barretenberg/blockchain';
export declare class EthAsset implements Asset {
    private minConfirmations;
    private provider;
    constructor(provider: EthereumProvider, minConfirmations?: number);
    getStaticInfo(): {
        address: EthAddress;
        name: string;
        symbol: string;
        decimals: number;
        gasLimit: number;
    };
    getUserNonce(account: EthAddress): Promise<bigint>;
    balanceOf(account: EthAddress): Promise<bigint>;
    allowance(owner: EthAddress, receiver: EthAddress): Promise<bigint>;
    approve(value: bigint, owner: EthAddress, receiver: EthAddress): Promise<TxHash>;
    mint(value: bigint, account: EthAddress): Promise<TxHash>;
    transfer(value: bigint, from: EthAddress, to: EthAddress, options?: SendTxOptions): Promise<TxHash>;
    fromBaseUnits(value: bigint, precision?: number): string;
    toBaseUnits(value: string): bigint;
}
//# sourceMappingURL=eth_asset.d.ts.map