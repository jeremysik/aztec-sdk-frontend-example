"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.packInteractionNotes = exports.computeInteractionHashes = exports.DefiInteractionNote = void 0;
const crypto_1 = require("crypto");
const bigint_buffer_1 = require("../bigint_buffer");
const bridge_id_1 = require("../bridge_id");
const crypto_2 = require("../crypto");
const serialize_1 = require("../serialize");
class DefiInteractionNote {
    constructor(bridgeId, nonce, totalInputValue, totalOutputValueA, totalOutputValueB, result) {
        this.bridgeId = bridgeId;
        this.nonce = nonce;
        this.totalInputValue = totalInputValue;
        this.totalOutputValueA = totalOutputValueA;
        this.totalOutputValueB = totalOutputValueB;
        this.result = result;
    }
    static deserialize(buffer, offset) {
        const des = new serialize_1.Deserializer(buffer, offset);
        const bridgeIdBuffer = des.buffer(32);
        const bridgeId = bridge_id_1.BridgeId.fromBuffer(bridgeIdBuffer);
        const totalInputValue = des.bigInt();
        const totalOutputValueA = des.bigInt();
        const totalOutputValueB = des.bigInt();
        const nonce = des.uInt32();
        const result = des.bool();
        return {
            elem: new DefiInteractionNote(bridgeId, nonce, totalInputValue, totalOutputValueA, totalOutputValueB, result),
            adv: des.getOffset() - offset,
        };
    }
    static random() {
        return new DefiInteractionNote(bridge_id_1.BridgeId.random(), (0, crypto_2.randomBytes)(4).readUInt32BE(0), (0, bigint_buffer_1.toBigIntBE)((0, crypto_2.randomBytes)(32)), (0, bigint_buffer_1.toBigIntBE)((0, crypto_2.randomBytes)(32)), (0, bigint_buffer_1.toBigIntBE)((0, crypto_2.randomBytes)(32)), !!Math.round(Math.random()));
    }
    static fromBuffer(buf) {
        return DefiInteractionNote.deserialize(buf, 0).elem;
    }
    toBuffer() {
        const serializer = new serialize_1.Serializer();
        serializer.buffer(this.bridgeId.toBuffer());
        serializer.bigInt(this.totalInputValue);
        serializer.bigInt(this.totalOutputValueA);
        serializer.bigInt(this.totalOutputValueB);
        serializer.uInt32(this.nonce);
        serializer.bool(this.result);
        return serializer.getBuffer();
    }
    equals(note) {
        return this.toBuffer().equals(note.toBuffer());
    }
}
exports.DefiInteractionNote = DefiInteractionNote;
DefiInteractionNote.EMPTY = new DefiInteractionNote(bridge_id_1.BridgeId.ZERO, 0, BigInt(0), BigInt(0), BigInt(0), false);
DefiInteractionNote.groupModulus = BigInt('21888242871839275222246405745257275088548364400416034343698204186575808495617');
const computeInteractionHashes = (notes, padTo = notes.length) => {
    notes = [...notes, ...Array(padTo - notes.length).fill(DefiInteractionNote.EMPTY)];
    const hash = notes.map(note => (0, crypto_1.createHash)('sha256')
        .update(Buffer.concat([
        note.bridgeId.toBuffer(),
        (0, serialize_1.numToUInt32BE)(note.nonce, 32),
        (0, bigint_buffer_1.toBufferBE)(note.totalInputValue, 32),
        (0, bigint_buffer_1.toBufferBE)(note.totalOutputValueA, 32),
        (0, bigint_buffer_1.toBufferBE)(note.totalOutputValueB, 32),
        Buffer.alloc(31),
        Buffer.from([+note.result]),
    ]))
        .digest());
    return hash.map(h => (0, bigint_buffer_1.toBufferBE)(BigInt('0x' + h.toString('hex')) % DefiInteractionNote.groupModulus, 32));
};
exports.computeInteractionHashes = computeInteractionHashes;
const packInteractionNotes = (notes, padTo = notes.length) => {
    const hash = (0, crypto_1.createHash)('sha256')
        .update(Buffer.concat((0, exports.computeInteractionHashes)(notes, padTo)))
        .digest();
    return (0, bigint_buffer_1.toBufferBE)(BigInt('0x' + hash.toString('hex')) % DefiInteractionNote.groupModulus, 32);
};
exports.packInteractionNotes = packInteractionNotes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmaV9pbnRlcmFjdGlvbl9ub3RlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL25vdGVfYWxnb3JpdGhtcy9kZWZpX2ludGVyYWN0aW9uX25vdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsbUNBQW9DO0FBQ3BDLG9EQUEwRDtBQUMxRCw0Q0FBd0M7QUFDeEMsc0NBQXdDO0FBQ3hDLDRDQUF1RTtBQUV2RSxNQUFhLG1CQUFtQjtJQUk5QixZQUNrQixRQUFrQixFQUNsQixLQUFhLEVBQ2IsZUFBdUIsRUFDdkIsaUJBQXlCLEVBQ3pCLGlCQUF5QixFQUN6QixNQUFlO1FBTGYsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUNsQixVQUFLLEdBQUwsS0FBSyxDQUFRO1FBQ2Isb0JBQWUsR0FBZixlQUFlLENBQVE7UUFDdkIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFRO1FBQ3pCLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBUTtRQUN6QixXQUFNLEdBQU4sTUFBTSxDQUFTO0lBQzlCLENBQUM7SUFFSixNQUFNLENBQUMsV0FBVyxDQUFDLE1BQWMsRUFBRSxNQUFjO1FBQy9DLE1BQU0sR0FBRyxHQUFHLElBQUksd0JBQVksQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDN0MsTUFBTSxjQUFjLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN0QyxNQUFNLFFBQVEsR0FBRyxvQkFBUSxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUNyRCxNQUFNLGVBQWUsR0FBRyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDckMsTUFBTSxpQkFBaUIsR0FBRyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDdkMsTUFBTSxpQkFBaUIsR0FBRyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDdkMsTUFBTSxLQUFLLEdBQUcsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQzNCLE1B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