import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { ITroveManager, ITroveManagerInterface } from "../ITroveManager";
export declare class ITroveManager__factory {
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
    static createInterface(): ITroveManagerInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): ITroveManager;
}
//# sourceMappingURL=ITroveManager__factory.d.ts.map