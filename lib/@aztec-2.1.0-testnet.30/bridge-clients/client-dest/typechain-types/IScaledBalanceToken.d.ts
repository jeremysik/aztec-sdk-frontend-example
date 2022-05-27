import { BaseContract, BigNumber, BytesLike, CallOverrides, PopulatedTransaction, Signer, utils } from "ethers";
import { FunctionFragment, Result } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";
export interface IScaledBalanceTokenInterface extends utils.Interface {
    contractName: "IScaledBalanceToken";
    functions: {
        "scaledBalanceOf(address)": FunctionFragment;
        "underlying()": FunctionFragment;
    };
    encodeFunctionData(functionFragment: "scaledBalanceOf", values: [string]): string;
    encodeFunctionData(functionFragment: "underlying", values?: undefined): string;
    decodeFunctionResult(functionFragment: "scaledBalanceOf", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "underlying", data: BytesLike): Result;
    events: {};
}
export interface IScaledBalanceToken extends BaseContract {
    contractName: "IScaledBalanceToken";
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: IScaledBalanceTokenInterface;
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
        scaledBalanceOf(user: string, overrides?: CallOverrides): Promise<[BigNumber]>;
        underlying(overrides?: CallOverrides): Promise<[string]>;
    };
    scaledBalanceOf(user: string, overrides?: CallOverrides): Promise<BigNumber>;
    underlying(overrides?: CallOverrides): Promise<string>;
    callStatic: {
        scaledBalanceOf(user: string, overrides?: CallOverrides): Promise<BigNumber>;
        underlying(overrides?: CallOverrides): Promise<string>;
    };
    filters: {};
    estimateGas: {
        scaledBalanceOf(user: string, overrides?: CallOverrides): Promise<BigNumber>;
        underlying(overrides?: CallOverrides): Promise<BigNumber>;
    };
    populateTransaction: {
        scaledBalanceOf(user: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        underlying(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    };
}
//# sourceMappingURL=IScaledBalanceToken.d.ts.map