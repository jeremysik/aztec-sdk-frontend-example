"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.depositToWeth = exports.getWethBalance = exports.approveWeth = exports.transferToken = exports.approveToken = exports.getTokenAllowance = exports.getTokenBalance = exports.purchaseTokens = void 0;
__exportStar(require("./token_store"), exports);
__exportStar(require("./mainnet_addresses"), exports);
const _1 = require(".");
const providers_1 = require("@ethersproject/providers");
const ethers_1 = require("ethers");
const _2 = require(".");
const ERC20Abi = __importStar(require("../abis/ERC20.json"));
const WETHabi = __importStar(require("../abis/WETH9.json"));
const getSigner = (ethereumProvider, spender) => {
    return new providers_1.Web3Provider(ethereumProvider).getSigner(spender.toString());
};
async function purchaseTokens(tokenAddress, quantityToPurchase, maximumAmountToSpend, provider, spender, recipient) {
    const tokenStore = await _1.TokenStore.create(provider);
    const token = {
        amount: quantityToPurchase,
        erc20Address: tokenAddress,
    };
    try {
        return await tokenStore.purchase(spender, recipient ? recipient : spender, token, maximumAmountToSpend);
    }
    catch (e) {
        console.log(e);
    }
}
exports.purchaseTokens = purchaseTokens;
async function getTokenBalance(tokenAddress, owner, ethereumProvider) {
    const tokenContract = new ethers_1.Contract(tokenAddress.toString(), ERC20Abi.abi, new providers_1.Web3Provider(ethereumProvider));
    const currentBalance = await tokenContract.balanceOf(owner.toString());
    return currentBalance.toBigInt();
}
exports.getTokenBalance = getTokenBalance;
async function getTokenAllowance(tokenAddress, owner, spender, ethereumProvider) {
    const tokenContract = new ethers_1.Contract(tokenAddress.toString(), ERC20Abi.abi, new providers_1.Web3Provider(ethereumProvider));
    const currentBalance = await tokenContract.allowance(owner.toString(), spender.toString());
    return currentBalance.toBigInt();
}
exports.getTokenAllowance = getTokenAllowance;
async function approveToken(tokenAddress, owner, spender, ethereumProvider, amount) {
    const signer = getSigner(ethereumProvider, owner);
    const tokenContract = new ethers_1.Contract(tokenAddress.toString(), ERC20Abi.abi, signer);
    const approved = await tokenContract.approve(spender.toString(), amount);
    await approved.wait();
}
exports.approveToken = approveToken;
async function transferToken(tokenAddress, spender, recipient, ethereumProvider, amount) {
    const signer = getSigner(ethereumProvider, spender);
    const tokenContract = new ethers_1.Contract(tokenAddress.toString(), ERC20Abi.abi, signer);
    const approved = await tokenContract.transfer(recipient.toString(), amount);
    await approved.wait();
}
exports.transferToken = transferToken;
async function approveWeth(owner, spender, amount, ethereumProvider) {
    const signer = getSigner(ethereumProvider, owner);
    const wethContract = new ethers_1.Contract(_2.MainnetAddresses.Tokens['WETH'], WETHabi.abi, signer);
    const approveTx = await wethContract.approve(spender.toString(), amount);
    await approveTx.wait();
}
exports.approveWeth = approveWeth;
async function getWethBalance(owner, ethereumProvider) {
    const wethContract = new ethers_1.Contract(_2.MainnetAddresses.Tokens['WETH'], WETHabi.abi, new providers_1.Web3Provider(ethereumProvider));
    const currentBalance = await wethContract.balanceOf(owner.toString());
    return currentBalance.toBigInt();
}
exports.getWethBalance = getWethBalance;
async function depositToWeth(spender, amount, ethereumProvider) {
    const signer = getSigner(ethereumProvider, spender);
    const wethContract = new ethers_1.Contract(_2.MainnetAddresses.Tokens['WETH'], WETHabi.abi, signer);
    const balance = (await wethContract.balanceOf(spender.toString())).toBigInt();
    if (balance < amount) {
        const amountToAdd = amount - balance;
        const depositTx = await wethContract.deposit({ value: amountToAdd });
        await depositTx.wait();
    }
}
exports.depositToWeth = depositToWeth;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdG9rZW5zL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsZ0RBQThCO0FBQzlCLHNEQUFvQztBQUVwQyx3QkFBK0I7QUFFL0Isd0RBQXdEO0FBQ3hELG1DQUFrQztBQUNsQyx3QkFBcUM7QUFDckMsNkRBQStDO0FBQy9DLDREQUE4QztBQUc5QyxNQUFNLFNBQVMsR0FBRyxDQUFDLGdCQUFrQyxFQUFFLE9BQW1CLEVBQUUsRUFBRTtJQUM1RSxPQUFPLElBQUksd0JBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztBQUMxRSxDQUFDLENBQUM7QUFFSyxLQUFLLFVBQVUsY0FBYyxDQUNsQyxZQUF3QixFQUN4QixrQkFBMEIsRUFDMUIsb0JBQTRCLEVBQzVCLFFBQTBCLEVBQzFCLE9BQW1CLEVBQ25CLFNBQXNCO0lBRXRCLE1BQU0sVUFBVSxHQUFHLE1BQU0sYUFBVSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUVyRCxNQUFNLEtBQUssR0FBRztRQUNaLE1BQU0sRUFBRSxrQkFBa0I7UUFDMUIsWUFBWSxFQUFFLFlBQVk7S0FDM0IsQ0FBQztJQUNGLElBQUk7UUFDRixPQUFPLE1BQU0sVUFBVSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsb0JBQW9CLENBQUMsQ0FBQztLQUN6RztJQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ1YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUNoQjtBQUNILENBQUM7QUFuQkQsd0NBbUJDO0FBRU0sS0FBSyxVQUFVLGVBQWUsQ0FBQyxZQUF3QixFQUFFLEtBQWlCLEVBQUUs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