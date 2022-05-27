"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EthPriceFeed = void 0;
class EthPriceFeed {
    constructor() { }
    async price() {
        return BigInt(10) ** BigInt(18);
    }
    async latestRound() {
        return BigInt(0);
    }
    async getRoundData(roundId) {
        return {
            roundId,
            price: await this.price(),
            timestamp: 0,
        };
    }
    async getHistoricalPrice(roundId) {
        return this.price();
    }
}
exports.EthPriceFeed = EthPriceFeed;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXRoX3ByaWNlX2ZlZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29udHJhY3RzL3ByaWNlX2ZlZWQvZXRoX3ByaWNlX2ZlZWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBR0EsTUFBYSxZQUFZO0lBQ3ZCLGdCQUFlLENBQUM7SUFFaEIsS0FBSyxDQUFDLEtBQUs7UUFDVCxPQUFPLE1BQU0sQ0FBQyxFQUFFLENBQUMsSUFBSSxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQUVELEtBQUssQ0FBQyxXQUFXO1FBQ2YsT0FBTyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbkIsQ0FBQztJQUVELEtBQUssQ0FBQyxZQUFZLENBQUMsT0FBZTtRQUNoQyxPQUFPO1lBQ0wsT0FBTztZQUNQLEtBQUssRUFBRSxNQUFNLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDekIsU0FBUyxFQUFFLENBQUM7U0FDYixDQUFDO0lBQ0osQ0FBQztJQUVELEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxPQUFlO1FBQ3RDLE9BQU8sSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ3RCLENBQUM7Q0FDRjtBQXRCRCxvQ0FzQkMifQ==