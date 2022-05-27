/// <reference types="node" />
import { EthAddress } from '@aztec/barretenberg/address';
import { Asset, EthereumProvider, FeeData, PriceFeed, SendTxOptions, TxHash, TypedData } from '@aztec/barretenberg/blockchain';
import { FeeDistributor } from './fee_distributor';
import { GasPriceFeed } from './price_feed';
import { RollupProcessor } from './rollup_processor';
/**
 * Facade around all Aztec smart contract classes.
 * Provides a factory function `fromAddresses` to simplify construction of all contract classes.
 * Exposes a more holistic interface to clients, than having to deal with individual contract classes.
 */
export declare class Contracts {
    private readonly rollupProcessor;
    private readonly feeDistributor;
    private assets;
    private readonly gasPriceFeed;
    private readonly priceFeeds;
    private readonly ethereumProvider;
    private readonly confirmations;
    private readonly provider;
    private readonly ethereumRpc;
    constructor(rollupProcessor: RollupProcessor, feeDistributor: FeeDistributor, assets: Asset[], gasPriceFeed: GasPriceFeed, priceFeeds: PriceFeed[], ethereumProvider: EthereumProvider, confirmations: number);
    static fromAddresses(rollupContractAddress: EthAddress, feeDistributorAddress: EthAddress, priceFeedContractAddresses: EthAddress[], ethereumProvider: EthereumProvider, confirmations: number): Contracts;
    init(): Promise<void>;
    getProvider(): EthereumProvider;
    updateAssets(): Promise<void>;
    getPerRollupState(): Promise<{
        defiInteractionHashes: Buffer[];
    }>;
    getPerBlockState(): Promise<{
        escapeOpen: boolean;
        numEscapeBlocksRemaining: number;
        allowThirdPartyContracts: any;
    }>;
    getRollupBalance(assetId: number): Promise<bigint>;
    getFeeDistributorBalance(assetId: number): Promise<bigint>;
    getRollupContractAddress(): EthAddress;
    getFeeDistributorContractAddress(): EthAddress;
    getVerifierContractAddress(): Promise<EthAddress>;
    createRollupTxs(dataBuf: Buffer, signatures: Buffer[], offchainTxData: Buffer[]): Promise<import("@aztec/barretenberg/blockchain").RollupTxs>;
    sendTx(data: Buffer, options?: SendTxOptions): Promise<TxHash>;
    estimateGas(data: Buffer): Promise<number>;
    getRollupBlocksFrom(rollupId: number, minConfirmations?: number): Promise<import("@aztec/barretenberg/block_source").Block[]>;
    getRollupBlock(rollupId: number): Promise<import("@aztec/barretenberg/block_source").Block | undefined>;
    getUserPendingDeposit(assetId: number, account: EthAddress): Promise<bigint>;
    getTransactionByHash(txHash: TxHash): Promise<any>;
    getTransactionReceipt(txHash: TxHash): Promise<import("@ethersproject/abstract-provider").TransactionReceipt>;
    getChainId(): Promise<number>;
    getBlockNumber(): Promise<number>;
    signPersonalMessage(message: Buffer, address: EthAddress): Promise<Buffer>;
    signMessage(message: Buffer, address: EthAddress): Promise<Buffer>;
    signTypedData(data: TypedData, address: EthAddress): Promise<import("@aztec/barretenberg/blockchain").EthereumSignature>;
    getAssetPrice(assetId: number): Promise<bigint>;
    getPriceFeed(assetId: number): PriceFeed;
    getGasPriceFeed(): GasPriceFeed;
    getUserProofApprovalStatus(address: EthAddress, txId: Buffer): Promise<boolean>;
    isContract(address: EthAddress): Promise<boolean>;
    getFeeData(): Promise<FeeData>;
    getAssets(): import("@aztec/barretenberg/blockchain").BlockchainAsset[];
    getSupportedBridges(): Promise<{
        id: number;
        address: EthAddress;
        gasLimit: number;
    }[]>;
    getRevertError(txHash: TxHash): Promise<import("@aztec/barretenberg/blockchain").RevertError | undefined>;
}
//# sourceMappingURL=contracts.d.ts.map