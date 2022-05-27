"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockContext = void 0;
const merkle_tree_1 = require("@aztec/barretenberg/merkle_tree");
const rollup_proof_1 = require("@aztec/barretenberg/rollup_proof");
const async_mutex_1 = require("async-mutex");
const world_state_1 = require("@aztec/barretenberg/world_state");
/**
 * Block Context is designed to wrap a block received from the rollup provider
 * and percolate through the sdk, existing for the duration that the block is 'processed'.
 * It provides an opportunity for 'once per block' caching/optimsation across all entities interested in the block
 * Requires mutex protection due to the concurrent nature of user states
 */
class BlockContext {
    constructor(block, pedersen) {
        this.block = block;
        this.pedersen = pedersen;
        this.mutex = new async_mutex_1.Mutex();
    }
    /**
     * Provides the hash path at the given index of the block's immutable sub-tree
     * Will validate that the index provided is within the range encapsulated by the sub-tree
     * Lazy initialises the sub-tree from the rollup's input notes so the tree is built
     * at most once
     */
    async getBlockSubtreeHashPath(index) {
        const release = await this.mutex.acquire();
        try {
            if (!this.subtree) {
                const numNotesInFullRollup = world_state_1.WorldStateConstants.NUM_NEW_DATA_TREE_NOTES_PER_TX * this.block.rollupSize;
                const rollup = rollup_proof_1.RollupProofData.fromBuffer(this.block.rollupProofData);
                this.startIndex = rollup.dataStartIndex;
                const maxIndex = this.startIndex + numNotesInFullRollup;
                if (index < this.startIndex || index >= maxIndex) {
                    throw new Error('Index out of bounds.');
                }
                const notes = rollup.innerProofData.flatMap(x => [x.noteCommitment1, x.noteCommitment2]);
                const allNotes = [...notes, ...Array(numNotesInFullRollup - notes.length).fill(merkle_tree_1.MemoryMerkleTree.ZERO_ELEMENT)];
                this.subtree = await merkle_tree_1.MemoryMerkleTree.new(allNotes, this.pedersen);
            }
            return this.subtree.getHashPath(index - this.startIndex);
        }
        finally {
            release();
        }
    }
}
exports.BlockContext = BlockContext;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmxvY2tfY29udGV4dC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9ibG9ja19jb250ZXh0L2Jsb2NrX2NvbnRleHQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsaUVBQW1FO0FBRW5FLG1FQUFtRTtBQUNuRSw2Q0FBb0M7QUFDcEMsaUVBQXNFO0FBR3RFOzs7OztHQUtHO0FBQ0gsTUFBYSxZQUFZO0lBS3ZCLFlBQW1CLEtBQVksRUFBVSxRQUFrQjtRQUF4QyxVQUFLLEdBQUwsS0FBSyxDQUFPO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUhuRCxVQUFLLEdBQUcsSUFBSSxtQkFBSyxFQUFFLENBQUM7SUFHa0MsQ0FBQztJQUUvRDs7Ozs7T0FLRztJQUNJLEtBQUssQ0FBQyx1QkFBdUIsQ0FBQyxLQUFhO1FBQ2hELE1BQU0sT0FBTyxHQUFHLE1BQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUMzQyxJQUFJO1lBQ0YsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7Z0JBQ2pCLE1BQU0sb0JBQW9CLEdBQUcsaUNBQW1CLENBQUMsOEJBQThCLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUM7Z0JBQ3hHLE1BQU0sTUFBTSxHQUFHLDhCQUFlLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUM7Z0JBQ3RFLElBQUksQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDLGNBQWMsQ0FBQztnQkFDeEMsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFVBQVUsR0FBRyxvQkFBb0IsQ0FBQztnQkFDeEQsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFVBQVUsSUFBSSxLQUFLLElBQUksUUFBUSxFQUFFO29CQUNoRCxNQUFNLElBQUksS0FBSyxDQUFDLHNCQUFzQixDQUFDLENBQUM7aUJBQ3pDO2dCQUNELE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsZUFBZSxFQUFFLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO2dCQUN6RixNQUFNLFFBQVEsR0FBRyxDQUFDLEdBQUcsS0FBSyxFQUFFLEdBQUcsS0FBSyxDQUFDLG9CQUFvQixHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsOEJBQWdCLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztnQkFDL0csSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLDhCQUFnQixDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQ3BFO1lBQ0QsT0FBTyxJQUFJLENBQUMsT0FBUSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFVBQVcsQ0FBQyxDQUFDO1NBQzVEO2dCQUFTO1lBQ1IsT0FBTyxFQUFFLENBQUM7U0FDWDtJQUNILENBQUM7Q0FDRjtBQWpDRCxvQ0FpQ0MifQ==