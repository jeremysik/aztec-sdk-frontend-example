import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IPriceFeed, IPriceFeedInterface } from "../IPriceFeed";
export declare class IPriceFeed__factory {
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
    static createInterface(): IPriceFeedInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IPriceFeed;
}
//# sourceMappingURL=IPriceFeed__factory.d.ts.map