import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { PeripheryPayments, PeripheryPaymentsInterface } from "../PeripheryPayments";
export declare class PeripheryPayments__factory {
    static readonly abi: ({
        inputs: never[];
        name: string;
        outputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        stateMutability: string;
        type: string;
    } | {
        stateMutability: string;
        type: string;
        inputs?: undefined;
        name?: undefined;
        outputs?: undefined;
    })[];
    static createInterface(): PeripheryPaymentsInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): PeripheryPayments;
}
//# sourceMappingURL=PeripheryPayments__factory.d.ts.map