/// <reference types="node" />
import { EthAddress } from '@aztec/barretenberg/address';
import { EthereumProvider, EthereumSignature, SendTxOptions, TxHash, RollupTxs } from '@aztec/barretenberg/blockchain';
import { Block } from '@aztec/barretenberg/block_source';
import { Web3Provider } from '@ethersproject/providers';
import { Contract } from 'ethers';
/**
 * Thin wrapper around the rollup processor contract. Provides a direct 1 to 1 interface for
 * querying contract state, creating and sending transactions, and querying for rollup blocks.
 */
export declare class RollupProcessor {
    protected rollupContractAddress: EthAddress;
    private ethereumProvider;
    static readonly DEFAULT_BRIDGE_GAS_LIMIT = 300000;
    static readonly DEFAULT_ERC20_GAS_LIMIT = 55000;
    rollupProcessor: Contract;
    private lastQueriedRollupId?;
    private lastQueriedRollupBlockNum?;
    protected provider: Web3Provider;
    private log;
    constructor(rollupContractAddress: EthAddress, ethereumProvider: EthereumProvider);
    get address(): EthAddress;
    get contract(): Contract;
    verifier(): Promise<EthAddress>;
    dataSize(): Promise<number>;
    defiInteractionHashes(): Promise<Buffer[]>;
    asyncDefiInteractionHashes(): Promise<Buffer[]>;
    stateHash(): Promise<Buffer>;
    getSupportedBridge(bridgeAddressId: number): Promise<EthAddress>;
    getSupportedBridges(): Promise<{
        id: number;
        address: EthAddress;
        gasLimit: number;
    }[]>;
    getBridgeGasLimit(bridgeAddressId: number): Promise<number>;
    getSupportedAsset(assetId: number): Promise<EthAddress>;
    getSupportedAssets(): Promise<{
        address: EthAddress;
        gasLimit: number;
    }[]>;
    setVerifier(address: EthAddress, options?: SendTxOptions): Promise<TxHash>;
    setThirdPartyContractStatus(flag: boolean, options?: SendTxOptions): Promise<TxHash>;
    setSupportedBridge(bridgeAddress: EthAddress, bridgeGasLimit?: number, options?: SendTxOptions): Promise<TxHash>;
    setSupportedAsset(assetAddress: EthAddress, assetGasLimit?: number, options?: SendTxOptions): Promise<TxHash>;
    processAsyncDefiInteraction(interactionNonce: number, options?: SendTxOptions): Promise<TxHash>;
    getEscapeHatchStatus(): Promise<{
        escapeOpen: boolean;
        blocksRemaining: number;
    }>;
    createRollupProofTx(dataBuf: Buffer, signatures: Buffer[], offchainTxData: Buffer[]): Promise<Buffer>;
    /**
     * Given the raw "root verifier" data buffer returned by the proof generator, slice off the the broadcast
     * data and the proof data, encode the broadcast data, create a new buffer ready for a processRollup tx.
     * The given offchainTxData is chunked into multiple offchainData txs.
     * Openethereum will accept a maximum tx size of 300kb. Pick 280kb to allow for overheads.
     * Returns the txs to be published.
     */
    createRollupTxs(dataBuf: Buffer, signatures: Buffer[], offchainTxData: Buffer[], offchainChunkSize?: number): Promise<RollupTxs>;
    sendRollupTxs({ rollupProofTx, offchainDataTxs }: {
        rollupProofTx: Buffer;
        offchainDataTxs: Buffer[];
    }): Promise<void>;
    sendTx(data: Buffer, options?: SendTxOptions): Promise<TxHash>;
    depositPendingFunds(assetId: number, amount: bigint, proofHash?: Buffer, options?: SendTxOptions): Promise<TxHash>;
    depositPendingFundsPermit(assetId: number, amount: bigint, deadline: bigint, signature: EthereumSignature, proofHash?: Buffer, options?: SendTxOptions): Promise<TxHash>;
    depositPendingFundsPermitNonStandard(assetId: number, amount: bigint, nonce: bigint, deadline: bigint, signature: EthereumSignature, proofHash?: Buffer, options?: SendTxOptions): Promise<TxHash>;
    approveProof(proofHash: Buffer, options?: SendTxOptions): Promise<TxHash>;
    getProofApprovalStatus(address: EthAddress, txId: Buffer): Promise<boolean>;
    getUserPendingDeposit(assetId: number, account: EthAddress): Promise<bigint>;
    getThirdPartyContractStatus(options?: SendTxOptions): Promise<any>;
    private getEarliestBlock;
    /**
     * Returns all rollup blocks from (and including) the given rollupId, with >= minConfirmations.
     *
     * A normal geth node has terrible performance when searching event logs. To ensure we are not dependent
     * on third party services such as Infura, we apply an algorithm to mitigate the poor performance.
     * The algorithm will search for rollup events from the end of the chain, in chunks of blocks.
     * If it finds a rollup <= to the given rollupId, we can stop searching.
     *
     * The worst case situation is when requesting all rollups from rollup 0, or when there are no events to find.
     * In this case, we will have ever degrading performance as we search from the end of the chain to the
     * block returned by getEarliestBlock() (hardcoded on mainnet). This is a rare case however.
     *
     * The more normal case is we're given a rollupId that is not 0. In this case we know an event must exist.
     * Further, the usage pattern is that anyone making the request will be doing so with an ever increasing rollupId.
     * This lends itself well to searching backwards from the end of the chain.
     *
     * The chunk size affects performance. If no previous query has been made, or the rollupId < the previous requested
     * rollupId, the chunk size is to 100,000. This is the case when the class is queried the first time.
     * 100,000 blocks is ~10 days of blocks, so assuming there's been a rollup in the last 10 days, or the client is not
     * over 10 days behind, a single query will suffice. Benchmarks suggest this will take ~2 seconds per chunk.
     *
     * If a previous query has been made and the rollupId >= previous query, the first chunk will be from the last result
     * rollups block to the end of the chain. This provides best performance for polling clients.
     */
    getRollupBlocksFrom(rollupId: number, minConfirmations: number): Promise<Block[]>;
    /**
     * The same as getRollupBlocksFrom, but just search for a specific rollup.
     * If `rollupId == -1` return the latest rollup.
     */
    getRollupBlock(rollupId: number): Promise<Block | undefined>;
    /**
     * Given an array of rollup events, fetches all the necessary data for each event in order to return a Block.
     * This somewhat arbitrarily chunks the requests 10 at a time, as that ensures we don't overload the node by
     * hitting it with thousands of requests at once, while also enabling some degree of parallelism.
     * WARNING: `rollupEvents` is mutated.
     */
    private getRollupBlocksFromEvents;
    private extractDefiHashesFromRollupEvent;
    private getDefiBridgeEventsForRollupEvents;
    private getOffchainDataEvents;
    private decodeBlock;
    protected getContractWithSigner(options: SendTxOptions): Contract;
    estimateGas(data: Buffer): Promise<number>;
    getRevertError(txHash: TxHash): Promise<import("@aztec/barretenberg/blockchain").RevertError | undefined>;
}
//# sourceMappingURL=rollup_processor.d.ts.map