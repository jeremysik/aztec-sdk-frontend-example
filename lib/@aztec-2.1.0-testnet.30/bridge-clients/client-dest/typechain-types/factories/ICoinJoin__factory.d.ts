import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { ICoinJoin, ICoinJoinInterface } from "../ICoinJoin";
export declare class ICoinJoin__factory {
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
    static createInterface(): ICoinJoinInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): ICoinJoin;
}
//# sourceMappingURL=ICoinJoin__factory.d.ts.map