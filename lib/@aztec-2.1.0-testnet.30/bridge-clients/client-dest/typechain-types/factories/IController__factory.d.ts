import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IController, IControllerInterface } from "../IController";
export declare class IController__factory {
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
    static createInterface(): IControllerInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IController;
}
//# sourceMappingURL=IController__factory.d.ts.map