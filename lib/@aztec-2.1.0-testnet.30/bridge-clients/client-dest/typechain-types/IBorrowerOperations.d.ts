import { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PayableOverrides, PopulatedTransaction, Signer, utils } from "ethers";
import { FunctionFragment, Result } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";
export interface IBorrowerOperationsInterface extends utils.Interface {
    contractName: "IBorrowerOperations";
    functions: {
        "adjustTrove(uint256,uint256,uint256,bool,address,address)": FunctionFragment;
        "claimCollateral()": FunctionFragment;
        "closeTrove()": FunctionFragment;
        "openTrove(uint256,uint256,address,address)": FunctionFragment;
    };
    encodeFunctionData(functionFragment: "adjustTrove", values: [BigNumberish, BigNumberish, BigNumberish, boolean, string, string]): string;
    encodeFunctionData(functionFragment: "claimCollateral", values?: undefined): string;
    encodeFunctionData(functionFragment: "closeTrove", values?: undefined): string;
    encodeFunctionData(functionFragment: "openTrove", values: [BigNumberish, BigNumberish, string, string]): string;
    decodeFunctionResult(functionFragment: "adjustTrove", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "claimCollateral", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "closeTrove", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "openTrove", data: BytesLike): Result;
    events: {};
}
export interface IBorrowerOperations extends BaseContract {
    contractName: "IBorrowerOperations";
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: IBorrowerOperationsInterface;
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
        adjustTrove(_maxFee: BigNumberish, _collWithdrawal: BigNumberish, _debtChange: BigNumberish, isDebtIncrease: boolean, _upperHint: string, _lowerHint: string, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        claimCollateral(overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        closeTrove(overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        openTrove(_maxFee: BigNumberish, _LUSDAmount: BigNumberish, _upperHint: string, _lowerHint: string, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
    };
    adjustTrove(_maxFee: BigNumberish, _collWithdrawal: BigNumberish, _debtChange: BigNumberish, isDebtIncrease: boolean, _upperHint: string, _lowerHint: string, overrides?: PayableOverrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    claimCollateral(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    closeTrove(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    openTrove(_maxFee: BigNumberish, _LUSDAmount: BigNumberish, _upperHint: string, _lowerHint: string, overrides?: PayableOverrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    callStatic: {
        adjustTrove(_maxFee: BigNumberish, _collWithdrawal: BigNumberish, _debtChange: BigNumberish, isDebtIncrease: boolean, _upperHint: string, _lowerHint: string, overrides?: CallOverrides): Promise<void>;
        claimCollateral(overrides?: CallOverrides): Promise<void>;
        closeTrove(overrides?: CallOverrides): Promise<void>;
        openTrove(_maxFee: BigNumberish, _LUSDAmount: BigNumberish, _upperHint: string, _lowerHint: string, overrides?: CallOverrides): Promise<void>;
    };
    filters: {};
    estimateGas: {
        adjustTrove(_maxFee: BigNumberish, _collWithdrawal: BigNumberish, _debtChange: BigNumberish, isDebtIncrease: boolean, _upperHint: string, _lowerHint: string, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        claimCollateral(overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        closeTrove(overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        openTrove(_maxFee: BigNumberish, _LUSDAmount: BigNumberish, _upperHint: string, _lowerHint: string, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
    };
    populateTransaction: {
        adjustTrove(_maxFee: BigNumberish, _collWithdrawal: BigNumberish, _debtChange: BigNumberish, isDebtIncrease: boolean, _upperHint: string, _lowerHint: string, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        claimCollateral(overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        closeTrove(overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        openTrove(_maxFee: BigNumberish, _LUSDAmount: BigNumberish, _upperHint: string, _lowerHint: string, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
    };
}
//# sourceMappingURL=IBorrowerOperations.d.ts.map