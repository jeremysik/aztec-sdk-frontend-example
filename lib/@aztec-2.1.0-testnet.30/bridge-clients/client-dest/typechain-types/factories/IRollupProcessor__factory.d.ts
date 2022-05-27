import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IRollupProcessor, IRollupProcessorInterface } from "../IRollupProcessor";
export declare class IRollupProcessor__factory {
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
    static createInterface(): IRollupProcessorInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IRollupProcessor;
}
//# sourceMappingURL=IRollupProcessor__factory.d.ts.map