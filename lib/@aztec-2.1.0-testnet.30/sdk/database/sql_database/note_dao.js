"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noteDaoToNote = exports.noteToNoteDao = exports.NoteDao = void 0;
const tslib_1 = require("tslib");
const account_id_1 = require("@aztec/barretenberg/account_id");
const note_algorithms_1 = require("@aztec/barretenberg/note_algorithms");
const typeorm_1 = require("typeorm");
const note_1 = require("../../note");
const transformer_1 = require("./transformer");
let NoteDao = class NoteDao {
    afterLoad() {
        if (!this.hashPath) {
            delete this.hashPath;
        }
        if (this.index === null) {
            delete this.index;
        }
    }
};
tslib_1.__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    tslib_1.__metadata("design:type", Buffer)
], NoteDao.prototype, "commitment", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Index)({ unique: true }),
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", Buffer)
], NoteDao.prototype, "nullifier", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", Buffer)
], NoteDao.prototype, "noteSecret", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('blob', { transformer: [transformer_1.accountIdTransformer] }),
    tslib_1.__metadata("design:type", account_id_1.AccountId)
], NoteDao.prototype, "owner", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", Buffer)
], NoteDao.prototype, "creatorPubKey", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", Buffer)
], NoteDao.prototype, "inputNullifier", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], NoteDao.prototype, "assetId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('text', { transformer: [transformer_1.bigintTransformer] }),
    tslib_1.__metadata("design:type", typeof BigInt === "function" ? BigInt : Object)
], NoteDao.prototype, "value", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", Boolean)
], NoteDao.prototype, "allowChain", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Index)({ unique: false }),
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", Number)
], NoteDao.prototype, "index", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Index)({ unique: false }),
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", Boolean)
], NoteDao.prototype, "nullified", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", Buffer)
], NoteDao.prototype, "hashPath", void 0);
tslib_1.__decorate([
    (0, typeorm_1.AfterLoad)(),
    (0, typeorm_1.AfterInsert)(),
    (0, typeorm_1.AfterUpdate)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], NoteDao.prototype, "afterLoad", null);
