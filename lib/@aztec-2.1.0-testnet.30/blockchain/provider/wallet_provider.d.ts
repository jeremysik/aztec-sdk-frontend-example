/// <reference types="node" />
import { EthereumProvider, ProviderConnectInfo, ProviderMessage, ProviderRpcError, RequestArguments } from '@aztec/barretenberg/blockchain/ethereum_provider';
import { EthAddress } from '@aztec/barretenberg/address';
/**
 * Given an EIP1193 provider, wraps it, and provides the ability to add local accounts.
 */
export declare class WalletProvider implements EthereumProvider {
    private provider;
    private accounts;
    constructor(provider: EthereumProvider);
    static fromHost(ethereumHost: string): WalletProvider;
    addAccount(privateKey: Buffer): EthAddress;
    addAccountFromSeed(mnemonic: string, path: string): EthAddress;
    private addEthersWallet;
    getAccounts(): EthAddress[];
    getAccount(account: number): EthAddress;
    getPrivateKey(account: number): Buffer;
    getPrivateKeyForAddress(account: EthAddress): Buffer | undefined;
    request(args: RequestArguments): Promise<any>;
    private personalSign;
    private sign;
    private signTypedData;
    /**
     * Given a tx in Eth Json Rpc format, convert to ethers format and give to account to sign.
     * Populate any missing fields.
     */
    private signTxLocally;
    private signTransaction;
    private sendTransaction;
    on(notification: 'connect', listener: (connectInfo: ProviderConnectInfo) => void): this;
    on(notification: 'disconnect', listener: (error: ProviderRpcError) => void): this;
    on(notification: 'chainChanged', listener: (chainId: string) => void): this;
    on(notification: 'accountsChanged', listener: (accounts: string[]) => void): this;
    on(notification: 'message', listener: (message: ProviderMessage) => void): this;
    removeListener(notification: 'connect', listener: (connectInfo: ProviderConnectInfo) => void): this;
    removeListener(notification: 'disconnect', listener: (error: ProviderRpcError) => void): this;
    removeListener(notification: 'chainChanged', listener: (chainId: string) => void): this;
    removeListener(notification: 'accountsChanged', listener: (accounts: string[]) => void): this;
    removeListener(notification: 'message', listener: (message: ProviderMessage) => void): this;
}
//# sourceMappingURL=wallet_provider.d.ts.map