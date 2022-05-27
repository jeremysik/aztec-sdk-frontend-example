"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bridgeStatusFromJson = exports.bridgeStatusToJson = void 0;
const bigint_buffer_1 = require("../bigint_buffer");
function bridgeStatusToJson({ bridgeId, nextPublishTime, ...rest }) {
    return {
        ...rest,
        bridgeId: (0, bigint_buffer_1.toBufferBE)(bridgeId, 32).toString('hex'),
        nextPublishTime: nextPublishTime === null || nextPublishTime === void 0 ? void 0 : nextPublishTime.toISOString(),
    };
}
exports.bridgeStatusToJson = bridgeStatusToJson;
function bridgeStatusFromJson({ bridgeId, nextPublishTime, ...rest }) {
    return {
        ...rest,
        bridgeId: (0, bigint_buffer_1.toBigIntBE)(Buffer.from(bridgeId, 'hex')),
        nextPublishTime: nextPublishTime ? new Date(nextPublishTime) : undefined,
    };
}
exports.bridgeStatusFromJson = bridgeStatusFromJson;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJpZGdlX3N0YXR1cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yb2xsdXBfcHJvdmlkZXIvYnJpZGdlX3N0YXR1cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxvREFBMEQ7QUFzQjFELFNBQWdCLGtCQUFrQixDQUFDLEVBQUUsUUFBUSxFQUFFLGVBQWUsRUFBRSxHQUFHLElBQUksRUFBZ0I7SUFDckYsT0FBTztRQUNMLEdBQUcsSUFBSTtRQUNQLFFBQVEsRUFBRSxJQUFBLDBCQUFVLEVBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUM7UUFDbEQsZUFBZSxFQUFFLGVBQWUsYUFBZixlQUFlLHVCQUFmLGVBQWUsQ0FBRSxXQUFXLEVBQUU7S0FDaEQsQ0FBQztBQUNKLENBQUM7QUFORCxnREFNQztBQUVELFNBQWdCLG9CQUFvQixDQUFDLEVBQUUsUUFBUSxFQUFFLGVBQWUsRUFBRSxHQUFHLElBQUksRUFBb0I7SUFDM0YsT0FBTztRQUNMLEdBQUcsSUFBSTtRQUNQLFFBQVEsRUFBRSxJQUFBLDBCQUFVLEVBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDbEQsZUFBZSxFQUFFLGVBQWUsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVM7S0FDekUsQ0FBQztBQUNKLENBQUM7QUFORCxvREFNQyJ9