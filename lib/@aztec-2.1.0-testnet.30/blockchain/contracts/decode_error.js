"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeErrorFromContractByTxHash = exports.decodeErrorFromContract = exports.retrieveContractSelectors = exports.decodeSelector = void 0;
const ethers_1 = require("ethers");
function extractFragmentsBySelector(contract, filter) {
    const errorMappings = {};
    const fragments = filter ? contract.interface.fragments.filter(f => f.type === filter) : contract.interface.fragments;
    for (const frag of fragments) {
        const sig = `${frag.name}(${frag.inputs.map(f => f.type).join(',')})`;
        const fullHash = ethers_1.utils.keccak256(ethers_1.utils.toUtf8Bytes(sig));
        const selector = fullHash.slice(2, 10);
        errorMappings[selector] = {
            name: frag.name,
            type: frag.type,
            fullHash,
            inputs: frag.inputs.map(f => f.type),
        };
    }
    return errorMappings;
}
function decodeSelector(contract, selector) {
    const mappings = extractFragmentsBySelector(contract);
    return mappings[selector];
}
exports.decodeSelector = decodeSelector;
function retrieveContractSelectors(contract, type) {
    return extractFragmentsBySelector(contract, type);
}
exports.retrieveContractSelectors = retrieveContractSelectors;
function decodeErrorFromContract(contract, data) {
    const errorMappings = extractFragmentsBySelector(contract, 'error');
    const fullData = data.slice(2);
    const sigHash = fullData.slice(0, 8);
    // the rest of the data is any arguments given to the revert
    const args = fullData.slice(8);
    // look to see if we have the signature hash
    if (!errorMappings[sigHash]) {
        return;
    }
    const errorMapping = errorMappings[sigHash];
    // now try and decode the params based on their input type
    let result = [];
    if (errorMapping && errorMapping.inputs.length) {
        const abiDecodeString = errorMapping.inputs;
        result = contract.interface._abiCoder.decode(abiDecodeString, `0x${args}`).map(x => x.toString());
    }
    const errorValue = {
        name: errorMapping.name,
        params: result,
    };
    return errorValue;
}
exports.decodeErrorFromContract = decodeErrorFromContract;
async function decodeErrorFromContractByTxHash(contract, txHash, provider) {
    const { to, from, gas, maxFeePerGas, maxPriorityFeePerGas, input, value, chainId, nonce, blockNumber } = await provider.request({
        method: 'eth_getTransactionByHash',
        params: [txHash.toString()],
    });
    const req = {
        to,
        from,
        gas,
        maxFeePerGas,
        maxPriorityFeePerGas,
        data: input,
        value,
        chainId,
        nonce,
    };
    const rep = await provider.request({ method: 'eth_call', params: [req, blockNumber] }).catch(err => err);
    if (!rep.data) {
        return;
    }
    return decodeErrorFromContract(contract, rep.data);
}
exports.decodeErrorFromContractByTxHash = decodeErrorFromContractByTxHash;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjb2RlX2Vycm9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbnRyYWN0cy9kZWNvZGVfZXJyb3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsbUNBQXlDO0FBU3pDLFNBQVMsMEJBQTBCLENBQUMsUUFBa0IsRUFBRSxNQUFlO0lBQ3JFLE1BQU0sYUFBYSxHQUFnQyxFQUFFLENBQUM7SUFDdEQsTUFBTSxTQUFTLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQztJQUN0SCxLQUFLLE1BQU0sSUFBSSxJQUFJLFNBQVMsRUFBRTtRQUM1QixNQUFNLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUM7UUFDdEUsTUFBTSxRQUFRLEdBQUcsY0FBSyxDQUFDLFNBQVMsQ0FBQyxjQUFLLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDekQsTUFBTSxRQUFRLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDdkMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxHQUFHO1lBQ3hCLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtZQUNmLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtZQUNmLFFBQVE7WUFDUixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMs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