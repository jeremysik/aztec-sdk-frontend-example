"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setBlockchainTime = exports.getCurrentBlockTime = exports.advanceBlocks = exports.blocksToAdvance = exports.getCurrentBlockNumber = void 0;
async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function getCurrentBlockNumber(provider) {
    return parseInt(await provider.request({ method: 'eth_blockNumber', params: [] }));
}
exports.getCurrentBlockNumber = getCurrentBlockNumber;
async function blocksToAdvance(target, accuracy, provider) {
    const blockNumber = await getCurrentBlockNumber(provider);
    const remainder = blockNumber % accuracy;
    if (remainder > target) {
        return accuracy - remainder + target;
    }
    else {
        return target - remainder;
    }
}
exports.blocksToAdvance = blocksToAdvance;
async function advanceBlocks(blocks, provider) {
    for (let i = 0; i < blocks; ++i) {
        await provider.request({ method: 'evm_mine', params: [] });
    }
    await sleep(1200); // wait for ethereum_blockchain to update its status (it's polling and updating status every second)
    return getCurrentBlockNumber(provider);
}
exports.advanceBlocks = advanceBlocks;
async function getCurrentBlockTime(provider) {
    const block = await provider.request({ method: 'eth_getBlockByNumber', params: ['latest'] });
    return Number(block.timestamp);
}
exports.getCurrentBlockTime = getCurrentBlockTime;
async function setBlockchainTime(unixTimestamp, provider) {
    const millisecondTimestamp = unixTimestamp * 1000;
    await provider.request({ method: 'evm_setTime', params: [`0x${millisecondTimestamp.toString(16)}`] });
    await advanceBlocks(1, provider);
}
exports.setBlockchainTime = setBlockchainTime;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFuaXB1bGF0ZV9ibG9ja3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvbWFuaXB1bGF0ZV9ibG9ja3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBRUEsS0FBSyxVQUFVLEtBQUssQ0FBQyxFQUFVO0lBQzdCLE9BQU8sSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDekQsQ0FBQztBQUVNLEtBQUssVUFBVSxxQkFBcUIsQ0FBQyxRQUEwQjtJQUNwRSxPQUFPLFFBQVEsQ0FBQyxNQUFNLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRSxNQUFNLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUNyRixDQUFDO0FBRkQsc0RBRUM7QUFFTSxLQUFLLFVBQVUsZUFBZSxDQUFDLE1BQWMsRUFBRSxRQUFnQixFQUFFLFFBQTBCO0lBQ2hHLE1BQU0sV0FBVyxHQUFHLE1BQU0scUJBQXFCLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDMUQsTUFBTSxTQUFTLEdBQUcsV0FBVyxHQUFHLFFBQVEsQ0FBQztJQUN6QyxJQUFJLFNBQVMsR0FBRyxNQUFNLEVBQUU7UUFDdEIsT0FBTyxRQUFRLEdBQUcsU0FBUyxHQUFHLE1BQU0sQ0FBQztLQUN0QztTQUFNO1FBQ0wsT0FBTyxNQUFNLEdBQUcsU0FBUyxDQUFDO0tBQzNCO0FBQ0gsQ0FBQztBQVJELDBDQVFDO0FBRU0sS0FBSyxVQUFVLGFBQWEsQ0FBQyxNQUFjLEVBQUUsUUFBMEI7SUFDNUUsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sRUFBRSxFQUFFLENBQUMsRUFBRTtRQUMvQixNQUFNLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0tBQzVEO0lBQ0QsTUFBTSxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxvR0FBb0c7SUFDdkgsT0FBTyxxQkFBcUIsQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUN6QyxDQUFDO0FBTkQsc0NBTUM7QUFFTSxLQUFLLFVBQVUsbUJBQW1CLENBQUMsUUFBMEI7SUFDbEUsTUFBTSxLQUFLLEdBQUcsTUFBTSxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUUsTUFBTSxFQUFFLHNCQUFzQixFQUFFLE1BQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUM3RixPQUFPLE1BQU0sQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDakMsQ0FBQztBQUhELGtEQUdDO0FBRU0sS0FBSyxVQUFVLGlCQUFpQixDQUFDLGFBQXFCLEVBQUUsUUFBMEI7SUFDdkYsTUFBTSxvQkFBb0IsR0FBRyxhQUFhLEdBQUcsSUFBSSxDQUFDO0lBQ2xELE1BQU0sUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFLE1BQU0sRUFBRSxhQUFhLEVBQUUsTUFBTSxFQUFFLENBQUMsS0FBSyxvQkFBb0IsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQztJQUNyRyxNQUFNLGFBQWEsQ0FBQyxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFDbkMsQ0FBQztBQUpELDhDQUlDIn0=