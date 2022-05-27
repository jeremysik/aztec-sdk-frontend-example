"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorldState = void 0;
const tslib_1 = require("tslib");
const merkle_tree_1 = require("../merkle_tree");
const world_state_constants_1 = require("./world_state_constants");
const debug_1 = (0, tslib_1.__importDefault)(require("debug"));
const debug = (0, debug_1.default)('bb:world_state');
class WorldState {
    constructor(db, pedersen) {
        this.db = db;
        this.pedersen = pedersen;
        this.subTreeDepth = 0;
    }
    async init(subTreeDepth) {
        const subTreeSize = 1 << subTreeDepth;
        this.subTreeDepth = subTreeDepth;
        const zeroNotes = Array(subTreeSize).fill(merkle_tree_1.MemoryMerkleTree.ZERO_ELEMENT);
        const subTree = await merkle_tree_1.MemoryMerkleTree.new(zeroNotes, this.pedersen);
        const treeSize = world_state_constants_1.WorldStateConstants.DATA_TREE_DEPTH - subTreeDepth;
        const subTreeRoot = subTree.getRoot();
        debug(`initialising data tree with depth ${treeSize} and zero element of ${subTreeRoot.toString('hex')}`);
        try {
            this.tree = await merkle_tree_1.MerkleTree.fromName(this.db, this.pedersen, 'data', subTreeRoot);
        }
        catch (e) {
            this.tree = await merkle_tree_1.MerkleTree.new(this.db, this.pedersen, 'data', treeSize, subTreeRoot);
        }
        this.logTreeStats();
    }
    // builds a hash path at index 0 for a 'zero' tree of the given depth
    buildZeroHashPath(depth = world_state_constants_1.WorldStateConstants.DATA_TREE_DEPTH) {
        let current = merkle_tree_1.MemoryMerkleTree.ZERO_ELEMENT;
        const bufs = [];
        for (let i = 0; i < depth; i++) {
            bufs.push([current, current]);
            current = this.pedersen.compress(current, current);
        }
        return new merkle_tree_1.HashPath(bufs);
    }
    convertNoteIndexToSubTreeIndex(noteIndex) {
        return noteIndex >> this.subTreeDepth;
    }
    async buildFullHashPath(noteIndex, immutableHashPath) {
        const noteSubTreeIndex = this.convertNoteIndexToSubTreeIndex(noteIndex);
        const mutablePath = await this.getHashPath(noteSubTreeIndex);
        const fullHashPath = new merkle_tree_1.HashPath(immutableHashPath.data.concat(mutablePath.data));
        return fullHashPath;
    }
    async insertElement(index, element) {
        const subRootIndex = this.convertNoteIndexToSubTreeIndex(index);
        await this.tree.updateElement(subRootIndex, element);
        this.logTreeStats();
    }
    async insertElements(startIndex, elements) {
        const subRootIndex = this.convertNoteIndexToSubTreeIndex(startIndex);
        await this.tree.updateElements(subRootIndex, elements);
        this.logTreeStats();
    }
    logTreeStats() {
        const subTreeSize = 1 << this.subTreeDepth;
        debug(`data size: ${this.tree.getSize() * subTreeSize}`);
        debug(`data root: ${this.tree.getRoot().toString('hex')}`);
    }
    async syncFromDb() {
        await this.tree.syncFromDb();
    }
    async getHashPath(index) {
        return await this.tree.getHashPath(index);
    }
    getRoot() {
        return this.tree.getRoot();
    }
    getSize() {
        return this.tree.getSize();
    }
}
exports.WorldState = WorldState;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29ybGRfc3RhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvd29ybGRfc3RhdGUvd29ybGRfc3RhdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLGdEQUF3RTtBQUN4RSxtRUFBOEQ7QUFHOUQsK0RBQWdDO0FBRWhDLE1BQU0sS0FBSyxHQUFHLElBQUEsZUFBVyxFQUFDLGdCQUFnQixDQUFDLENBQUM7QUFFNUMsTUFBYSxVQUFVO0lBSXJCLFlBQW9CLEVBQVcsRUFBVSxRQUFrQjtRQUF2QyxPQUFFLEdBQUYsRUFBRSxDQUFTO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUZuRCxpQkFBWSxHQUFHLENBQUMsQ0FBQztJQUVxQyxDQUFDO0lBRXhELEtBQUssQ0FBQyxJQUFJLENBQUMsWUFBb0I7UUFDcEMsTUFBTSxXQUFXLEdBQUcsQ0FBQyxJQUFJLFlBQVksQ0FBQztRQUN0QyxJQUFJLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQztRQUNqQyxNQUFNLFNBQVMsR0FBRyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsSUFBSSxDQUFDLDhCQUFnQixDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ3pFLE1BQU0sT0FBTyxHQUFHLE1BQU0sOEJBQWdCLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDckUsTUFBTSxRQUFRLEdBQUcsMkNBQW1CLENBQUMsZUFBZSxHQUFHLFlBQVksQ0FBQztRQUNwRSxNQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDdEMsS0FBSyxDQUFDLHFDQUFxQyxRQUFRLHdCQUF3QixXQUFXLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUMxRyxJQUFJO1lBQ0YsSUFBSSxDQUFDLElBQUksR0FBRyxNQUFNLHdCQUFVLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFD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