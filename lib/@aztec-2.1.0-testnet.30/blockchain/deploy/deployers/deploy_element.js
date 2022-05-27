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
exports.deployElementBridge = exports.elementTokenAddresses = void 0;
const Element = __importStar(require("@aztec/bridge-clients/client-dest/typechain-types/factories/ElementBridge__factory"));
const ElementVaultConfig = __importStar(require("./ElementVaultConfig.json"));
const TRANCHE_BYTECODE_HASH = Buffer.from('f481a073666136ab1f5e93b296e84df58092065256d0db23b2d22b62c68e978d', 'hex');
const ELEMENT_REGISTRY_ADDRESS = '0xc68e2BAb13a7A2344bb81badBeA626012C62C510';
const gasLimit = 6000000;
exports.elementTokenAddresses = ElementVaultConfig.tokens;
async function setupElementPool(spec, bridgeContract) {
    const dateString = new Date(spec.expiry * 1000).toDateString();
    console.error(`Registering convergent pool ${spec.poolAddress} for ${spec.asset} and expiry ${dateString}...`);
    await bridgeContract.registerConvergentPoolAddress(spec.poolAddress, spec.wrappedPosition, spec.expiry, {
        gasLimit,
    });
}
async function deployElementBridge(signer, rollup, assets, tranchesAfter) {
    console.error('Deploying ElementBridge...');
    const elementBridge = await new Element.ElementBridge__factory(signer).deploy(rollup.address, ElementVaultConfig.trancheFactory, TRANCHE_BYTECODE_HASH, ElementVaultConfig.balancerVault, ELEMENT_REGISTRY_ADDRESS, {
        gasLimit,
    });
    console.error(`ElementBridge contract address: ${elementBridge.address}`);
    await rollup.setSupportedBridge(elementBridge.address, 800000n, { gasLimit });
    for (const asset of assets) {
        const assetTranches = ElementVaultConfig.tranches[asset].filter(tranche => tranche.expiration * 1000 > tranchesAfter.getTime());
        for (const tranche of assetTranches) {
            await setupElementPool({
                asset,
                wrappedPosition: ElementVaultConfig.wrappedPositions.v1_1.yearn[asset],
                expiry: tranche.expiration,
                poolAddress: tranche.ptPool.address,
            }, elementBridge);
        }
    }
}
exports.deployElementBridge = deployElementBridge;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVwbG95X2VsZW1lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZGVwbG95L2RlcGxveWVycy9kZXBsb3lfZWxlbWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDRIQUE4RztBQUM5Ryw4RUFBZ0U7QUFHaEUsTUFBTSxxQkFBcUIsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLGtFQUFrRSxFQUFFLEtBQUssQ0FBQyxDQUFDO0FBQ3JILE1BQU0sd0JBQXdCLEdBQUcsNENBQTRDLENBQUM7QUFDOUUsTUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDO0FBRVosUUFBQSxxQkFBcUIsR0FBRyxrQkFBa0IsQ0FBQyxNQUFNLENBQUM7QUFXL0QsS0FBSyxVQUFVLGdCQUFnQixDQUFDLElBQXFCLEVBQUUsY0FBd0I7SUFDN0UsTUFBTSxVQUFVLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUMvRCxPQUFPLENBQUMsS0FBSyxDQUFDLCtCQUErQixJQUFJLENBQUMsV0FBVyxRQUFRLElBQUksQ0FBQyxLQUFLLGVBQWUsVUFBVSxLQUFLLENBQUMsQ0FBQztJQUMvRyxNQUFNLGNBQWMsQ0FBQyw2QkFBNkIsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRTtRQUN0RyxRQUFRO0tBQ1QsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQUVNLEtBQUssVUFBVSxtQkFBbUIsQ0FDdkMsTUFBYyxFQUNkLE1BQWdCLEVBQ2hCLE1BQXVCLEVBQ3ZCLGFBQW1CO0lBRW5CLE9BQU8sQ0FBQyxLQUFLLENBQUMsNEJBQTRCLENBQUMsQ0FBQztJQUM1QyxNQUFNLGFBQWEsR0FBRyxNQUFNLElBQUksT0FBTyxDQUFDLHNCQUFzQixDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FDM0UsTUFBTSxDQUFDLE9BQU8sRUFDZCxrQkFBa0IsQ0FBQyxjQUFjLEVBQ2pDLHFCQUFxQixFQUNyQixrQkFBa0IsQ0FBQyxhQUFhLEVBQ2hDLHdCQUF3QixFQUN4QjtRQUNFLFFBQVE7S0FDVCxDQUNGLENBQUM7SUFDRixPQUFPLENBQUMsS0FBSyxDQUFDLG1DQUFtQyxhQUFhLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztJQUUxRSxNQUFNLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxhQUFhLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUM7SUFFOUUsS0FBSyxNQUFNLEtBQUssSUFBSSxNQUFNLEVBQUU7UUFDMUIsTUFBTSxhQUFhLEdBQUcsa0JBQWtCLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FDN0QsT0FBTyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsVUFBVSxHQUFHLElBQUksR0FBRyxhQUFhLENBQUMsT0FBTyxFQUFFLENBQy9ELENBQUM7UUFDRixLQUFLLE1BQU0sT0FBTyxJQUFJLGFBQWEsRUFBRTtZQUNuQyxNQUFNLGdCQUFnQixDQUNwQjtnQkFDRSxLQUFLO2dCQUNMLGVBQWUsRUFBRSxrQkFBa0IsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQztnQkFDdEUsTUFBTSxFQUFFLE9BQU8sQ0FBQyxVQUFVO2dCQUMxQixXQUFXLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPO2FBQ3BDLEVBQ0QsYUFBYSxDQUNkLENBQUM7U0FDSDtLQUNGO0FBQ0gsQ0FBQztBQXJDRCxrREFxQ0MifQ==