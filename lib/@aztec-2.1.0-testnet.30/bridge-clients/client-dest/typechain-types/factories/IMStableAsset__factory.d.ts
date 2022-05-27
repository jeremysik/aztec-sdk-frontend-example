import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IMStableAsset, IMStableAssetInterface } from "../IMStableAsset";
export declare class IMStableAsset__factory {
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
    static createInterface(): IMStableAssetInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IMStableAsset;
}
//# sourceMappingURL=IMStableAsset__factory.d.ts.map