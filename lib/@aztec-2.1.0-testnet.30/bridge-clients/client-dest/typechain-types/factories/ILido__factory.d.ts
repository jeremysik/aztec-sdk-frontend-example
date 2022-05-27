import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { ILido, ILidoInterface } from "../ILido";
export declare class ILido__factory {
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
    static createInterface(): ILidoInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): ILido;
}
//# sourceMappingURL=ILido__factory.d.ts.map