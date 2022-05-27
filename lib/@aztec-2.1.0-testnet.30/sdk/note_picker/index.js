"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotePicker = void 0;
const sorted_notes_1 = require("./sorted_notes");
const pick_1 = require("./pick");
const noteSum = (notes) => notes.reduce((sum, { value }) => sum + value, BigInt(0));
class NotePicker {
    constructor(notes = []) {
        this.notes = notes;
        this.spendableNotes = new sorted_notes_1.SortedNotes(notes.filter(n => !n.pending || n.allowChain));
        this.settledNotes = new sorted_notes_1.SortedNotes(notes.filter(n => !n.pending));
    }
    pick(value, excludeNullifiers, excludePendingNotes) {
        const spendableNotes = this.getSortedNotes(excludeNullifiers, excludePendingNotes);
        const notes = (0, pick_1.pick)(spendableNotes, value) || [];
        const sum = noteSum(notes);
        if (sum === value) {
            return notes;
        }
        const note = spendableNotes.findLast(n => n.value === value);
        return note ? [note] : notes;
    }
    pickOne(value, excludeNullifiers, excludePendingNotes) {
        const settledNote = this.getSortedNotes(excludeNullifiers, true).find(n => n.value >= value);
        if (excludePendingNotes) {
            return settledNote;
        }
        const pendingNote = this.getSortedNotes(excludeNullifiers, false).find(n => n.value >= value);
        if (!settledNote || !pendingNote) {
            return settledNote || pendingNote;
        }
        return settledNote.value <= pendingNote.value ? settledNote : pendingNote;
    }
    getSum() {
        return noteSum(this.settledNotes.notes);
    }
    getSpendableSum(excludeNullifiers, excludePendingNotes) {
        const spendableNotes = this.getSortedNotes(excludeNullifiers, excludePendingNotes);
        return noteSum(spendableNotes.notes);
    }
    getMaxSpendableValue(excludeNullifiers, numNotes = 2, excludePendingNotes) {
        if (numNotes <= 0 || numNotes > 2) {
            throw new Error('`numNotes` can only be 1 or 2.');
        }
        const spendableNotes = this.getSortedNotes(excludeNullifiers, excludePendingNotes);
        const notes = [];
        let hasPendingNote = false;
        spendableNotes.findLast(note => {
            if (!note.pending || !hasPendingNote) {
                notes.push(note);
            }
            hasPendingNote = hasPendingNote || note.pending;
            return notes.length === numNotes;
        });
        return noteSum(notes);
    }
    getSortedNotes(excludeNullifiers = [], excludePendingNotes = false) {
        const notes = excludePendingNotes ? this.settledNotes : this.spendableNotes;
        return notes.filter(({ nullifier }) => !excludeNullifiers.some(n => n.equals(nullifier)));
    }
}
exports.NotePicker = NotePicker;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbm90ZV9waWNrZXIvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsaURBQTZDO0FBQzdDLGlDQUE4QjtBQUc5QixNQUFNLE9BQU8sR0FBRyxDQUFDLEtBQWEsRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsQ0FBQyxHQUFHLEdBQUcsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBRTVGLE1BQWEsVUFBVTtJQUlyQixZQUFxQixRQUFnQixFQUFFO1FBQWxCLFVBQUssR0FBTCxLQUFLLENBQWE7UUFDckMsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLDBCQUFXLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztRQUNyRixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksMEJBQVcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUNyRSxDQUFDO0lBRUQsSUFBSSxDQUFDLEtBQWEsRUFBRSxpQkFBNEIsRUFBRSxtQkFBNkI7UUFDN0UsTUFBTSxjQUFjLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxpQkFBaUIsRUFBRSxtQkFBbUIsQ0FBQyxDQUFDO1FBQ25GLE1BQU0sS0FBSyxHQUFHLElBQUEsV0FBSSxFQUFDLGNBQWMsRUFBRSxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDaEQsTUFBTSxHQUFHLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzNCLElBQUksR0FBRyxLQUFLLEtBQUssRUFBRTtZQUNq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