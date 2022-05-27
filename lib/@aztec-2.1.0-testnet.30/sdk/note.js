"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noteFromJson = exports.noteToJson = exports.Note = void 0;
const account_id_1 = require("@aztec/barretenberg/account_id");
const note_algorithms_1 = require("@aztec/barretenberg/note_algorithms");
class Note {
    constructor(treeNote, commitment, nullifier, allowChain, nullified, index, hashPath) {
        this.treeNote = treeNote;
        this.commitment = commitment;
        this.nullifier = nullifier;
        this.allowChain = allowChain;
        this.nullified = nullified;
        this.index = index;
        this.hashPath = hashPath;
    }
    get assetId() {
        return this.treeNote.assetId;
    }
    get value() {
        return this.treeNote.value;
    }
    get owner() {
        return new account_id_1.AccountId(this.treeNote.ownerPubKey, this.treeNote.accountNonce);
    }
    get pending() {
        return this.index === undefined;
    }
}
exports.Note = Note;
const noteToJson = ({ treeNote, commitment, nullifier, allowChain, nullified, index, hashPath, }) => ({
    treeNote: new Uint8Array(treeNote.toBuffer()),
    commitment: commitment.toString('hex'),
    nullifier: nullifier.toString('hex'),
    allowChain,
    nullified,
    index,
    hashPath: hashPath === null || hashPath === void 0 ? void 0 : hashPath.toString('hex'),
});
exports.noteToJson = noteToJson;
const noteFromJson = ({ treeNote, commitment, nullifier, allowChain, nullified, index, hashPath }) => new Note(note_algorithms_1.TreeNote.fromBuffer(Buffer.from(treeNote)), Buffer.from(commitment, 'hex'), Buffer.from(nullifier, 'hex'), allowChain, nullified, index, hashPath ? Buffer.from(hashPath, 'hex') : undefined);
exports.noteFromJson = noteFromJson;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9ub3RlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLCtEQUEyRDtBQUMzRCx5RUFBK0Q7QUFFL0QsTUFBYSxJQUFJO0lBQ2YsWUFDUyxRQUFrQixFQUNsQixVQUFrQixFQUNsQixTQUFpQixFQUNqQixVQUFtQixFQUNuQixTQUFrQixFQUNsQixLQUFjLEVBQ2QsUUFBaUI7UUFOakIsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUNsQixlQUFVLEdBQVYsVUFBVSxDQUFRO1FBQ2xCLGNBQVMsR0FBVCxTQUFTLENBQVE7UUFDakIsZUFBVSxHQUFWLFVBQVUsQ0FBUztRQUNuQixjQUFTLEdBQVQsU0FBUyxDQUFTO1FBQ2xCLFVBQUssR0FBTCxLQUFLLENBQVM7UUFDZCxhQUFRLEdBQVIsUUFBUSxDQUFTO0lBQ3ZCLENBQUM7SUFFSixJQUFJLE9BQU87UUFDVCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDO0lBQy9CLENBQUM7SUFFRCxJQUFJLEtBQUs7UUFDUCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDO0lBQzdCLENBQUM7SUFFRCxJQUFJLEtBQUs7UUFDUCxPQUFPLElBQUksc0JBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQzlFLENBQUM7SUFFRCxJQUFJLE9BQU87UUFDVCxPQUFPLElBQUksQ0FBQyxLQUFLLEtBQUssU0FBUyxDQUFDO0lBQ2xDLENBQUM7Q0FDRjtBQTFCRCxvQkEwQkM7QUFZTSxNQUFNLFVBQVUsR0FBRyxDQUFDLEVBQ3pCLFFBQVEsRUFDUixVQUFVLEVBQ1YsU0FBUyxFQUNULFVBQVUsRUFDVixTQUFTLEVBQ1QsS0FBSyxFQUNMLFFBQVEsR0FDSCxFQUFZLEVBQUUsQ0FBQyxDQUFDO0lBQ3JCLFFBQVEsRUFBRSxJQUFJLFVBQVUsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDN0MsVUFBVSxFQUFFLFVBQVUsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDO0lBQ3RDLFNBQVMsRUFBRSxTQUFTLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQztJQUNwQyxVQUFVO0lBQ1YsU0FBUztJQUNULEtBQUs7SUFDTCxRQUFRLEVBQUUsUUFBUSxhQUFSLFFBQVEsdUJBQVIsUUFBUSxDQUFFLFFBQVEsQ0FBQyxLQUFLLENBQUM7Q0FDcEMsQ0FBQyxDQUFDO0FBaEJVLFFBQUEsVUFBVSxjQWdCcEI7QUFFSSxNQUFNLFlBQVksR0FBRyxDQUFDLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFZLEVBQUUsRUFBRSxDQUNwSCxJQUFJLElBQUksQ0FDTiwwQkFBUSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQzFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLEtBQUssQ0FBQyxFQUM5QixNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsRUFDN0IsVUFBVSxFQUNWLFNBQVMsRUFDVCxLQUFLLEVBQ0wsUUFBUSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUNwRCxDQUFDO0FBVFMsUUFBQSxZQUFZLGdCQVNyQiJ9