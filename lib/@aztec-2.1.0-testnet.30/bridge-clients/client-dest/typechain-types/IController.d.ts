import { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PopulatedTransaction, Signer, utils } from "ethers";
import { FunctionFragment, Result } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";
export interface IControllerInterface extends utils.Interface {
    contractName: "IController";
    functions: {
        "addSet(address)": FunctionFragment;
        "feeRecipient()": FunctionFragment;
        "getModuleFee(address,uint256)": FunctionFragment;
        "isModule(address)": FunctionFragment;
        "isSet(address)": FunctionFragment;
        "isSystemContract(address)": FunctionFragment;
        "resourceId(uint256)": FunctionFragment;
    };
    encodeFunctionData(functionFragment: "addSet", values: [string]): string;
    encodeFunctionData(functionFragment: "feeRecipient", values?: undefined): string;
    encodeFunctionData(functionFragment: "getModuleFee", values: [string, BigNumberish]): string;
    encodeFunctionData(functionFragment: "isModule", values: [string]): string;
    encodeFunctionData(functionFragment: "isSet", values: [string]): string;
    encodeFunctionData(functionFragment: "isSystemContract", values: [string]): string;
    encodeFunctionData(functionFragment: "resourceId", values: [BigNumberish]): string;
    decodeFunctionResult(functionFragment: "addSet", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "feeRecipient", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getModuleFee", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isModule", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isSet", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isSystemContract", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "resourceId", data: BytesLike): Result;
    events: {};
}
export interface IController extends BaseContract {
    contractName: "IController";
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: IControllerInterface;
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
        addSet(_setToken: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        feeRecipient(overrides?: CallOverrides): Promise<[string]>;
        getModuleFee(_module: string, _feeType: BigNumberish, overrides?: CallOverrides): Promise<[BigNumber]>;
        isModule(_module: string, overrides?: CallOverrides): Promise<[boolean]>;
        isSet(_setToken: string, overrides?: CallOverrides): Promise<[boolean]>;
        isSystemContract(_contractAddress: string, overrides?: CallOverrides): Promise<[boolean]>;
        resourceId(_id: BigNumberish, overrides?: CallOverrides): Promise<[string]>;
    };
    addSet(_setToken: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    feeRecipient(overrides?: CallOverrides): Promise<string>;
    getModuleFee(_module: string, _feeType: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
    isModule(_module: string, overrides?: CallOverrides): Promise<boolean>;
    isSet(_setToken: string, overrides?: CallOverrides): Promise<boolean>;
    isSystemContract(_contractAddress: string, overrides?: CallOverrides): Promise<boolean>;
    resourceId(_id: BigNumberish, overrides?: CallOverrides): Promise<string>;
    callStatic: {
        addSet(_setToken: string, overrides?: CallOverrides): Promise<void>;
        feeRecipient(overrides?: CallOverrides): Promise<string>;
        getModuleFee(_module: string, _feeType: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        isModule(_module: string, overrides?: CallOverrides): Promise<boolean>;
        isSet(_setToken: string, overrides?: CallOverrides): Promise<boolean>;
        isSystemContract(_contractAddress: string, overrides?: CallOverrides): Promise<boolean>;
        resourceId(_id: BigNumberish, overrides?: CallOverrides): Promise<string>;
    };
    filters: {};
    estimateGas: {
        addSet(_setToken: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        feeRecipient(overrides?: CallOverrides): Promise<BigNumber>;
        getModuleFee(_module: string, _feeType: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        isModule(_module: string, overrides?: CallOverrides): Promise<BigNumber>;
        isSet(_setToken: string, overrides?: CallOverrides): Promise<BigNumber>;
        isSystemContract(_contractAddress: string, overrides?: CallOverrides): Promise<BigNumber>;
        resourceId(_id: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
    };
    populateTransaction: {
        addSet(_setToken: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        feeRecipient(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getModuleFee(_module: string, _feeType: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        isModule(_module: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        isSet(_setToken: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        isSystemContract(_contractAddress: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        resourceId(_id: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
    };
}
//# sourceMappingURL=IController.d.ts.map