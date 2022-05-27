import { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, PayableOverrides, PopulatedTransaction, Signer, utils } from "ethers";
import { FunctionFragment, Result } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";
export declare namespace IVault {
    type BatchSwapStepStruct = {
        poolId: BytesLike;
        assetInIndex: BigNumberish;
        assetOutIndex: BigNumberish;
        amount: BigNumberish;
        userData: BytesLike;
    };
    type BatchSwapStepStructOutput = [
        string,
        BigNumber,
        BigNumber,
        BigNumber,
        string
    ] & {
        poolId: string;
        assetInIndex: BigNumber;
        assetOutIndex: BigNumber;
        amount: BigNumber;
        userData: string;
    };
    type FundManagementStruct = {
        sender: string;
        fromInternalBalance: boolean;
        recipient: string;
        toInternalBalance: boolean;
    };
    type FundManagementStructOutput = [
        string,
        boolean,
        string,
        boolean
    ] & {
        sender: string;
        fromInternalBalance: boolean;
        recipient: string;
        toInternalBalance: boolean;
    };
    type SingleSwapStruct = {
        poolId: BytesLike;
        kind: BigNumberish;
        assetIn: string;
        assetOut: string;
        amount: BigNumberish;
        userData: BytesLike;
    };
    type SingleSwapStructOutput = [
        string,
        number,
        string,
        string,
        BigNumber,
        string
    ] & {
        poolId: string;
        kind: number;
        assetIn: string;
        assetOut: string;
        amount: BigNumber;
        userData: string;
    };
}
export interface IVaultInterface extends utils.Interface {
    contractName: "IVault";
    functions: {
        "getPool(bytes32)": FunctionFragment;
        "getPoolTokens(bytes32)": FunctionFragment;
        "queryBatchSwap(uint8,(bytes32,uint256,uint256,uint256,bytes)[],address[],(address,bool,address,bool))": FunctionFragment;
        "swap((bytes32,uint8,address,address,uint256,bytes),(address,bool,address,bool),uint256,uint256)": FunctionFragment;
    };
    encodeFunctionData(functionFragment: "getPool", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "getPoolTokens", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "queryBatchSwap", values: [
        BigNumberish,
        IVault.BatchSwapStepStruct[],
        string[],
        IVault.FundManagementStruct
    ]): string;
    encodeFunctionData(functionFragment: "swap", values: [
        IVault.SingleSwapStruct,
        IVault.FundManagementStruct,
        BigNumberish,
        BigNumberish
    ]): string;
    decodeFunctionResult(functionFragment: "getPool", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getPoolTokens", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "queryBatchSwap", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "swap", data: BytesLike): Result;
    events: {};
}
export interface IVault extends BaseContract {
    contractName: "IVault";
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: IVaultInterface;
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
        getPool(poolId: BytesLike, overrides?: CallOverrides): Promise<[string, number]>;
        getPoolTokens(poolId: BytesLike, overrides?: CallOverrides): Promise<[
            string[],
            BigNumber[],
            BigNumber
        ] & {
            tokens: string[];
            balances: BigNumber[];
            lastChangeBlock: BigNumber;
        }>;
        queryBatchSwap(kind: BigNumberish, swaps: IVault.BatchSwapStepStruct[], assets: string[], funds: IVault.FundManagementStruct, overrides?: CallOverrides): Promise<[BigNumber[]] & {
            assetDeltas: BigNumber[];
        }>;
        swap(singleSwap: IVault.SingleSwapStruct, funds: IVault.FundManagementStruct, limit: BigNumberish, deadline: BigNumberish, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
    };
    getPool(poolId: BytesLike, overrides?: CallOverrides): Promise<[string, number]>;
    getPoolTokens(poolId: BytesLike, overrides?: CallOverrides): Promise<[
        string[],
        BigNumber[],
        BigNumber
    ] & {
        tokens: string[];
        balances: BigNumber[];
        lastChangeBlock: BigNumber;
    }>;
    queryBatchSwap(kind: BigNumberish, swaps: IVault.BatchSwapStepStruct[], assets: string[], funds: IVault.FundManagementStruct, overrides?: CallOverrides): Promise<BigNumber[]>;
    swap(singleSwap: IVault.SingleSwapStruct, funds: IVault.FundManagementStruct, limit: BigNumberish, deadline: BigNumberish, overrides?: PayableOverrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    callStatic: {
        getPool(poolId: BytesLike, overrides?: CallOverrides): Promise<[string, number]>;
        getPoolTokens(poolId: BytesLike, overrides?: CallOverrides): Promise<[
            string[],
            BigNumber[],
            BigNumber
        ] & {
            tokens: string[];
            balances: BigNumber[];
            lastChangeBlock: BigNumber;
        }>;
        queryBatchSwap(kind: BigNumberish, swaps: IVault.BatchSwapStepStruct[], assets: string[], funds: IVault.FundManagementStruct, overrides?: CallOverrides): Promise<BigNumber[]>;
        swap(singleSwap: IVault.SingleSwapStruct, funds: IVault.FundManagementStruct, limit: BigNumberish, deadline: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
    };
    filters: {};
    estimateGas: {
        getPool(poolId: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;
        getPoolTokens(poolId: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;
        queryBatchSwap(kind: BigNumberish, swaps: IVault.BatchSwapStepStruct[], assets: string[], funds: IVault.FundManagementStruct, overrides?: CallOverrides): Promise<BigNumber>;
        swap(singleSwap: IVault.SingleSwapStruct, funds: IVault.FundManagementStruct, limit: BigNumberish, deadline: BigNumberish, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
    };
    populateTransaction: {
        getPool(poolId: BytesLike, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getPoolTokens(poolId: BytesLike, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        queryBatchSwap(kind: BigNumberish, swaps: IVault.BatchSwapStepStruct[], assets: string[], funds: IVault.FundManagementStruct, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        swap(singleSwap: IVault.SingleSwapStruct, funds: IVault.FundManagementStruct, limit: BigNumberish, deadline: BigNumberish, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
    };
}
//# sourceMappingURL=IVault.d.ts.map