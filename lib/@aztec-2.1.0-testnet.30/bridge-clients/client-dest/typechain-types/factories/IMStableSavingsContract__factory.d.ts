import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IMStableSavingsContract, IMStableSavingsContractInterface } from "../IMStableSavingsContract";
export declare class IMStableSavingsContract__factory {
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
    static createInterface(): IMStableSavingsContractInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IMStableSavingsContract;
}
//# sourceMappingURL=IMStableSavingsContract__factory.d.ts.map