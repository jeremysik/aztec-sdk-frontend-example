import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IWstETH, IWstETHInterface } from "../IWstETH";
export declare class IWstETH__factory {
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
    static createInterface(): IWstETHInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IWstETH;
}
//# sourceMappingURL=IWstETH__factory.d.ts.map