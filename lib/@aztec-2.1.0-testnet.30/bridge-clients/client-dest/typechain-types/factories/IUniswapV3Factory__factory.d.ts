import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IUniswapV3Factory, IUniswapV3FactoryInterface } from "../IUniswapV3Factory";
export declare class IUniswapV3Factory__factory {
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
    static createInterface(): IUniswapV3FactoryInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IUniswapV3Factory;
}
//# sourceMappingURL=IUniswapV3Factory__factory.d.ts.map