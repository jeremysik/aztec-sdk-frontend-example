import { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PopulatedTransaction, Signer, utils } from "ethers";
import { FunctionFragment, Result } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";
export interface ITroveManagerInterface extends utils.Interface {
    contractName: "ITroveManager";
    functions: {
        "checkRecoveryMode(uint256)": FunctionFragment;
        "closeTrove(address)": FunctionFragment;
        "getBorrowingRateWithDecay()": FunctionFragment;
        "getCurrentICR(address,uint256)": FunctionFragment;
        "getEntireDebtAndColl(address)": FunctionFragment;
        "getTroveStatus(address)": FunctionFragment;
        "liquidate(address)": FunctionFragment;
        "priceFeed()": FunctionFragment;
        "redeemCollateral(uint256,address,address,address,uint256,uint256,uint256)": FunctionFragment;
    };
    encodeFunctionData(functionFragment: "checkRecoveryMode", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "closeTrove", values: [string]): string;
    encodeFunctionData(functionFragment: "getBorrowingRateWithDecay", values?: undefined): string;
    encodeFunctionData(functionFragment: "getCurrentICR", values: [string, BigNumberish]): string;
    encodeFunctionData(functionFragment: "getEntireDebtAndColl", values: [string]): string;
    encodeFunctionData(functionFragment: "getTroveStatus", values: [string]): string;
    encodeFunctionData(functionFragment: "liquidate", values: [string]): string;
    encodeFunctionData(functionFragment: "priceFeed", values?: undefined): string;
    encodeFunctionData(functionFragment: "redeemCollateral", values: [
        BigNumberish,
        string,
        string,
        string,
        BigNumberish,
        BigNumberish,
        BigNumberish
    ]): string;
    decodeFunctionResult(functionFragment: "checkRecoveryMode", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "closeTrove", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getBorrowingRateWithDecay", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getCurrentICR", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getEntireDebtAndColl", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getTroveStatus", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "liquidate", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "priceFeed", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "redeemCollateral", data: BytesLike): Result;
    events: {};
}
export interface ITroveManager extends BaseContract {
    contractName: "ITroveManager";
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: ITroveManagerInterface;
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
        checkRecoveryMode(_price: BigNumberish, overrides?: CallOverrides): Promise<[boolean]>;
        closeTrove(_borrower: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        getBorrowingRateWithDecay(overrides?: CallOverrides): Promise<[BigNumber]>;
        getCurrentICR(_borrower: string, _price: BigNumberish, overrides?: CallOverrides): Promise<[BigNumber]>;
        getEntireDebtAndColl(_borrower: string, overrides?: CallOverrides): Promise<[
            BigNumber,
            BigNumber,
            BigNumber,
            BigNumber
        ] & {
            debt: BigNumber;
            coll: BigNumber;
            pendingLUSDDebtReward: BigNumber;
            pendingETHReward: BigNumber;
        }>;
        getTroveStatus(_borrower: string, overrides?: CallOverrides): Promise<[BigNumber]>;
        liquidate(_borrower: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        priceFeed(overrides?: CallOverrides): Promise<[string]>;
        redeemCollateral(_LUSDAmount: BigNumberish, _firstRedemptionHint: string, _upperPartialRedemptionHint: string, _lowerPartialRedemptionHint: string, _partialRedemptionHintNICR: BigNumberish, _maxIterations: BigNumberish, _maxFee: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
    };
    checkRecoveryMode(_price: BigNumberish, overrides?: CallOverrides): Promise<boolean>;
    closeTrove(_borrower: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    getBorrowingRateWithDecay(overrides?: CallOverrides): Promise<BigNumber>;
    getCurrentICR(_borrower: string, _price: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
    getEntireDebtAndColl(_borrower: string, overrides?: CallOverrides): Promise<[
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber
    ] & {
        debt: BigNumber;
        coll: BigNumber;
        pendingLUSDDebtReward: BigNumber;
        pendingETHReward: BigNumber;
    }>;
    getTroveStatus(_borrower: string, overrides?: CallOverrides): Promise<BigNumber>;
    liquidate(_borrower: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    priceFeed(overrides?: CallOverrides): Promise<string>;
    redeemCollateral(_LUSDAmount: BigNumberish, _firstRedemptionHint: string, _upperPartialRedemptionHint: string, _lowerPartialRedemptionHint: string, _partialRedemptionHintNICR: BigNumberish, _maxIterations: BigNumberish, _maxFee: BigNumberish, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    callStatic: {
        checkRecoveryMode(_price: BigNumberish, overrides?: CallOverrides): Promise<boolean>;
        closeTrove(_borrower: string, overrides?: CallOverrides): Promise<void>;
        getBorrowingRateWithDecay(overrides?: CallOverrides): Promise<BigNumber>;
        getCurrentICR(_borrower: string, _price: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        getEntireDebtAndColl(_borrower: string, overrides?: CallOverrides): Promise<[
            BigNumber,
            BigNumber,
            BigNumber,
            BigNumber
        ] & {
            debt: BigNumber;
            coll: BigNumber;
            pendingLUSDDebtReward: BigNumber;
            pendingETHReward: BigNumber;
        }>;
        getTroveStatus(_borrower: string, overrides?: CallOverrides): Promise<BigNumber>;
        liquidate(_borrower: string, overrides?: CallOverrides): Promise<void>;
        priceFeed(overrides?: CallOverrides): Promise<string>;
        redeemCollateral(_LUSDAmount: BigNumberish, _firstRedemptionHint: string, _upperPartialRedemptionHint: string, _lowerPartialRedemptionHint: string, _partialRedemptionHintNICR: BigNumberish, _maxIterations: BigNumberish, _maxFee: BigNumberish, overrides?: CallOverrides): Promise<void>;
    };
    filters: {};
    estimateGas: {
        checkRecoveryMode(_price: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        closeTrove(_borrower: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        getBorrowingRateWithDecay(overrides?: CallOverrides): Promise<BigNumber>;
        getCurrentICR(_borrower: string, _price: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        getEntireDebtAndColl(_borrower: string, overrides?: CallOverrides): Promise<BigNumber>;
        getTroveStatus(_borrower: string, overrides?: CallOverrides): Promise<BigNumber>;
        liquidate(_borrower: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        priceFeed(overrides?: CallOverrides): Promise<BigNumber>;
        redeemCollateral(_LUSDAmount: BigNumberish, _firstRedemptionHint: string, _upperPartialRedemptionHint: string, _lowerPartialRedemptionHint: string, _partialRedemptionHintNICR: BigNumberish, _maxIterations: BigNumberish, _maxFee: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
    };
    populateTransaction: {
        checkRecoveryMode(_price: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        closeTrove(_borrower: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        getBorrowingRateWithDecay(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getCurrentICR(_borrower: string, _price: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getEntireDebtAndColl(_borrower: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getTroveStatus(_borrower: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        liquidate(_borrower: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        priceFeed(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        redeemCollateral(_LUSDAmount: BigNumberish, _firstRedemptionHint: string, _upperPartialRedemptionHint: string, _lowerPartialRedemptionHint: string, _partialRedemptionHintNICR: BigNumberish, _maxIterations: BigNumberish, _maxFee: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
    };
}
//# sourceMappingURL=ITroveManager.d.ts.map