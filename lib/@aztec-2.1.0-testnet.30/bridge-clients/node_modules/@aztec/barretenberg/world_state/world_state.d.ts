/// <reference types="node" />
import { HashPath } from '../merkle_tree';
import { LevelUp } from 'levelup';
import { Pedersen } from '../crypto/pedersen';
export declare class WorldState {
    private db;
    private pedersen;
    private tree;
    private subTreeDepth;
    constructor(db: LevelUp, pedersen: Pedersen);
    init(subTreeDepth: number): Promise<void>;
    buildZeroHashPath(depth?: number): HashPath;
    private convertNoteIndexToSubTreeIndex;
    buildFullHashPath(noteIndex: number, immutableHashPath: HashPath): Promise<HashPath>;
    insertElement(index: number, element: Buffer): Promise<void>;
    insertElements(startIndex: number, elements: Buffer[]): Promise<void>;
    logTreeStats(): void;
    syncFromDb(): Promise<void>;
    getHashPath(index: number): Promise<HashPath>;
    getRoot(): Buffer;
    getSize(): number;
}
//# sourceMappingURL=world_state.d.ts.map