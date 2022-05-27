import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { MinHeap, MinHeapInterface } from "../MinHeap";
declare type MinHeapConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class MinHeap__factory extends ContractFactory {
    constructor(...args: MinHeapConstructorParams);
    deploy(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<MinHeap>;
    getDeployTransaction(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): MinHeap;
    connect(signer: Signer): MinHeap__factory;
    static readonly contractName: "MinHeap";
    readonly contractName: "MinHeap";
    static readonly bytecode = "0x60566037600b82828239805160001a607314602a57634e487b7160e01b600052600060045260246000fd5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600080fdfea2646970667358221220b5060995a9d7685aec4f2be6f10b20de1fe6852f2ce02be33bb5222641ed35e364736f6c634300080a0033";
    static readonly abi: {
        inputs: never[];
        name: string;
        type: string;
    }[];
    static createInterface(): MinHeapInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): MinHeap;
}
export {};
//# sourceMappingURL=MinHeap__factory.d.ts.map