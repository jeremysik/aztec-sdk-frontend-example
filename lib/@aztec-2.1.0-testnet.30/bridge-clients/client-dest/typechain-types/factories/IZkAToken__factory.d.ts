import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IZkAToken, IZkATokenInterface } from "../IZkAToken";
export declare class IZkAToken__factory {
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
    static createInterface(): IZkATokenInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IZkAToken;
}
//# sourceMappingURL=IZkAToken__factory.d.ts.map