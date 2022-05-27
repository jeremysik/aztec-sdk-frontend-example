"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Alias = exports.SigningKey = void 0;
// export interface SigningKey {
//   accountId: AccountId;
//   key: Buffer; // only contains x coordinate of a grumpkin address.
//   treeIndex: number;
// }
// export interface Alias {
//   aliasHash: AliasHash;
//   address: GrumpkinAddress;
//   latestNonce: number;
// }
// Temporary workaround. Parcel can't find Alias and SigningKey if they are declared as interfaces :/
class SigningKey {
    constructor(accountId, key, // only contains x coordinate of a grumpkin address.
    treeIndex, hashPath) {
        this.accountId = accountId;
        this.key = key;
        this.treeIndex = treeIndex;
        this.hashPath = hashPath;
    }
}
exports.SigningKey = SigningKey;
class Alias {
    constructor(aliasHash, address, latestNonce) {
        this.aliasHash = aliasHash;
        this.address = address;
        this.latestNonce = latestNonce;
    }
}
exports.Alias = Alias;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWJhc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZGF0YWJhc2UvZGF0YWJhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBUUEsZ0NBQWdDO0FBQ2hDLDBCQUEwQjtBQUMxQixzRUFBc0U7QUFDdEUsdUJBQXVCO0FBQ3ZCLElBQUk7QUFFSiwyQkFBMkI7QUFDM0IsMEJBQTBCO0FBQzFCLDhCQUE4QjtBQUM5Qix5QkFBeUI7QUFDekIsSUFBSTtBQUVKLHFHQUFxRztBQUNyRyxNQUFhLFVBQVU7SUFDckIsWUFDUyxTQUFvQixFQUNwQixHQUFXLEVBQUUsb0RBQW9EO0lBQ2pFLFNBQWlCLEVBQ2pCLFFBQWdCO1FBSGhCLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFDcEIsUUFBRyxHQUFILEdBQUcsQ0FBUTtRQUNYLGNBQVMsR0FBVCxTQUFTLENBQVE7UUFDakIsYUFBUSxHQUFSLFFBQVEsQ0FBUTtJQUN0QixDQUFDO0NBQ0w7QUFQRCxnQ0FPQztBQUVELE1BQWEsS0FBSztJQUNoQixZQUFtQixTQUFvQixFQUFTLE9BQXdCLEVBQVMsV0FBbUI7UUFBakYsY0FBUyxHQUFULFNBQVMsQ0FBVztRQUFTLFlBQU8sR0FBUCxPQUFPLENBQWlCO1FBQVMsZ0JBQVcsR0FBWCxXQUFXLENBQVE7SUFBRyxDQUFDO0NBQ3pHO0FBRkQsc0JBRUMifQ==