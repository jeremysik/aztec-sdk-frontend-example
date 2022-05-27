"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefiInteractionEvent = void 0;
const note_algorithms_1 = require("../note_algorithms");
const bigint_buffer_1 = require("../bigint_buffer");
const bridge_id_1 = require("../bridge_id");
const crypto_1 = require("../crypto");
const serialize_1 = require("../serialize");
class DefiInteractionEvent {
    constructor(bridgeId, nonce, totalInputValue, totalOutputValueA, totalOutputValueB, result, errorReason = Buffer.alloc(0)) {
        this.bridgeId = bridgeId;
        this.nonce = nonce;
        this.totalInputValue = totalInputValue;
        this.totalOutputValueA = totalOutputValueA;
        this.totalOutputValueB = totalOutputValueB;
        this.result = result;
        this.errorReason = errorReason;
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
        const errorReason = des.vector();
        return {
            elem: new DefiInteractionEvent(bridgeId, nonce, totalInputValue, totalOutputValueA, totalOutputValueB, result, errorReason),
            adv: des.getOffset() - offset,
        };
    }
    static random() {
        return new DefiInteractionEvent(bridge_id_1.BridgeId.random(), (0, crypto_1.randomBytes)(4).readUInt32BE(0), (0, bigint_buffer_1.toBigIntBE)((0, crypto_1.randomBytes)(32)), (0, bigint_buffer_1.toBigIntBE)((0, crypto_1.randomBytes)(32)), (0, bigint_buffer_1.toBigIntBE)((0, crypto_1.randomBytes)(32)), !!Math.round(Math.random()));
    }
    static fromBuffer(buf) {
        return DefiInteractionEvent.deserialize(buf, 0).elem;
    }
    toBuffer() {
        const serializer = new serialize_1.Serializer();
        serializer.buffer(this.bridgeId.toBuffer());
        serializer.bigInt(this.totalInputValue);
        serializer.bigInt(this.totalOutputValueA);
        serializer.bigInt(this.totalOutputValueB);
        serializer.uInt32(this.nonce);
        serializer.bool(this.result);
        serializer.vector(this.errorReason);
        return serializer.getBuffer();
    }
    equals(note) {
        return this.toBuffer().equals(note.toBuffer());
    }
    toDefiInteractionNote() {
        return new note_algorithms_1.DefiInteractionNote(this.bridgeId, this.nonce, this.totalInputValue, this.totalOutputValueA, this.totalOutputValueB, this.result);
    }
}
exports.DefiInteractionEvent = DefiInteractionEvent;
DefiInteractionEvent.EMPTY = new DefiInteractionEvent(bridge_id_1.BridgeId.ZERO, 0, BigInt(0), BigInt(0), BigInt(0), false);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmaV9pbnRlcmFjdGlvbl9ldmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9ibG9ja19zb3VyY2UvZGVmaV9pbnRlcmFjdGlvbl9ldmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx3REFBeUQ7QUFDekQsb0RBQThDO0FBQzlDLDRDQUF3QztBQUN4QyxzQ0FBd0M7QUFDeEMsNENBQXdEO0FBRXhELE1BQWEsb0JBQW9CO0lBRy9CLFlBQ2tCLFFBQWtCLEVBQ2xCLEtBQWEsRUFDYixlQUF1QixFQUN2QixpQkFBeUIsRUFDekIsaUJBQXlCLEVBQ3pCLE1BQWUsRUFDZixjQUFjLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBTjdCLGFBQVEsR0FBUixRQUFRLENBQVU7UUFDbEIsVUFBSyxHQUFMLEtBQUssQ0FBUTtRQUNiLG9CQUFlLEdBQWYsZUFBZSxDQUFRO1FBQ3ZCLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBUTtRQUN6QixzQkFBaUIsR0FBakIsaUJBQWlCLENBQVE7UUFDekIsV0FBTSxHQUFOLE1BQU0sQ0FBUztRQUNmLGdCQUFXLEdBQVgsV0FBVyxDQUFrQjtJQUM1QyxDQUFDO0lBRUosTUFBTSxDQUFDLFdBQVcsQ0FBQyxNQUFjLEVBQUUsTUFBYztRQUMvQyxNQUFNLEdBQUcsR0FBRyxJQUFJLHdCQUFZLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQzdDLE1BQU0sY0FBYyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDdEMsTUFBTSxRQUFRLEdBQUcsb0JBQVEsQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDckQsTUFBTSxlQUFlLEdBQUcsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ3JDLE1BQU0saUJBQWlCLEdBQUcsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ3ZDLE1BQU0saUJBQWlCLEdBQUcsR0FBRyxDQUFDLE1B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