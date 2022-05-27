export * from './token_store';
export * from './mainnet_addresses';
import { EthereumProvider } from '@aztec/barretenberg/blockchain';
import { EthAddress } from '@aztec/barretenberg/address';
export declare function purchaseTokens(tokenAddress: EthAddress, quantityToPurchase: bigint, maximumAmountToSpend: bigint, provider: EthereumProvider, spender: EthAddress, recipient?: EthAddress): Promise<bigint | undefined>;
export declare function getTokenBalance(tokenAddress: EthAddress, owner: EthAddress, ethereumProvider: EthereumProvider): Promise<any>;
export declare function getTokenAllowance(tokenAddress: EthAddress, owner: EthAddress, spender: EthAddress, ethereumProvider: EthereumProvider): Promise<any>;
export declare function approveToken(tokenAddress: EthAddress, owner: EthAddress, spender: EthAddress, ethereumProvider: EthereumProvider, amount: bigint): Promise<void>;
export declare function transferToken(tokenAddress: EthAddress, spender: EthAddress, recipient: EthAddress, ethereumProvider: EthereumProvider, amount: bigint): Promise<void>;
export declare function approveWeth(owner: EthAddress, spender: EthAddress, amount: bigint, ethereumProvider: EthereumProvider): Promise<void>;
export declare function getWethBalance(owner: EthAddress, ethereumProvider: EthereumProvider): Promise<any>;
export declare function depositToWeth(spender: EthAddress, amount: bigint, ethereumProvider: EthereumProvider): Promise<void>;
//# sourceMappingURL=index.d.ts.map