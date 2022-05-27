"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isVirtualAsset = exports.assetValueFromJson = exports.assetValueToJson = void 0;
const assetValueToJson = (assetValue) => ({
    ...assetValue,
    value: assetValue.value.toString(),
});
exports.assetValueToJson = assetValueToJson;
const assetValueFromJson = (json) => ({
    ...json,
    value: BigInt(json.value),
});
exports.assetValueFromJson = assetValueFromJson;
const isVirtualAsset = (assetId) => assetId >= 1 << 29;
exports.isVirtualAsset = isVirtualAsset;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYXNzZXQvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBVU8sTUFBTSxnQkFBZ0IsR0FBRyxDQUFDLFVBQXNCLEVBQWtCLEVBQUUsQ0FBQyxDQUFDO0lBQzNFLEdBQUcsVUFBVTtJQUNiLEtBQUssRUFBRSxVQUFVLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRTtDQUNuQyxDQUFDLENBQUM7QUFIVSxRQUFBLGdCQUFnQixvQkFHMUI7QUFFSSxNQUFNLGtCQUFrQixHQUFHLENBQUMsSUFBb0IsRUFBYyxFQUFFLENBQUMsQ0FBQztJQUN2RSxHQUFHLElBQUk7SUFDUCxLQUFLLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7Q0FDMUIsQ0FBQyxDQUFDO0FBSFUsUUFBQSxrQkFBa0Isc0JBRzVCO0FBRUksTUFBTSxjQUFjLEdBQUcsQ0FBQyxPQUFlLEVBQUUsRUFBRSxDQUFDLE9BQU8sSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0FBQXpELFFBQUEsY0FBYyxrQkFBMkMifQ==