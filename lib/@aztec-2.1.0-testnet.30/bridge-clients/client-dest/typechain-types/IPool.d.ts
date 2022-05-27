import { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PopulatedTransaction, Signer, utils } from "ethers";
import { FunctionFragment, Result } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";
export declare namespace DataTypes {
    type ReserveConfigurationMapStruct = {
        data: BigNumberish;
    };
    type ReserveConfigurationMapStructOutput = [BigNumber] & {
        data: BigNumber;
    };
    type ReserveDataStruct = {
        configuration: DataTypes.ReserveConfigurationMapStruct;
        liquidityIndex: BigNumberish;
        variableBorrowIndex: BigNumberish;
        currentLiquidityRate: BigNumberish;
        currentVariableBorrowRate: BigNumberish;
        currentStableBorrowRate: BigNumberish;
        lastUpdateTimestamp: BigNumberish;
        aTokenAddress: string;
        stableDebtTokenAddress: string;
        variableDebtTokenAddress: string;
        interestRateStrategyAddress: string;
        id: BigNumberish;
    };
    type ReserveDataStructOutput = [
        DataTypes.ReserveConfigurationMapStructOutput,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        number,
        string,
        string,
        string,
        string,
        number
    ] & {
        configuration: DataTypes.ReserveConfigurationMapStructOutput;
        liquidityIndex: BigNumber;
        variableBorrowIndex: BigNumber;
        currentLiquidityRate: BigNumber;
        currentVariableBorrowRate: BigNumber;
        currentStableBorrowRate: BigNumber;
        lastUpdateTimestamp: number;
        aTokenAddress: string;
        stableDebtTokenAddress: string;
        variableDebtTokenAddress: string;
        interestRateStrategyAddress: string;
        id: number;
    };
}
export interface IPoolInterface extends utils.Interface {
    contractName: "IPool";
    functions: {
        "deposit(address,uint256,address,uint16)": FunctionFragment;
        "getReserveData(address)": FunctionFragment;
        "getReserveNormalizedIncome(address)": FunctionFragment;
        "withdraw(address,uint256,address)": FunctionFragment;
    };
    encodeFunctionData(functionFragment: "deposit", values: [string, BigNumberish, string, BigNumberish]): string;
    encodeFunctionData(functionFragment: "getReserveData", values: [string]): string;
    encodeFunctionData(functionFragment: "getReserveNormalizedIncome", values: [string]): string;
    encodeFunctionData(functionFragment: "withdraw", values: [string, BigNumberish, string]): string;
    decodeFunctionResult(functionFragment: "deposit", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getReserveData", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getReserveNormalizedIncome", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "withdraw", data: BytesLike): Result;
    events: {};
}
export interface IPool extends BaseContract {
    contractName: "IPool";
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: IPoolInterface;
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
        deposit(asset: string, amount: BigNumberish, onBehalfOf: string, referralCode: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        getReserveData(asset: string, overrides?: CallOverrides): Promise<[DataTypes.ReserveDataStructOutput]>;
        getReserveNormalizedIncome(asset: string, overrides?: CallOverrides): Promise<[BigNumber]>;
        withdraw(asset: string, amount: BigNumberish, to: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
    };
    deposit(asset: string, amount: BigNumberish, onBehalfOf: string, referralCode: BigNumberish, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    getReserveData(asset: string, overrides?: CallOverrides): Promise<DataTypes.ReserveDataStructOutput>;
    getReserveNormalizedIncome(asset: string, overrides?: CallOverrides): Promise<BigNumber>;
    withdraw(asset: string, amount: BigNumberish, to: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    callStatic: {
        deposit(asset: string, amount: BigNumberish, onBehalfOf: string, referralCode: BigNumberish, overrides?: CallOverrides): Promise<void>;
        getReserveData(asset: string, overrides?: CallOverrides): Promise<DataTypes.ReserveDataStructOutput>;
        getReserveNormalizedIncome(asset: string, overrides?: CallOverrides): Promise<BigNumber>;
        withdraw(asset: string, amount: BigNumberish, to: string, overrides?: CallOverrides): Promise<BigNumber>;
    };
    filters: {};
    estimateGas: {
        deposit(asset: string, amount: BigNumberish, onBehalfOf: string, referralCode: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        getReserveData(asset: string, overrides?: CallOverrides): Promise<BigNumber>;
        getReserveNormalizedIncome(asset: string, overrides?: CallOverrides): Promise<BigNumber>;
        withdraw(asset: string, amount: BigNumberish, to: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
    };
    populateTransaction: {
        deposit(asset: string, amount: BigNumberish, onBehalfOf: string, referralCode: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        getReserveData(asset: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getReserveNormalizedIncome(asset: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        withdraw(asset: string, amount: BigNumberish, to: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
    };
}
//# sourceMappingURL=IPool.d.ts.map