"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bridgeConfigFromJson = exports.bridgeConfigToJson = void 0;
const bridgeConfigToJson = ({ bridgeId, ...rest }) => ({
    ...rest,
    bridgeId: bridgeId.toString(),
});
exports.bridgeConfigToJson = bridgeConfigToJson;
const bridgeConfigFromJson = ({ bridgeId, ...rest }) => ({
    ...rest,
    bridgeId: BigInt(bridgeId),
});
exports.bridgeConfigFromJson = bridgeConfigFromJson;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJpZGdlX2NvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yb2xsdXBfcHJvdmlkZXIvYnJpZGdlX2NvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFnQk8sTUFBTSxrQkFBa0IsR0FBRyxDQUFDLEVBQUUsUUFBUSxFQUFFLEdBQUcsSUFBSSxFQUFnQixFQUFvQixFQUFFLENBQUMsQ0FBQztJQUM1RixHQUFHLElBQUk7SUFDUCxRQUFRLEVBQUUsUUFBUSxDQUFDLFFBQVEsRUFBRTtDQUM5QixDQUFDLENBQUM7QUFIVSxRQUFBLGtCQUFrQixzQkFHNUI7QUFFSSxNQUFNLG9CQUFvQixHQUFHLENBQUMsRUFBRSxRQUFRLEVBQUUsR0FBRyxJQUFJLEVBQW9CLEVBQWdCLEVBQUUsQ0FBQyxDQUFDO0lBQzlGLEdBQUcsSUFBSTtJQUNQLFFBQVEsRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDO0NBQzNCLENBQUMsQ0FBQztBQUhVLFFBQUEsb0JBQW9CLHdCQUc5QiJ9