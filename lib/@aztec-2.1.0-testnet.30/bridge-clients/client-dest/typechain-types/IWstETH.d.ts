import { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PopulatedTransaction, Signer, utils } from "ethers";
import { FunctionFragment, Result } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";
export interface IWstETHInterface extends utils.Interface {
    contractName: "IWstETH";
    functions: {
        "getStETHByWstETH(uint256)": FunctionFragment;
        "getWstETHByStETH(uint256)": FunctionFragment;
        "unwrap(uint256)": FunctionFragment;
        "wrap(uint256)": FunctionFragment;
    };
    encodeFunctionData(functionFragment: "getStETHByWstETH", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "getWstETHByStETH", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "unwrap", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "wrap", values: [BigNumberish]): string;
    decodeFunctionResult(functionFragment: "getStETHByWstETH", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getWstETHByStETH", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "unwrap", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "wrap", data: BytesLike): Result;
    events: {};
}
export interface IWstETH extends BaseContract {
    contractName: "IWstETH";
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: IWstETHInterface;
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
        getStETHByWstETH(_wstETHAmount: BigNumberish, overrides?: CallOverrides): Promise<[BigNumber]>;
        getWstETHByStETH(_stETHAmount: BigNumberish, overrides?: CallOverrides): Promise<[BigNumber]>;
        unwrap(_wstETHAmount: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        wrap(_stETHAmount: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
    };
    getStETHByWstETH(_wstETHAmount: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
    getWstETHByStETH(_stETHAmount: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
    unwrap(_wstETHAmount: BigNumberish, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    wrap(_stETHAmount: BigNumberish, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    callStatic: {
        getStETHByWstETH(_wstETHAmount: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        getWstETHByStETH(_stETHAmount: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        unwrap(_wstETHAmount: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        wrap(_stETHAmount: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
    };
    filters: {};
    estimateGas: {
        getStETHByWstETH(_wstETHAmount: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        getWstETHByStETH(_stETHAmount: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        unwrap(_wstETHAmount: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        wrap(_stETHAmount: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
    };
    populateTransaction: {
        getStETHByWstETH(_wstETHAmount: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getWstETHByStETH(_stETHAmount: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        unwrap(_wstETHAmount: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        wrap(_stETHAmount: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
    };
}
//# sourceMappingURL=IWstETH.d.ts.map