/// <reference types="node" />
import { AccountId } from '../account_id';
import { GrumpkinAddress } from '../address';
import { ServerBlockSource } from '../block_source';
import { BridgeId } from '../bridge_id';
import { Tx } from '../rollup_provider';
import { RollupProvider } from './rollup_provider';
export declare class ServerRollupProvider extends ServerBlockSource implements RollupProvider {
    constructor(baseUrl: URL, pollInterval?: number);
    sendTxs(txs: Tx[]): Promise<any>;
    getTxFees(assetId: number): Promise<import("../asset").AssetValue[][]>;
    getDefiFees(bridgeId: BridgeId): Promise<import("../asset").AssetValue[]>;
    getStatus(): Promise<import("./rollup_provider_status").RollupProviderStatus>;
    getPendingTxs(): Promise<any>;
    getPendingNoteNullifiers(): Promise<Buffer[]>;
    clientLog(log: any): Promise<void>;
    getInitialWorldState(): Promise<{
        initialAccounts: Buffer;
    }>;
    getLatestAccountNonce(accountPubKey: GrumpkinAddress): Promise<number>;
    getLatestAliasNonce(alias: string): Promise<number>;
    getAccountId(alias: string, accountNonce?: number): Promise<AccountId | undefined>;
    getUnsettledAccountTxs(): Promise<any>;
    getUnsettledPaymentTxs(): Promise<any>;
    private fetch;
}
//# sourceMappingURL=server_rollup_provider.d.ts.map