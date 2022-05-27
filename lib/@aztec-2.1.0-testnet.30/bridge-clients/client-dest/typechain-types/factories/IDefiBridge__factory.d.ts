import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IDefiBridge, IDefiBridgeInterface } from "../IDefiBridge";
export declare class IDefiBridge__factory {
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
    static createInterface(): IDefiBridgeInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IDefiBridge;
}
//# sourceMappingURL=IDefiBridge__factory.d.ts.map