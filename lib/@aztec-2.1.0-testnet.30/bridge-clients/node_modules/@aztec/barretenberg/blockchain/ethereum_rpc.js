"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EthereumRpc = void 0;
const address_1 = require("../address");
class EthereumRpc {
    constructor(provider) {
        this.provider = provider;
    }
    async getChainId() {
        const result = await this.provider.request({ method: 'eth_chainId' });
        return Number(result);
    }
    async getAccounts() {
        const result = await this.provider.request({ method: 'eth_accounts' });
        return result.map(address_1.EthAddress.fromString);
    }
    async getTransactionCount(addr) {
        const result = await this.provider.request({
            method: 'eth_getTransactionCount',
            params: [addr.toString(), 'latest'],
        });
        return Number(result);
    }
    async getBalance(addr) {
        const result = await this.provider.request({
            method: 'eth_getBalance',
            params: [addr.toString(), 'latest'],
        });
        return BigInt(result);
    }
    /**
     * TODO: Return proper type with converted properties.
     */
    async getTransactionByHash(txHash) {
        const result = await this.provider.request({ method: 'eth_getTransactionByHash', params: [txHash.toString()] });
        return result;
    }
}
exports.EthereumRpc = EthereumRpc;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXRoZXJldW1fcnBjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2Jsb2NrY2hhaW4vZXRoZXJldW1fcnBjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHdDQUF3QztBQUl4QyxNQUFhLFdBQVc7SUFDdEIsWUFBb0IsUUFBMEI7UUFBMUIsYUFBUSxHQUFSLFFBQVEsQ0FBa0I7SUFBRyxDQUFDO0lBRTNDLEtBQUssQ0FBQyxVQUFVO1FBQ3JCLE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRSxNQUFNLEVBQUUsYUFBYSxFQUFFLENBQUMsQ0FBQztRQUN0RSxPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN4QixDQUFDO0lBRU0sS0FBSyxDQUFDLFdBQVc7UUFDdEIsTUFBTSxNQUFNLEdBQWEsTUFBTSxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFLE1BQU0sRUFBRSxjQUFjLEVBQUUsQ0FBQyxDQUFDO1FBQ2pGLE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxvQkFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFFTSxLQUFLLENBQUMsbUJBQW1CLENBQUMsSUFBZ0I7UUFDL0MsTUFBTSxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQztZQUN6QyxNQUFNLEVBQUUseUJBQXlCO1lBQ2pDLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRSxRQUFRLENBQUM7U0FDcEMsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDeEIsQ0FBQztJQUVNLEtBQUssQ0FBQyxVQUFVLENBQUMsSUFBZ0I7UUFDdEMsTUFBTSxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQztZQUN6QyxNQUFNLEVBQUUsZ0JBQWdCO1lBQ3hCLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRSxRQUFRLENBQUM7U0FDcEMsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDeEIsQ0FBQztJQUVEOztPQUVHO0lBQ0ksS0FBSyxDQUFDLG9CQUFvQixDQUFDLE1BQWM7UUFDOUMsTUFBTSxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFLE1BQU0sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLEVBQUUsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDaEgsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztDQUNGO0FBcENELGtDQW9DQyJ9