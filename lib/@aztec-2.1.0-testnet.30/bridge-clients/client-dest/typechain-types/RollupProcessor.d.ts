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
export interface RollupProcessorInterface extends utils.Interface {
    contractName: "RollupProcessor";
    functions: {
        "convert(address,(uint256,address,uint8),(uint256,address,uint8),(uint256,address,uint8),(uint256,address,uint8),uint256,uint256,uint256)": FunctionFragment;
        "defiInteractions(uint256)": FunctionFragment;
        "getDefiInteractionBlockNumber(uint256)": FunctionFragment;
        "getDefiResult(uint256)": FunctionFragment;
        "processAsyncDefiInteraction(uint256)": FunctionFragment;
        "receiveEthFromBridge(uint256)": FunctionFragment;
        "setBridgeGasLimit(address,uint256)": FunctionFragment;
    };
    encodeFunctionData(functionFragment: "convert", values: [
        string,
        AztecTypes.AztecAssetStruct,
        AztecTypes.AztecAssetStruct,
        AztecTypes.AztecAssetStruct,
        AztecTypes.AztecAssetStruct,
        BigNumberish,
        BigNumberish,
        BigNumberish
    ]): string;
    encodeFunctionData(functionFragment: "defiInteractions", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "getDefiInteractionBlockNumber", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "getDefiResult", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "processAsyncDefiInteraction", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "receiveEthFromBridge", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "setBridgeGasLimit", values: [string, BigNumberish]): string;
    decodeFunctionResult(functionFragment: "convert", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "defiInteractions", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getDefiInteractionBlockNumber", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getDefiResult", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "processAsyncDefiInteraction", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "receiveEthFromBridge", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setBridgeGasLimit", data: BytesLike): Result;
    events: {
        "AsyncDefiBridgeProcessed(uint256,uint256,uint256)": EventFragment;
        "DefiBridgeProcessed(uint256,uint256,uint256,uint256,uint256,bool)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "AsyncDefiBridgeProcessed"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "DefiBridgeProcessed"): EventFragment;
}
export declare type AsyncDefiBridgeProcessedEvent = TypedEvent<[
    BigNumber,
    BigNumber,
    BigNumber
], {
    bridgeId: BigNumber;
    nonce: BigNumber;
    totalInputValue: BigNumber;
}>;
export declare type AsyncDefiBridgeProcessedEventFilter = TypedEventFilter<AsyncDefiBridgeProcessedEvent>;
export declare type DefiBridgeProcessedEvent = TypedEvent<[
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber,
    boolean
], {
    bridgeId: BigNumber;
    nonce: BigNumber;
    totalInputValue: BigNumber;
    totalOutputValueA: BigNumber;
    totalOutputValueB: BigNumber;
    result: boolean;
}>;
export declare type DefiBridgeProcessedEventFilter = TypedEventFilter<DefiBridgeProcessedEvent>;
export interface RollupProcessor extends BaseContract {
    contractName: "RollupProcessor";
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: RollupProcessorInterface;
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
        convert(bridgeAddress: string, inputAssetA: AztecTypes.AztecAssetStruct, inputAssetB: AztecTypes.AztecAssetStruct, outputAssetA: AztecTypes.AztecAssetStruct, outputAssetB: AztecTypes.AztecAssetStruct, totalInputValue: BigNumberish, interactionNonce: BigNumberish, auxInputData: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        defiInteractions(arg0: BigNumberish, overrides?: CallOverrides): Promise<[
            string,
            AztecTypes.AztecAssetStructOutput,
            AztecTypes.AztecAssetStructOutput,
            AztecTypes.AztecAssetStructOutput,
            AztecTypes.AztecAssetStructOutput,
            BigNumber,
            BigNumber,
            BigNumber,
            BigNumber,
            BigNumber,
            boolean
        ] & {
            bridgeAddress: string;
            inputAssetA: AztecTypes.AztecAssetStructOutput;
            inputAssetB: AztecTypes.AztecAssetStructOutput;
            outputAssetA: AztecTypes.AztecAssetStructOutput;
            outputAssetB: AztecTypes.AztecAssetStructOutput;
            totalInputValue: BigNumber;
            interactionNonce: BigNumber;
            auxInputData: BigNumber;
            outputValueA: BigNumber;
            outputValueB: BigNumber;
            finalised: boolean;
        }>;
        getDefiInteractionBlockNumber(interactionNonce: BigNumberish, overrides?: CallOverrides): Promise<[BigNumber] & {
            blockNumber: BigNumber;
        }>;
        getDefiResult(nonce: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        processAsyncDefiInteraction(interactionNonce: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        receiveEthFromBridge(interactionNonce: BigNumberish, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        setBridgeGasLimit(bridgeAddress: string, gasLimit: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
    };
    convert(bridgeAddress: string, inputAssetA: AztecTypes.AztecAssetStruct, inputAssetB: AztecTypes.AztecAssetStruct, outputAssetA: AztecTypes.AztecAssetStruct, outputAssetB: AztecTypes.AztecAssetStruct, totalInputValue: BigNumberish, interactionNonce: BigNumberish, auxInputData: BigNumberish, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    defiInteractions(arg0: BigNumberish, overrides?: CallOverrides): Promise<[
        string,
        AztecTypes.AztecAssetStructOutput,
        AztecTypes.AztecAssetStructOutput,
        AztecTypes.AztecAssetStructOutput,
        AztecTypes.AztecAssetStructOutput,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        boolean
    ] & {
        bridgeAddress: string;
        inputAssetA: AztecTypes.AztecAssetStructOutput;
        inputAssetB: AztecTypes.AztecAssetStructOutput;
        outputAssetA: AztecTypes.AztecAssetStructOutput;
        outputAssetB: AztecTypes.AztecAssetStructOutput;
        totalInputValue: BigNumber;
        interactionNonce: BigNumber;
        auxInputData: BigNumber;
        outputValueA: BigNumber;
        outputValueB: BigNumber;
        finalised: boolean;
    }>;
    getDefiInteractionBlockNumber(interactionNonce: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
    getDefiResult(nonce: BigNumberish, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    processAsyncDefiInteraction(interactionNonce: BigNumberish, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    receiveEthFromBridge(interactionNonce: BigNumberish, overrides?: PayableOverrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    setBridgeGasLimit(bridgeAddress: string, gasLimit: BigNumberish, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    callStatic: {
        convert(bridgeAddress: string, inputAssetA: AztecTypes.AztecAssetStruct, inputAssetB: AztecTypes.AztecAssetStruct, outputAssetA: AztecTypes.AztecAssetStruct, outputAssetB: AztecTypes.AztecAssetStruct, totalInputValue: BigNumberish, interactionNonce: BigNumberish, auxInputData: BigNumberish, overrides?: CallOverrides): Promise<[
            BigNumber,
            BigNumber,
            boolean
        ] & {
            outputValueA: BigNumber;
            outputValueB: BigNumber;
            isAsync: boolean;
        }>;
        defiInteractions(arg0: BigNumberish, overrides?: CallOverrides): Promise<[
            string,
            AztecTypes.AztecAssetStructOutput,
            AztecTypes.AztecAssetStructOutput,
            AztecTypes.AztecAssetStructOutput,
            AztecTypes.AztecAssetStructOutput,
            BigNumber,
            BigNumber,
            BigNumber,
            BigNumber,
            BigNumber,
            boolean
        ] & {
            bridgeAddress: string;
            inputAssetA: AztecTypes.AztecAssetStructOutput;
            inputAssetB: AztecTypes.AztecAssetStructOutput;
            outputAssetA: AztecTypes.AztecAssetStructOutput;
            outputAssetB: AztecTypes.AztecAssetStructOutput;
            totalInputValue: BigNumber;
            interactionNonce: BigNumber;
            auxInputData: BigNumber;
            outputValueA: BigNumber;
            outputValueB: BigNumber;
            finalised: boolean;
        }>;
        getDefiInteractionBlockNumber(interactionNonce: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        getDefiResult(nonce: BigNumberish, overrides?: CallOverrides): Promise<[
            boolean,
            BigNumber
        ] & {
            finalised: boolean;
            outputValueA: BigNumber;
        }>;
        processAsyncDefiInteraction(interactionNonce: BigNumberish, overrides?: CallOverrides): Promise<boolean>;
        receiveEthFromBridge(interactionNonce: BigNumberish, overrides?: CallOverrides): Promise<void>;
        setBridgeGasLimit(bridgeAddress: string, gasLimit: BigNumberish, overrides?: CallOverrides): Promise<void>;
    };
    filters: {
        "AsyncDefiBridgeProcessed(uint256,uint256,uint256)"(bridgeId?: BigNumberish | null, nonce?: BigNumberish | null, totalInputValue?: null): AsyncDefiBridgeProcessedEventFilter;
        AsyncDefiBridgeProcessed(bridgeId?: BigNumberish | null, nonce?: BigNumberish | null, totalInputValue?: null): AsyncDefiBridgeProcessedEventFilter;
        "DefiBridgeProcessed(uint256,uint256,uint256,uint256,uint256,bool)"(bridgeId?: BigNumberish | null, nonce?: BigNumberish | null, totalInputValue?: null, totalOutputValueA?: null, totalOutputValueB?: null, result?: null): DefiBridgeProcessedEventFilter;
        DefiBridgeProcessed(bridgeId?: BigNumberish | null, nonce?: BigNumberish | null, totalInputValue?: null, totalOutputValueA?: null, totalOutputValueB?: null, result?: null): DefiBridgeProcessedEventFilter;
    };
    estimateGas: {
        convert(bridgeAddress: string, inputAssetA: AztecTypes.AztecAssetStruct, inputAssetB: AztecTypes.AztecAssetStruct, outputAssetA: AztecTypes.AztecAssetStruct, outputAssetB: AztecTypes.AztecAssetStruct, totalInputValue: BigNumberish, interactionNonce: BigNumberish, auxInputData: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        defiInteractions(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        getDefiInteractionBlockNumber(interactionNonce: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        getDefiResult(nonce: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        processAsyncDefiInteraction(interactionNonce: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        receiveEthFromBridge(interactionNonce: BigNumberish, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        setBridgeGasLimit(bridgeAddress: string, gasLimit: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
    };
    populateTransaction: {
        convert(bridgeAddress: string, inputAssetA: AztecTypes.AztecAssetStruct, inputAssetB: AztecTypes.AztecAssetStruct, outputAssetA: AztecTypes.AztecAssetStruct, outputAssetB: AztecTypes.AztecAssetStruct, totalInputValue: BigNumberish, interactionNonce: BigNumberish, auxInputData: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        defiInteractions(arg0: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getDefiInteractionBlockNumber(interactionNonce: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getDefiResult(nonce: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        processAsyncDefiInteraction(interactionNonce: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        receiveEthFromBridge(interactionNonce: BigNumberish, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        setBridgeGasLimit(bridgeAddress: string, gasLimit: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
    };
}
//# sourceMappingURL=RollupProcessor.d.ts.map