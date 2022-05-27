import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { ILQTYStaking, ILQTYStakingInterface } from "../ILQTYStaking";
export declare class ILQTYStaking__factory {
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
    static createInterface(): ILQTYStakingInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): ILQTYStaking;
}
//# sourceMappingURL=ILQTYStaking__factory.d.ts.map