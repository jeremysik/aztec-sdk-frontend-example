"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JoinSplitTx = void 0;
const account_id_1 = require("../../account_id");
const address_1 = require("../../address");
const bigint_buffer_1 = require("../../bigint_buffer");
const merkle_tree_1 = require("../../merkle_tree");
const note_algorithms_1 = require("../../note_algorithms");
const serialize_1 = require("../../serialize");
class JoinSplitTx {
    constructor(proofId, publicValue, publicOwner, publicAssetId, numInputNotes, inputNoteIndices, merkleRoot, inputNotePaths, inputNotes, outputNotes, claimNote, accountPrivateKey, accountAliasId, accountIndex, accountPath, signingPubKey, backwardLink, allowChain) {
        this.proofId = proofId;
        this.publicValue = publicValue;
        this.publicOwner = publicOwner;
        this.publicAssetId = publicAssetId;
        this.numInputNotes = numInputNotes;
        this.inputNoteIndices = inputNoteIndices;
        this.merkleRoot = merkleRoot;
        this.inputNotePaths = inputNotePaths;
        this.inputNotes = inputNotes;
        this.outputNotes = outputNotes;
        this.claimNote = claimNote;
        this.accountPrivateKey = accountPrivateKey;
        this.accountAliasId = accountAliasId;
        this.accountIndex = accountIndex;
        this.accountPath = accountPath;
        this.signingPubKey = signingPubKey;
        this.backwardLink = backwardLink;
        this.allowChain = allowChain;
    }
    toBuffer() {
        return Buffer.concat([
            (0, serialize_1.numToUInt32BE)(this.proofId),
            (0, bigint_buffer_1.toBufferBE)(this.publicValue, 32),
            this.publicOwner.toBuffer32(),
            (0, serialize_1.numToUInt32BE)(this.publicAssetId),
            (0, serialize_1.numToUInt32BE)(this.numInputNotes),
            (0, serialize_1.numToUInt32BE)(this.inputNoteIndices[0]),
            (0, serialize_1.numToUInt32BE)(this.inputNoteIndices[1]),
            this.merkleRoot,
            this.inputNotePaths[0].toBuffer(),
            this.inputNotePaths[1].toBuffer(),
            this.inputNotes[0].toBuffer(),
            this.inputNotes[1].toBuffer(),
            this.outputNotes[0].toBuffer(),
            this.outputNotes[1].toBuffer(),
            this.claimNote.toBuffer(),
            this.accountPrivateKey,
            this.accountAliasId.aliasHash.toBuffer32(),
            (0, serialize_1.numToUInt32BE)(this.accountAliasId.accountNonce),
            (0, serialize_1.numToUInt32BE)(this.accountIndex),
            this.accountPath.toBuffer(),
            this.signingPubKey.toBuffer(),
            this.backwardLink,
            (0, serialize_1.numToUInt32BE)(this.allowChain),
        ]);
    }
    static fromBuffer(buf) {
        let dataStart = 0;
        const proofId = buf.readUInt32BE(dataStart);
        dataStart += 4;
        const publicValue = (0, bigint_buffer_1.toBigIntBE)(buf.slice(dataStart, dataStart + 32));
        dataStart += 32;
        const publicOwner = new address_1.EthAddress(buf.slice(dataStart, dataStart + 32));
        dataStart += 32;
        const publicAssetId = buf.readUInt32BE(dataStart);
        dataStart += 4;
        const numInputNotes = buf.readUInt32BE(dataStart);
        dataStart += 4;
        const inputNoteIndices = [buf.readUInt32BE(dataStart), buf.readUInt32BE(dataStart + 4)];
        dataStart += 8;
        const merkleRoot = buf.slice(dataStart, dataStart + 32);
        dataStart += 32;
        const inputNotePath0 = merkle_tree_1.HashPath.deserialize(buf, dataStart);
        dataStart += inputNotePath0.adv;
        const inputNotePath1 = merkle_tree_1.HashPath.deserialize(buf, dataStart);
        dataStart += inputNotePath1.adv;
        const inputNote0 = note_algorithms_1.TreeNote.fromBuffer(buf.slice(dataStart));
        dataStart += note_algorithms_1.TreeNote.SIZE;
        const inputNote1 = note_algorithms_1.TreeNote.fromBuffer(buf.slice(dataStart));
        dataStart += note_algorithms_1.TreeNote.SIZE;
        const outputNote0 = note_algorithms_1.TreeNote.fromBuffer(buf.slice(dataStart));
        dataStart += note_algorithms_1.TreeNote.SIZE;
        const outputNote1 = note_algorithms_1.TreeNote.fromBuffer(buf.slice(dataStart));
        dataStart += note_algorithms_1.TreeNote.SIZE;
        const claimNote = note_algorithms_1.ClaimNoteTxData.fromBuffer(buf.slice(dataStart));
        dataStart += note_algorithms_1.ClaimNoteTxData.SIZE;
        const accountPrivateKey = buf.slice(dataStart, dataStart + 32);
        dataStart += 32;
        const aliasHash = new account_id_1.AliasHash(buf.slice(dataStart + 4, dataStart + 32));
        dataStart += 32;
        const accountNonce = buf.readUInt32BE(dataStart);
        dataStart += 4;
        const accountAliasId = new account_id_1.AccountAliasId(aliasHash, accountNonce);
        const accountIndex = buf.readUInt32BE(dataStart);
        dataStart += 4;
        const accountPath = merkle_tree_1.HashPath.deserialize(buf, dataStart);
        dataStart += accountPath.adv;
        const signingPubKey = new address_1.GrumpkinAddress(buf.slice(dataStart, dataStart + 64));
        dataStart += 64;
        const backwardLink = buf.slice(dataStart, dataStart + 32);
        dataStart += 32;
        const allowChain = buf.readUInt32BE(dataStart);
        return new JoinSplitTx(proofId, publicValue, publicOwner, publicAssetId, numInputNotes, inputNoteIndices, merkleRoot, [inputNotePath0.elem, inputNotePath1.elem], [inputNote0, inputNote1], [outputNote0, outputNote1], claimNote, accountPrivateKey, accountAliasId, accountIndex, accountPath.elem, signingPubKey, backwardLink, allowChain);
    }
}
exports.JoinSplitTx = JoinSplitTx;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiam9pbl9zcGxpdF90eC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jbGllbnRfcHJvb2ZzL2pvaW5fc3BsaXRfcHJvb2Yvam9pbl9zcGxpdF90eC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxpREFBNkQ7QUFDN0QsMkNBQTREO0FBQzVELHVEQUE2RDtBQUM3RCxtREFBNkM7QUFDN0MsMkRBQWtFO0FBQ2xFLCtDQUFnRDtBQUVoRCxNQUFhLFdBQVc7SUFDdEIsWUFDUyxPQUFlLEVBQ2YsV0FBbUIsRUFDbkIsV0FBdUIsRUFDdkIsYUFBcUIsRUFDckIsYUFBcUIsRUFDckIsZ0JBQTBCLEVBQzFCLFVBQWtCLEVBQ2xCLGNBQTBCLEVBQzFCLFVBQXNCLEVBQ3RCLFdBQXVCLEVBQ3ZCLFNBQTBCLEVBQzFCLGlCQUF5QixFQUN6QixjQUE4QixFQUM5QixZQUFvQixFQUNwQixXQUFxQixFQUNyQixhQUE4QixFQUM5QixZQUFvQixFQUNwQixVQUFrQjtRQWpCbEIsWUFBTyxHQUFQLE9BQU8sQ0FBUTtRQUNmLGdCQUFXLEdBQVgsV0FBVyxDQUFRO1FBQ25CLGdCQUFXLEdBQVgsV0FBVyxDQUFZO1FBQ3ZCLGtCQUFhLEdBQWIsYUFBYSxDQUFRO1FBQ3JCLGtCQUFhLEdBQWIsYUFBYSxDQUFRO1FBQ3JCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBVTtRQUMxQixlQUFVLEdBQVYsVUFBVSxDQUFRO1FBQ2xCLG1CQUFjLEdBQWQsY0FBYyxDQUFZO1FBQzFCLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdEIsZ0JBQVcsR0FBWCxXQUFXLENBQVk7UUFDdkIsY0FBUyxHQUFULFNBQVMsQ0FBaUI7UUFDMUIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFRO1FBQ3pCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixpQkFBWSxHQUFaLFlBQVksQ0FBUTtRQUNwQixnQkFBVyxHQUFYLFdBQVcsQ0FBVTtRQUNyQixrQkFBYSxHQUFiLGFB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