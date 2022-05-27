"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userDataFromJson = exports.userDataToJson = void 0;
const tslib_1 = require("tslib");
const account_id_1 = require("@aztec/barretenberg/account_id");
const address_1 = require("@aztec/barretenberg/address");
tslib_1.__exportStar(require("./recovery_payload"), exports);
const userDataToJson = ({ id, privateKey, publicKey, aliasHash, ...rest }) => ({
    ...rest,
    id: id.toString(),
    privateKey: privateKey.toString('hex'),
    publicKey: publicKey.toString(),
    aliasHash: aliasHash ? aliasHash.toString() : undefined,
});
exports.userDataToJson = userDataToJson;
const userDataFromJson = ({ id, privateKey, publicKey, aliasHash, ...rest }) => ({
    ...rest,
    id: account_id_1.AccountId.fromString(id),
    privateKey: Buffer.from(privateKey, 'hex'),
    publicKey: address_1.GrumpkinAddress.fromString(publicKey),
    aliasHash: aliasHash ? account_id_1.AliasHash.fromString(aliasHash) : undefined,
});
exports.userDataFromJson = userDataFromJson;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXNlci9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsK0RBQXNFO0FBQ3RFLHlEQUE4RDtBQUU5RCw2REFBbUM7QUFvQjVCLE1BQU0sY0FBYyxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsR0FBRyxJQUFJLEVBQVksRUFBZ0IsRUFBRSxDQUFDLENBQUM7SUFDNUcsR0FBRyxJQUFJO0lBQ1AsRUFBRSxFQUFFLEVBQUUsQ0FBQyxRQUFRLEVBQUU7SUFDakIsVUFBVSxFQUFFLFVBQVUsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDO0lBQ3RDLFNBQVMsRUFBRSxTQUFTLENBQUMsUUFBUSxFQUFFO0lBQy9CLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUztDQUN4RCxDQUFDLENBQUM7QUFOVSxRQUFBLGNBQWMsa0JBTXhCO0FBRUksTUFBTSxnQkFBZ0IsR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLEdBQUcsSUFBSSxFQUFnQixFQUFZLEVBQUUsQ0FBQyxDQUFDO0lBQzlHLEdBQUcsSUFBSTtJQUNQLEVBQUUsRUFBRSxzQkFBUyxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUM7SUFDNUIsVUFBVSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLEtBQUssQ0FBQztJQUMxQyxTQUFTLEVBQUUseUJBQWUsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDO0lBQ2hELFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLHNCQUFTLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTO0NBQ25FLENBQUMsQ0FBQztBQU5VLFFBQUEsZ0JBQWdCLG9CQU0xQiJ9