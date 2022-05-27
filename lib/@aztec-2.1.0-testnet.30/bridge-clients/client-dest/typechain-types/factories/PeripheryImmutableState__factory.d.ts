import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { PeripheryImmutableState, PeripheryImmutableStateInterface } from "../PeripheryImmutableState";
export declare class PeripheryImmutableState__factory {
    static readonly abi: {
        inputs: never[];
        name: string;
        outputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        stateMutability: string;
        type: string;
    }[];
    static createInterface(): PeripheryImmutableStateInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): PeripheryImmutableState;
}
//# sourceMappingURL=PeripheryImmutableState__factory.d.ts.map