"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractWithSigner = void 0;
const blockchain_1 = require("@aztec/barretenberg/blockchain");
const providers_1 = require("@ethersproject/providers");
const ethers_1 = require("ethers");
const fixEthersStackTrace = (err) => {
    err.stack += new Error().stack;
    throw err;
};
class ContractWithSigner {
    constructor(contract, options = {}) {
        this.options = options;
        const { provider, signingAddress } = options;
        const web3Provider = provider ? new providers_1.Web3Provider(provider) : contract.provider;
        const ethSigner = web3Provider.getSigner(signingAddress ? signingAddress.toString() : 0);
        this.contract = new ethers_1.Contract(contract.address, contract.interface, ethSigner);
    }
    async sendTx(functionName, ...args) {
        if (!this.contract[functionName]) {
            throw new Error(`Unknown contract function '${functionName}'.`);
        }
        const { gasLimit } = this.options;
        const tx = await this.contract[functionName](...args, { gasLimit }).catch(fixEthersStackTrace);
        return blockchain_1.TxHash.fromString(tx.hash);
    }
}
exports.ContractWithSigner = ContractWithSigner;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJhY3Rfd2l0aF9zaWduZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29udHJhY3RzL2NvbnRyYWN0X3dpdGhfc2lnbmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLCtEQUF1RTtBQUN2RSx3REFBd0Q7QUFDeEQsbUNBQWtDO0FBRWxDLE1BQU0sbUJBQW1CLEdBQUcsQ0FBQyxHQUFVLEVBQUUsRUFBRTtJQUN6QyxHQUFHLENBQUMsS0FBTSxJQUFJLElBQUksS0FBSyxFQUFFLENBQUMsS0FBSyxDQUFDO0lBQ2hDLE1BQU0sR0FBRyxDQUFDO0FBQ1osQ0FBQyxDQUFDO0FBRUYsTUFBYSxrQkFBa0I7SUFHN0IsWUFBWSxRQUFrQixFQUFVLFVBQXlCLEVBQUU7UUFBM0IsWUFBTyxHQUFQLE9BQU8sQ0FBb0I7UUFDakUsTUFBTSxFQUFFLFFBQVEsRUFBRSxjQUFjLEVBQUUsR0FBRyxPQUFPLENBQUM7UUFDN0MsTUFBTSxZQUFZLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLHdCQUFZLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFFLFFBQVEsQ0FBQyxRQUF5QixDQUFDO1FBQ2pHLE1BQU0sU0FBUyxHQUFHLFlBQVksQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3pGLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxpQkFBUSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQztJQUNoRixDQUFDO0lBRUQsS0FBSyxDQUFDLE1BQU0sQ0FBQyxZQUFvQixFQUFFLEdBQUcsSUFBVztRQUMvQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsRUFBRTtZQUNoQyxNQUFNLElBQUksS0FBSyxDQUFDLDhCQUE4QixZQUFZLElBQUksQ0FBQyxDQUFDO1NBQ2pFO1FBRUQsTUFBTSxFQUFFLFFBQVEsRUFBRSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDbEMsTUFBTSxFQUFFLEdBQUcsTUFBTSxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDLEdBQUcsSUFBSSxFQUFFLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUMvRixPQUFPLG1CQUFNLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNwQyxDQUFDO0NBQ0Y7QUFuQkQsZ0RBbUJDIn0=