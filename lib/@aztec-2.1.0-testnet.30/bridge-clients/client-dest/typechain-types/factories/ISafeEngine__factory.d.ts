import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { ISafeEngine, ISafeEngineInterface } from "../ISafeEngine";
export declare class ISafeEngine__factory {
    static readonly abi: ({
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
    } | {
        inputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        outputs: {
            components: {
                internalType: string;
                name: string;
                type: string;
            }[];
            internalType: string;
            name: string;
            type: string;
        }[];
        stateMutability: string;
        type: string;
    })[];
    static createInterface(): ISafeEngineInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): ISafeEngine;
}
//# sourceMappingURL=ISafeEngine__factory.d.ts.map