import { EthAddress } from '../address';
import { EthereumProvider } from './ethereum_provider';
import { TxHash } from './tx_hash';
export declare class EthereumRpc {
    private provider;
    constructor(provider: EthereumProvider);
    getChainId(): Promise<number>;
    getAccounts(): Promise<EthAddress[]>;
    getTransactionCount(addr: EthAddress): Promise<number>;
    getBalance(addr: EthAddress): Promise<bigint>;
    /**
     * TODO: Return proper type with converted properties.
     */
    getTransactionByHash(txHash: TxHash): Promise<any>;
}
//# sourceMappingURL=ethereum_rpc.d.ts.map