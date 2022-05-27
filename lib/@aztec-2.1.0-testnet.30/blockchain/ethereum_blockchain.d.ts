/// <reference types="node" />
import { EthAddress } from '@aztec/barretenberg/address';
import { Blockchain, BlockchainStatus, EthereumProvider, Receipt, SendTxOptions, TxHash, TypedData } from '@aztec/barretenberg/blockchain';
import { Block } from '@aztec/barretenberg/block_source';
import { EventEmitter } from 'events';
import { Contracts } from './contracts/contracts';
export interface EthereumBlockchainConfig {
    console?: boolean;
    gasLimit?: number;
    minConfirmation?: number;
    minConfirmationEHW?: number;
    pollInterval?: number;
}
/**
 * Implementation of primary blockchain interface.
 * Provides higher level functionality above directly interfacing with contracts, e.g.:
 * - An asynchronous interface for subscribing to rollup events.
 * - A status query method for providing a complete snapshot of current rollup blockchain state.
 * - Abstracts away chain re-org concerns by ensuring appropriate confirmations for given situations.
 */
export declare class EthereumBlockchain extends EventEmitter implements Blockchain {
    private config;
    private contracts;
    private running;
    private runningPromise?;
    private latestEthBlock;
    private latestRollupId;
    private status;
    private log;
    private static readonly DEFAULT_MIN_CONFIRMATIONS;
    private static readonly DEFAULT_MIN_CONFIRMATIONS_EHW;
    constructor(config: EthereumBlockchainConfig, contracts: Contracts);
    static new(config: EthereumBlockchainConfig, rollupContractAddress: EthAddress, feeDistributorAddress: EthAddress, priceFeedContractAddresses: EthAddress[], provider: EthereumProvider): Promise<EthereumBlockchain>;
    getProvider(): EthereumProvider;
    /**
     * Initialises the status object. Requires querying for the latest rollup block from the blockchain.
     * This could take some time given how `getRollupBlock` searches backwards over the chain.
     */
    init(): Promise<void>;
    /**
     * Start polling for RollupProcessed events.
     * All historical blocks will have been emitted before this function returns.
     */
    start(fromRollup?: number): Promise<void>;
    /**
     * Stop polling for RollupProcessed events
     */
    stop(): Promise<void>;
    /**
     * Get the status of the rollup contract
     */
    getBlockchainStatus(): BlockchainStatus;
    private getPerRollupState;
    private getPerEthBlockState;
    private updatePerRollupState;
    private updatePerEthBlockState;
    getLatestRollupId(): number;
    getUserPendingDeposit(assetId: number, account: EthAddress): Promise<bigint>;
    getUserProofApprovalStatus(account: EthAddress, txId: Buffer): Promise<boolean>;
    createRollupTxs(dataBuf: Buffer, signatures: Buffer[], offchainTxData: Buffer[]): Promise<import("@aztec/barretenberg/blockchain").RollupTxs>;
    sendTx(tx: Buffer, options?: SendTxOptions): Promise<TxHash>;
    private getRequiredConfirmations;
    /**
     * Get all created rollup blocks from `rollupId`.
     */
    getBlocks(rollupId: number): Promise<Block[]>;
    /**
     * Wait for given transaction to be mined, and return receipt.
     * Timeout is only considered for pending txs. i.e. If there is at least 1 confirmation, the timeout disables.
     * Timeout can be detected because Receipt blockNum will be undefined.
     */
    getTransactionReceipt(txHash: TxHash, timeoutSeconds?: number, confs?: number): Promise<Receipt>;
    getTransactionReceiptSafe(txHash: TxHash, timeoutSeconds?: number): Promise<Receipt>;
    /**
     * Validate locally that a signature was produced by a publicOwner
     */
    validateSignature(publicOwner: EthAddress, signature: Buffer, signingData: Buffer): boolean;
    signPersonalMessage(message: Buffer, address: EthAddress): Promise<Buffer>;
    signMessage(message: Buffer, address: EthAddress): Promise<Buffer>;
    signTypedData(data: TypedData, address: EthAddress): Promise<import("@aztec/barretenberg/blockchain").EthereumSignature>;
    getAssetPrice(assetId: number): Promise<bigint>;
    getPriceFeed(assetId: number): import("@aztec/barretenberg/blockchain").PriceFeed;
    getGasPriceFeed(): import("./contracts").GasPriceFeed;
    isContract(address: EthAddress): Promise<boolean>;
    estimateGas(data: Buffer): Promise<number>;
    getChainId(): Promise<number>;
    getRollupBalance(assetId: number): Promise<bigint>;
    getFeeDistributorBalance(assetId: number): Promise<bigint>;
    getFeeData(): Promise<import("@aztec/barretenberg/blockchain").FeeData>;
    getBridgeGas(bridgeId: bigint): number;
}
//# sourceMappingURL=ethereum_blockchain.d.ts.map