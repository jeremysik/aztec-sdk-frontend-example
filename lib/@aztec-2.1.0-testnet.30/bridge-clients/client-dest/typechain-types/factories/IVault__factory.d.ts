import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IVault, IVaultInterface } from "../IVault";
export declare class IVault__factory {
    static readonly abi: {
        inputs: ({
            internalType: string;
            name: string;
            type: string;
            components?: undefined;
        } | {
            components: {
                internalType: string;
                name: string;
                type: string;
            }[];
            internalType: string;
            name: string;
            type: string;
        })[];
        name: string;
        outputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        stateMutability: string;
        type: string;
    }[];
    static createInterface(): IVaultInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IVault;
}
//# sourceMappingURL=IVault__factory.d.ts.map