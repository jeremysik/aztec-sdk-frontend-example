"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EthAsset = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
const address_1 = require("@aztec/barretenberg/address");
const blockchain_1 = require("@aztec/barretenberg/blockchain");
const providers_1 = require("@ethersproject/providers");
const units_1 = require("../../units");
const fixEthersStackTrace = (err) => {
    err.stack += new Error().stack;
    throw err;
};
class EthAsset {
    constructor(provider, minConfirmations = 1) {
        this.minConfirmations = minConfirmations;
        this.provider = new providers_1.Web3Provider(provider);
    }
    getStaticInfo() {
        return {
            address: address_1.EthAddress.ZERO,
            name: 'Eth',
            symbol: 'ETH',
            decimals: 18,
            gasLimit: 30000,
        };
    }
    async getUserNonce(account) {
        return BigInt(0);
    }
    async balanceOf(account) {
        const balance = await this.provider.getBalance(account.toString());
        return BigInt(balance.toString());
    }
    async allowance(owner, receiver) {
        throw new Error('Allowance unsupported for ETH.');
    }
    async approve(value, owner, receiver) {
        throw new Error('Approve unsupported for ETH.');
    }
    async mint(value, account) {
        throw new Error('Mint unsupported for ETH.');
    }
    async transfer(value, from, to, options = {}) {
        const provider = options.provider ? new providers_1.Web3Provider(options.provider) : this.provider;
        const signer = provider.getSigner(from.toString());
        const tx = await signer
            .sendTransaction({
            to: to.toString(),
            value: `0x${value.toString(16)}`,
            gasLimit: options.gasLimit,
            nonce: options.nonce,
        })
            .catch(fixEthersStackTrace);
        const receipt = await tx.wait(this.minConfirmations);
        return blockchain_1.TxHash.fromString(receipt.transactionHash);
    }
    fromBaseUnits(value, precision) {
        return (0, units_1.fromBaseUnits)(value, 18, precision);
    }
    toBaseUnits(value) {
        return (0, units_1.toBaseUnits)(value, 18);
    }
}
exports.EthAsset = EthAsset;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXRoX2Fzc2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbnRyYWN0cy9hc3NldC9ldGhfYXNzZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsc0RBQXNEO0FBQ3RELHlEQUF5RDtBQUN6RCwrREFBZ0c7QUFDaEcsd0RBQXdEO0FBQ3hELHVDQUF5RDtBQUV6RCxNQUFNLG1CQUFtQixHQUFHLENBQUMsR0FBVSxFQUFFLEVBQUU7SUFDekMsR0FBRyxDQUFDLEtBQU0sSUFBSSxJQUFJLEtBQUssRUFBRSxDQUFDLEtBQUssQ0FBQztJQUNoQyxNQUFNLEdBQUcsQ0FBQztBQUNaLENBQUMsQ0FBQztBQUVGLE1BQWEsUUFBUTtJQUduQixZQUFZLFFBQTBCLEVBQVUsbUJBQW1CLENBQUM7UUFBcEIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFJO1FBQ2xFLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSx3QkFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFFRCxhQUFhO1FBQ1gsT0FBTztZQUNMLE9BQU8sRUFBRSxvQkFBVSxDQUFDLElBQUk7WUFDeEIsSUFBSSxFQUFFLEtBQUs7WUFDWCxNQUFNLEVBQUUsS0FBSztZQUNiLFFBQVEsRUFBRSxFQUFFO1lBQ1osUUFBUSxFQUFFLEtBQUs7U0FDaEIsQ0FBQztJQUNKLENBQUM7SUFFRCxLQUFLLENBQUMsWUFBWSxDQUFDLE9BQW1CO1FBQ3BDLE9BQU8sTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ25CLENBQUM7SUFFRCxLQUFLLENBQUMsU0FBUyxDQUFDLE9BQW1CO1FBQ2pDLE1BQU0sT0FBTyxHQUFHLE1BQU0sSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7UUFDbkUsT0FBTyxNQUFNLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQUVELEtBQUssQ0FBQyxTQUFTLENBQUMsS0FBaUIsRUFBRSxRQUFvQjtRQUNyRCxNQUFNLElBQUksS0FBSyxDQUFDLGdDQUFnQyxDQUFDLENBQUM7SUFDcEQsQ0FBQztJQUVELEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBYSxFQUFFLEtBQWlCLEVBQUUsUUFBb0I7UUFDbEUsTUFBTSxJQUFJLEtBQUssQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFFRCxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQWEsRUFBRSxPQUFtQjtRQUMzQyxNQUFNLElBQUksS0FBSyxDQUFDLDJCQUEyQixDQUFDLENBQUM7SUFDL0MsQ0FBQztJQUVELEtBQUssQ0FBQyxRQUFRLENBQUMsS0FBYSxFQUFFLElBQWdCLEVBQUUsRUFBYyxFQUFFLFVBQXlCLEVBQUU7UUFDekYsTUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSx3QkFBWSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUN2RixNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1FBQ25ELE1BQU0sRUFBRSxHQUFHLE1BQU0sTUFBTTthQUNwQixlQUFlLENBQUM7WUFDZixFQUFFLEVBQUUsRUFBRSxDQUFDLFFBQVEsRUFBRTtZQUNqQixLQUFLLEVBQUUsS0FBSyxLQUFLLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxFQUFFO1lBQ2hDLFFBQVEsRUFBRSxPQUFPLENBQUMsUUFBUTtZQUMxQixLQUFLLEVBQUUsT0FBTyxDQUFDLEtBQUs7U0FDckIsQ0FBQzthQUNELEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBQzlCLE1BQU0sT0FBTyxHQUFHLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUNyRCxPQUFPLG1CQUFNLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBRU0sYUFBYSxDQUFDLEtBQWEsRUFBRSxTQUFrQjtRQUNwRCxPQUFPLElBQUEscUJBQWEsRUFBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFFTSxXQUFXLENBQUMsS0FBYTtRQUM5QixPQUFPLElBQUEsbUJBQVcsRUFBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDaEMsQ0FBQztDQUNGO0FBNURELDRCQTREQyJ9