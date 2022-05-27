import { Block } from '@aztec/barretenberg/block_source';
import { Pedersen } from '@aztec/barretenberg/crypto';
/**
 * Block Context is designed to wrap a block received from the rollup provider
 * and percolate through the sdk, existing for the duration that the block is 'processed'.
 * It provides an opportunity for 'once per block' caching/optimsation across all entities interested in the block
 * Requires mutex protection due to the concurrent nature of user states
 */
export declare class BlockContext {
    block: Block;
    private pedersen;
    private subtree?;
    private mutex;
    private startIndex?;
    constructor(block: Block, pedersen: Pedersen);
    /**
     * Provides the hash path at the given index of the block's immutable sub-tree
     * Will validate that the index provided is within the range encapsulated by the sub-tree
     * Lazy initialises the sub-tree from the rollup's input notes so the tree is built
     * at most once
     */
    getBlockSubtreeHashPath(index: number): Promise<import("@aztec/barretenberg/merkle_tree").HashPath>;
}
//# sourceMappingURL=block_context.d.ts.map