import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IWrappedPosition, IWrappedPositionInterface } from "../IWrappedPosition";
export declare class IWrappedPosition__factory {
    static readonly abi: ({
        anonymous: boolean;
        inputs: {
            indexed: boolean;
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        type: string;
        outputs?: undefined;
        stateMutability?: undefined;
    } | {
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
        anonymous?: undefined;
    })[];
    static createInterface(): IWrappedPositionInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IWrappedPosition;
}
//# sourceMappingURL=IWrappedPosition__factory.d.ts.map