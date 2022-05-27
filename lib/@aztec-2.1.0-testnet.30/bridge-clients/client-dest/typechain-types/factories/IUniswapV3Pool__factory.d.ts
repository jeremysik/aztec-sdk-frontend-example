import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IUniswapV3Pool, IUniswapV3PoolInterface } from "../IUniswapV3Pool";
export declare class IUniswapV3Pool__factory {
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
    static createInterface(): IUniswapV3PoolInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IUniswapV3Pool;
}
//# sourceMappingURL=IUniswapV3Pool__factory.d.ts.map