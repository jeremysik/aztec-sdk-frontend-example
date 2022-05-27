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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.profileElement = exports.createElementBridgeData = exports.getContractSelectors = exports.decodeContractSelector = exports.decodeError = exports.retrieveEvents = exports.abis = void 0;
const providers_1 = require("@ethersproject/providers");
const ethers_1 = require("ethers");
const address_1 = require("@aztec/barretenberg/address");
const blockchain_1 = require("@aztec/barretenberg/blockchain");
const commander_1 = require("commander");
const __1 = require("..");
const manipulate_blocks_1 = require("../manipulate_blocks");
const decode_error_1 = require("../contracts/decode_error");
const RollupAbi = __importStar(require("../artifacts/contracts/RollupProcessor.sol/RollupProcessor.json"));
const Element = __importStar(require("@aztec/bridge-clients/client-dest/typechain-types/factories/ElementBridge__factory"));
const element_bridge_data_1 = require("@aztec/bridge-clients/client-dest/src/client/element/element-bridge-data");
const provider_1 = require("../provider");
const tokens_1 = require("../tokens");
const { PRIVATE_KEY } = process.env;
exports.abis = {
    Rollup: RollupAbi,
    Element: Element.ElementBridge__factory,
};
const getProvider = (url) => {
    if (PRIVATE_KEY) {
        const provider = provider_1.WalletProvider.fromHost(url);
        const address = provider.addAccount(Buffer.from(PRIVATE_KEY, 'hex'));
        console.log(`Added account ${address.toString()} from provided private key`);
        return provider;
    }
    return new __1.JsonRpcProvider(url);
};
async function retrieveEvents(contractAddress, contractName, provider, eventName, from, to) {
    const contract = new ethers_1.Contract(contractAddress.toString(), exports.abis[contractName].abi, new providers_1.Web3Provider(provider));
    const filter = contract.filters[eventName]();
    const events = await contract.queryFilter(filter, from, to);
    return events.map(event => contract.interface.parseLog(event));
}
exports.retrieveEvents = retrieveEvents;
async function decodeError(contractAddress, contractName, txHash, provider) {
    const web3 = new providers_1.Web3Provider(provider);
    const contract = new ethers_1.Contract(contractAddress.toString(), exports.abis[contractName].abi, web3.getSigner());
    return await (0, decode_error_1.decodeErrorFromContractByTxHash)(contract, txHash, provider);
}
exports.decodeError = decodeError;
async function decodeContractSelector(contractAddress, contractName, selector, provider) {
    const web3 = new providers_1.Web3Provider(provider);
    const contract = new ethers_1.Contract(contractAddress, exports.abis[contractName].abi, web3.getSigner());
    return await (0, decode_error_1.decodeSelector)(contract, selector);
}
exports.decodeContractSelector = decodeContractSelector;
async function getContractSelectors(contractAddress, contractName, provider, type) {
    const web3 = new providers_1.Web3Provider(provider);
    const contract = new ethers_1.Contract(contractAddress.toString(), exports.abis[contractName].abi, web3.getSigner());
    return await (0, decode_error_1.retrieveContractSelectors)(contract, type);
}
exports.getContractSelectors = getContractSelectors;
const createElementBridgeData = async (rollupAddress, elementBridgeAddress, provider) => {
    return element_bridge_data_1.ElementBridgeData.create(provider, elementBridgeAddress, address_1.EthAddress.fromString(__1.MainnetAddresses.Contracts['BALANCER']), rollupAddress, { eventBatchSize: 10 });
};
exports.createElementBridgeData = createElementBridgeData;
const formatTime = (unixTimeInSeconds) => {
    return new Date(unixTimeInSeconds * 1000).toISOString().slice(0, 19).replace('T', ' ');
};
async function profileElement(rollupAddress, elementAddress, provider, from, to) {
    const convertEvents = await retrieveEvents(elementAddress, 'Element', provider, 'LogConvert', from, to);
    const finaliseEvents = await retrieveEvents(elementAddress, 'Element', provider, 'LogFinalise', from, to);
    const poolEvents = await retrieveEvents(elementAddress, 'Element', provider, 'LogPoolAdded', from, to);
    const rollupBridgeEvents = await retrieveEvents(rollupAddress, 'Rollup', provider, 'DefiBridgeProcessed', from, to);
    const elementBridgeData = await (0, exports.createElementBridgeData)(rollupAddress, elementAddress, provider);
    const interactions = {};
    const pools = {};
    const convertLogs = convertEvents.map((log) => {
        return {
            nonce: log.args.nonce,
            totalInputValue: log.args.totalInputValue.toBigInt(),
            gasUsed: log.args.gasUsed,
        };
    });
    const finaliseLogs = finaliseEvents.map((log) => {
        return {
            nonce: log.args.nonce,
            success: log.args.success,
            gasUsed: log.args.gasUsed,
            message: log.args.message,
        };
    });
    const poolLogs = poolEvents.map((log) => {
        return {
            poolAddress: log.args.poolAddress,
            wrappedPosition: log.args.wrappedPositionAddress,
            expiry: log.args.expiry,
        };
    });
    const rollupLogs = rollupBridgeEvents.map((log) => {
        return {
            nonce: log.args.nonce.toBigInt(),
            outputValue: log.args.totalOutputValueA.toBigInt(),
        };
    });
    for (const log of poolLogs) {
        pools[log.poolAddress] = {
            wrappedPosition: log.wrappedPosition,
            expiry: formatTime(log.expiry.toNumber()),
        };
    }
    for (const log of convertLogs) {
        interactions[log.nonce.toString()] = {
            finalised: false,
            success: undefined,
            inputValue: log.totalInputValue,
            convertGas: Number(log.gasUsed),
        };
    }
    for (const log of finaliseLogs) {
        if (!interactions[log.nonce.toString()]) {
            interactions[log.nonce.toString()] = {
                finalised: true,
                success: log.success,
                inputValue: undefined,
                finaliseGas: Number(log.gasUsed),
                message: log.message,
            };
            continue;
        }
        const interaction = interactions[log.nonce.toString()];
        interaction.success = log.success;
        interaction.finalised = true;
        interaction.finaliseGas = Number(log.gasUsed);
        interaction.message = log.message;
        const rollupLog = rollupLogs.find(x => x.nonce == log.nonce);
        if (rollupLog) {
            interactions[log.nonce.toString()].finalValue = rollupLog.outputValue;
        }
    }
    for (const log of convertLogs) {
        if (!interactions[log.nonce.toString()]?.finalised) {
            const presentValue = await elementBridgeData.getInteractionPresentValue(log.nonce.toBigInt());
            if (presentValue.length > 0) {
                interactions[log.nonce.toString()].presentValue = presentValue[0].amount;
            }
        }
    }
    const summary = {
        Pools: pools,
        Interactions: interactions,
        NumInteractions: convertLogs.length,
        NumFinalised: finaliseLogs.length,
    };
    console.log('Element summary ', summary);
}
exports.profileElement = profileElement;
const program = new commander_1.Command();
async function main() {
    program
        .command('setTime')
        .description('advance the blockchain time')
        .argument('<time>', 'the time you wish to set for the next block, unix timestamp format')
        .argument('[url]', 'your ganache url', 'http://localhost:8545')
        .action(async (time, url) => {
        const provider = getProvider(url);
        const date = new Date(parseInt(time));
        await (0, manipulate_blocks_1.setBlockchainTime)(date.getTime(), provider);
        console.log(`New block time ${await (0, manipulate_blocks_1.getCurrentBlockTime)(provider)}`);
    });
    program
        .command('decodeError')
        .description('attempt to decode the error for a reverted transaction')
        .argument('<contractAddress>', 'the address of the deployed contract, as a hex string')
        .argument('<contractName>', 'the name of the contract, valid values: Rollup, Element')
        .argument('<txHash>', 'the tx hash that you wish to decode, as a hex string')
        .argument('[url]', 'your ganache url', 'http://localhost:8545')
        .action(async (contractAddress, contractName, txHash, url) => {
        const provider = getProvider(url);
        const error = await decodeError(address_1.EthAddress.fromString(contractAddress), contractName, txHash, provider);
        if (!error) {
            console.log(`Failed to retrieve error for tx ${txHash}`);
            return;
        }
        console.log(`Retrieved error for tx ${txHash}`, error);
    });
    program
        .command('decodeSelector')
        .description('attempt to decode the selector for a reverted transaction')
        .argument('<contractAddress>', 'the address of the deployed contract, as a hex string')
        .argument('<contractName>', 'the name of the contract, valid values: Rollup, Element')
        .argument('<selector>', 'the 4 byte selector that you wish to decode, as a hex string 0x...')
        .argument('[url]', 'your ganache url', 'http://localhost:8545')
        .action(async (contractAddress, contractName, selector, url) => {
        const provider = getProvider(url);
        if (selector.length == 10) {
            selector = selector.slice(2);
        }
        const error = await decodeContractSelector(contractAddress, contractName, selector, provider);
        if (!error) {
            console.log(`Failed to retrieve error code for selector ${selector}`);
            return;
        }
        console.log(`Retrieved error code for selector ${selector}`, error);
    });
    program
        .command('finaliseDefi')
        .description('finalise an asynchronous defi interaction')
        .argument('<rollupAddress>', 'the address of the deployed rollup contract, as a hex string')
        .argument('<nonce>', 'the nonce you wish to finalise, as a number')
        .argument('[url]', 'your ganache url', 'http://localhost:8545')
        .action(async (rollupAddress, nonce, url) => {
        const provider = getProvider(url);
        const rollupProcessor = new __1.RollupProcessor(rollupAddress, provider);
        try {
            await rollupProcessor.processAsyncDefiInteraction(parseInt(nonce), { gasLimit: 2000000 });
        }
        catch (err) {
            const result = (0, decode_error_1.decodeSelector)(rollupProcessor.contract, err.data.result.slice(2));
            console.log('Failed to process async defi interaction, error: ', result);
        }
    });
    program
        .command('extractEvents')
        .description('extract events emitted from a contract')
        .argument('<contractAddress>', 'the address of the deployed contract, as a hex string')
        .argument('<contractName>', 'the name of the contract, valid values: Rollup, Element')
        .argument('<eventName>', 'the name of the emitted event')
        .argument('<from>', 'the block number to search from')
        .argument('[to]', 'the block number to search to, defaults to the latest block')
        .argument('[url]', 'your ganache url', 'http://localhost:8545')
        .action(async (contractAddress, contractName, eventName, from, to, url) => {
        const provider = getProvider(url);
        const logs = await retrieveEvents(address_1.EthAddress.fromString(contractAddress), contractName, provider, eventName, parseInt(from), to ? parseInt(to) : undefined);
        console.log('Received event args ', logs.map(l => l.args));
    });
    program
        .command('purchaseTokens')
        .description('purchase tokens for an account')
        .argument('<token>', 'any token address or any key from the tokens listed in the mainnet command')
        .argument('<tokenQuantity>', 'the quantity of token you want to attempt to purchase')
        .argument('[spender]', 'the address of the account to purchase the token defaults to 1st default account 0xf39...', undefined)
        .argument('[recipient]', 'the address of the account to receive the tokens defaults to the spender', undefined)
        .argument('[maxAmountToSpend]', 'optional limit of the amount to spend', BigInt(10n ** 21n).toString())
        .argument('[url]', 'your ganache url', 'http://localhost:8545')
        .action(async (token, tokenQuantity, spender, recipient, maxAmountToSpend, url) => {
        const ourProvider = getProvider(url);
        const ethereumRpc = new blockchain_1.EthereumRpc(ourProvider);
        const accounts = await ethereumRpc.getAccounts();
        spender = spender ? address_1.EthAddress.fromString(spender) : accounts[0];
        recipient = recipient ? address_1.EthAddress.fromString(recipient) : spender;
        let requestedToken = token;
        if (!address_1.EthAddress.isAddress(token)) {
            requestedToken = __1.MainnetAddresses.Tokens[token];
            if (!requestedToken) {
                console.log(`Unknown token ${token}`);
                return;
            }
        }
        const amountPurchased = await (0, __1.purchaseTokens)(address_1.EthAddress.fromString(requestedToken), BigInt(tokenQuantity), BigInt(maxAmountToSpend), ourProvider, spender, recipient);
        if (amountPurchased === undefined) {
            console.log(`Failed to purchase ${token}`);
            return;
        }
        console.log(`Successfully purchased ${amountPurchased} of ${token}`);
    });
    program
        .command('getBalance')
        .description('display token/ETH balance for an account')
        .argument('<token>', 'any token address or any key from the tokens listed in the mainnet command')
        .argument('[account]', 'the address of the account to purchase the token defaults to 1st default account 0xf39...', undefined)
        .argument('[url]', 'your ganache url', 'http://localhost:8545')
        .action(async (token, account, url) => {
        const ourProvider = getProvider(url);
        const accounts = await new blockchain_1.EthereumRpc(ourProvider).getAccounts();
        account = account ? address_1.EthAddress.fromString(account) : accounts[0];
        if (token == 'ETH') {
            const balance = await ourProvider.request({ method: 'eth_getBalance', params: [account.toString()] });
            console.log(`ETH balance of account ${account.toString()}: ${BigInt(balance)}`);
            return;
        }
        let requestedToken = token;
        if (!address_1.EthAddress.isAddress(token)) {
            requestedToken = __1.MainnetAddresses.Tokens[token];
            if (!requestedToken) {
                console.log(`Unknown token ${token}`);
                return;
            }
        }
        const ethTokenAddress = address_1.EthAddress.fromString(requestedToken);
        const wethAddress = address_1.EthAddress.fromString(__1.MainnetAddresses.Tokens['WETH']);
        if (ethTokenAddress.equals(wethAddress)) {
            const balance = await (0, tokens_1.getWethBalance)(account, ourProvider);
            console.log(`WETH balance of account ${account}: ${balance}`);
            return;
        }
        const balance = await (0, tokens_1.getTokenBalance)(ethTokenAddress, account, ourProvider);
        console.log(`Token ${ethTokenAddress.toString()} balance of account ${account}: ${balance}`);
    });
    program
        .command('selectors')
        .description("display useful information about a contrac't selectors")
        .argument('<contractAddress>', 'the address of the deployed contract, as a hex string')
        .argument('<contractName>', 'the name of the contract, valid values: Rollup, Element')
        .argument('[type]', 'optional filter for the type of selectors, e.g. error, event')
        .argument('[url]', 'your ganache url', 'http://localhost:8545')
        .action(async (contractAddress, contractName, type, url) => {
        const ourProvider = getProvider(url);
        const selectorMap = await getContractSelectors(address_1.EthAddress.fromString(contractAddress), contractName, ourProvider, type);
        console.log(selectorMap);
    });
    program
        .command('profileElement')
        .description('provides details of element defi interactions')
        .argument('<rollupAddress>', 'the address of the deployed rollup contract, as a hex string')
        .argument('<elementAddress>', 'the address of the deployed element bridge contract, as a hex string')
        .argument('<from>', 'the block number to search from')
        .argument('[to]', 'the block number to search to, defaults to the latest block')
        .argument('[url]', 'your ganache url', 'http://localhost:8545')
        .action(async (rollupAddress, elementAddress, from, to, url) => {
        const provider = getProvider(url);
        await profileElement(address_1.EthAddress.fromString(rollupAddress), address_1.EthAddress.fromString(elementAddress), provider, parseInt(from), to ? parseInt(to) : undefined);
    });
    program
        .command('mainnet')
        .description('display useful addresses for mainnet')
        .action(() => {
        console.log(__1.MainnetAddresses);
    });
    await program.parseAsync(process.argv);
}
main().catch(err => {
    console.log(`Error thrown: ${err}`);
    process.exit(1);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZ2FuYWNoZS9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHdEQUF3RDtBQUN4RCxtQ0FBa0M7QUFDbEMseURBQXlEO0FBQ3pELCtEQUFxRTtBQUNyRSx5Q0FBb0M7QUFDcEMsMEJBQXdGO0FBQ3hGLDREQUE4RTtBQUM5RSw0REFBdUg7QUFFdkgsMkdBQTZGO0FBQzdGLDRIQUE4RztBQUM5RyxrSEFBNkc7QUFDN0csMENBQTZDO0FBQzdDLHNDQUE0RDtBQUc1RCxNQUFNLEVBQUUsV0FBVyxFQUFFLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQztBQUV2QixRQUFBLElBQUksR0FBMkI7SUFDMUMsTUFBTSxFQUFFLFNBQVM7SUFDakIsT0FBTyxFQUFFLE9BQU8sQ0FBQyxzQkFBc0I7Q0FDeEMsQ0FBQztBQUVGLE1BQU0sV0FBVyxHQUFHLENBQUMsR0FBVyxFQUFFLEVBQUU7SUFDbEMsSUFBSSxXQUFXLEVBQUU7UUFDZixNQUFNLFFBQVEsR0FBRyx5QkFBYyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM5QyxNQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDckUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsT0FBTyxDQUFDLFFBQVEsRUFBRSw0QkFBNEIsQ0FBQyxDQUFDO1FBQzdFLE9BQU8sUUFBUSxDQUFDO0tBQ2pCO0lBQ0QsT0FBTyxJQUFJLG1CQUFlLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDbEMsQ0FBQyxDQUFDO0FBRUssS0FBSyxVQUFVLGNBQWMsQ0FDbEMsZUFBMkIsRUFDM0IsWUFBb0IsRUFDcEIsUUFBMEIsRUFDMUIsU0FBaUIsRUFDakIsSUFBWSxFQUNaLEVBQVc7SUFFWCxN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