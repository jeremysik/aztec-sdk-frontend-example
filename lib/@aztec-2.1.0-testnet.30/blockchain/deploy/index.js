#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const experimental_1 = require("@ethersproject/experimental");
const deploy_dev_1 = require("./deploy_dev");
const environment_1 = require("@aztec/barretenberg/environment");
const deploy_mainnet_1 = require("./deploy_mainnet");
const deploy_mainnet_e2e_1 = require("./deploy_mainnet_e2e");
const { ETHEREUM_HOST, PRIVATE_KEY, VK } = process.env;
async function getSigner() {
    if (!ETHEREUM_HOST) {
        throw new Error('ETHEREUM_HOST not set.');
    }
    console.error(`Json rpc provider: ${ETHEREUM_HOST}`);
    const provider = new ethers_1.ethers.providers.JsonRpcProvider(ETHEREUM_HOST);
    const signer = PRIVATE_KEY ? new ethers_1.ethers.Wallet(PRIVATE_KEY, provider) : provider.getSigner(0);
    return new experimental_1.NonceManager(signer);
}
async function deploy(chainId, signer, treeInitData, vk) {
    switch (chainId) {
        case 1:
        case 0xa57ec:
            return (0, deploy_mainnet_1.deployMainnet)(signer, treeInitData, vk);
        case 0xe2e:
            return (0, deploy_mainnet_e2e_1.deployMainnetE2e)(signer, treeInitData, vk);
        default:
            return (0, deploy_dev_1.deployDev)(signer, treeInitData, vk);
    }
}
/**
 * We add gasLimit to all txs, to prevent calls to estimateGas that may fail. If a gasLimit is provided the calldata
 * is simply produced, there is nothing to fail. As long as all the txs are executed by the evm in order, things
 * should succeed. The NonceManager ensures all the txs have sequentially increasing nonces.
 * In some cases there maybe a "deployment sync point" which is required if we are making a "call" to the blockchain
 * straight after, that assumes the state is up-to-date at that point.
 * This drastically improves deployment times.
 */
