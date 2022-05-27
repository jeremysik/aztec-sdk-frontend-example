import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { ILendingPoolAddressesProvider, ILendingPoolAddressesProviderInterface } from "../ILendingPoolAddressesProvider";
export declare class ILendingPoolAddressesProvider__factory {
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
    static createInterface(): ILendingPoolAddressesProviderInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): ILendingPoolAddressesProvider;
}
//# sourceMappingURL=ILendingPoolAddressesProvider__factory.d.ts.map