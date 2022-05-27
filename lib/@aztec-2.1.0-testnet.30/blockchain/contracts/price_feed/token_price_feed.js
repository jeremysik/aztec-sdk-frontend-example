"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenPriceFeed = void 0;
const providers_1 = require("@ethersproject/providers");
const ethers_1 = require("ethers");
const abi = [
    'function latestAnswer() public view returns(int256)',
    'function latestRound() public pure returns(uint256)',
    'function getRoundData(uint80 _roundId) public view returns(uint80,int256,uint256,uint256,uint80)',
];
class TokenPriceFeed {
    constructor(priceFeedContractAddress, ethereumProvider) {
        this.contract = new ethers_1.Contract(priceFeedContractAddress.toString(), abi, new providers_1.Web3Provider(ethereumProvider));
    }
    async price() {
        return BigInt(await this.contract.latestAnswer());
    }
    async latestRound() {
        return BigInt(await this.contract.latestRound());
    }
    async getRoundData(roundId) {
        const [, answer, , updatedAt] = (await this.contract.getRoundData(roundId)) || [];
        return {
            roundId,
            price: BigInt(answer || 0),
            timestamp: +(updatedAt || 0),
        };
    }
    async getHistoricalPrice(roundId) {
        try {
            const data = await this.contract.getRoundData(roundId);
            return data ? BigInt(data[1]) : BigInt(0);
        }
        catch (e) {
            return BigInt(0);
        }
    }
}
exports.TokenPriceFeed = TokenPriceFeed;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9rZW5fcHJpY2VfZmVlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb250cmFjdHMvcHJpY2VfZmVlZC90b2tlbl9wcmljZV9mZWVkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHdEQUF3RDtBQUd4RCxtQ0FBa0M7QUFHbEMsTUFBTSxHQUFHLEdBQUc7SUFDVixxREFBcUQ7SUFDckQscURBQXFEO0lBQ3JELGtHQUFrRztDQUNuRyxDQUFDO0FBRUYsTUFBYSxjQUFjO0lBR3pCLFlBQVksd0JBQW9DLEVBQUUsZ0JBQWtDO1FBQ2xGLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxpQkFBUSxDQUFDLHdCQUF3QixDQUFDLFFBQVEsRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLHdCQUFZLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO0lBQzdHLENBQUM7SUFFRCxLQUFLLENBQUMsS0FBSztRQUNULE9BQU8sTUFBTSxDQUFDLE1BQU0sSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDO0lBQ3BELENBQUM7SUFFRCxLQUFLLENBQUMsV0FBVztRQUNmLE9BQU8sTUFBTSxDQUFDLE1BQU0sSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO0lBQ25ELENBQUM7SUFFRCxLQUFLLENBQUMsWUFBWSxDQUFDLE9BQWU7UUFDaEMsTUFBTSxDQUFDLEVBQUUsTUFBTSxFQUFFLEFBQUQsRUFBRyxTQUFTLENBQUMsR0FBRyxDQUFDLE1BQU0sSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDbEYsT0FBTztZQUNMLE9BQU87WUFDUCxLQUFLLEVBQUUsTUFBTSxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUM7WUFDMUIsU0FBUyxFQUFFLENBQUMsQ0FBQyxTQUFTLElBQUksQ0FBQyxDQUFDO1NBQzdCLENBQUM7SUFDSixDQUFDO0lBRUQsS0FBSyxDQUFDLGtCQUFrQixDQUFDLE9BQWU7UUFDdEMsSUFBSTtZQUNGLE1BQU0sSUFBSSxHQUFHLE1BQU0sSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDdkQsT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQzNDO1FBQUMsT0FBTyxDQUFDLEVBQUU7WUFDVixPQUFPLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNsQjtJQUNILENBQUM7Q0FDRjtBQWhDRCx3Q0FnQ0MifQ==