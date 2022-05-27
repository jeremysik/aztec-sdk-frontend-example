import * as ElementVaultConfig from './ElementVaultConfig.json';
import { Contract, Signer } from 'ethers';
export declare const elementTokenAddresses: {
    "alusd3crv-f": string;
    crv3crypto: string;
    crvtricrypto: string;
    dai: string;
    eurscrv: string;
    "lusd3crv-f": string;
    "mim-3lp3crv-f": string;
    stecrv: string;
    usdc: string;
    wbtc: string;
    weth: string;
};
export declare type ElementTokens = keyof typeof ElementVaultConfig.wrappedPositions.v1_1.yearn;
export declare function deployElementBridge(signer: Signer, rollup: Contract, assets: ElementTokens[], tranchesAfter: Date): Promise<void>;
//# sourceMappingURL=deploy_element.d.ts.map