import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IEthJoin, IEthJoinInterface } from "../IEthJoin";
export declare class IEthJoin__factory {
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
    static createInterface(): IEthJoinInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IEthJoin;
}
//# sourceMappingURL=IEthJoin__factory.d.ts.map