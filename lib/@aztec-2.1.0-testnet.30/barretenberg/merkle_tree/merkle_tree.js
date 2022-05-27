"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MerkleTree = void 0;
const hash_path_1 = require("./hash_path");
const debug_1 = require("../debug");
const debug = (0, debug_1.createLogger)('bb:merkle_tree');
const MAX_DEPTH = 32;
function keepNLsb(input, numBits) {
    return numBits >= MAX_DEPTH ? input : input & ((1 << numBits) - 1);
}
class MerkleTree {
    constructor(db, hasher, name, depth, size = 0, root, initialLeafValue = MerkleTree.ZERO_ELEMENT) {
        this.db = db;
        this.hasher = hasher;
        this.name = name;
        this.depth = depth;
        this.size = size;
        this.initialLeafValue = initialLeafValue;
        this.zeroHashes = [];
        if (!(depth >= 1 && depth <= MAX_DEPTH)) {
            throw Error('Bad depth');
        }
        // Compute the zero values at each layer.
        let current = initialLeafValue;
        for (let i = 0; i < depth; ++i) {
            this.zeroHashes[i] = current;
            current = hasher.compress(current, current);
        }
        this.root = root ? root : current;
    }
    static async new(db, hasher, name, depth, initialLeafValue = MerkleTree.ZERO_ELEMENT) {
        const tree = new MerkleTree(db, hasher, name, depth, 0, undefined, initialLeafValue);
        await tree.writeMeta();
        return tree;
    }
    static async fromName(db, hasher, name, initialLeafValue = MerkleTree.ZERO_ELEMENT) {
        const meta = await db.get(Buffer.from(name));
        const root = meta.slice(0, 32);
        const depth = meta.readUInt32LE(32);
        const size = meta.readUInt32LE(36);
        return new MerkleTree(db, hasher, name, depth, size, root, initialLeafValue);
    }
    async syncFromDb() {
        const meta = await this.db.get(Buffer.from(this.name));
        this.root = meta.slice(0, 32);
        this.depth = meta.readUInt32LE(32);
        this.size = meta.readUInt32LE(36);
    }
    async writeMeta(batch) {
        const data = Buffer.alloc(40);
        this.root.copy(data);
        data.writeUInt32LE(this.depth, 32);
        data.writeUInt32LE(this.size, 36);
        if (batch) {
            batch.put(this.name, data);
        }
        else {
            await this.db.put(this.name, data);
        }
    }
    getRoot() {
        return this.root;
    }
    getSize() {
        return this.size;
    }
    /**
     * Returns a hash path for the element at the given index.
     * The hash path is an array of pairs of hashes, with the lowest pair (leaf hashes) first, and the highest pair last.
     */
    async getHashPath(index) {
        const path = new hash_path_1.HashPath();
        let data = await this.dbGet(this.root);
        for (let i = this.depth - 1; i >= 0; --i) {
            if (!data) {
                // This is an empty subtree. Fill in zero value.
                path.data[i] = [this.zeroHashes[i], this.zeroHashes[i]];
                continue;
            }
            if (data.length > 64) {
                // Data is a subtree. Extract hash pair at height i.
                const subtreeDepth = i + 1;
                let layerSize = 2 ** subtreeDepth;
                let offset = 0;
                index = keepNLsb(index, subtreeDepth);
                for (let j = 0; j < subtreeDepth; ++j) {
                    index -= index & 0x1;
                    const lhsOffset = offset + index * 32;
                    path.data[j] = [data.slice(lhsOffset, lhsOffset + 32), data.slice(lhsOffset + 32, lhsOffset + 64)];
                    offset += layerSize * 32;
                    layerSize >>= 1;
                    index >>= 1;
                }
                break;
            }
            const lhs = data.slice(0, 32);
            const rhs = data.slice(32, 64);
            path.data[i] = [lhs, rhs];
            const isRight = (index >> i) & 0x1;
            data = await this.dbGet(isRight ? rhs : lhs);
        }
        return path;
    }
    async updateElement(index, value) {
        return this.updateLeafHash(index, value.equals(Buffer.alloc(32, 0)) ? this.initialLeafValue : value);
    }
    async updateLeafHash(index, leafHash) {
        const batch = this.db.batch();
        this.root = await this.updateElementInternal(this.root, leafHash, index, this.depth, batch);
        this.size = Math.max(this.size, index + 1);
        await this.writeMeta(batch);
        await batch.write();
    }
    async updateElementInternal(root, value, index, height, batch) {
        if (height === 0) {
            return value;
        }
        const data = await this.dbGet(root);
        const isRight = (index >> (height - 1)) & 0x1;
        let left = data ? data.slice(0, 32) : this.zeroHashes[height - 1];
        let right = data ? data.slice(32, 64) : this.zeroHashes[height - 1];
        const subtreeRoot = isRight ? right : left;
        const newSubtreeRoot = await this.updateElementInternal(subtreeRoot, value, keepNLsb(index, height - 1), height - 1, batch);
        if (isRight) {
            right = newSubtreeRoot;
        }
        else {
            left = newSubtreeRoot;
        }
        const newRoot = this.hasher.compress(left, right);
        batch.put(newRoot, Buffer.concat([left, right]));
        if (!root.equals(newRoot)) {
            await batch.del(root);
        }
        return newRoot;
    }
    async updateElements(index, values) {
        debug(`update elements at index ${index} with ${values.length} leaves...`);
        const zeroBuf = Buffer.alloc(32, 0);
        return this.updateLeafHashes(index, values.map(v => (v.equals(zeroBuf) ? this.initialLeafValue : v)));
    }
    /**
     * Updates all the given values, starting at index. This is optimal when inserting multiple values, as it can
     * compute a single subtree and insert it in one go.
     * However it comes with restrictions:
     * - The insertion index must be a multiple of the subtree size, which must be power of 2.
     * - The insertion index must be >= the current size of the tree (inserting into an empty location).
     *
     * We cannot over extend the tree size, as these inserts are bulk inserts, and a subsequent update would involve
     * a lot of complexity adjusting a previously inserted bulk insert. For this reason depending on the number of
     * values to insert, it will be chunked into the fewest number of subtrees required to grow the tree be precisely
     * that size. In normal operation (e.g. continuously inserting 64 values), we will be able to leverage single inserts.
     * Only when synching creates a non power of 2 set of values will the chunking mechanism come into play.
     * e.g. If we need insert 192 values, first a subtree of 128 is inserted, then a subtree of 64.
     */
    async updateLeafHashes(index, leafHashes) {
        while (leafHashes.length) {
            const batch = this.db.batch();
            let subtreeDepth = Math.ceil(Math.log2(leafHashes.length));
            let subtreeSize = 2 ** subtreeDepth;
            // We need to reduce the size of the subtree being inserted until it is:
            // a) Less than or equal in size to the number of values being inserted.
            // b) Fits in a subtree, with a size that is a multiple of the insertion index.
            while (leafHashes.length < subtreeSize || index % subtreeSize !== 0) {
                subtreeSize >>= 1;
                subtreeDepth--;
            }
            const toInsert = leafHashes.slice(0, subtreeSize);
            const hashes = await this.hasher.hashToTree(toInsert);
            this.root = await this.updateElementsInternal(this.root, hashes, index, this.depth, subtreeDepth, batch);
            // Slice off inserted values and adjust next insertion index.
            leafHashes = leafHashes.slice(subtreeSize);
            index += subtreeSize;
            this.size = index;
            await this.writeMeta(batch);
            await batch.write();
        }
    }
    async updateElementsInternal(root, hashes, index, height, subtreeHeight, batch) {
        if (height === subtreeHeight) {
            const root = hashes.pop();
            batch.put(root, Buffer.concat(hashes));
            return root;
        }
        // Do nothing if updating zero values.
        if (hashes[hashes.length - 1].equals(this.zeroHashes[height - 1])) {
            return root;
        }
        const data = await this.dbGet(root);
        const isRight = (index >> (height - 1)) & 0x1;
        if (data && data.length > 64) {
            if (!root.equals(hashes[hashes.length - 1])) {
                throw new Error('Attempting to update pre-existing subtree.');
            }
            return root;
        }
        let left = data ? data.slice(0, 32) : this.zeroHashes[height - 1];
        let right = data ? data.slice(32, 64) : this.zeroHashes[height - 1];
        const subtreeRoot = isRight ? right : left;
        const newSubtreeRoot = await this.updateElementsInternal(subtreeRoot, hashes, keepNLsb(index, height - 1), height - 1, subtreeHeight, batch);
        if (isRight) {
            right = newSubtreeRoot;
        }
        else {
            left = newSubtreeRoot;
        }
        const newRoot = this.hasher.compress(left, right);
        batch.put(newRoot, Buffer.concat([left, right]));
        if (!root.equals(newRoot)) {
            batch.del(root);
        }
        return newRoot;
    }
    async dbGet(key) {
        return this.db.get(key).catch(() => { });
    }
}
exports.MerkleTree = MerkleTree;
MerkleTree.ZERO_ELEMENT = Buffer.from('0000000000000000000000000000000000000000000000000000000000000000', 'hex');
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVya2xlX3RyZWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbWVya2xlX3RyZWUvbWVya2xlX3RyZWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsMkNBQXVDO0FBRXZDLG9DQUF3QztBQUV4QyxNQUFNLEtBQUssR0FBRyxJQUFBLG9CQUFZLEVBQUMsZ0JBQWdCLENBQUMsQ0FBQztBQUU3QyxNQUFNLFNBQVMsR0FBRyxFQUFFLENBQUM7QUFFckIsU0FBUyxRQUFRLENBQUMsS0FBYSxFQUFFLE9BQWU7SUFDOUMsT0FBTyxPQUFPLElBQUksU0FBUyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQ3JFLENBQUM7QUFFRCxNQUFhLFVBQVU7SUFLckIsWUFDVSxFQUFXLEVBQ1gsTUFBYyxFQUNkLElBQVksRUFDWixLQUFhLEVBQ2IsT0FBZSxDQUFDLEVBQ3hCLElBQWEsRUFDTCxtQkFBbUIsVUFBVSxDQUFDLFlBQVk7UUFOMUMsT0FBRSxHQUFGLEVBQUUsQ0FBUztRQUNYLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxTQUFJLEdBQUosSUFBSSxDQUFRO1FBQ1osVUFBSyxHQUFMLEtBQUssQ0FBUTtRQUNiLFNBQUksR0FBSixJQUFJLENBQVk7UUFFaEIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUEwQjtRQVQ1QyxlQUFVLEdBQWEsRUFBRSxDQUFDO1FBV2hDLElBQUksQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLElBQUksS0FBSyxJQUFJLFNBQVMsQ0FBQyxFQUFFO1lBQ3ZDLE1BQU0sS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1NBQzFCO1FBRUQseUNBQXlDO1FBQ3pDLElBQUksT0FBTyxHQUFHLGdCQUFnQixDQUFDO1FBQy9CLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMs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