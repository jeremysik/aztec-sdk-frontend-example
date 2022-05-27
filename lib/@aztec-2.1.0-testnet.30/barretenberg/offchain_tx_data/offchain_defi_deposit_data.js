"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OffchainDefiDepositData = void 0;
const address_1 = require("../address");
const bigint_buffer_1 = require("../bigint_buffer");
const bridge_id_1 = require("../bridge_id");
const serialize_1 = require("../serialize");
const viewing_key_1 = require("../viewing_key");
class OffchainDefiDepositData {
    constructor(bridgeId, partialState, partialStateSecretEphPubKey, // the public key from which the partial state's secret may be derived (when combined with a valid account private key).
    depositValue, txFee, viewingKey, // viewing key for the 'change' note
    txRefNo = 0) {
        this.bridgeId = bridgeId;
        this.partialState = partialState;
        this.partialStateSecretEphPubKey = partialStateSecretEphPubKey;
        this.depositValue = depositValue;
        this.txFee = txFee;
        this.viewingKey = viewingKey;
        this.txRefNo = txRefNo;
        if (partialState.length !== 32) {
            throw new Error('Expect partialState to be 32 bytes.');
        }
        if (viewingKey.isEmpty()) {
            throw new Error('Viewing key cannot be empty.');
        }
    }
    static fromBuffer(buf) {
        if (buf.length !== OffchainDefiDepositData.SIZE) {
            throw new Error('Invalid buffer size.');
        }
        let dataStart = 0;
        const bridgeId = bridge_id_1.BridgeId.fromBuffer(buf.slice(dataStart, dataStart + 32));
        dataStart += 32;
        const partialState = buf.slice(dataStart, dataStart + 32);
        dataStart += 32;
        const partialStateSecretEphPubKey = new address_1.GrumpkinAddress(buf.slice(dataStart, dataStart + 64));
        dataStart += 64;
        const depositValue = (0, bigint_buffer_1.toBigIntBE)(buf.slice(dataStart, dataStart + 32));
        dataStart += 32;
        const txFee = (0, bigint_buffer_1.toBigIntBE)(buf.slice(dataStart, dataStart + 32));
        dataStart += 32;
        const viewingKey = new viewing_key_1.ViewingKey(buf.slice(dataStart, dataStart + viewing_key_1.ViewingKey.SIZE));
        dataStart += viewing_key_1.ViewingKey.SIZE;
        const txRefNo = buf.readUInt32BE(dataStart);
        return new OffchainDefiDepositData(bridgeId, partialState, partialStateSecretEphPubKey, depositValue, txFee, viewingKey, txRefNo);
    }
    toBuffer() {
        return Buffer.concat([
            this.bridgeId.toBuffer(),
            this.partialState,
            this.partialStateSecretEphPubKey.toBuffer(),
            (0, bigint_buffer_1.toBufferBE)(this.depositValue, 32),
            (0, bigint_buffer_1.toBufferBE)(this.txFee, 32),
            this.viewingKey.toBuffer(),
            (0, serialize_1.numToUInt32BE)(this.txRefNo),
        ]);
    }
}
exports.OffchainDefiDepositData = OffchainDefiDepositData;
OffchainDefiDepositData.EMPTY = new OffchainDefiDepositData(bridge_id_1.BridgeId.ZERO, Buffer.alloc(32), address_1.GrumpkinAddress.ZERO, BigInt(0), BigInt(0), new viewing_key_1.ViewingKey(Buffer.alloc(viewing_key_1.ViewingKey.SIZE)));
OffchainDefiDepositData.SIZE = OffchainDefiDepositData.EMPTY.toBuffer().length;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2ZmY2hhaW5fZGVmaV9kZXBvc2l0X2RhdGEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvb2ZmY2hhaW5fdHhfZGF0YS9vZmZjaGFpbl9kZWZpX2RlcG9zaXRfZGF0YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx3Q0FBNkM7QUFDN0Msb0RBQTBEO0FBQzFELDRDQUF3QztBQUN4Qyw0Q0FBNkM7QUFDN0MsZ0RBQTRDO0FBRTVDLE1BQWEsdUJBQXVCO0lBV2xDLFlBQ2tCLFFBQWtCLEVBQ2xCLFlBQW9CLEVBQ3BCLDJCQUE0QyxFQUFFLHdIQUF3SDtJQUN0SyxZQUFvQixFQUNwQixLQUFhLEVBQ2IsVUFBc0IsRUFBRSxvQ0FBb0M7SUFDNUQsVUFBVSxDQUFDO1FBTlgsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUNsQixpQkFBWSxHQUFaLFlBQVksQ0FBUTtRQUNwQixnQ0FBMkIsR0FBM0IsMkJBQTJCLENBQWlCO1FBQzVDLGlCQUFZLEdBQVosWUFBWSxDQUFRO1FBQ3BCLFVBQUssR0FBTCxLQUFLLENBQVE7UUFDYixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLFlBQU8sR0FBUCxPQUFPLENBQUk7UUFFM0IsSUFBSSxZQUFZLENBQUMsTUFBTSxLQUFLLEVBQUUsRUFBRTtZQUM5QixNQUFNLElBQUksS0FBSyxDQUFDLHFDQUFxQyxDQUFDLENBQUM7U0FDeEQ7UUFDRCxJQUFJLFVBQVUsQ0FBQyxPQUFPLEVBQUUsRUFBRTtZQUN4QixNQUFNLElBQUksS0FBSyxDQUFDLDhCQUE4QixDQUFDLENBQUM7U0FDakQ7SUFDSCxDQUFDO0lBRUQsTUFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFXO1FBQzNCLElBQUksR0FBRyxDQUFDLE1BQU0sS0FBSyx1QkFBdUIsQ0FBQyxJQUFJLEVBQUU7WUFDL0MsTUFBTSxJQUFJLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1NBQ3pDO1FBRUQsSUFBSSxTQUFTLEdBQUcsQ0FBQyxDQUFDO1FB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