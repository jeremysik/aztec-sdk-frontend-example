"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recoverTreeNotes = void 0;
const address_1 = require("../address");
const debug_1 = require("../debug");
const grumpkin_1 = require("../ecc/grumpkin");
const tree_note_1 = require("./tree_note");
const debug = (0, debug_1.createLogger)('recover_tree_notes');
const recoverTreeNotes = (decryptedNotes, inputNullifiers, noteCommitments, privateKey, grumpkin, noteAlgorithms) => {
    const ownerPubKey = new address_1.GrumpkinAddress(grumpkin.mul(grumpkin_1.Grumpkin.one, privateKey));
    return decryptedNotes.map((decrypted, i) => {
        if (!decrypted) {
            debug(`index ${i}: no decrypted tree note.`);
            return;
        }
        const noteCommitment = noteCommitments[i];
        const inputNullifier = inputNullifiers[i];
        const note = tree_note_1.TreeNote.recover(decrypted, inputNullifier, ownerPubKey);
        debug({ note });
        const commitment = noteAlgorithms.valueNoteCommitment(note);
        if (commitment.equals(noteCommitment)) {
            debug(`index ${i}: tree commitment ${noteCommitment.toString('hex')} matches note version 1.`);
            return note;
        }
        debug(`index ${i}: tree commitment ${noteCommitment.toString('hex')} != encrypted note commitment ${commitment.toString('hex')}.`);
    });
};
exports.recoverTreeNotes = recoverTreeNotes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVjb3Zlcl90cmVlX25vdGVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL25vdGVfYWxnb3JpdGhtcy9yZWNvdmVyX3RyZWVfbm90ZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsd0NBQTZDO0FBQzdDLG9DQUF3QztBQUN4Qyw4Q0FBMkM7QUFHM0MsMkNBQXVDO0FBRXZDLE1BQU0sS0FBSyxHQUFHLElBQUEsb0JBQVksRUFBQyxvQkFBb0IsQ0FBQyxDQUFDO0FBRTFDLE1BQU0sZ0JBQWdCLEdBQUcsQ0FDOUIsY0FBNkMsRUFDN0MsZUFBeUIsRUFDekIsZUFBeUIsRUFDekIsVUFBa0IsRUFDbEIsUUFBa0IsRUFDbEIsY0FBOEIsRUFDOUIsRUFBRTtJQUNGLE1BQU0sV0FBVyxHQUFHLElBQUkseUJBQWUsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLG1CQUFRLENBQUMsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUM7SUFDaEYsT0FBTyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ3pDLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDZCxLQUFLLENBQUMsU0FBUyxDQUFDLDJCQUEyQixDQUFDLENBQUM7WUFDN0MsT0FBTztTQUNSO1FBRUQsTUFBTSxjQUFjLEdBQUcsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzFDLE1BQU0sY0FBYyxHQUFHLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUUxQyxNQUFNLElBQUksR0FBRyxvQkFBUSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsY0FBYyxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBQ3RFLEtBQUssQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7UUFDaEIsTUFBTSxVQUFVLEdBQUcsY0FBYyxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzVELElBQUksVUFBVSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsRUFBRTtZQUNyQyxLQUFLLENBQUMsU0FBUyxDQUFDLHFCQUFxQixjQUFjLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO1lBQy9GLE9BQU8sSUFBSSxDQUFDO1NBQ2I7UUFDRCxLQUFLLENBQ0gsU0FBUyxDQUFDLHFCQUFxQixjQUFjLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxpQ0FBaUMsVUFBVSxDQUFDLFFBQVEsQ0FDL0csS0FBSyxDQUNOLEdBQUcsQ0FDTCxDQUFDO0lBQ0osQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUM7QUEvQlcsUUFBQSxnQkFBZ0Isb0JBK0IzQiJ9