import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IERC20Detailed, IERC20DetailedInterface } from "../IERC20Detailed";
export declare class IERC20Detailed__factory {
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
    static createInterface(): IERC20DetailedInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IERC20Detailed;
}
//# sourceMappingURL=IERC20Detailed__factory.d.ts.map