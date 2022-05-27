import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { ISafeManager, ISafeManagerInterface } from "../ISafeManager";
export declare class ISafeManager__factory {
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
    static createInterface(): ISafeManagerInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): ISafeManager;
}
//# sourceMappingURL=ISafeManager__factory.d.ts.map