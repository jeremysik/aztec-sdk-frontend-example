import { Note } from '../note';
export declare class SortedNotes {
    private sortedNotes;
    constructor(notes?: Note[]);
    get length(): number;
    get notes(): Note[];
    add(note: Note): this;
    bulkAdd(notes: Note[]): this;
    forEach(callback: (note: Note, i: number) => void): void;
    find(callback: (note: Note) => boolean): Note | undefined;
    findLast(callback: (note: Note) => boolean): Note | undefined;
    nth(idx: number): Note;
    first(num: number): Note[];
    last(num: number): Note[];
    filter(cb: (note: Note) => boolean): SortedNotes;
    clone(): SortedNotes;
}
//# sourceMappingURL=sorted_notes.d.ts.map