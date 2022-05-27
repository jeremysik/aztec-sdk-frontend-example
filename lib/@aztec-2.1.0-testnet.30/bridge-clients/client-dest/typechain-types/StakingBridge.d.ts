import { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PayableOverrides, PopulatedTransaction, Signer, utils } from "ethers";
import { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";
export declare namespace AztecTypes {
    type AztecAssetStruct = {
        id: BigNumberish;
        erc20Address: string;
        assetType: BigNumberish;
    };
    type AztecAssetStructOutput = [BigNumber, string, number] & {
        id: BigNumber;
        erc20Address: string;
        assetType: number;
    };
}
export interface StakingBridgeInterface extends utils.Interface {
    contractName: "StakingBridge";
    functions: {
        "LQTY()": FunctionFragment;
        "LUSD()": FunctionFragment;
        "STAKING_CONTRACT()": FunctionFragment;
        "UNI_ROUTER()": FunctionFragment;
        "USDC()": FunctionFragment;
        "WETH()": FunctionFragment;
        "allowance(address,address)": FunctionFragment;
        "approve(address,uint256)": FunctionFragment;
        "balanceOf(address)": FunctionFragment;
        "convert((uint256,address,uint8),(uint256,address,uint8),(uint256,address,uint8),(uint256,address,uint8),uint256,uint256,uint64,address)": FunctionFragment;
        "decimals()": FunctionFragment;
        "decreaseAllowance(address,uint256)": FunctionFragment;
        "finalise((uint256,address,uint8),(uint256,address,uint8),(uint256,address,uint8),(uint256,address,uint8),uint256,uint64)": FunctionFragment;
        "increaseAllowance(address,uint256)": FunctionFragment;
        "name()": FunctionFragment;
        "processor()": FunctionFragment;
        "setApprovals()": FunctionFragment;
        "symbol()": FunctionFragment;
        "totalSupply()": FunctionFragment;
        "transfer(address,uint256)": FunctionFragment;
        "transferFrom(address,address,uint256)": FunctionFragment;
    };
    encodeFunctionData(functionFragment: "LQTY", values?: undefined): string;
    encodeFunctionData(functionFragment: "LUSD", values?: undefined): string;
    encodeFunctionData(functionFragment: "STAKING_CONTRACT", values?: undefined): string;
    encodeFunctionData(functionFragment: "UNI_ROUTER", values?: undefined): string;
    encodeFunctionData(functionFragment: "USDC", values?: undefined): string;
    encodeFunctionData(functionFragment: "WETH", values?: undefined): string;
    encodeFunctionData(functionFragment: "allowance", values: [string, string]): string;
    encodeFunctionData(functionFragment: "approve", values: [string, BigNumberish]): string;
    encodeFunctionData(functionFragment: "balanceOf", values: [string]): string;
    encodeFunctionData(functionFragment: "convert", values: [
        AztecTypes.AztecAssetStruct,
        AztecTypes.AztecAssetStruct,
        AztecTypes.AztecAssetStruct,
        AztecTypes.AztecAssetStruct,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        string
    ]): string;
    encodeFunctionData(functionFragment: "decimals", values?: undefined): string;
    encodeFunctionData(functionFragment: "decreaseAllowance", values: [string, BigNumberish]): string;
    encodeFunctionData(functionFragment: "finalise", values: [
        AztecTypes.AztecAssetStruct,
        AztecTypes.AztecAssetStruct,
        AztecTypes.AztecAssetStruct,
        AztecTypes.AztecAssetStruct,
        BigNumberish,
        BigNumberish
    ]): string;
    encodeFunctionData(functionFragment: "increaseAllowance", values: [string, BigNumberish]): string;
    encodeFunctionData(functionFragment: "name", values?: undefined): string;
    encodeFunctionData(functionFragment: "processor", values?: undefined): string;
    encodeFunctionData(functionFragment: "setApprovals", values?: undefined): string;
    encodeFunctionData(functionFragment: "symbol", values?: undefined): string;
    encodeFunctionData(functionFragment: "totalSupply", values?: undefined): string;
    encodeFunctionData(functionFragment: "transfer", values: [string, BigNumberish]): string;
    encodeFunctionData(functionFragment: "transferFrom", values: [string, string, BigNumberish]): string;
    decodeFunctionResult(functionFragment: "LQTY", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "LUSD", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "STAKING_CONTRACT", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "UNI_ROUTER", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "USDC", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "WETH", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "allowance", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "approve", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "convert", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "decimals", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "decreaseAllowance", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "finalise", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "increaseAllowance", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "name", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "processor", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setApprovals", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "symbol", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "totalSupply", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transfer", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transferFrom", data: BytesLike): Result;
    events: {
        "Approval(address,address,uint256)": EventFragment;
        "Transfer(address,address,uint256)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "Approval"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "Transfer"): EventFragment;
}
export declare type ApprovalEvent = TypedEvent<[
    string,
    string,
    BigNumber
], {
    owner: string;
    spender: string;
    value: BigNumber;
}>;
export declare type ApprovalEventFilter = TypedEventFilter<ApprovalEvent>;
export declare type TransferEvent = TypedEvent<[
    string,
    string,
    BigNumber
], {
    from: string;
    to: string;
    value: BigNumber;
}>;
export declare type TransferEventFilter = TypedEventFilter<TransferEvent>;
export interface StakingBridge extends BaseContract {
    contractName: "StakingBridge";
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: StakingBridgeInterface;
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
        LQTY(overrides?: CallOverrides): Promise<[string]>;
        LUSD(overrides?: CallOverrides): Promise<[string]>;
        STAKING_CONTRACT(overrides?: CallOverrides): Promise<[string]>;
        UNI_ROUTER(overrides?: CallOverrides): Promise<[string]>;
        USDC(overrides?: CallOverrides): Promise<[string]>;
        WETH(overrides?: CallOverrides): Promise<[string]>;
        allowance(owner: string, spender: string, overrides?: CallOverrides): Promise<[BigNumber]>;
        approve(spender: string, amount: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        balanceOf(account: string, overrides?: CallOverrides): Promise<[BigNumber]>;
        convert(inputAssetA: AztecTypes.AztecAssetStruct, arg1: AztecTypes.AztecAssetStruct, outputAssetA: AztecTypes.AztecAssetStruct, arg3: AztecTypes.AztecAssetStruct, inputValue: BigNumberish, arg5: BigNumberish, arg6: BigNumberish, arg7: string, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        decimals(overrides?: CallOverrides): Promise<[number]>;
        decreaseAllowance(spender: string, subtractedValue: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        finalise(arg0: AztecTypes.AztecAssetStruct, arg1: AztecTypes.AztecAssetStruct, arg2: AztecTypes.AztecAssetStruct, arg3: AztecTypes.AztecAssetStruct, arg4: BigNumberish, arg5: BigNumberish, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        increaseAllowance(spender: string, addedValue: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        name(overrides?: CallOverrides): Promise<[string]>;
        processor(overrides?: CallOverrides): Promise<[string]>;
        setApprovals(overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        symbol(overrides?: CallOverrides): Promise<[string]>;
        totalSupply(overrides?: CallOverrides): Promise<[BigNumber]>;
        transfer(to: string, amount: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        transferFrom(from: string, to: string, amount: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
    };
    LQTY(overrides?: CallOverrides): Promise<string>;
    LUSD(overrides?: CallOverrides): Promise<string>;
    STAKING_CONTRACT(overrides?: CallOverrides): Promise<string>;
    UNI_ROUTER(overrides?: CallOverrides): Promise<string>;
    USDC(overrides?: CallOverrides): Promise<string>;
    WETH(overrides?: CallOverrides): Promise<string>;
    allowance(owner: string, spender: string, overrides?: CallOverrides): Promise<BigNumber>;
    approve(spender: string, amount: BigNumberish, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    balanceOf(account: string, overrides?: CallOverrides): Promise<BigNumber>;
    convert(inputAssetA: AztecTypes.AztecAssetStruct, arg1: AztecTypes.AztecAssetStruct, outputAssetA: AztecTypes.AztecAssetStruct, arg3: AztecTypes.AztecAssetStruct, inputValue: BigNumberish, arg5: BigNumberish, arg6: BigNumberish, arg7: string, overrides?: PayableOverrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    decimals(overrides?: CallOverrides): Promise<number>;
    decreaseAllowance(spender: string, subtractedValue: BigNumberish, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    finalise(arg0: AztecTypes.AztecAssetStruct, arg1: AztecTypes.AztecAssetStruct, arg2: AztecTypes.AztecAssetStruct, arg3: AztecTypes.AztecAssetStruct, arg4: BigNumberish, arg5: BigNumberish, overrides?: PayableOverrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    increaseAllowance(spender: string, addedValue: BigNumberish, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    name(overrides?: CallOverrides): Promise<string>;
    processor(overrides?: CallOverrides): Promise<string>;
    setApprovals(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    symbol(overrides?: CallOverrides): Promise<string>;
    totalSupply(overrides?: CallOverrides): Promise<BigNumber>;
    transfer(to: string, amount: BigNumberish, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    transferFrom(from: string, to: string, amount: BigNumberish, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    callStatic: {
        LQTY(overrides?: CallOverrides): Promise<string>;
        LUSD(overrides?: CallOverrides): Promise<string>;
        STAKING_CONTRACT(overrides?: CallOverrides): Promise<string>;
        UNI_ROUTER(overrides?: CallOverrides): Promise<string>;
        USDC(overrides?: CallOverrides): Promise<string>;
        WETH(overrides?: CallOverrides): Promise<string>;
        allowance(owner: string, spender: string, overrides?: CallOverrides): Promise<BigNumber>;
        approve(spender: string, amount: BigNumberish, overrides?: CallOverrides): Promise<boolean>;
        balanceOf(account: string, overrides?: CallOverrides): Promise<BigNumber>;
        convert(inputAssetA: AztecTypes.AztecAssetStruct, arg1: AztecTypes.AztecAssetStruct, outputAssetA: AztecTypes.AztecAssetStruct, arg3: AztecTypes.AztecAssetStruct, inputValue: BigNumberish, arg5: BigNumberish, arg6: BigNumberish, arg7: string, overrides?: CallOverrides): Promise<[
            BigNumber,
            BigNumber,
            boolean
        ] & {
            outputValueA: BigNumber;
            isAsync: boolean;
        }>;
        decimals(overrides?: CallOverrides): Promise<number>;
        decreaseAllowance(spender: string, subtractedValue: BigNumberish, overrides?: CallOverrides): Promise<boolean>;
        finalise(arg0: AztecTypes.AztecAssetStruct, arg1: AztecTypes.AztecAssetStruct, arg2: AztecTypes.AztecAssetStruct, arg3: AztecTypes.AztecAssetStruct, arg4: BigNumberish, arg5: BigNumberish, overrides?: CallOverrides): Promise<[BigNumber, BigNumber, boolean]>;
        increaseAllowance(spender: string, addedValue: BigNumberish, overrides?: CallOverrides): Promise<boolean>;
        name(overrides?: CallOverrides): Promise<string>;
        processor(overrides?: CallOverrides): Promise<string>;
        setApprovals(overrides?: CallOverrides): Promise<void>;
        symbol(overrides?: CallOverrides): Promise<string>;
        totalSupply(overrides?: CallOverrides): Promise<BigNumber>;
        transfer(to: string, amount: BigNumberish, overrides?: CallOverrides): Promise<boolean>;
        transferFrom(from: string, to: string, amount: BigNumberish, overrides?: CallOverrides): Promise<boolean>;
    };
    filters: {
        "Approval(address,address,uint256)"(owner?: string | null, spender?: string | null, value?: null): ApprovalEventFilter;
        Approval(owner?: string | null, spender?: string | null, value?: null): ApprovalEventFilter;
        "Transfer(address,address,uint256)"(from?: string | null, to?: string | null, value?: null): TransferEventFilter;
        Transfer(from?: string | null, to?: string | null, value?: null): TransferEventFilter;
    };
    estimateGas: {
        LQTY(overrides?: CallOverrides): Promise<BigNumber>;
        LUSD(overrides?: CallOverrides): Promise<BigNumber>;
        STAKING_CONTRACT(overrides?: CallOverrides): Promise<BigNumber>;
        UNI_ROUTER(overrides?: CallOverrides): Promise<BigNumber>;
        USDC(overrides?: CallOverrides): Promise<BigNumber>;
        WETH(overrides?: CallOverrides): Promise<BigNumber>;
        allowance(owner: string, spender: string, overrides?: CallOverrides): Promise<BigNumber>;
        approve(spender: string, amount: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        balanceOf(account: string, overrides?: CallOverrides): Promise<BigNumber>;
        convert(inputAssetA: AztecTypes.AztecAssetStruct, arg1: AztecTypes.AztecAssetStruct, outputAssetA: AztecTypes.AztecAssetStruct, arg3: AztecTypes.AztecAssetStruct, inputValue: BigNumberish, arg5: BigNumberish, arg6: BigNumberish, arg7: string, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        decimals(overrides?: CallOverrides): Promise<BigNumber>;
        decreaseAllowance(spender: string, subtractedValue: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        finalise(arg0: AztecTypes.AztecAssetStruct, arg1: AztecTypes.AztecAssetStruct, arg2: AztecTypes.AztecAssetStruct, arg3: AztecTypes.AztecAssetStruct, arg4: BigNumberish, arg5: BigNumberish, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        increaseAllowance(spender: string, addedValue: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        name(overrides?: CallOverrides): Promise<BigNumber>;
        processor(overrides?: CallOverrides): Promise<BigNumber>;
        setApprovals(overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        symbol(overrides?: CallOverrides): Promise<BigNumber>;
        totalSupply(overrides?: CallOverrides): Promise<BigNumber>;
        transfer(to: string, amount: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        transferFrom(from: string, to: string, amount: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
    };
    populateTransaction: {
        LQTY(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        LUSD(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        STAKING_CONTRACT(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        UNI_ROUTER(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        USDC(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        WETH(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        allowance(owner: string, spender: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        approve(spender: string, amount: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        balanceOf(account: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        convert(inputAssetA: AztecTypes.AztecAssetStruct, arg1: AztecTypes.AztecAssetStruct, outputAssetA: AztecTypes.AztecAssetStruct, arg3: AztecTypes.AztecAssetStruct, inputValue: BigNumberish, arg5: BigNumberish, arg6: BigNumberish, arg7: string, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        decimals(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        decreaseAllowance(spender: string, subtractedValue: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        finalise(arg0: AztecTypes.AztecAssetStruct, arg1: AztecTypes.AztecAssetStruct, arg2: AztecTypes.AztecAssetStruct, arg3: AztecTypes.AztecAssetStruct, arg4: BigNumberish, arg5: BigNumberish, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        increaseAllowance(spender: string, addedValue: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        name(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        processor(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        setApprovals(overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        symbol(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        totalSupply(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        transfer(to: string, amount: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        transferFrom(from: string, to: string, amount: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
    };
}
//# sourceMappingURL=StakingBridge.d.ts.map