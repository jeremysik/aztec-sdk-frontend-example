import { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PopulatedTransaction, Signer, utils } from "ethers";
import { FunctionFragment, Result } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";
export interface IMStableSavingsContractInterface extends utils.Interface {
    contractName: "IMStableSavingsContract";
    functions: {
        "balanceOf(address)": FunctionFragment;
        "depositSavings(uint256)": FunctionFragment;
        "exchangeRate()": FunctionFragment;
        "redeemCredits(uint256)": FunctionFragment;
        "redeemUnderlying(uint256)": FunctionFragment;
    };
    encodeFunctionData(functionFragment: "balanceOf", values: [string]): string;
    encodeFunctionData(functionFragment: "depositSavings", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "exchangeRate", values?: undefined): string;
    encodeFunctionData(functionFragment: "redeemCredits", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "redeemUnderlying", values: [BigNumberish]): string;
    decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "depositSavings", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "exchangeRate", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "redeemCredits", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "redeemUnderlying", data: BytesLike): Result;
    events: {};
}
export interface IMStableSavingsContract extends BaseContract {
    contractName: "IMStableSavingsContract";
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: IMStableSavingsContractInterface;
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
        balanceOf(account: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        depositSavings(_underlying: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        exchangeRate(overrides?: CallOverrides): Promise<[BigNumber] & {
            exchangeRate: BigNumber;
        }>;
        redeemCredits(_credits: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        redeemUnderlying(_underlying: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
    };
    balanceOf(account: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    depositSavings(_underlying: BigNumberish, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    exchangeRate(overrides?: CallOverrides): Promise<BigNumber>;
    redeemCredits(_credits: BigNumberish, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    redeemUnderlying(_underlying: BigNumberish, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    callStatic: {
        balanceOf(account: string, overrides?: CallOverrides): Promise<BigNumber>;
        depositSavings(_underlying: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        exchangeRate(overrides?: CallOverrides): Promise<BigNumber>;
        redeemCredits(_credits: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        redeemUnderlying(_underlying: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
    };
    filters: {};
    estimateGas: {
        balanceOf(account: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        depositSavings(_underlying: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        exchangeRate(overrides?: CallOverrides): Promise<BigNumber>;
        redeemCredits(_credits: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        redeemUnderlying(_underlying: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
    };
    populateTransaction: {
        balanceOf(account: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        depositSavings(_underlying: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        exchangeRate(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        redeemCredits(_credits: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        redeemUnderlying(_underlying: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
    };
}
//# sourceMappingURL=IMStableSavingsContract.d.ts.map