import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IDeploymentValidator, IDeploymentValidatorInterface } from "../IDeploymentValidator";
export declare class IDeploymentValidator__factory {
    static readonly abi: {
        inputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        outputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        stateMutability: string;
        type: string;
    }[];
    static createInterface(): IDeploymentValidatorInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IDeploymentValidator;
}
//# sourceMappingURL=IDeploymentValidator__factory.d.ts.map