import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { KeeperCompatibleInterface, KeeperCompatibleInterfaceInterface } from "../KeeperCompatibleInterface";
export declare class KeeperCompatibleInterface__factory {
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
    static createInterface(): KeeperCompatibleInterfaceInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): KeeperCompatibleInterface;
}
//# sourceMappingURL=KeeperCompatibleInterface__factory.d.ts.map