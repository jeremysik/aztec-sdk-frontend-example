"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemoryMerkleTree = void 0;
const hash_path_1 = require("./hash_path");
/**
 * An 'in-memory' implementation of an immutable Merkle Tree
 * Is provided a set of values (size must be a power of 2) and hashes them into a tree
 * Will then provide the root, size and hash path on request
 */
class MemoryMerkleTree {
    constructor(notes, hasher) {
        this.notes = notes;
        this.hasher = hasher;
        this.hashes = [];
        const isPowerOf2 = (v) => v && !(v & (v - 1));
        if (!isPowerOf2(notes.length)) {
            throw new Error('MemoryMerkleTree can only handle powers of 2.');
        }
    }
    getHashPath(index) {
        if (index < 0 || index >= this.notes.length) {
            throw new Error('Index out of bounds');
        }
        if (!Number.isInteger(index)) {
            throw new Error('Index invalid');
        }
        const hashPath = [];
        let layerSize = this.notes.length;
        let offset = 0;
        while (layerSize > 1) {
            const hashIndex = index + offset;
            offset += layerSize;
            const hashes = index % 2
                ? [this.hashes[hashIndex - 1], this.hashes[hashIndex]]
                : [this.hashes[hashIndex], this.hashes[hashIndex + 1]];
            hashPath.push(hashes);
            index >>= 1;
            layerSize >>= 1;
        }
        return new hash_path_1.HashPath(hashPath);
    }
    getRoot() {
        return this.hashes[this.hashes.length - 1];
    }
    getSize() {
        return this.notes.length;
    }
    static async new(notes, hasher) {
        const tree = new MemoryMerkleTree(notes, hasher);
        await tree.buildTree();
        return tree;
    }
    async buildTree() {
        this.hashes = await this.hasher.hashToTree(this.notes);
    }
}
exports.MemoryMerkleTree = MemoryMerkleTree;
MemoryMerkleTree.ZERO_ELEMENT = Buffer.from('0000000000000000000000000000000000000000000000000000000000000000', 'hex');
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVtb3J5X21lcmtsZV90cmVlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21lcmtsZV90cmVlL21lbW9yeV9tZXJrbGVfdHJlZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSwyQ0FBdUM7QUFFdkM7Ozs7R0FJRztBQUNILE1BQWEsZ0JBQWdCO0lBSTNCLFlBQTRCLEtBQWUsRUFBVSxNQUFjO1FBQXZDLFVBQUssR0FBTCxLQUFLLENBQVU7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBSDNELFdBQU0sR0FBYSxFQUFFLENBQUM7UUFJNUIsTUFBTSxVQUFVLEdBQUcsQ0FBQyxDQUFTLEVBQUUsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdEQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDN0IsTUFBTSxJQUFJLEtBQUssQ0FBQywrQ0FBK0MsQ0FBQyxDQUFDO1NBQ2xFO0lBQ0gsQ0FBQztJQUVNLFdBQVcsQ0FBQyxLQUFhO1FBQzlCLElBQUksS0FBSyxHQUFHLENBQUMsSUFBSSxLQUFLLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUU7WUFDM0MsTUFBTSxJQUFJLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1NBQ3hDO1FBQ0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDNUIsTUFBTSxJQUFJLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQztTQUNsQztRQUNELE1BQU0sUUFBUSxHQUFlLEVBQUUsQ0FBQztRQUNoQyxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztRQUNsQyxJQUFJLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDZixPQUFPLFNBQVMsR0FBRyxDQUFDLEVBQUU7WUFDcEIsTUFBTSxTQUFTLEdBQUcsS0FBSyxHQUFHLE1BQU0sQ0FBQztZQUNqQyxNQUFNLElBQUksU0FBUyxDQUFDO1lBQ3BCLE1BQU0sTUFBTSxHQUNWLEtBQUssR0FBRyxDQUFDO2dCQUNQLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQ3RELENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMzRCxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3RCLEtBQUssS0FBSyxDQUFDLENBQUM7WUFDWixTQUFTLEtBQUssQ0FBQyxDQUFDO1NBQ2pCO1FBQ0QsT0FBTyxJQUFJLG9CQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUVNLE9BQU87UUFDWixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUVNLE9BQU87UUFDWixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO0lBQzNCLENBQUM7SUFFTSxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFlLEVBQUUsTUFBYztRQUNyRCxNQUFNLElBQUksR0FBRyxJQUFJLGdCQUFnQixDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztRQUNqRCxNQUFNLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUN2QixPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFTyxLQUFLLENBQUMsU0FBUztRQUNyQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3pELENBQUM7O0FBbkRILDRDQW9EQztBQWxEZSw2QkFBWSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsa0VBQWtFLEVBQUUsS0FBSyxDQUFDLENBQUMifQ==