import { EthereumProvider } from '@aztec/barretenberg/blockchain';
export declare function getCurrentBlockNumber(provider: EthereumProvider): Promise<number>;
export declare function blocksToAdvance(target: number, accuracy: number, provider: EthereumProvider): Promise<number>;
export declare function advanceBlocks(blocks: number, provider: EthereumProvider): Promise<number>;
export declare function getCurrentBlockTime(provider: EthereumProvider): Promise<number>;
export declare function setBlockchainTime(unixTimestamp: number, provider: EthereumProvider): Promise<void>;
//# sourceMappingURL=manipulate_blocks.d.ts.map