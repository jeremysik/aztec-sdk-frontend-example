/// <reference types="node" />
import { EthAddress } from '../address';
export declare enum TxType {
    DEPOSIT = 0,
    TRANSFER = 1,
    WITHDRAW_TO_WALLET = 2,
    WITHDRAW_TO_CONTRACT = 3,
    ACCOUNT = 4,
    DEFI_DEPOSIT = 5,
    DEFI_CLAIM = 6
}
export declare function isDefiDeposit(txType: TxType): boolean;
export declare function isAccountCreation(txType: TxType): boolean;
export interface BlockchainAsset {
    address: EthAddress;
    decimals: number;
    symbol: string;
    name: string;
    gasLimit: number;
}
export interface BlockchainAssetJson {
    address: string;
    decimals: number;
    symbol: string;
    name: string;
    gasLimit: number;
}
export declare const blockchainAssetToJson: ({ address, ...asset }: BlockchainAsset) => BlockchainAssetJson;
export declare const blockchainAssetFromJson: ({ address, ...asset }: BlockchainAssetJson) => BlockchainAsset;
export interface BlockchainBridge {
    id: number;
    address: EthAddress;
    gasLimit: number;
}
export interface BlockchainBridgeJson {
    id: number;
    address: string;
    gasLimit: number;
}
export declare const blockchainBridgeToJson: ({ address, ...bridge }: BlockchainBridge) => BlockchainBridgeJson;
export declare const blockchainBridgeFromJson: ({ address, ...bridge }: BlockchainBridgeJson) => BlockchainBridge;
export interface BlockchainStatus {
    chainId: number;
    rollupContractAddress: EthAddress;
    feeDistributorContractAddress: EthAddress;
    verifierContractAddress: EthAddress;
    nextRollupId: number;
    dataSize: number;
    dataRoot: Buffer;
    nullRoot: Buffer;
    rootRoot: Buffer;
    defiRoot: Buffer;
    defiInteractionHashes: Buffer[];
    escapeOpen: boolean;
    allowThirdPartyContracts: boolean;
    numEscapeBlocksRemaining: number;
    assets: BlockchainAsset[];
    bridges: BlockchainBridge[];
}
export interface BlockchainStatusJson {
    chainId: number;
    rollupContractAddress: string;
    feeDistributorContractAddress: string;
    verifierContractAddress: string;
    nextRollupId: number;
    dataSize: number;
    dataRoot: string;
    nullRoot: string;
    rootRoot: string;
    defiRoot: string;
    defiInteractionHashes: string[];
    escapeOpen: boolean;
    allowThirdPartyContracts: boolean;
    numEscapeBlocksRemaining: number;
    assets: BlockchainAssetJson[];
    bridges: BlockchainBridgeJson[];
}
export declare function blockchainStatusToJson(status: BlockchainStatus): BlockchainStatusJson;
export declare function blockchainStatusFromJson(json: BlockchainStatusJson): BlockchainStatus;
export interface BlockchainStatusSource {
    getBlockchainStatus(): BlockchainStatus;
}
//# sourceMappingURL=blockchain_status.d.ts.map