"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deployLidoBridge = void 0;
const LidoBridge__factory_1 = require("@aztec/bridge-clients/client-dest/typechain-types/factories/LidoBridge__factory");
const gasLimit = 5000000;
const deployLidoBridge = async (owner, rollup, referralCode = '0x0000000000000000000000000000000000000000') => {
    console.error('Deploying LidoBridge...');
    const bridge = await new LidoBridge__factory_1.LidoBridge__factory(owner).deploy(rollup.address, referralCode, // TODO set a referral code if we want to get lido tokens
    {
        gasLimit,
    });
    console.error(`LidoBridge contract address: ${bridge.address}`);
    await rollup.setSupportedBridge(bridge.address, 500000n, { gasLimit });
    return bridge;
};
exports.deployLidoBridge = deployLidoBridge;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVwbG95X2xpZG8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZGVwbG95L2RlcGxveWVycy9kZXBsb3lfbGlkby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx5SEFBc0g7QUFHdEgsTUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDO0FBRWxCLE1BQU0sZ0JBQWdCLEdBQUcsS0FBSyxFQUNuQyxLQUFhLEVBQ2IsTUFBZ0IsRUFDaEIsWUFBWSxHQUFHLDRDQUE0QyxFQUMzRCxFQUFFO0lBQ0YsT0FBTyxDQUFDLEtBQUssQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO0lBQ3pDLE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBSSx5Q0FBbUIsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQ3hELE1BQU0sQ0FBQyxPQUFPLEVBQ2QsWUFBWSxFQUFFLHlEQUF5RDtJQUN2RTtRQUNFLFFBQVE7S0FDVCxDQUNGLENBQUM7SUFDRixPQUFPLENBQUMsS0FBSyxDQUFDLGdDQUFnQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztJQUVoRSxNQUFNLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUM7SUFDdkUsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQyxDQUFDO0FBakJXLFFBQUEsZ0JBQWdCLG9CQWlCM0IifQ==