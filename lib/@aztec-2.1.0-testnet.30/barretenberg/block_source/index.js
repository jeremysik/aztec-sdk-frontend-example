"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Block = void 0;
const tslib_1 = require("tslib");
const serialize_1 = require("../serialize");
const blockchain_1 = require("../blockchain");
const defi_interaction_event_1 = require("./defi_interaction_event");
class Block {
    constructor(txHash, created, rollupId, rollupSize, rollupProofData, offchainTxData, interactionResult, gasUsed, gasPrice, subtreeRoot) {
        this.txHash = txHash;
        this.created = created;
        this.rollupId = rollupId;
        this.rollupSize = rollupSize;
        this.rollupProofData = rollupProofData;
        this.offchainTxData = offchainTxData;
        this.interactionResult = interactionResult;
        this.gasUsed = gasUsed;
        this.gasPrice = gasPrice;
        this.subtreeRoot = subtreeRoot;
    }
    static deserialize(buf, offset = 0) {
        const des = new serialize_1.Deserializer(buf, offset);
        const txHash = des.exec(blockchain_1.TxHash.deserialize);
        const created = des.date();
        const rollupId = des.uInt32();
        const rollupSize = des.uInt32();
        const rollupProofData = des.vector();
        const offchainTxData = des.deserializeArray(serialize_1.deserializeBufferFromVector);
        const interactionResult = des.deserializeArray(defi_interaction_event_1.DefiInteractionEvent.deserialize);
        const gasUsed = des.uInt32();
        const gasPrice = des.bigInt();
        const subtreeRoot = des.vector();
        return {
            elem: new Block(txHash, created, rollupId, rollupSize, rollupProofData, offchainTxData, interactionResult, gasUsed, gasPrice, subtreeRoot.equals(Buffer.alloc(0)) ? undefined : subtreeRoot),
            adv: des.getOffset() - offset,
        };
    }
    static fromBuffer(buf) {
        return Block.deserialize(buf).elem;
    }
    toBuffer() {
        var _a;
        return Buffer.concat([
            this.txHash.toBuffer(),
            (0, serialize_1.serializeDate)(this.created),
            (0, serialize_1.numToUInt32BE)(this.rollupId),
            (0, serialize_1.numToUInt32BE)(this.rollupSize),
            (0, serialize_1.serializeBufferToVector)(this.rollupProofData),
            (0, serialize_1.serializeBufferArrayToVector)(this.offchainTxData.map(b => (0, serialize_1.serializeBufferToVector)(b))),
            (0, serialize_1.serializeBufferArrayToVector)(this.interactionResult.map(b => b.toBuffer())),
            (0, serialize_1.numToUInt32BE)(this.gasUsed),
            (0, serialize_1.serializeBigInt)(this.gasPrice),
            (0, serialize_1.serializeBufferToVector)((_a = this.subtreeRoot) !== null && _a !== void 0 ? _a : Buffer.alloc(0)),
        ]);
    }
}
exports.Block = Block;
(0, tslib_1.__exportStar)(require("./server_block_source"), exports);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYmxvY2tfc291cmNlL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSw0Q0FRc0I7QUFDdEIsOENBQXVDO0FBQ3ZDLHFFQUFnRTtBQUVoRSxNQUFhLEtBQUs7SUFDaEIsWUFDUyxNQUFjLEVBQ2QsT0FBYSxFQUNiLFFBQWdCLEVBQ2hCLFVBQWtCLEVBQ2xCLGVBQXVCLEVBQ3ZCLGNBQXdCLEVBQ3hCLGlCQUF5QyxFQUN6QyxPQUFlLEVBQ2YsUUFBZ0IsRUFDaEIsV0FBb0I7UUFUcEIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNkLFlBQU8sR0FBUCxPQUFPLENBQU07UUFDYixhQUFRLEdBQVIsUUFBUSxDQUFRO1FBQ2hCLGVBQVUsR0FBVixVQUFVLENBQVE7UUFDbEIsb0JBQWUsR0FBZixlQUFlLENBQVE7UUFDdkIsbUJBQWMsR0FBZCxjQUFjLENBQVU7UUFDeEIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUF3QjtRQUN6QyxZQUFPLEdBQVAsT0FBTyxDQUFRO1FBQ2YsYUFBUSxHQUFSLFFBQVEsQ0FBUTtRQUNoQixnQkFBVyxHQUFYLFdBQVcsQ0FBUztJQUMxQixDQUFDO0lBRUosTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFXLEVBQUUsTUFBTSxHQUFHLENBQUM7UUFDeEMsTUFBTSxHQUFHLEdBQUcsSUFBSSx3QkFBWSxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUMxQyxNQUFNLE1BQU0sR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLG1CQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDNUMsTUFBTSxPQUFPLEdBQUcsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQzNCLE1BQU0sUUFBUSxHQUFHLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUM5QixNQUFNLFVBQVUsR0FBRyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDaEMsTUFBTSxlQUFlLEdBQUcsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ3JDLE1BQU0sY0FBYyxHQUFHLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyx1Q0FBMkIsQ0FBQyxDQUFDO1FBQ3pFLE1BQU0saUJBQWlCLEdBQUcsR0FBRyxDQUFDLGdCQUFnQixDQUFDLDZDQUFvQixDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ2pGLE1BQU0sT0FBTyxHQUFHLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUM3QixNQUFNLFFBQVEsR0FBRyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDOUIsTUFBTSxXQUFXLEdBQUcsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2pDLE9BQU87WUFDTCxJQUFJLEVBQUUsSUFBSSxLQUFLLENBQ2IsTUFBTSxFQUNOLE9BQU8sRUFDUCxRQUFRLEVBQ1IsVUFBVSxFQUNWLGVBQWUsRUFDZixjQUFjLEVBQ2QsaUJBQWlCLEVBQ2pCLE9BQU8sRUFDUCxRQUFRLEVBQ1IsV0FBVyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUM5RDtZQUNELEdBQUcsRUFBRSxHQUFHLENBQUMsU0FBUyxFQUFFLEdBQUcsTUFBTTtTQUM5QixDQUFDO0lBQ0osQ0FBQztJQUVELE1BQU0sQ0FBQyxVQUFVLENBQUMsR0FBVztRQUMzQixPQUFPLEtBQUssQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQ3JDLENBQUM7SUFFRCxRQUFROztRQUNOLE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQztZQUNuQixJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRTtZQUN0QixJQUFBLHlCQUFhLEVBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUMzQixJQUFBLHlCQUFhLEVBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztZQUM1QixJQUFBLHlCQUFhLEVBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztZQUM5QixJQUFBLG1DQUF1QixFQUFDLElBQUksQ0FBQyxlQUFlLENBQUM7WUFDN0MsSUFBQSx3Q0FBNEIsRUFBQyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUEsbUNBQXVCLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN0RixJQUFBLHdDQUE0QixFQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztZQUMzRSxJQUFBLHlCQUFhLEVBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUMzQixJQUFBLDJCQUFlLEVBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztZQUM5QixJQUFBLG1DQUF1QixFQUFDLE1BQUEsSUFBSSxDQUFDLFdBQVcsbUNBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUM3RCxDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0Y7QUE3REQsc0JBNkRDO0FBeUJELHFFQUFzQyJ9