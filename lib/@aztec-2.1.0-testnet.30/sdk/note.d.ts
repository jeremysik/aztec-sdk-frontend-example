/// <reference types="node" />
import { AccountId } from '@aztec/barretenberg/account_id';
import { TreeNote } from '@aztec/barretenberg/note_algorithms';
export declare class Note {
    treeNote: TreeNote;
    commitment: Buffer;
    nullifier: Buffer;
    allowChain: boolean;
    nullified: boolean;
    index?: number | undefined;
    hashPath?: Buffer | undefined;
    constructor(treeNote: TreeNote, commitment: Buffer, nullifier: Buffer, allowChain: boolean, nullified: boolean, index?: number | undefined, hashPath?: Buffer | undefined);
    get assetId(): number;
    get value(): bigint;
    get owner(): AccountId;
    get pending(): boolean;
}
export interface NoteJson {
    treeNote: Uint8Array;
    commitment: string;
    nullifier: string;
    allowChain: boolean;
    nullified: boolean;
    index?: number;
    hashPath?: string;
}
export declare const noteToJson: ({ treeNote, commitment, nullifier, allowChain, nullified, index, hashPath, }: Note) => NoteJson;
export declare const noteFromJson: ({ treeNote, commitment, nullifier, allowChain, nullified, index, hashPath }: NoteJson) => Note;
//# sourceMappingURL=note.d.ts.map