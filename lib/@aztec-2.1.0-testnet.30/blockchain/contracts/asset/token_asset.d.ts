import { EthAddress } from '@aztec/barretenberg/address';
import { Asset, BlockchainAsset, EthereumProvider, SendTxOptions, TxHash } from '@aztec/barretenberg/blockchain';
import { Contract } from 'ethers';
export declare class TokenAsset implements Asset {
    private readonly info;
    private readonly erc20;
    private readonly ethereumProvider;
    private readonly minConfirmations;
    private readonly precision;
    constructor(info: BlockchainAsset, erc20: Contract, ethereumProvider: EthereumProvider, minConfirmations?: number);
    static new(info: BlockchainAsset, ethereumProvider: EthereumProvider, minConfirmations?: number): TokenAsset;
    static fromAddress(address: EthAddress, ethereumProvider: EthereumProvider, gasLimit: number, minConfirmations?: number): Promise<TokenAsset>;
    get address(): EthAddress;
    getStaticInfo(): BlockchainAsset;
    getUserNonce(account: EthAddress): Promise<bigint>;
    balanceOf(account: EthAddress): Promise<bigint>;
    allowance(owner: EthAddress, receiver: EthAddress): Promise<bigint>;
    approve(value: bigint, owner: EthAddress, receiver: EthAddress, options?: SendTxOptions): Promise<TxHash>;
    mint(value: bigint, account: EthAddress, options?: SendTxOptions): Promise<TxHash>;
    transfer(value: bigint, from: EthAddress, to: EthAddress, options?: SendTxOptions): Promise<TxHash>;
    fromBaseUnits(value: bigint, precision?: number): string;
    toBaseUnits(value: string): bigint;
    private getContractWithSigner;
}
//# sourceMappingURL=token_asset.d.ts.map