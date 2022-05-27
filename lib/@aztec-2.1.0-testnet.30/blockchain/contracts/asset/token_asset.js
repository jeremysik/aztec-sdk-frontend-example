"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenAsset = void 0;
const blockchain_1 = require("@aztec/barretenberg/blockchain");
const providers_1 = require("@ethersproject/providers");
const ethers_1 = require("ethers");
const units_1 = require("../../units");
const abi = [
    'function decimals() public view returns (uint8)',
    'function approve(address spender, uint256 amount) public returns (bool)',
    'function allowance(address owner, address spender) public view returns (uint256)',
    'function balanceOf(address account) public view returns (uint256)',
    'function mint(address _to, uint256 _value) public returns (bool)',
    'function name() public view returns (string)',
    'function symbol() public view returns (string)',
    'function nonces(address) public view returns(uint256)',
];
const fixEthersStackTrace = (err) => {
    err.stack += new Error().stack;
    throw err;
};
class TokenAsset {
    constructor(info, erc20, ethereumProvider, minConfirmations = 1) {
        this.info = info;
        this.erc20 = erc20;
        this.ethereumProvider = ethereumProvider;
        this.minConfirmations = minConfirmations;
        this.precision = 2;
    }
    static new(info, ethereumProvider, minConfirmations) {
        const erc20 = new ethers_1.Contract(info.address.toString(), abi, new providers_1.Web3Provider(ethereumProvider));
        return new TokenAsset(info, erc20, ethereumProvider, minConfirmations);
    }
    static async fromAddress(address, ethereumProvider, gasLimit, minConfirmations) {
        const erc20 = new ethers_1.Contract(address.toString(), abi, new providers_1.Web3Provider(ethereumProvider));
        const info = {
            address,
            name: await erc20.name(),
            symbol: await erc20.symbol(),
            decimals: +(await erc20.decimals()),
            gasLimit,
        };
        return new TokenAsset(info, erc20, ethereumProvider, minConfirmations);
    }
    get address() {
        return this.info.address;
    }
    getStaticInfo() {
        return this.info;
    }
    async getUserNonce(account) {
        return BigInt(await this.erc20.nonces(account.toString()));
    }
    async balanceOf(account) {
        const balance = await this.erc20.balanceOf(account.toString());
        return BigInt(balance);
    }
    async allowance(owner, receiver) {
        const allowance = await this.erc20.allowance(owner.toString(), receiver.toString());
        return BigInt(allowance);
    }
    async approve(value, owner, receiver, options = {}) {
        const contract = this.getContractWithSigner(owner, options);
        const res = (await contract.approve(receiver.toString(), value).catch(fixEthersStackTrace));
        const receipt = await res.wait(this.minConfirmations);
        return blockchain_1.TxHash.fromString(receipt.transactionHash);
    }
    async mint(value, account, options = {}) {
        const contract = this.getContractWithSigner(account, options);
        const res = await contract.mint(account.toString(), value).catch(fixEthersStackTrace);
        const receipt = await res.wait(this.minConfirmations);
        return blockchain_1.TxHash.fromString(receipt.transactionHash);
    }
    async transfer(value, from, to, options = {}) {
        const contract = this.getContractWithSigner(from, options);
        const res = await contract.transfer(from.toString(), to.toString(), value).catch(fixEthersStackTrace);
        const receipt = await res.wait(this.minConfirmations);
        return blockchain_1.TxHash.fromString(receipt.transactionHash);
    }
    fromBaseUnits(value, precision) {
        return (0, units_1.fromBaseUnits)(value, this.info.decimals, precision);
    }
    toBaseUnits(value) {
        return (0, units_1.toBaseUnits)(value, this.info.decimals);
    }
    getContractWithSigner(account, options) {
        const { provider = this.ethereumProvider, signingAddress = account } = options;
        const ethSigner = new providers_1.Web3Provider(provider).getSigner(signingAddress.toString());
        return new ethers_1.Contract(this.info.address.toString(), abi, ethSigner);
    }
}
exports.TokenAsset = TokenAsset;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9rZW5fYXNzZXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29udHJhY3RzL2Fzc2V0L3Rva2VuX2Fzc2V0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLCtEQUFpSDtBQUVqSCx3REFBd0Q7QUFDeEQsbUNBQWtDO0FBQ2xDLHVDQUF5RDtBQUV6RCxNQUFNLEdBQUcsR0FBRztJQUNWLGlEQUFpRDtJQUNqRCx5RUFBeUU7SUFDekUsa0ZBQWtGO0lBQ2xGLG1FQUFtRTtJQUNuRSxrRUFBa0U7SUFDbEUsOENBQThDO0lBQzlDLGdEQUFnRDtJQUNoRCx1REFBdUQ7Q0FDeEQsQ0FBQztBQUVGLE1BQU0sbUJBQW1CLEdBQUcsQ0FBQyxHQUFVLEVBQUUsRUFBRTtJQUN6QyxHQUFHLENBQUMsS0FBTSxJQUFJLElBQUksS0FBSyxFQUFFLENBQUMsS0FBSyxDQUFDO0lBQ2hDLE1BQU0sR0FBRyxDQUFDO0FBQ1osQ0FBQyxDQUFDO0FBRUYsTUFBYSxVQUFVO0lBR3JCLFlBQ21CLElBQXFCLEVBQ3JCLEtBQWUsRUFDZixnQkFBa0MsRUFDbEMsbUJBQW1CLENBQUM7UUFIcEIsU0FBSSxHQUFKLElBQUksQ0FBaUI7UUFDckIsVUFBSyxHQUFMLEtBQUssQ0FBVTtRQUNmLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbEMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFJO1FBTnRCLGNBQVMsR0FBRyxDQUFDLENBQUM7SUFPNUIsQ0FBQztJQUVKLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBcUIsRUFBRSxnQkFBa0MsRUFBRSxnQkFBeUI7UUFDN0YsTUFBTSxLQUFLLEdBQUcsSUFBSSxpQkFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksd0JBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7UUFDN0YsT0FBTyxJQUFJLFVBQVUsQ0FBQyxJQUFJLEVBQUUsS0FBSyxF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