import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IExchangeIssuance, IExchangeIssuanceInterface } from "../IExchangeIssuance";
export declare class IExchangeIssuance__factory {
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
    static createInterface(): IExchangeIssuanceInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IExchangeIssuance;
}
//# sourceMappingURL=IExchangeIssuance__factory.d.ts.map