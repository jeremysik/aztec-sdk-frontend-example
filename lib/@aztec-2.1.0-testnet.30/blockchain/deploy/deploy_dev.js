"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deployDev = void 0;
const deployers_1 = require("./deployers");
const deploy_erc20_1 = require("./deployers/deploy_erc20");
const escapeBlockLower = 2160;
const escapeBlockUpper = 2400;
async function deployDev(signer, { dataTreeSize, roots }, vk) {
    const uniswapRouter = await (0, deployers_1.deployUniswap)(signer);
    const verifier = vk ? await (0, deployers_1.deployVerifier)(signer, vk) : await (0, deployers_1.deployMockVerifier)(signer);
    const defiProxy = await (0, deployers_1.deployDefiBridgeProxy)(signer);
    const rollup = await (0, deployers_1.deployRollupProcessor)(signer, verifier, defiProxy, escapeBlockLower, escapeBlockUpper, roots.dataRoot, roots.nullRoot, roots.rootsRoot, dataTreeSize, true);
    const feeDistributor = await (0, deployers_1.deployFeeDistributor)(signer, rollup, uniswapRouter.address);
    const asset0 = await (0, deploy_erc20_1.deployErc20)(rollup, signer, true, 'DAI');
    const asset1 = await (0, deploy_erc20_1.deployErc20)(rollup, signer, true, 'BTC', 8);
    const gasPrice = 20n * 10n ** 9n; // 20 gwei
    const daiPrice = 1n * 10n ** 15n; // 1000 DAI/ETH
    const initialEthSupply = 1n * 10n ** 17n; // 0.1 ETH
    const initialTokenSupply = (initialEthSupply * 10n ** 18n) / daiPrice;
    await (0, deployers_1.deployUniswapPair)(signer, uniswapRouter, asset0, initialTokenSupply, initialEthSupply);
    await (0, deployers_1.deployUniswapBridge)(signer, rollup, uniswapRouter);
    await (0, deployers_1.deployDummyBridge)(rollup, signer, [asset0, asset1]);
    const gasPriceFeedContact = await (0, deployers_1.deployMockPriceFeed)(signer, gasPrice);
    const daiPriceFeedContact = await (0, deployers_1.deployMockPriceFeed)(signer, daiPrice);
    const priceFeeds = [gasPriceFeedContact.address, daiPriceFeedContact.address];
    return { rollup, priceFeeds, feeDistributor };
}
exports.deployDev = deployDev;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVwbG95X2Rldi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kZXBsb3kvZGVwbG95X2Rldi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFQSwyQ0FXcUI7QUFDckIsMkRBQXVEO0FBRXZELE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSxDQUFDO0FBQzlCLE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSxDQUFDO0FBRXZCLEtBQUssVUFBVSxTQUFTLENBQUMsTUFBYyxFQUFFLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBZ0IsRUFBRSxFQUFXO0lBQ2hHLE1BQU0sYUFBYSxHQUFHLE1BQU0sSUFBQSx5QkFBYSxFQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2xELE1BQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxJQUFBLDBCQUFjLEVBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLElBQUEsOEJBQWtCLEVBQUMsTUFBTSxDQUFDLENBQUM7SUFDMUYsTUFBTSxTQUFTLEdBQUcsTUFBTSxJQUFBLGlDQUFxQixFQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3RELE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBQSxpQ0FBcUIsRUFDeEMsTUFBTSxFQUNOLFFBQVEsRUFDUixTQUFTLEVBQ1QsZ0JBQWdCLEVBQ2hCLGdCQUFnQixFQUNoQixLQUFLLENBQUMsUUFBUSxFQUNkLEtBQUssQ0FBQyxRQUFRLEVBQ2QsS0FBSyxDQUFDLFNBQVMsRUFDZixZQUFZLEVBQ1osSUFBSSxDQUNMLENBQUM7SUFDRixNQUFNLGNBQWMsR0FBRyxNQUFNLElBQUEsZ0NBQW9CLEVBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7SUFFekYsTUFBTSxNQUFNLEdBQUcsTUFBTSxJQUFBLDBCQUFXLEVBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDOUQsTUFBTSxNQUFNLEdBQUcsTUFBTSxJQUFBLDBCQUFXLEVBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBRWpFLE1BQU0sUUFBUSxHQUFHLEdBQUcsR0FBRyxHQUFHLElBQUksRUFBRSxDQUFDLENBQUMsVUFBVTtJQUM1QyxNQUFNLFFBQVEsR0FBRyxFQUFFLEdBQUcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUFDLGVBQWU7SUFDakQsTUFBTSxnQkFBZ0IsR0FBRyxFQUFFLEdBQUcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUFDLFVBQVU7SUFDcEQsTUFBTSxrQkFBa0IsR0FBRyxDQUFDLGdCQUFnQixHQUFHLEdBQUcsSUFBSSxHQUFHLENBQUMsR0FBRyxRQUFRLENBQUM7SUFDdEUsTUFBTSxJQUFBLDZCQUFpQixFQUFDLE1BQU0sRUFBRSxhQUFhLEVBQUUsTUFBTSxFQUFFLGtCQUFrQixFQUFFLGdCQUFnQixDQUFDLENBQUM7SUFDN0YsTUFBTSxJQUFBLCtCQUFtQixFQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsYUFBYSxDQUFDLENBQUM7SUFDekQsTUFBTSxJQUFBLDZCQUFpQixFQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUUxRCxNQUFNLG1CQUFtQixHQUFHLE1BQU0sSUFBQSwrQkFBbUIsRUFBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDeEUsTUFBTSxtQkFBbUIsR0FBRyxNQUFNLElBQUEsK0JBQW1CLEVBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ3hFLE1BQU0sVUFBVSxHQUFHLENBQUMsbUJBQW1CLENBQUMsT0FBTyxFQUFFLG1CQUFtQixDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBRTlFLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLGNBQWMsRUFBRSxDQUFDO0FBQ2hELENBQUM7QUFsQ0QsOEJBa0NDIn0=