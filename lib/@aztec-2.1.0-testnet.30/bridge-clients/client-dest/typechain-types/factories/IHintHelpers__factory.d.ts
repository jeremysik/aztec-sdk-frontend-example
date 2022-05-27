import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IHintHelpers, IHintHelpersInterface } from "../IHintHelpers";
export declare class IHintHelpers__factory {
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
    static createInterface(): IHintHelpersInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IHintHelpers;
}
//# sourceMappingURL=IHintHelpers__factory.d.ts.map