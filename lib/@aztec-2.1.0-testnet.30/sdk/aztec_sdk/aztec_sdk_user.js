"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AztecSdkUser = void 0;
class AztecSdkUser {
    constructor(id, sdk) {
        this.id = id;
        this.sdk = sdk;
    }
    async isSynching() {
        return this.sdk.isUserSynching(this.id);
    }
    async awaitSynchronised() {
        return this.sdk.awaitUserSynchronised(this.id);
    }
    async getSigningKeys() {
        return this.sdk.getSigningKeys(this.id);
    }
    async getUserData() {
        return this.sdk.getUserData(this.id);
    }
    async getBalance(assetId) {
        return this.sdk.getBalance(assetId, this.id);
    }
    async getSpendableSum(assetId, excludePendingNotes) {
        return this.sdk.getSpendableSum(assetId, this.id, excludePendingNotes);
    }
    async getSpendableSums(excludePendingNotes) {
        return this.sdk.getSpendableSums(this.id, excludePendingNotes);
    }
    async getMaxSpendableValue(assetId, numNotes, excludePendingNotes) {
        return this.sdk.getMaxSpendableValue(assetId, this.id, numNotes, excludePendingNotes);
    }
    async getTxs() {
        return this.sdk.getUserTxs(this.id);
    }
    async getPaymentTxs() {
        return this.sdk.getPaymentTxs(this.id);
    }
    async getAccountTxs() {
        return this.sdk.getAccountTxs(this.id);
    }
    async getDefiTxs() {
        return this.sdk.getDefiTxs(this.id);
    }
}
exports.AztecSdkUser = AztecSdkUser;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXp0ZWNfc2RrX3VzZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYXp0ZWNfc2RrL2F6dGVjX3Nka191c2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUdBLE1BQWEsWUFBWTtJQUN2QixZQUFtQixFQUFhLEVBQVUsR0FBYTtRQUFwQyxPQUFFLEdBQUYsRUFBRSxDQUFXO1FBQVUsUUFBRyxHQUFILEdBQUcsQ0FBVTtJQUFHLENBQUM7SUFFcEQsS0FBSyxDQUFDLFVBQVU7UUFDckIsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUVNLEtBQUssQ0FBQyxpQkFBaUI7UUFDNUIsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBRU0sS0FBSyxDQUFDLGNBQWM7UUFDekIsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUVNLEtBQUssQ0FBQyxXQUFXO1FBQ3RCLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFFTSxLQUFLLENBQUMsVUFBVSxDQUFDLE9BQWU7UUFDckMsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFFTSxLQUFLLENBQUMsZUFBZSxDQUFDLE9BQWUsRUFBRSxtQkFBNkI7UUFDekUsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLEVBQUUsRUFBRSxtQkFBbUIsQ0FBQyxDQUFDO0lBQ3pFLENBQUM7SUFFTSxLQUFLLENBQUMsZ0JBQWdCLENBQUMsbUJBQTZCO1FBQ3pELE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLG1CQUFtQixDQUFDLENBQUM7SUFDakUsQ0FBQztJQUVNLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyxPQUFlLEVBQUUsUUFBaUIsRUFBRSxtQkFBNkI7UUFDakcsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsRUFBRSxFQUFFLFFBQVEsRUFBRSxtQkFBbUIsQ0FBQyxDQUFDO0lBQ3hGLENBQUM7SUFFTSxLQUFLLENBQUMsTUFBTTtRQUNqQixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBRU0sS0FBSyxDQUFDLGFBQWE7UUFDeEIsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDekMsQ0FBQztJQUVNLEtBQUssQ0FBQyxhQUFhO1FBQ3hCLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFFTSxLQUFLLENBQUMsVUFBVTtRQUNyQixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUN0QyxDQUFDO0NBQ0Y7QUFsREQsb0NBa0RDIn0=