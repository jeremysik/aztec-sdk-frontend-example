import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IStabilityPool, IStabilityPoolInterface } from "../IStabilityPool";
export declare class IStabilityPool__factory {
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
    static createInterface(): IStabilityPoolInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IStabilityPool;
}
//# sourceMappingURL=IStabilityPool__factory.d.ts.map