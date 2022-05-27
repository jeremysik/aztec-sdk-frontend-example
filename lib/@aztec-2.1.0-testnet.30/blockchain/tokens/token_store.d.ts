import { EthereumProvider } from '@aztec/barretenberg/blockchain';
import { EthAddress } from '@aztec/barretenberg/address';
export declare class TokenStore {
    private provider;
    private providerContract?;
    private registryContract?;
    private factoryContract?;
    private ethersProvider;
    private constructor();
    private init;
    static create(provider: EthereumProvider): Promise<TokenStore>;
    private logAllStablePools;
    private logAllMetaPools;
    private depositToStablePool;
    private findPreferredAssset;
    private depositToMetaPool;
    private getPoolForLpToken;
    private isMetaPool;
    /**
     * Will attempt to purchase or mint tokens from uniswap or curve
     * The desired token is specified by the erc20 address and quantity
     * We will attempt to achieve this quantity by
     * 1. Attempting to purchase from uniswap if it is one of our supported uniswap assets or
     * 2. Attempting to deposit to a curve pool and minting the requested tokens, this may first require us to purchase a stablecoin from uniswap
     *
     * In the case of 1 above, we ask uniswap for outputToken.amount of the requested asset and specify amountInMaximum as the maximum amount to spend
     *
     * In the case of 2 above. If we have to purchase a stable coin then we ask uniswap for outputToken.amount of the stable coin and specify amountInMaximum as the maximum amount to spend
     * Once we have the stablecoin, we deposit it all into curve to extract the lp tokens. If we don't need to purchase a stable coin, then we deposit outputToken.amount of ETH/WETH
     * to curve and mint the resulting tokens.
     */
    purchase(spender: EthAddress, recipient: EthAddress, outputToken: {
        erc20Address: EthAddress;
        amount: bigint;
    }, amountInMaximum: bigint): Promise<bigint>;
}
//# sourceMappingURL=token_store.d.ts.map