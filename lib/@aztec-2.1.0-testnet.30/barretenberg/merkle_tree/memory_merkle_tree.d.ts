/// <reference types="node" />
import { Hasher } from './hasher';
import { HashPath } from './hash_path';
/**
 * An 'in-memory' implementation of an immutable Merkle Tree
 * Is provided a set of values (size must be a power of 2) and hashes them into a tree
 * Will then provide the root, size and hash path on request
 */
export declare class MemoryMerkleTree {
    private notes;
    private hasher;
    private hashes;
    static ZERO_ELEMENT: Buffer;
    private constructor();
    getHashPath(index: number): HashPath;
    getRoot(): Buffer;
    getSize(): number;
    static new(notes: Buffer[], hasher: Hasher): Promise<MemoryMerkleTree>;
    private buildTree;
}
//# sourceMappingURL=memory_merkle_tree.d.ts.map