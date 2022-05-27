import { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, PopulatedTransaction, Signer, utils } from "ethers";
import { FunctionFragment, Result } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";
export interface ISortedTrovesInterface extends utils.Interface {
    contractName: "ISortedTroves";
    functions: {
        "findInsertPosition(uint256,address,address)": FunctionFragment;
        "getNext(address)": FunctionFragment;
        "getPrev(address)": FunctionFragment;
    };
    encodeFunctionData(functionFragment: "findInsertPosition", values: [BigNumberish, string, string]): string;
    encodeFunctionData(functionFragment: "getNext", values: [string]): string;
    encodeFunctionData(functionFragment: "getPrev", values: [string]): string;
    decodeFunctionResult(functionFragment: "findInsertPosition", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getNext", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getPrev", data: BytesLike): Result;
    events: {};
}
export interface ISortedTroves extends BaseContract {
    contractName: "ISortedTroves";
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: ISortedTrovesInterface;
    queryFilter<TEvent extends TypedEvent>(event: TypedEventFilter<TEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TEvent>>;
    listeners<TEvent extends TypedEvent>(eventFilter?: TypedEventFilter<TEvent>): Array<TypedListener<TEvent>>;
    listeners(eventName?: string): Array<Listener>;
    removeAllListeners<TEvent extends TypedEvent>(eventFilter: TypedEventFilter<TEvent>): this;
    removeAllListeners(eventName?: string): this;
    off: OnEvent<this>;
    on: OnEvent<this>;
    once: OnEvent<this>;
    removeListener: OnEvent<this>;
    functions: {
        findInsertPosition(_ICR: BigNumberish, _prevId: string, _nextId: string, overrides?: CallOverrides): Promise<[string, string]>;
        getNext(_id: string, overrides?: CallOverrides): Promise<[string]>;
        getPrev(_id: string, overrides?: CallOverrides): Promise<[string]>;
    };
    findInsertPosition(_ICR: BigNumberish, _prevId: string, _nextId: string, overrides?: CallOverrides): Promise<[string, string]>;
    getNext(_id: string, overrides?: CallOverrides): Promise<string>;
    getPrev(_id: string, overrides?: CallOverrides): Promise<string>;
    callStatic: {
        findInsertPosition(_ICR: BigNumberish, _prevId: string, _nextId: string, overrides?: CallOverrides): Promise<[string, string]>;
        getNext(_id: string, overrides?: CallOverrides): Promise<string>;
        getPrev(_id: string, overrides?: CallOverrides): Promise<string>;
    };
    filters: {};
    estimateGas: {
        findInsertPosition(_ICR: BigNumberish, _prevId: string, _nextId: string, overrides?: CallOverrides): Promise<BigNumber>;
        getNext(_id: string, overrides?: CallOverrides): Promise<BigNumber>;
        getPrev(_id: string, overrides?: CallOverrides): Promise<BigNumber>;
    };
    populateTransaction: {
        findInsertPosition(_ICR: BigNumberish, _prevId: string, _nextId: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getNext(_id: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getPrev(_id: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;
    };
}
//# sourceMappingURL=ISortedTroves.d.ts.map