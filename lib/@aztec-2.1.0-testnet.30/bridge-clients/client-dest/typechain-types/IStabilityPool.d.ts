import { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PopulatedTransaction, Signer, utils } from "ethers";
import { FunctionFragment, Result } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";
export interface IStabilityPoolInterface extends utils.Interface {
    contractName: "IStabilityPool";
    functions: {
        "getCompoundedLUSDDeposit(address)": FunctionFragment;
        "provideToSP(uint256,address)": FunctionFragment;
        "withdrawFromSP(uint256)": FunctionFragment;
    };
    encodeFunctionData(functionFragment: "getCompoundedLUSDDeposit", values: [string]): string;
    encodeFunctionData(functionFragment: "provideToSP", values: [BigNumberish, string]): string;
    encodeFunctionData(functionFragment: "withdrawFromSP", values: [BigNumberish]): string;
    decodeFunctionResult(functionFragment: "getCompoundedLUSDDeposit", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "provideToSP", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "withdrawFromSP", data: BytesLike): Result;
    events: {};
}
export interface IStabilityPool extends BaseContract {
    contractName: "IStabilityPool";
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: IStabilityPoolInterface;
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
        getCompoundedLUSDDeposit(_depositor: string, overrides?: CallOverrides): Promise<[BigNumber]>;
        provideToSP(_amount: BigNumberish, _frontEndTag: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        withdrawFromSP(_amount: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
    };
    getCompoundedLUSDDeposit(_depositor: string, overrides?: CallOverrides): Promise<BigNumber>;
    provideToSP(_amount: BigNumberish, _frontEndTag: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    withdrawFromSP(_amount: BigNumberish, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    callStatic: {
        getCompoundedLUSDDeposit(_depositor: string, overrides?: CallOverrides): Promise<BigNumber>;
        provideToSP(_amount: BigNumberish, _frontEndTag: string, overrides?: CallOverrides): Promise<void>;
        withdrawFromSP(_amount: BigNumberish, overrides?: CallOverrides): Promise<void>;
    };
    filters: {};
    estimateGas: {
        getCompoundedLUSDDeposit(_depositor: string, overrides?: CallOverrides): Promise<BigNumber>;
        provideToSP(_amount: BigNumberish, _frontEndTag: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        withdrawFromSP(_amount: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
    };
    populateTransaction: {
        getCompoundedLUSDDeposit(_depositor: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        provideToSP(_amount: BigNumberish, _frontEndTag: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        withdrawFromSP(_amount: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
    };
}
//# sourceMappingURL=IStabilityPool.d.ts.map