async function main() {
    const signer = await getSigner();
    const signerAddress = await signer.getAddress();
    console.error(`Signer: ${signerAddress}`);
    const chainId = await signer.getChainId();
    console.error(`Chain id: ${chainId}`);
    const treeInitData = environment_1.InitHelpers.getInitData(chainId);
    const { dataTreeSize, roots } = treeInitData;
    console.error(`Initial data size: ${dataTreeSize}`);
    console.error(`Initial data root: ${roots.dataRoot.toString('hex')}`);
    console.error(`Initial null root: ${roots.nullRoot.toString('hex')}`);
    console.error(`Initial root root: ${roots.rootsRoot.toString('hex')}`);
    const { rollup, priceFeeds, feeDistributor } = await deploy(chainId, signer, treeInitData, VK);
    const envVars = {
        ROLLUP_CONTRACT_ADDRESS: rollup.address,
        FEE_DISTRIBUTOR_ADDRESS: feeDistributor.address,
        PRICE_FEED_CONTRACT_ADDRESSES: priceFeeds.map(p => p).join(','),
    };
    for (const [k, v] of Object.entries(envVars)) {
        console.log(`export ${k}=${v}`);
        console.log(`export TF_VAR_${k}=${v}`);
    }
}
main().catch(error => {
    console.error(error);
    process.exit(1);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZGVwbG95L2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLG1DQUF3QztBQUN4Qyw4REFBMkQ7QUFDM0QsNkNBQXlDO0FBQ3pDLGlFQUE0RTtBQUM1RSxxREFBaUQ7QUFDakQsNkRBQXdEO0FBRXhELE1BQU0sRUFBRSxhQUFhLEVBQUUsV0FBVyxFQUFFLEVBQUUsRUFBRSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUM7QUFFdkQsS0FBSyxVQUFVLFNBQVM7SUFDdEIsSUFBSSxDQUFDLGFBQWEsRUFBRTtRQUNsQixNQUFNLElBQUksS0FBSyxDQUFDLHdCQUF3QixDQUFDLENBQUM7S0FDM0M7SUFDRCxPQUFPLENBQUMsS0FBSyxDQUFDLHNCQUFzQixhQUFhLEVBQUUsQ0FBQyxDQUFDO0lBQ3JELE1BQU0sUUFBUSxHQUFHLElBQUksZUFBTSxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDckUsTUFBTSxNQUFNLEdBQUcsV0FBVyxDQUFDLENBQUMsQ0FBRSxJQUFJLGVBQU0sQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLFFBQVEsQ0FBWSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzFHLE9BQU8sSUFBSSwyQkFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ2xDLENBQUM7QUFFRCxLQUFLLFVBQVUsTUFBTSxDQUFDLE9BQWUsRUFBRSxNQUFjLEVBQUUsWUFBMEIsRUFBRSxFQUFXO0lBQzVGLFFBQVEsT0FBTyxFQUFFO1FBQ2YsS0FBSyxDQUFDLENBQUM7UUFDUCxLQUFLLE9BQU87WUFDVixPQUFPLElBQUEsOEJBQWEsRUFBQyxNQUFNLEVBQUUsWUFBWSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ2pELEtBQUssS0FBSztZQUNSLE9BQU8sSUFBQSxxQ0FBZ0IsRUFBQyxNQUFNLEVBQUUsWUFBWSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3BEO1lBQ0UsT0FBTyxJQUFBLHNCQUFTLEVBQUMsTUFBTSxFQUFFLFlBQVksRUFBRSxFQUFFLENBQUMsQ0FBQztLQUM5QztBQUNILENBQUM7QUFFRDs7Ozs7OztHQU9HO0FBQ0gsS0FBSyxVQUFVLElBQUk7SUFDakIsTUFBTSxNQUFNLEdBQUcsTUFBTSxTQUFTLEVBQUUsQ0FBQztJQUVqQyxNQUFNLGFBQWEsR0FBRyxNQUFNLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUNoRCxPQUFPLENBQUMsS0FBSyxDQUFDLFdBQVcsYUFBYSxFQUFFLENBQUMsQ0FBQztJQUUxQyxNQUFNLE9BQU8sR0FBRyxNQUFNLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUMxQyxPQUFPLENBQUMsS0FBSyxDQUFDLGFBQWEsT0FBTyxFQUFFLENBQUMsQ0FBQztJQUV0QyxNQUFNLFlBQVksR0FBRyx5QkFBVyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN0RCxNQUFNLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxHQUFHLFlBQVksQ0FBQztJQUM3QyxPQUFPLENBQUMsS0FBSyxDQUFDLHNCQUFzQixZQUFZLEVBQUUsQ0FBQyxDQUFDO0lBQ3BELE9BQU8sQ0FBQyxLQUFLLENBQUMsc0JBQXNCLEtBQUssQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUN0RSxPQUFPLENBQUMsS0FBSyxDQUFDLHNCQUFzQixLQUFLLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDdEUsT0FBTyxDQUFDLEtBQUssQ0FBQyxzQkFBc0IsS0FBSyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBRXZFLE1BQU0sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLGNBQWMsRUFBRSxHQUFHLE1BQU0sTUFBTSxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBRS9GLE1BQU0sT0FBTyxHQUFHO1FBQ2QsdUJBQXVCLEVBQUUsTUFBTSxDQUFDLE9BQU87UUFDdkMsdUJBQXVCLEVBQUUsY0FBYyxDQUFDLE9BQU87UUFDL0MsNkJBQTZCLEVBQUUsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7S0FDaEUsQ0FBQztJQUVGLEtBQUssTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQzVDLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNoQyxPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztLQUN4QztBQUNILENBQUM7QUFFRCxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUU7SUFDbkIsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNyQixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2xCLENBQUMsQ0FBQyxDQUFDIn0=