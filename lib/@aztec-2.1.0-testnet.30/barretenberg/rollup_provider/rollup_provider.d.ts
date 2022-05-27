/// <reference types="node" />
import { AccountId } from '../account_id';
import { GrumpkinAddress } from '../address';
import { AssetValue } from '../asset';
import { BlockSource } from '../block_source';
import { BridgeId } from '../bridge_id';
import { AccountProofData, JoinSplitProofData } from '../client_proofs';
import { OffchainAccountData, OffchainJoinSplitData } from '../offchain_tx_data';
import { TxId } from '../tx_id';
import { RollupProviderStatus } from './rollup_provider_status';
export declare enum TxSettlementTime {
    NEXT_ROLLUP = 0,
    INSTANT = 1
}
export declare enum DefiSettlementTime {
    DEADLINE = 0,
    NEXT_ROLLUP = 1,
    INSTANT = 2
}
export interface Tx {
    proofData: Buffer;
    offchainTxData: Buffer;
    depositSignature?: Buffer;
}
export interface TxJson {
    proofData: string;
    offchainTxData: string;
    depositSignature?: string;
}
export declare const txToJson: ({ proofData, offchainTxData, depositSignature }: Tx) => TxJson;
export declare const txFromJson: ({ proofData, offchainTxData, depositSignature }: TxJson) => Tx;
export interface PendingTx {
    txId: TxId;
    noteCommitment1: Buffer;
    noteCommitment2: Buffer;
}
export interface PendingTxJson {
    txId: string;
    noteCommitment1: string;
    noteCommitment2: string;
}
export declare const pendingTxToJson: ({ txId, noteCommitment1, noteCommitment2 }: PendingTx) => PendingTxJson;
export declare const pendingTxFromJson: ({ txId, noteCommitment1, noteCommitment2 }: PendingTxJson) => PendingTx;
export interface InitialWorldState {
    initialAccounts: Buffer;
}
export interface AccountTx {
    proofData: AccountProofData;
    offchainTxData: OffchainAccountData;
}
export interface AccountTxJson {
    proofData: string;
    offchainTxData: string;
}
export declare const accountTxToJson: ({ proofData, offchainTxData }: AccountTx) => AccountTxJson;
export declare const accountTxFromJson: ({ proofData, offchainTxData }: AccountTxJson) => AccountTx;
export interface JoinSplitTx {
    proofData: JoinSplitProofData;
    offchainTxData: OffchainJoinSplitData;
}
export interface JoinSplitTxJson {
    proofData: string;
    offchainTxData: string;
}
export declare const joinSplitTxToJson: ({ proofData, offchainTxData }: JoinSplitTx) => JoinSplitTxJson;
export declare const joinSplitTxFromJson: ({ proofData, offchainTxData }: JoinSplitTxJson) => JoinSplitTx;
export interface RollupProvider extends BlockSource {
    sendTxs(txs: Tx[]): Promise<TxId[]>;
    getStatus(): Promise<RollupProviderStatus>;
    getTxFees(assetId: number): Promise<AssetValue[][]>;
    getDefiFees(bridgeId: BridgeId): Promise<AssetValue[]>;
    getPendingTxs: () => Promise<PendingTx[]>;
    getPendingNoteNullifiers: () => Promise<Buffer[]>;
    clientLog: (msg: any) => Promise<void>;
    getInitialWorldState(): Promise<InitialWorldState>;
    getLatestAccountNonce(accountPubKey: GrumpkinAddress): Promise<number>;
    getLatestAliasNonce(alias: string): Promise<number>;
    getAccountId(alias: string, accountNonce?: number): Promise<AccountId | undefined>;
    getUnsettledAccountTxs: () => Promise<AccountTx[]>;
    getUnsettledPaymentTxs: () => Promise<JoinSplitTx[]>;
}
//# sourceMappingURL=rollup_provider.d.ts.map