"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sdkStatusFromJson = exports.sdkStatusToJson = exports.SdkEvent = void 0;
const address_1 = require("@aztec/barretenberg/address");
var SdkEvent;
(function (SdkEvent) {
    // The set of users has changed.
    SdkEvent["UPDATED_USERS"] = "SDKEVENT_UPDATED_USERS";
    // A users state has changed.
    SdkEvent["UPDATED_USER_STATE"] = "SDKEVENT_UPDATED_USER_STATE";
    // The world state has updated. Used for displaying sync progress.
    SdkEvent["UPDATED_WORLD_STATE"] = "SDKEVENT_UPDATED_WORLD_STATE";
    // The sdk has been destroyed.
    SdkEvent["DESTROYED"] = "SDKEVENT_DESTROYED";
})(SdkEvent = exports.SdkEvent || (exports.SdkEvent = {}));
const sdkStatusToJson = (status) => ({
    ...status,
    rollupContractAddress: status.rollupContractAddress.toString(),
    dataRoot: status.dataRoot.toString('hex'),
});
exports.sdkStatusToJson = sdkStatusToJson;
const sdkStatusFromJson = (json) => ({
    ...json,
    rollupContractAddress: address_1.EthAddress.fromString(json.rollupContractAddress),
    dataRoot: Buffer.from(json.dataRoot, 'hex'),
});
exports.sdkStatusFromJson = sdkStatusFromJson;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2RrX3N0YXR1cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb3JlX3Nkay9zZGtfc3RhdHVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHlEQUF5RDtBQUV6RCxJQUFZLFFBU1g7QUFURCxXQUFZLFFBQVE7SUFDbEIsZ0NBQWdDO0lBQ2hDLG9EQUF3QyxDQUFBO0lBQ3hDLDZCQUE2QjtJQUM3Qiw4REFBa0QsQ0FBQTtJQUNsRCxrRUFBa0U7SUFDbEUsZ0VBQW9ELENBQUE7SUFDcEQsOEJBQThCO0lBQzlCLDRDQUFnQyxDQUFBO0FBQ2xDLENBQUMsRUFUVyxRQUFRLEdBQVIsZ0JBQVEsS0FBUixnQkFBUSxRQVNuQjtBQXdCTSxNQUFNLGVBQWUsR0FBRyxDQUFDLE1BQWlCLEVBQWlCLEVBQUUsQ0FBQyxDQUFDO0lBQ3BFLEdBQUcsTUFBTTtJQUNULHFCQUFxQixFQUFFLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxRQUFRLEVBQUU7SUFDOUQsUUFBUSxFQUFFLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQztDQUMxQyxDQUFDLENBQUM7QUFKVSxRQUFBLGVBQWUsbUJBSXpCO0FBRUksTUFBTSxpQkFBaUIsR0FBRyxDQUFDLElBQW1CLEVBQWEsRUFBRSxDQUFDLENBQUM7SUFDcEUsR0FBRyxJQUFJO0lBQ1AscUJBQXFCLEVBQUUsb0JBQVUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDO0lBQ3hFLFFBQVEsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDO0NBQzVDLENBQUMsQ0FBQztBQUpVLFFBQUEsaUJBQWlCLHFCQUkzQiJ9