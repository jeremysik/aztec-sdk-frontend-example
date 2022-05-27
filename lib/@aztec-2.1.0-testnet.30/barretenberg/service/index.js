"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRollupProviderStatus = exports.getBlockchainStatus = exports.getServiceName = void 0;
const blockchain_1 = require("../blockchain");
const iso_fetch_1 = require("../iso_fetch");
const rollup_provider_1 = require("../rollup_provider");
async function getServiceName(baseUrl) {
    const response = await (0, iso_fetch_1.fetch)(baseUrl);
    try {
        const body = await response.json();
        return body.serviceName;
    }
    catch (err) {
        throw new Error(`Bad response from: ${baseUrl}`);
    }
}
exports.getServiceName = getServiceName;
async function getBlockchainStatus(baseUrl) {
    const response = await (0, iso_fetch_1.fetch)(`${baseUrl}/status`);
    try {
        const body = await response.json();
        return (0, blockchain_1.blockchainStatusFromJson)(body.blockchainStatus);
    }
    catch (err) {
        throw new Error(`Bad response from: ${baseUrl}`);
    }
}
exports.getBlockchainStatus = getBlockchainStatus;
async function getRollupProviderStatus(baseUrl) {
    const response = await (0, iso_fetch_1.fetch)(`${baseUrl}/status`);
    try {
        const body = await response.json();
        return (0, rollup_provider_1.rollupProviderStatusFromJson)(body);
    }
    catch (err) {
        throw new Error(`Bad response from: ${baseUrl}`);
    }
}
exports.getRollupProviderStatus = getRollupProviderStatus;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2VydmljZS9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw4Q0FBeUQ7QUFDekQsNENBQXFDO0FBQ3JDLHdEQUFrRTtBQUUzRCxLQUFLLFVBQVUsY0FBYyxDQUFDLE9BQWU7SUFDbEQsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFBLGlCQUFLLEVBQUMsT0FBTyxDQUFDLENBQUM7SUFDdEMsSUFBSTtRQUNGLE1BQU0sSUFBSSxHQUFHLE1BQU0sUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ25DLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztLQUN6QjtJQUFDLE9BQU8sR0FBRyxFQUFFO1FBQ1osTUFBTSxJQUFJLEtBQUssQ0FBQyxzQkFBc0IsT0FBTyxFQUFFLENBQUMsQ0FBQztLQUNsRDtBQUNILENBQUM7QUFSRCx3Q0FRQztBQUVNLEtBQUssVUFBVSxtQkFBbUIsQ0FBQyxPQUFlO0lBQ3ZELE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBQSxpQkFBSyxFQUFDLEdBQUcsT0FBTyxTQUFTLENBQUMsQ0FBQztJQUNsRCxJQUFJO1FBQ0YsTUFBTSxJQUFJLEdBQUcsTUFBTSxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDbkMsT0FBTyxJQUFBLHFDQUF3QixFQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0tBQ3hEO0lBQUMsT0FBTyxHQUFHLEVBQUU7UUFDWixNQUFNLElBQUksS0FBSyxDQUFDLHNCQUFzQixPQUFPLEVBQUUsQ0FBQyxDQUFDO0tBQ2xEO0FBQ0gsQ0FBQztBQVJELGtEQVFDO0FBRU0sS0FBSyxVQUFVLHVCQUF1QixDQUFDLE9BQWU7SUFDM0QsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFBLGlCQUFLLEVBQUMsR0FBRyxPQUFPLFNBQVMsQ0FBQyxDQUFDO0lBQ2xELElBQUk7UUFDRixNQUFNLElBQUksR0FBRyxNQUFNLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNuQyxPQUFPLElBQUEsOENBQTRCLEVBQUMsSUFBSSxDQUFDLENBQUM7S0FDM0M7SUFBQyxPQUFPLEdBQUcsRUFBRTtRQUNaLE1BQU0sSUFBSSxLQUFLLENBQUMsc0JBQXNCLE9BQU8sRUFBRSxDQUFDLENBQUM7S0FDbEQ7QUFDSCxDQUFDO0FBUkQsMERBUUMifQ==