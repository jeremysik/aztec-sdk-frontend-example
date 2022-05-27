/// <reference types="node" />
import { Note } from '../note';
export declare class NotePicker {
    readonly notes: Note[];
    private readonly spendableNotes;
    private readonly settledNotes;
    constructor(notes?: Note[]);
    pick(value: bigint, excludeNullifiers?: Buffer[], excludePendingNotes?: boolean): Note[];
    pickOne(value: bigint, excludeNullifiers?: Buffer[], excludePendingNotes?: boolean): Note | undefined;
    getSum(): bigint;
    getSpendableSum(excludeNullifiers?: Buffer[], excludePendingNotes?: boolean): bigint;
    getMaxSpendableValue(excludeNullifiers?: Buffer[], numNotes?: number, excludePendingNotes?: boolean): bigint;
    private getSortedNotes;
}
//# sourceMappingURL=index.d.ts.map