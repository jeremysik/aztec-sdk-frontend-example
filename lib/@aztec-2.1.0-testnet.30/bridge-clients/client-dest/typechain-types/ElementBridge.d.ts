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
export interface ElementBridgeInterface extends utils.Interface {
    contractName: "ElementBridge";
    functions: {
        "assetToExpirys(address,uint256)": FunctionFragment;
        "convert((uint256,address,uint8),(uint256,address,uint8),(uint256,address,uint8),(uint256,address,uint8),uint256,uint256,uint64,address)": FunctionFragment;
        "finalise((uint256,address,uint8),(uint256,address,uint8),(uint256,address,uint8),(uint256,address,uint8),uint256,uint64)": FunctionFragment;
        "getAssetExpiries(address)": FunctionFragment;
        "getTrancheDeploymentBlockNumber(uint256)": FunctionFragment;
        "hashAssetAndExpiry(address,uint64)": FunctionFragment;
        "interactions(uint256)": FunctionFragment;
        "pools(uint256)": FunctionFragment;
        "registerConvergentPoolAddress(address,address,uint64)": FunctionFragment;
        "rollupProcessor()": FunctionFragment;
    };
    encodeFunctionData(functionFragment: "assetToExpirys", values: [string, BigNumberish]): string;
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
    encodeFunctionData(functionFragment: "finalise", values: [
        AztecTypes.AztecAssetStruct,
        AztecTypes.AztecAssetStruct,
        AztecTypes.AztecAssetStruct,
        AztecTypes.AztecAssetStruct,
        BigNumberish,
        BigNumberish
    ]): string;
    encodeFunctionData(functionFragment: "getAssetExpiries", values: [string]): string;
    encodeFunctionData(functionFragment: "getTrancheDeploymentBlockNumber", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "hashAssetAndExpiry", values: [string, BigNumberish]): string;
    encodeFunctionData(functionFragment: "interactions", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "pools", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "registerConvergentPoolAddress", values: [string, string, BigNumberish]): string;
    encodeFunctionData(functionFragment: "rollupProcessor", values?: undefined): string;
    decodeFunctionResult(functionFragment: "assetToExpirys", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "convert", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "finalise", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getAssetExpiries", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getTrancheDeploymentBlockNumber", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "hashAssetAndExpiry", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "interactions", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "pools", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "registerConvergentPoolAddress", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "rollupProcessor", data: BytesLike): Result;
    events: {
        "LogConvert(uint256,uint256,int64)": EventFragment;
        "LogFinalise(uint256,bool,string,int64)": EventFragment;
        "LogPoolAdded(address,address,uint64)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "LogConvert"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "LogFinalise"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "LogPoolAdded"): EventFragment;
}
export declare type LogConvertEvent = TypedEvent<[
    BigNumber,
    BigNumber,
    BigNumber
], {
    nonce: BigNumber;
    totalInputValue: BigNumber;
    gasUsed: BigNumber;
}>;
export declare type LogConvertEventFilter = TypedEventFilter<LogConvertEvent>;
export declare type LogFinaliseEvent = TypedEvent<[
    BigNumber,
    boolean,
    string,
    BigNumber
], {
    nonce: BigNumber;
    success: boolean;
    message: string;
    gasUsed: BigNumber;
}>;
export declare type LogFinaliseEventFilter = TypedEventFilter<LogFinaliseEvent>;
export declare type LogPoolAddedEvent = TypedEvent<[
    string,
    string,
    BigNumber
], {
    poolAddress: string;
    wrappedPositionAddress: string;
    expiry: BigNumber;
}>;
export declare type LogPoolAddedEventFilter = TypedEventFilter<LogPoolAddedEvent>;
export interface ElementBridge extends BaseContract {
    contractName: "ElementBridge";
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: ElementBridgeInterface;
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
        assetToExpirys(arg0: string, arg1: BigNumberish, overrides?: CallOverrides): Promise<[BigNumber]>;
        convert(inputAssetA: AztecTypes.AztecAssetStruct, inputAssetB: AztecTypes.AztecAssetStruct, outputAssetA: AztecTypes.AztecAssetStruct, outputAssetB: AztecTypes.AztecAssetStruct, totalInputValue: BigNumberish, interactionNonce: BigNumberish, auxData: BigNumberish, arg7: string, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        finalise(arg0: AztecTypes.AztecAssetStruct, arg1: AztecTypes.AztecAssetStruct, outputAssetA: AztecTypes.AztecAssetStruct, arg3: AztecTypes.AztecAssetStruct, interactionNonce: BigNumberish, arg5: BigNumberish, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        getAssetExpiries(asset: string, overrides?: CallOverrides): Promise<[BigNumber[]] & {
            assetExpiries: BigNumber[];
        }>;
        getTrancheDeploymentBlockNumber(interactionNonce: BigNumberish, overrides?: CallOverrides): Promise<[BigNumber] & {
            blockNumber: BigNumber;
        }>;
        hashAssetAndExpiry(asset: string, expiry: BigNumberish, overrides?: CallOverrides): Promise<[BigNumber] & {
            hashValue: BigNumber;
        }>;
        interactions(arg0: BigNumberish, overrides?: CallOverrides): Promise<[
            BigNumber,
            string,
            BigNumber,
            boolean,
            boolean
        ] & {
            quantityPT: BigNumber;
            trancheAddress: string;
            expiry: BigNumber;
            finalised: boolean;
            failed: boolean;
        }>;
        pools(arg0: BigNumberish, overrides?: CallOverrides): Promise<[
            string,
            string,
            string,
            string
        ] & {
            poolId: string;
            trancheAddress: string;
            poolAddress: string;
            wrappedPositionAddress: string;
        }>;
        registerConvergentPoolAddress(_convergentPool: string, _wrappedPosition: string, _expiry: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        rollupProcessor(overrides?: CallOverrides): Promise<[string]>;
    };
    assetToExpirys(arg0: string, arg1: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
    convert(inputAssetA: AztecTypes.AztecAssetStruct, inputAssetB: AztecTypes.AztecAssetStruct, outputAssetA: AztecTypes.AztecAssetStruct, outputAssetB: AztecTypes.AztecAssetStruct, totalInputValue: BigNumberish, interactionNonce: BigNumberish, auxData: BigNumberish, arg7: string, overrides?: PayableOverrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    finalise(arg0: AztecTypes.AztecAssetStruct, arg1: AztecTypes.AztecAssetStruct, outputAssetA: AztecTypes.AztecAssetStruct, arg3: AztecTypes.AztecAssetStruct, interactionNonce: BigNumberish, arg5: BigNumberish, overrides?: PayableOverrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    getAssetExpiries(asset: string, overrides?: CallOverrides): Promise<BigNumber[]>;
    getTrancheDeploymentBlockNumber(interactionNonce: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
    hashAssetAndExpiry(asset: string, expiry: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
    interactions(arg0: BigNumberish, overrides?: CallOverrides): Promise<[
        BigNumber,
        string,
        BigNumber,
        boolean,
        boolean
    ] & {
        quantityPT: BigNumber;
        trancheAddress: string;
        expiry: BigNumber;
        finalised: boolean;
        failed: boolean;
    }>;
    pools(arg0: BigNumberish, overrides?: CallOverrides): Promise<[
        string,
        string,
        string,
        string
    ] & {
        poolId: string;
        trancheAddress: string;
        poolAddress: string;
        wrappedPositionAddress: string;
    }>;
    registerConvergentPoolAddress(_convergentPool: string, _wrappedPosition: string, _expiry: BigNumberish, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    rollupProcessor(overrides?: CallOverrides): Promise<string>;
    callStatic: {
        assetToExpirys(arg0: string, arg1: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        convert(inputAssetA: AztecTypes.AztecAssetStruct, inputAssetB: AztecTypes.AztecAssetStruct, outputAssetA: AztecTypes.AztecAssetStruct, outputAssetB: AztecTypes.AztecAssetStruct, totalInputValue: BigNumberish, interactionNonce: BigNumberish, auxData: BigNumberish, arg7: string, overrides?: CallOverrides): Promise<[
            BigNumber,
            BigNumber,
            boolean
        ] & {
            outputValueA: BigNumber;
            outputValueB: BigNumber;
            isAsync: boolean;
        }>;
        finalise(arg0: AztecTypes.AztecAssetStruct, arg1: AztecTypes.AztecAssetStruct, outputAssetA: AztecTypes.AztecAssetStruct, arg3: AztecTypes.AztecAssetStruct, interactionNonce: BigNumberish, arg5: BigNumberish, overrides?: CallOverrides): Promise<[
            BigNumber,
            BigNumber,
            boolean
        ] & {
            outputValueA: BigNumber;
            outputValueB: BigNumber;
            interactionCompleted: boolean;
        }>;
        getAssetExpiries(asset: string, overrides?: CallOverrides): Promise<BigNumber[]>;
        getTrancheDeploymentBlockNumber(interactionNonce: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        hashAssetAndExpiry(asset: string, expiry: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        interactions(arg0: BigNumberish, overrides?: CallOverrides): Promise<[
            BigNumber,
            string,
            BigNumber,
            boolean,
            boolean
        ] & {
            quantityPT: BigNumber;
            trancheAddress: string;
            expiry: BigNumber;
            finalised: boolean;
            failed: boolean;
        }>;
        pools(arg0: BigNumberish, overrides?: CallOverrides): Promise<[
            string,
            string,
            string,
            string
        ] & {
            poolId: string;
            trancheAddress: string;
            poolAddress: string;
            wrappedPositionAddress: string;
        }>;
        registerConvergentPoolAddress(_convergentPool: string, _wrappedPosition: string, _expiry: BigNumberish, overrides?: CallOverrides): Promise<void>;
        rollupProcessor(overrides?: CallOverrides): Promise<string>;
    };
    filters: {
        "LogConvert(uint256,uint256,int64)"(nonce?: BigNumberish | null, totalInputValue?: null, gasUsed?: null): LogConvertEventFilter;
        LogConvert(nonce?: BigNumberish | null, totalInputValue?: null, gasUsed?: null): LogConvertEventFilter;
        "LogFinalise(uint256,bool,string,int64)"(nonce?: BigNumberish | null, success?: null, message?: null, gasUsed?: null): LogFinaliseEventFilter;
        LogFinalise(nonce?: BigNumberish | null, success?: null, message?: null, gasUsed?: null): LogFinaliseEventFilter;
        "LogPoolAdded(address,address,uint64)"(poolAddress?: null, wrappedPositionAddress?: null, expiry?: null): LogPoolAddedEventFilter;
        LogPoolAdded(poolAddress?: null, wrappedPositionAddress?: null, expiry?: null): LogPoolAddedEventFilter;
    };
    estimateGas: {
        assetToExpirys(arg0: string, arg1: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        convert(inputAssetA: AztecTypes.AztecAssetStruct, inputAssetB: AztecTypes.AztecAssetStruct, outputAssetA: AztecTypes.AztecAssetStruct, outputAssetB: AztecTypes.AztecAssetStruct, totalInputValue: BigNumberish, interactionNonce: BigNumberish, auxData: BigNumberish, arg7: string, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        finalise(arg0: AztecTypes.AztecAssetStruct, arg1: AztecTypes.AztecAssetStruct, outputAssetA: AztecTypes.AztecAssetStruct, arg3: AztecTypes.AztecAssetStruct, interactionNonce: BigNumberish, arg5: BigNumberish, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        getAssetExpiries(asset: string, overrides?: CallOverrides): Promise<BigNumber>;
        getTrancheDeploymentBlockNumber(interactionNonce: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        hashAssetAndExpiry(asset: string, expiry: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        interactions(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        pools(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        registerConvergentPoolAddress(_convergentPool: string, _wrappedPosition: string, _expiry: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        rollupProcessor(overrides?: CallOverrides): Promise<BigNumber>;
    };
    populateTransaction: {
        assetToExpirys(arg0: string, arg1: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        convert(inputAssetA: AztecTypes.AztecAssetStruct, inputAssetB: AztecTypes.AztecAssetStruct, outputAssetA: AztecTypes.AztecAssetStruct, outputAssetB: AztecTypes.AztecAssetStruct, totalInputValue: BigNumberish, interactionNonce: BigNumberish, auxData: BigNumberish, arg7: string, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        finalise(arg0: AztecTypes.AztecAssetStruct, arg1: AztecTypes.AztecAssetStruct, outputAssetA: AztecTypes.AztecAssetStruct, arg3: AztecTypes.AztecAssetStruct, interactionNonce: BigNumberish, arg5: BigNumberish, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        getAssetExpiries(asset: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getTrancheDeploymentBlockNumber(interactionNonce: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        hashAssetAndExpiry(asset: string, expiry: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        interactions(arg0: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        pools(arg0: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        registerConvergentPoolAddress(_convergentPool: string, _wrappedPosition: string, _expiry: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        rollupProcessor(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    };
}
//# sourceMappingURL=ElementBridge.d.ts.map