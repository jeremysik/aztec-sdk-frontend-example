"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeeDistributor = void 0;
const address_1 = require("@aztec/barretenberg/address");
const blockchain_1 = require("@aztec/barretenberg/blockchain");
const providers_1 = require("@ethersproject/providers");
const ethers_1 = require("ethers");
const AztecFeeDistributor_json_1 = require("../../artifacts/contracts/AztecFeeDistributor.sol/AztecFeeDistributor.json");
const fixEthersStackTrace = (err) => {
    err.stack += new Error().stack;
    throw err;
};
class FeeDistributor {
    constructor(feeDistributorContractAddress, provider, defaults = {}) {
        this.feeDistributorContractAddress = feeDistributorContractAddress;
        this.provider = provider;
        this.defaults = defaults;
        this.feeDistributor = new ethers_1.Contract(feeDistributorContractAddress.toString(), AztecFeeDistributor_json_1.abi, new providers_1.Web3Provider(this.provider));
    }
    get address() {
        return this.feeDistributorContractAddress;
    }
    get contract() {
        return this.feeDistributor;
    }
    async WETH() {
        return address_1.EthAddress.fromString(await this.feeDistributor.WETH().catch(fixEthersStackTrace));
    }
    async aztecFeeClaimer() {
        return address_1.EthAddress.fromString(await this.feeDistributor.aztecFeeClaimer().catch(fixEthersStackTrace));
    }
    async feeLimit() {
        return BigInt(await this.feeDistributor.feeLimit().catch(fixEthersStackTrace));
    }
    async convertConstant() {
        return BigInt(await this.feeDistributor.convertConstant().catch(fixEthersStackTrace));
    }
    async txFeeBalance(asset) {
        return BigInt(await this.feeDistributor.txFeeBalance(asset.toString()).catch(fixEthersStackTrace));
    }
    async deposit(asset, amount, options = this.defaults) {
        const { gasLimit, gasPrice } = options;
        const contract = this.getContractWithSigner(options);
        const tx = await contract
            .deposit(asset.toString(), amount, {
            value: asset.equals(address_1.EthAddress.ZERO) ? amount : undefined,
            gasLimit,
            gasPrice,
        })
            .catch(fixEthersStackTrace);
        return blockchain_1.TxHash.fromString(tx.hash);
    }
    async convert(asset, minOutputValue, options = this.defaults) {
        const { gasLimit } = options;
        const contract = this.getContractWithSigner(options);
        const tx = await contract.convert(asset.toString(), minOutputValue, { gasLimit }).catch(fixEthersStackTrace);
        return blockchain_1.TxHash.fromString(tx.hash);
    }
    async setConvertConstant(constant, options = this.defaults) {
        const { gasLimit } = options;
        const contract = this.getContractWithSigner(options);
        const tx = await contract.setConvertConstant(constant, { gasLimit }).catch(fixEthersStackTrace);
        return blockchain_1.TxHash.fromString(tx.hash);
    }
    async setFeeLimit(constant, options = this.defaults) {
        const { gasLimit } = options;
        const contract = this.getContractWithSigner(options);
        const tx = await contract.setFeeLimit(constant, { gasLimit }).catch(fixEthersStackTrace);
        return blockchain_1.TxHash.fromString(tx.hash);
    }
    async setFeeClaimer(address, options = this.defaults) {
        const { gasLimit } = options;
        const contract = this.getContractWithSigner(options);
        const tx = await contract.setFeeClaimer(address.toString(), { gasLimit }).catch(fixEthersStackTrace);
        return blockchain_1.TxHash.fromString(tx.hash);
    }
    async getLastReimbursement() {
        const eventFilter = this.feeDistributor.filters.FeeReimbursed();
        const events = await this.feeDistributor.queryFilter(eventFilter);
        const lastEvent = events[events.length - 1];
        return BigInt(lastEvent.args.amount);
    }
    getContractWithSigner(options) {
        const { provider = this.provider, signingAddress } = options;
        const ethSigner = new providers_1.Web3Provider(provider).getSigner(signingAddress ? signingAddress.toString() : 0);
        return new ethers_1.Contract(this.feeDistributorContractAddress.toString(), AztecFeeDistributor_json_1.abi, ethSigner);
    }
}
exports.FeeDistributor = FeeDistributor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmVlX2Rpc3RyaWJ1dG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbnRyYWN0cy9mZWVfZGlzdHJpYnV0b3IvZmVlX2Rpc3RyaWJ1dG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHlEQUF5RDtBQUN6RCwrREFBeUY7QUFDekYsd0RBQXdEO0FBQ3hELG1DQUFrQztBQUNsQyx5SEFBaUc7QUFFakcsTUFBTSxtQkFBbUIsR0FBRyxDQUFDLEdBQVUsRUFBRSxFQUFFO0lBQ3pDLEdBQUcsQ0FBQyxLQUFNLElBQUksSUFBSSxLQUFLLEVBQUUsQ0FBQyxLQUFLLENBQUM7SUFDaEMsTUFBTSxHQUFHLENBQUM7QUFDWixDQUFDLENBQUM7QUFFRixNQUFhLGNBQWM7SUFHekIsWUFDVSw2QkFBeUMsRUFDekMsUUFBMEIsRUFDMUIsV0FBMEIsRUFBRTtRQUY1QixrQ0FBNkIsR0FBN0IsNkJBQTZCLENBQVk7UUFDekMsYUFBUSxHQUFSLFFBQVEsQ0FBa0I7UUFDMUIsYUFBUSxHQUFSLFFBQVEsQ0FBb0I7UUFFcEMsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLGlCQUFRLENBQUMsNkJBQTZCLENBQUMsUUFBUSxFQUFFLEVBQUUsOEJBQUcsRUFBRSxJQUFJLHdCQUFZLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7SUFDckgsQ0FBQztJQUVELElBQUksT0FBTztRQUNULE9BQU8sSUFBSSxDQUFDLDZCQUE2QixDQUFDO0lBQzVDLENBQUM7SUFFRCxJQUFJLFFBQVE7UUFDVixPQUFPLElBQUksQ0FBQyxjQUFjLENBQUM7SUFDN0IsQ0FBQztJQUVELEtBQUssQ0FBQyxJQUFJO1FBQ1IsT0FBTyxvQkFBVSxDQUFDLFVBQVUsQ0FBQyxNQUFNLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQztJQUM1RixDQUFDO0lBRUQsS0FBSyxDQUFD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