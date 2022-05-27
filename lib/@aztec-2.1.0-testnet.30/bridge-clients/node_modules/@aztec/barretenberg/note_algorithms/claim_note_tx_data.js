"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClaimNoteTxData = void 0;
const bigint_buffer_1 = require("../bigint_buffer");
const bridge_id_1 = require("../bridge_id");
class ClaimNoteTxData {
    constructor(value, bridgeId, partialStateSecret, inputNullifier) {
        this.value = value;
        this.bridgeId = bridgeId;
        this.partialStateSecret = partialStateSecret;
        this.inputNullifier = inputNullifier;
    }
    toBuffer() {
        return Buffer.concat([
            (0, bigint_buffer_1.toBufferBE)(this.value, 32),
            this.bridgeId.toBuffer(),
            this.partialStateSecret,
            this.inputNullifier,
        ]);
    }
    equals(note) {
        return this.toBuffer().equals(note.toBuffer());
    }
    static fromBuffer(buf) {
        let dataStart = 0;
        const value = (0, bigint_buffer_1.toBigIntBE)(buf.slice(dataStart, dataStart + 32));
        dataStart += 32;
        const bridgeId = bridge_id_1.BridgeId.fromBuffer(buf.slice(dataStart, dataStart + 32));
        dataStart += 32;
        const partialStateSecret = buf.slice(dataStart, dataStart + 32);
        dataStart += 32;
        const inputNullifier = buf.slice(dataStart, dataStart + 32);
        return new ClaimNoteTxData(value, bridgeId, partialStateSecret, inputNullifier);
    }
}
exports.ClaimNoteTxData = ClaimNoteTxData;
ClaimNoteTxData.EMPTY = new ClaimNoteTxData(BigInt(0), bridge_id_1.BridgeId.ZERO, Buffer.alloc(32), Buffer.alloc(32));
ClaimNoteTxData.SIZE = ClaimNoteTxData.EMPTY.toBuffer().length;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhaW1fbm90ZV90eF9kYXRhLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL25vdGVfYWxnb3JpdGhtcy9jbGFpbV9ub3RlX3R4X2RhdGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsb0RBQTBEO0FBQzFELDRDQUF3QztBQUV4QyxNQUFhLGVBQWU7SUFJMUIsWUFDUyxLQUFhLEVBQ2IsUUFBa0IsRUFDbEIsa0JBQTBCLEVBQzFCLGNBQXNCO1FBSHRCLFVBQUssR0FBTCxLQUFLLENBQVE7UUFDYixhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQ2xCLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBUTtRQUMxQixtQkFBYyxHQUFkLGNBQWMsQ0FBUTtJQUM1QixDQUFDO0lBRUosUUFBUTtRQUNOLE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQztZQUNuQixJQUFBLDBCQUFVLEVBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUM7WUFDMUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUU7WUFDeEIsSUFBSSxDQUFDLGtCQUFrQjtZQUN2QixJQUFJLENBQUMsY0FBYztTQUNwQixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsTUFBTSxDQUFDLElBQXFCO1FBQzFCLE9BQU8sSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBRUQsTUFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFXO1FBQzNCLElBQUksU0FBUyxHQUFHLENBQUMsQ0FBQztRQUNsQixNQUFNLEtBQUssR0FBRyxJQUFBLDBCQUFVLEVBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsU0FBUyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDL0QsU0FBUyxJQUFJLEVBQUUsQ0FBQztRQUNoQixNQUFNLFFBQVEsR0FBRyxvQkFBUSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxTQUFTLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUMzRSxTQUFTLElBQUksRUFBRSxDQUFDO1FBQ2hCLE1BQU0sa0JBQWtCLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsU0FBUyxHQUFHLEVBQUUsQ0FBQyxDQUFDO1FBQ2hFLFNBQVMsSUFBSSxFQUFFLENBQUM7UUFDaEIsTUFBTSxjQUFjLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsU0FBUyxHQUFHLEVBQUUsQ0FBQyxDQUFDO1FBQzVELE9BQU8sSUFBSSxlQUFlLENBQUMsS0FBSyxFQUFFLFFBQVEsRUFBRSxrQkFBa0IsRUFBRSxjQUFjLENBQUMsQ0FBQztJQUNsRixDQUFDOztBQWxDSCwwQ0FtQ0M7QUFsQ1EscUJBQUssR0FBRyxJQUFJLGVBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsb0JBQVEsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDMUYsb0JBQUksR0FBRyxlQUFlLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLE1BQU0sQ0FBQyJ9