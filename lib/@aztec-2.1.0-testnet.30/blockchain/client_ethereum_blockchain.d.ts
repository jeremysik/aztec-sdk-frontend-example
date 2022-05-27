/// <reference types="node" />
import { EthAddress } from '@aztec/barretenberg/address';
import { Asset, BlockchainAsset, BlockchainBridge, EthereumProvider, EthereumSignature, SendTxOptions, TxHash } from '@aztec/barretenberg/blockchain';
export declare class ClientEthereumBlockchain {
    private readonly bridges;
    private readonly ethereumProvider;
    private readonly minConfirmations;
    private readonly rollupProcessor;
    private readonly provider;
    private assets;
    constructor(rollupContractAddress: EthAddress, assets: BlockchainAsset[], bridges: BlockchainBridge[], ethereumProvider: EthereumProvider, minConfirmations: number);
    getChainId(): Promise<number>;
    getAsset(assetId: number): Asset;
    getAssetIdByAddress(address: EthAddress, gasLimit?: number): number;
    getAssetIdBySymbol(symbol: string, gasLimit?: number): number;
    getBridgeAddressId(address: EthAddress, gasLimit?: number): number;
    getUserPendingDeposit(assetId: number, account: EthAddress): Promise<bigint>;
    getUserProofApprovalStatus(account: EthAddress, txId: Buffer): Promise<boolean>;
    depositPendingFunds(assetId: number, amount: bigint, proofHash?: Buffer, options?: SendTxOptions): Promise<TxHash>;
    depositPendingFundsPermit(assetId: number, amount: bigint, deadline: bigint, signature: EthereumSignature, proofHash?: Buffer, options?: SendTxOptions): Promise<TxHash>;
    depositPendingFundsPermitNonStandard(assetId: number, amount: bigint, nonce: bigint, deadline: bigint, signature: EthereumSignature, proofHash?: Buffer, options?: SendTxOptions): Promise<TxHash>;
    approveProof(txId: Buffer, options?: SendTxOptions): Promise<TxHash>;
    processAsyncDefiInteraction(interactionNonce: number, options?: SendTxOptions): Promise<TxHash>;
    isContract(address: EthAddress): Promise<boolean>;
    setSupportedAsset(assetAddress: EthAddress, assetGasLimit?: number, options?: SendTxOptions): Promise<TxHash>;
    setSupportedBridge(bridgeAddress: EthAddress, bridgeGasLimit?: number, options?: SendTxOptions): Promise<TxHash>;
    /**
     * Wait for given transaction to be mined, and return receipt.
     */
    getTransactionReceipt(txHash: TxHash, interval?: number, timeout?: number, minConfirmations?: number): Promise<{
        status: boolean;
        blockNum: number;
    }>;
}
//# sourceMappingURL=client_ethereum_blockchain.d.ts.map