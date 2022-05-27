"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deserializeArrayFromVector = exports.serializeBufferArrayToVector = exports.deserializeField = exports.deserializeInt32 = exports.deserializeUInt32 = exports.deserializeBool = exports.deserializeBufferFromVector = exports.serializeDate = exports.deserializeBigInt = exports.serializeBigInt = exports.serializeBufferToVector = exports.numToUInt8 = exports.numToInt32BE = exports.numToUInt32BE = exports.boolToByte = void 0;
const bigint_buffer_1 = require("../bigint_buffer");
// For serializing bool.
function boolToByte(b) {
    const buf = Buffer.alloc(1);
    buf.writeUInt8(b ? 1 : 0);
    return buf;
}
exports.boolToByte = boolToByte;
// For serializing numbers to 32 bit big-endian form.
function numToUInt32BE(n, bufferSize = 4) {
    const buf = Buffer.alloc(bufferSize);
    buf.writeUInt32BE(n, bufferSize - 4);
    return buf;
}
exports.numToUInt32BE = numToUInt32BE;
// For serializing signed numbers to 32 bit big-endian form.
function numToInt32BE(n, bufferSize = 4) {
    const buf = Buffer.alloc(bufferSize);
    buf.writeInt32BE(n, bufferSize - 4);
    return buf;
}
exports.numToInt32BE = numToInt32BE;
// For serializing numbers to 32 bit big-endian form.
function numToUInt8(n) {
    const bufferSize = 1;
    const buf = Buffer.alloc(bufferSize);
    buf.writeUInt8(n, 0);
    return buf;
}
exports.numToUInt8 = numToUInt8;
// For serializing a buffer as a vector.
function serializeBufferToVector(buf) {
    const lengthBuf = Buffer.alloc(4);
    lengthBuf.writeUInt32BE(buf.length, 0);
    return Buffer.concat([lengthBuf, buf]);
}
exports.serializeBufferToVector = serializeBufferToVector;
function serializeBigInt(n, width = 32) {
    return (0, bigint_buffer_1.toBufferBE)(n, width);
}
exports.serializeBigInt = serializeBigInt;
function deserializeBigInt(buf, offset = 0, width = 32) {
    return { elem: (0, bigint_buffer_1.toBigIntBE)(buf.slice(offset, offset + width)), adv: width };
}
exports.deserializeBigInt = deserializeBigInt;
function serializeDate(date) {
    return serializeBigInt(BigInt(date.getTime()), 8);
}
exports.serializeDate = serializeDate;
function deserializeBufferFromVector(vector, offset = 0) {
    const length = vector.readUInt32BE(offset);
    const adv = 4 + length;
    return { elem: vector.slice(offset + 4, offset + adv), adv };
}
exports.deserializeBufferFromVector = deserializeBufferFromVector;
function deserializeBool(buf, offset = 0) {
    const adv = 1;
    return { elem: buf.readUInt8(offset), adv };
}
exports.deserializeBool = deserializeBool;
function deserializeUInt32(buf, offset = 0) {
    const adv = 4;
    return { elem: buf.readUInt32BE(offset), adv };
}
exports.deserializeUInt32 = deserializeUInt32;
function deserializeInt32(buf, offset = 0) {
    const adv = 4;
    return { elem: buf.readInt32BE(offset), adv };
}
exports.deserializeInt32 = deserializeInt32;
function deserializeField(buf, offset = 0) {
    const adv = 32;
    return { elem: buf.slice(offset, offset + adv), adv };
}
exports.deserializeField = deserializeField;
// For serializing an array of fixed length elements.
function serializeBufferArrayToVector(arr) {
    const lengthBuf = Buffer.alloc(4);
    lengthBuf.writeUInt32BE(arr.length, 0);
    return Buffer.concat([lengthBuf, ...arr]);
}
exports.serializeBufferArrayToVector = serializeBufferArrayToVector;
function deserializeArrayFromVector(deserialize, vector, offset = 0) {
    let pos = offset;
    const size = vector.readUInt32BE(pos);
    pos += 4;
    const arr = new Array(size);
    for (let i = 0; i < size; ++i) {
        const { elem, adv } = deserialize(vector, pos);
        pos += adv;
        arr[i] = elem;
    }
    return { elem: arr, adv: pos - offset };
}
exports.deserializeArrayFromVector = deserializeArrayFromVector;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJlZV9mdW5jcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zZXJpYWxpemUvZnJlZV9mdW5jcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxvREFBMEQ7QUFFMUQsd0JBQXdCO0FBQ3hCLFNBQWdCLFVBQVUsQ0FBQyxDQUFVO0lBQ25DLE1BQU0sR0FBRyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDNUIsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDMUIsT0FBTyxHQUFHLENBQUM7QUFDYixDQUFDO0FBSkQsZ0NBSUM7QUFFRCxxREFBcUQ7QUFDckQsU0FBZ0IsYUFBYSxDQUFDLENBQVMsRUFBRSxVQUFVLEdBQUcsQ0FBQztJQUNyRCxNQUFNLEdBQUcsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3JDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQyxFQUFFLFVBQVUsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUNyQyxPQUFPLEdBQUcsQ0FBQztBQUNiLENBQUM7QUFKRCxzQ0FJQztBQUVELDREQUE0RDtBQUM1RCxTQUFnQixZQUFZLENBQUMsQ0FBUyxFQUFFLFVBQVUsR0FBRyxDQUFDO0lBQ3BELE1BQU0sR0FBRyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDckMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDLEVBQUUsVUFBVSxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ3BDLE9BQU8sR0FBRyxDQUFDO0FBQ2IsQ0FBQztBQUpELG9DQUlDO0FBRUQscURBQXFEO0FBQ3JELFNBQWdCLFVBQVUsQ0FBQyxDQUFTO0lBQ2xDLE1BQU0sVUFBVSxHQUFHLENBQUMsQ0FBQztJQUNyQixNQUFNLEdBQUcsR0FBRyxNQUFNLENBQUMsS0FBSyxD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