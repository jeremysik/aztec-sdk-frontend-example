"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TreeClaimNote = void 0;
const bigint_buffer_1 = require("../bigint_buffer");
const bridge_id_1 = require("../bridge_id");
const crypto_1 = require("../crypto");
const serialize_1 = require("../serialize");
class TreeClaimNote {
    constructor(value, bridgeId, defiInteractionNonce, fee, partialState, inputNullifier) {
        this.value = value;
        this.bridgeId = bridgeId;
        this.defiInteractionNonce = defiInteractionNonce;
        this.fee = fee;
        this.partialState = partialState;
        this.inputNullifier = inputNullifier;
    }
    static random() {
        return new TreeClaimNote((0, bigint_buffer_1.toBigIntBE)((0, crypto_1.randomBytes)(32)), bridge_id_1.BridgeId.random(), (0, crypto_1.randomBytes)(4).readUInt32BE(0), (0, bigint_buffer_1.toBigIntBE)((0, crypto_1.randomBytes)(32)), (0, crypto_1.randomBytes)(32), (0, crypto_1.randomBytes)(32));
    }
    static deserialize(buf, offset) {
        return {
            elem: TreeClaimNote.fromBuffer(buf.slice(offset, offset + TreeClaimNote.LENGTH)),
            adv: TreeClaimNote.LENGTH,
        };
    }
    static fromBuffer(buf) {
        const value = (0, bigint_buffer_1.toBigIntBE)(buf.slice(0, 32));
        let offset = 32;
        const bridgeId = bridge_id_1.BridgeId.fromBuffer(buf.slice(offset, offset + bridge_id_1.BridgeId.ENCODED_LENGTH_IN_BYTES));
        offset += 32;
        const defiInteractionNonce = buf.readUInt32BE(offset);
        offset += 4;
        const fee = (0, bigint_buffer_1.toBigIntBE)(buf.slice(offset, offset + 32));
        offset += 32;
        const partialState = buf.slice(offset, offset + 32);
        offset += 32;
        const inputNullifier = buf.slice(offset, offset + 32);
        return new TreeClaimNote(value, bridgeId, defiInteractionNonce, fee, partialState, inputNullifier);
    }
    toBuffer() {
        return Buffer.concat([
            (0, bigint_buffer_1.toBufferBE)(this.value, 32),
            this.bridgeId.toBuffer(),
            (0, serialize_1.numToUInt32BE)(this.defiInteractionNonce),
            (0, bigint_buffer_1.toBufferBE)(this.fee, 32),
            this.partialState,
            this.inputNullifier,
        ]);
    }
    equals(note) {
        return this.toBuffer().equals(note.toBuffer());
    }
}
exports.TreeClaimNote = TreeClaimNote;
TreeClaimNote.EMPTY = new TreeClaimNote(BigInt(0), bridge_id_1.BridgeId.ZERO, 0, BigInt(0), Buffer.alloc(32), Buffer.alloc(32));
TreeClaimNote.LENGTH = TreeClaimNote.EMPTY.toBuffer().length;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZV9jbGFpbV9ub3RlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL25vdGVfYWxnb3JpdGhtcy90cmVlX2NsYWltX25vdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsb0RBQTBEO0FBQzFELDRDQUF3QztBQUN4QyxzQ0FBd0M7QUFDeEMsNENBQTZDO0FBRTdDLE1BQWEsYUFBYTtJQUl4QixZQUNTLEtBQWEsRUFDYixRQUFrQixFQUNsQixvQkFBNEIsRUFDNUIsR0FBVyxFQUNYLFlBQW9CLEVBQ3BCLGNBQXNCO1FBTHRCLFVBQUssR0FBTCxLQUFLLENBQVE7UUFDYixhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQ2xCLHlCQUFvQixHQUFwQixvQkFBb0IsQ0FBUTtRQUM1QixRQUFHLEdBQUgsR0FBRyxDQUFRO1FBQ1gsaUJBQVksR0FBWixZQUFZLENBQVE7UUFDcEIsbUJBQWMsR0FBZCxjQUFjLENBQVE7SUFDNUIsQ0FBQztJQUVKLE1BQU0sQ0FBQyxNQUFNO1FBQ1gsT0FBTyxJQUFJLGFBQWEsQ0FDdEIsSUFBQSwwQkFBVSxFQUFDLElBQUEsb0JBQVcsRUFBQyxFQUFFLENBQUMsQ0FBQyxFQUMzQixvQkFBUSxDQUFDLE1BQU0sRUFBRSxFQUNqQixJQUFBLG9CQUFXLEVBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxFQUM5QixJQUFBLDBCQUFVLEVBQUMsSUFBQSxvQkFBVyxFQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQzNCLElBQUEsb0JBQVcsRUFBQyxFQUFFLENBQUMsRUFDZixJQUFBLG9CQUFXLEVBQUMsRUFBRSxDQUFDLENBQ2hCLENBQUM7SUFDSixDQUFDO0lBRUQsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFXLEVBQUUsTUFBYztRQUM1QyxPQUFPO1lBQ0wsSUFBSSxFQUFFLGFBQWEsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsTUFBTSxHQUFHLGFBQWEs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