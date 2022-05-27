import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { ISortedTroves, ISortedTrovesInterface } from "../ISortedTroves";
export declare class ISortedTroves__factory {
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
    static createInterface(): ISortedTrovesInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): ISortedTroves;
}
//# sourceMappingURL=ISortedTroves__factory.d.ts.map