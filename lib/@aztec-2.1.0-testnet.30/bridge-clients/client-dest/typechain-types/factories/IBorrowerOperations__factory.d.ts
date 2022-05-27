import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IBorrowerOperations, IBorrowerOperationsInterface } from "../IBorrowerOperations";
export declare class IBorrowerOperations__factory {
    static readonly abi: {
        inputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        outputs: never[];
        stateMutability: string;
        type: string;
    }[];
    static createInterface(): IBorrowerOperationsInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IBorrowerOperations;
}
//# sourceMappingURL=IBorrowerOperations__factory.d.ts.map