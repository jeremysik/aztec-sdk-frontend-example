"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rollupProviderStatusFromJson = exports.rollupProviderStatusToJson = exports.partialRuntimeConfigFromJson = exports.runtimeConfigFromJson = exports.runtimeConfigToJson = void 0;
const tslib_1 = require("tslib");
const blockchain_1 = require("../blockchain");
const bridge_config_1 = require("./bridge_config");
const bridge_status_1 = require("./bridge_status");
(0, tslib_1.__exportStar)(require("./bridge_config"), exports);
(0, tslib_1.__exportStar)(require("./bridge_status"), exports);
const runtimeConfigToJson = ({ maxFeeGasPrice, maxProviderGasPrice, bridgeConfigs, ...rest }) => ({
    ...rest,
    maxFeeGasPrice: maxFeeGasPrice.toString(),
    maxProviderGasPrice: maxProviderGasPrice.toString(),
    bridgeConfigs: bridgeConfigs.map(bridge_config_1.bridgeConfigToJson),
});
exports.runtimeConfigToJson = runtimeConfigToJson;
const runtimeConfigFromJson = ({ maxFeeGasPrice, maxProviderGasPrice, bridgeConfigs, ...rest }) => ({
    ...rest,
    maxFeeGasPrice: BigInt(maxFeeGasPrice),
    maxProviderGasPrice: BigInt(maxProviderGasPrice),
    bridgeConfigs: bridgeConfigs.map(bridge_config_1.bridgeConfigFromJson),
});
exports.runtimeConfigFromJson = runtimeConfigFromJson;
const partialRuntimeConfigFromJson = ({ maxFeeGasPrice, maxProviderGasPrice, bridgeConfigs, ...rest }) => ({
    ...rest,
    ...(maxFeeGasPrice !== undefined ? { maxFeeGasPrice: BigInt(maxFeeGasPrice) } : {}),
    ...(maxProviderGasPrice !== undefined ? { maxProviderGasPrice: BigInt(maxProviderGasPrice) } : {}),
    ...(bridgeConfigs ? { bridgeConfigs: bridgeConfigs.map(bridge_config_1.bridgeConfigFromJson) } : {}),
});
exports.partialRuntimeConfigFromJson = partialRuntimeConfigFromJson;
const rollupProviderStatusToJson = ({ blockchainStatus, nextPublishTime, runtimeConfig, bridgeStatus, ...rest }) => ({
    ...rest,
    blockchainStatus: (0, blockchain_1.blockchainStatusToJson)(blockchainStatus),
    nextPublishTime: nextPublishTime.toISOString(),
    runtimeConfig: (0, exports.runtimeConfigToJson)(runtimeConfig),
    bridgeStatus: bridgeStatus.map(bridge_status_1.bridgeStatusToJson),
});
exports.rollupProviderStatusToJson = rollupProviderStatusToJson;
const rollupProviderStatusFromJson = ({ blockchainStatus, nextPublishTime, runtimeConfig, bridgeStatus, ...rest }) => ({
    ...rest,
    blockchainStatus: (0, blockchain_1.blockchainStatusFromJson)(blockchainStatus),
    nextPublishTime: new Date(nextPublishTime),
    runtimeConfig: (0, exports.runtimeConfigFromJson)(runtimeConfig),
    bridgeStatus: bridgeStatus.map(bridge_status_1.bridgeStatusFromJson),
});
exports.rollupProviderStatusFromJson = rollupProviderStatusFromJson;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9sbHVwX3Byb3ZpZGVyX3N0YXR1cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yb2xsdXBfcHJvdmlkZXIvcm9sbHVwX3Byb3ZpZGVyX3N0YXR1cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsOENBS3VCO0FBQ3ZCLG1EQUEyRztBQUMzRyxtREFBMkc7QUFFM0csK0RBQWdDO0FBQ2hDLCtEQUFnQztBQW9DekIsTUFBTSxtQkFBbUIsR0FBRyxDQUFDLEVBQ2xDLGNBQWMsRUFDZCxtQkFBbUIsRUFDbkIsYUFBYSxFQUNiLEdBQUcsSUFBSSxFQUNPLEVBQXFCLEVBQUUsQ0FBQyxDQUFDO0lBQ3ZDLEdBQUcsSUFBSTtJQUNQLGNBQWMsRUFBRSxjQUFjLENBQUMsUUFBUSxFQUFFO0lBQ3pDLG1CQUFtQixFQUFFLG1CQUFtQixDQUFDLFFBQVEsRUFBRTtJQUNuRCxhQUFhLEVBQUUsYUFBYSxDQUFDLEdBQUcsQ0FBQyxrQ0FBa0IsQ0FBQztDQUNyRCxDQUFDLENBQUM7QUFWVSxRQUFBLG1CQUFtQix1QkFVN0I7QUFFSSxNQUFNLHFCQUFxQixHQUFHLENBQUMsRUFDcEMsY0FBYyxFQUNkLG1CQUFtQixFQUNuQixhQUFhLEVBQ2IsR0FBRyxJQUFJLEVBQ1csRUFBaUIsRUFBRSxDQUFDLENBQUM7SUFDdkMsR0FBRyxJQUFJO0lBQ1AsY0FBYyxFQUFFLE1BQU0sQ0FBQyxjQUFjLENBQUM7SUFDdEMsbUJBQW1CLEVBQUUsTUFBTSxDQUFDLG1CQUFtQixDQUFDO0lBQ2hELGFBQWEsRUFBRSxhQUFhLENBQUMsR0FBRyxDQUFDLG9DQUFvQixDQUFDO0NBQ3ZELENBQUMsQ0FBQztBQVZVLFFBQUEscUJBQXFCLHlCQVUvQjtBQUVJLE1BQU0sNEJBQTRCLEdBQUcsQ0FBQyxFQUMzQyxjQUFjLEVBQ2QsbUJBQW1CLEVBQ25CLGFBQWEsRUFDYixHQUFHLElBQUksRUFDb0IsRUFBMEIsRUFBRSxDQUFDLENBQUM7SUFDekQsR0FBRyxJQUFJO0lBQ1AsR0FBRyxDQUFDLGNBQWMsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsY0FBYyxFQUFFLE1BQU0sQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFDbkYsR0FBRyxDQUFDLG1CQUFtQixLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxtQkFBbUIsRUFBRSxNQUFNLENBQUMsbUJBQW1CLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFDbEcsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsRUFBRSxhQUFhLEVBQUUsYUFBYSxDQUFDLEdBQUcsQ0FBQyxvQ0FBb0IsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztDQUNyRixDQUFDLENBQUM7QUFWVSxRQUFBLDRCQUE0QixnQ0FVdEM7QUE4QkksTUFBTSwwQkFBMEIsR0FBRyxDQUFDLEVBQ3pDLGdCQUFnQixFQUNoQixlQUFlLEVBQ2YsYUFBYSxFQUNiLFlBQVksRUFDWixHQUFHLElBQUksRUFDYyxFQUE0QixFQUFFLENBQUMsQ0FBQztJQUNyRCxHQUFHLElBQUk7SUFDUCxnQkFBZ0IsRUFBRSxJQUFBLG1DQUFzQixFQUFDLGdCQUFnQixDQUFDO0lBQzFELGVBQWUsRUFBRSxlQUFlLENBQUMsV0FBVyxFQUFFO0lBQzlDLGFBQWEsRUFBRSxJQUFBLDJCQUFtQixFQUFDLGFBQWEsQ0FBQztJQUNqRCxZQUFZLEVBQUUsWUFBWSxDQUFDLEdBQUcsQ0FBQyxrQ0FBa0IsQ0FBQztDQUNuRCxDQUFDLENBQUM7QUFaVSxRQUFBLDBCQUEwQiw4QkFZcEM7QUFFSSxNQUFNLDRCQUE0QixHQUFHLENBQUMsRUFDM0MsZ0JBQWdCLEVBQ2hCLGVBQWUsRUFDZixhQUFhLEVBQ2IsWUFBWSxFQUNaLEdBQUcsSUFBSSxFQUNrQixFQUF3QixFQUFFLENBQUMsQ0FBQztJQUNyRCxHQUFHLElBQUk7SUFDUCxnQkFBZ0IsRUFBRSxJQUFBLHFDQUF3QixFQUFDLGdCQUFnQixDQUFDO0lBQzVELGVBQWUsRUFBRSxJQUFJLElBQUksQ0FBQyxlQUFlLENBQUM7SUFDMUMsYUFBYSxFQUFFLElBQUEsNkJBQXFCLEVBQUMsYUFBYSxDQUFDO0lBQ25ELFlBQVksRUFBRSxZQUFZLENBQUMsR0FBRyxDQUFDLG9DQUFvQixDQUFDO0NBQ3JELENBQUMsQ0FBQztBQVpVLFFBQUEsNEJBQTRCLGdDQVl0QyJ9