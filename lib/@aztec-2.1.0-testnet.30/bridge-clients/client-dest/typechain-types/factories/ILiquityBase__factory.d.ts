import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { ILiquityBase, ILiquityBaseInterface } from "../ILiquityBase";
export declare class ILiquityBase__factory {
    static readonly abi: {
        inputs: never[];
        name: string;
        outputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        stateMutability: string;
        type: string;
    }[];
    static createInterface(): ILiquityBaseInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): ILiquityBase;
}
//# sourceMappingURL=ILiquityBase__factory.d.ts.map