import { BaseContract, BigNumber, BytesLike, CallOverrides, PopulatedTransaction, Signer, utils } from "ethers";
import { FunctionFragment, Result } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";
export interface ILiquityBaseInterface extends utils.Interface {
    contractName: "ILiquityBase";
    functions: {
        "priceFeed()": FunctionFragment;
    };
    encodeFunctionData(functionFragment: "priceFeed", values?: undefined): string;
    decodeFunctionResult(functionFragment: "priceFeed", data: BytesLike): Result;
    events: {};
}
export interface ILiquityBase extends BaseContract {
    contractName: "ILiquityBase";
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: ILiquityBaseInterface;
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
        priceFeed(overrides?: CallOverrides): Promise<[string]>;
    };
    priceFeed(overrides?: CallOverrides): Promise<string>;
    callStatic: {
        priceFeed(overrides?: CallOverrides): Promise<string>;
    };
    filters: {};
    estimateGas: {
        priceFeed(overrides?: CallOverrides): Promise<BigNumber>;
    };
    populateTransaction: {
        priceFeed(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    };
}
//# sourceMappingURL=ILiquityBase.d.ts.map