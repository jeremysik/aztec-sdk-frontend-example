"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OffchainJoinSplitData = void 0;
const serialize_1 = require("../serialize");
const viewing_key_1 = require("../viewing_key");
class OffchainJoinSplitData {
    constructor(viewingKeys, txRefNo = 0) {
        this.viewingKeys = viewingKeys;
        this.txRefNo = txRefNo;
        if (viewingKeys.length !== 2) {
            throw new Error(`Expect 2 viewing keys. Received ${viewingKeys.length}.`);
        }
        if (viewingKeys.some(vk => vk.isEmpty())) {
            throw new Error('Viewing key cannot be empty.');
        }
    }
    static fromBuffer(buf) {
        if (buf.length !== OffchainJoinSplitData.SIZE) {
            throw new Error('Invalid buffer size.');
        }
        let dataStart = 0;
        const viewingKey0 = new viewing_key_1.ViewingKey(buf.slice(dataStart, dataStart + viewing_key_1.ViewingKey.SIZE));
        dataStart += viewing_key_1.ViewingKey.SIZE;
        const viewingKey1 = new viewing_key_1.ViewingKey(buf.slice(dataStart, dataStart + viewing_key_1.ViewingKey.SIZE));
        dataStart += viewing_key_1.ViewingKey.SIZE;
        const txRefNo = buf.readUInt32BE(dataStart);
        return new OffchainJoinSplitData([viewingKey0, viewingKey1], txRefNo);
    }
    toBuffer() {
        return Buffer.concat([...this.viewingKeys.map(k => k.toBuffer()), (0, serialize_1.numToUInt32BE)(this.txRefNo)]);
    }
}
exports.OffchainJoinSplitData = OffchainJoinSplitData;
OffchainJoinSplitData.EMPTY = new OffchainJoinSplitData([
    new viewing_key_1.ViewingKey(Buffer.alloc(viewing_key_1.ViewingKey.SIZE)),
    new viewing_key_1.ViewingKey(Buffer.alloc(viewing_key_1.ViewingKey.SIZE)),
]);
OffchainJoinSplitData.SIZE = OffchainJoinSplitData.EMPTY.toBuffer().length;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2ZmY2hhaW5fam9pbl9zcGxpdF9kYXRhLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL29mZmNoYWluX3R4X2RhdGEvb2ZmY2hhaW5fam9pbl9zcGxpdF9kYXRhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDRDQUE2QztBQUM3QyxnREFBNEM7QUFFNUMsTUFBYSxxQkFBcUI7SUFPaEMsWUFBNEIsV0FBeUIsRUFBa0IsVUFBVSxDQUFDO1FBQXRELGdCQUFXLEdBQVgsV0FBVyxDQUFjO1FBQWtCLFlBQU8sR0FBUCxPQUFPLENBQUk7UUFDaEYsSUFBSSxXQUFXLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtZQUM1QixNQUFNLElBQUksS0FBSyxDQUFDLG1DQUFtQyxXQUFXLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztTQUMzRTtRQUNELElBQUksV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxFQUFFO1lBQ3hDLE1BQU0sSUFBSSxLQUFLLENBQUMsOEJBQThCLENBQUMsQ0FBQztTQUNqRDtJQUNILENBQUM7SUFFRCxNQUFNLENBQUMsVUFBVSxDQUFDLEdBQVc7UUFDM0IsSUFBSSxHQUFHLENBQUMsTUFBTSxLQUFLLHFCQUFxQixDQUFDLElBQUksRUFBRTtZQUM3QyxNQUFNLElBQUksS0FBSyxDQUFDLHNCQUFzQixDQUFDLENBQUM7U0FDekM7UUFFRCxJQUFJLFNBQVMsR0FBRyxDQUFDLENBQUM7UUFDbEIsTUFBTSxXQUFXLEdBQUcsSUFBSSx3QkFBVSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFLFNBQVMsR0FBRyx3QkFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDdEYsU0FBUyxJQUFJLHdCQUFVLENBQUMsSUFBSSxDQUFDO1FBQzdCLE1BQU0sV0FBVyxHQUFHLElBQUksd0JBQVUsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxTQUFTLEdBQUcsd0JBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ3RGLFNBQVMsSUFBSSx3QkFBVSxDQUFDLElBQUksQ0FBQztRQUM3QixNQUFNLE9BQU8sR0FBRyxHQUFHLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzVDLE9BQU8sSUFBSSxxQkFBcUIsQ0FBQyxDQUFDLFdBQVcsRUFBRSxXQUFXLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUN4RSxDQUFDO0lBRUQsUUFBUTtRQUNOLE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsRUFBRSxJQUFBLHlCQUFhLEVBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNsRyxDQUFDOztBQWhDSCxzREFpQ0M7QUFoQ1EsMkJBQUssR0FBRyxJQUFJLHFCQUFxQixDQUFDO0lBQ3ZDLElBQUksd0JBQVUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLHdCQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDN0MsSUFBSSx3QkFBVSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsd0JBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztDQUM5QyxDQUFDLENBQUM7QUFDSSwwQkFBSSxHQUFHLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxNQUFNLENBQUMifQ==