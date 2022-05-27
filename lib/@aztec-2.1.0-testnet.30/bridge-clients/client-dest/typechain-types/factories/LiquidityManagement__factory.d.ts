import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { LiquidityManagement, LiquidityManagementInterface } from "../LiquidityManagement";
export declare class LiquidityManagement__factory {
    static readonly abi: ({
        inputs: never[];
        name: string;
        outputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        stateMutability: string;
        type: string;
    } | {
        inputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        outputs: never[];
        stateMutability: string;
        type: string;
    } | {
        stateMutability: string;
        type: string;
        inputs?: undefined;
        name?: undefined;
        outputs?: undefined;
    })[];
    static createInterface(): LiquidityManagementInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): LiquidityManagement;
}
//# sourceMappingURL=LiquidityManagement__factory.d.ts.map