NoteDao = tslib_1.__decorate([
    (0, typeorm_1.Entity)({ name: 'note' })
], NoteDao);
exports.NoteDao = NoteDao;
const noteToNoteDao = ({ treeNote: { noteSecret, ownerPubKey, accountNonce, creatorPubKey, inputNullifier, assetId }, commitment, nullifier, value, allowChain, index, nullified, hashPath, }) => ({
    commitment,
    nullifier,
    noteSecret,
    owner: new account_id_1.AccountId(ownerPubKey, accountNonce),
    creatorPubKey,
    inputNullifier,
    assetId,
    value,
    allowChain,
    nullified,
    index,
    hashPath,
});
exports.noteToNoteDao = noteToNoteDao;
const noteDaoToNote = ({ commitment, nullifier, noteSecret, owner, creatorPubKey, inputNullifier, assetId, value, allowChain, index, nullified, hashPath, }) => new note_1.Note(new note_algorithms_1.TreeNote(owner.publicKey, value, assetId, owner.accountNonce, noteSecret, creatorPubKey, inputNullifier), commitment, nullifier, allowChain, nullified, index, hashPath);
exports.noteDaoToNote = noteDaoToNote;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90ZV9kYW8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZGF0YWJhc2Uvc3FsX2RhdGFiYXNlL25vdGVfZGFvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSwrREFBMkQ7QUFDM0QseUVBQStEO0FBQy9ELHFDQUFvRztBQUNwRyxxQ0FBa0M7QUFDbEMsK0NBQXdFO0FBR3hFLElBQWEsT0FBTyxHQUFwQixNQUFhLE9BQU87SUEyQ2xCLFNBQVM7UUFDUCxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNsQixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7U0FDdEI7UUFDRCxJQUFJLElBQUksQ0FBQyxLQUFLLEtBQUssSUFBSSxFQUFFO1lBQ3ZCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztTQUNuQjtJQUNILENBQUM7Q0FDRixDQUFBO0FBakRDO0lBREMsSUFBQSx1QkFBYSxHQUFFO3NDQUNJLE1BQU07MkNBQUM7QUFJM0I7SUFGQyxJQUFBLGVBQUssRUFBQyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FBQztJQUN2QixJQUFBLGdCQUFNLEdBQUU7c0NBQ1UsTUFBTTswQ0FBQztBQUcxQjtJQURDLElBQUEsZ0JBQU0sR0FBRTtzQ0FDVyxNQUFNOzJDQUFDO0FBRzNCO0lBREMsSUFBQSxnQkFBTSxFQUFDLE1BQU0sRUFBRSxFQUFFLFdBQVcsRUFBRSxDQUFDLGtDQUFvQixDQUFDLEVBQUUsQ0FBQztzQ0FDekMsc0JBQVM7c0NBQUM7QUFHekI7SUFEQyxJQUFBLGdCQUFNLEdBQUU7c0NBQ2MsTUFBTTs4Q0FBQztBQUc5QjtJQURDLElBQUEsZ0JBQU0sR0FBRTtzQ0FDZSxNQUFNOytDQUFDO0FBRy9CO0lBREMsSUFBQSxnQkFBTSxHQUFFOzt3Q0FDZTtBQUd4QjtJQURDLElBQUEsZ0JBQU0sRUFBQyxNQUFNLEVBQUUsRUFBRSxXQUFXLEVBQUUsQ0FBQywrQkFBaUIsQ0FBQyxFQUFFLENBQUM7O3NDQUMvQjtBQUd0QjtJQURDLElBQUEsZ0JBQU0sR0FBRTs7MkNBQ21CO0FBSTVCO0lBRkMsSUFBQSxlQUFLLEVBQUMsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLENBQUM7SUFDeEIsSUFBQSxnQkFBTSxFQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDOztzQ0FDTDtBQUl0QjtJQUZDLElBQUEsZUFBSyxFQUFDLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFDO0lBQ3hCLElBQUEsZ0JBQU0sR0FBRTs7MENBQ2tCO0FBRzNCO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDO3NDQUNULE1BQU07eUNBQUM7QUFLekI7SUFIQyxJQUFBLG1CQUFTLEdBQUU7SUFDWCxJQUFBLHFCQUFXLEdBQUU7SUFDYixJQUFBLHFCQUFXLEdBQUU7Ozs7d0NBUWI7QUFsRFUsT0FBTztJQURuQixJQUFBLGdCQUFNLEVBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLENBQUM7R0FDWixPQUFPLENBbURuQjtBQW5EWSwwQkFBTztBQXFEYixNQUFNLGFBQWEsR0FBRyxDQUFDLEVBQzVCLFFBQVEsRUFBRSxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsWUFBWSxFQUFFLGFBQWEsRUFBRSxjQUFjLEVBQUUsT0FBTyxFQUFFLEVBQzNGLFVBQVUsRUFDVixTQUFTLEVBQ1QsS0FBSyxFQUNMLFVBQVUsRUFDVixLQUFLLEVBQ0wsU0FBUyxFQUNULFFBQVEsR0FDSCxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ1gsVUFBVTtJQUNWLFNBQVM7SUFDVCxVQUFVO0lBQ1YsS0FBSyxFQUFFLElBQUksc0JBQVMsQ0FBQyxXQUFXLEVBQUUsWUFBWSxDQUFDO0lBQy9DLGFBQWE7SUFDYixjQUFjO0lBQ2QsT0FBTztJQUNQLEtBQUs7SUFDTCxVQUFVO0lBQ1YsU0FBUztJQUNULEtBQUs7SUFDTCxRQUFRO0NBQ1QsQ0FBQyxDQUFDO0FBdEJVLFFBQUEsYUFBYSxpQkFzQnZCO0FBRUksTUFBTSxhQUFhLEdBQUcsQ0FBQyxFQUM1QixVQUFVLEVBQ1YsU0FBUyxFQUNULFVBQVUsRUFDVixLQUFLLEVBQ0wsYUFBYSxFQUNiLGNBQWMsRUFDZCxPQUFPLEVBQ1AsS0FBSyxFQUNMLFVBQVUsRUFDVixLQUFLLEVBQ0wsU0FBUyxFQUNULFFBQVEsR0FDQSxFQUFFLEVBQUUsQ0FDWixJQUFJLFdBQUksQ0FDTixJQUFJLDBCQUFRLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLEtBQUssQ0FBQyxZQUFZLEVBQUUsVUFBVSxFQUFFLGFBQWEsRUFBRSxjQUFjLENBQUMsRUFDNUcsVUFBVSxFQUNWLFNBQVMsRUFDVCxVQUFVLEVBQ1YsU0FBUyxFQUNULEtBQUssRUFDTCxRQUFRLENBQ1QsQ0FBQztBQXRCUyxRQUFBLGFBQWEsaUJBc0J0QiJ9