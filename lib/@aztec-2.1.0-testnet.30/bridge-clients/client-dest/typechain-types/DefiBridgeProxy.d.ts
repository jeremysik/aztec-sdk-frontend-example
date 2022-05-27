import { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PopulatedTransaction, Signer, utils } from "ethers";
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
export interface DefiBridgeProxyInterface extends utils.Interface {
    contractName: "DefiBridgeProxy";
    functions: {
        "convert(address,(uint256,address,uint8),(uint256,address,uint8),(uint256,address,uint8),(uint256,address,uint8),uint256,uint256,uint256,uint256)": FunctionFragment;
    };
    encodeFunctionData(functionFragment: "convert", values: [
        string,
        AztecTypes.AztecAssetStruct,
        AztecTypes.AztecAssetStruct,
        AztecTypes.AztecAssetStruct,
        AztecTypes.AztecAssetStruct,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        BigNumberish
    ]): string;
    decodeFunctionResult(functionFragment: "convert", data: BytesLike): Result;
    events: {
        "AsyncDefiBridgeProcessed(uint256,uint256,uint256,uint256,uint256,bool)": EventFragment;
        "DefiBridgeProcessed(uint256,uint256,uint256,uint256,uint256,bool)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "AsyncDefiBridgeProcessed"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "DefiBridgeProcessed"): EventFragment;
}
export declare type AsyncDefiBridgeProcessedEvent = TypedEvent<[
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
export interface DefiBridgeProxy extends BaseContract {
    contractName: "DefiBridgeProxy";
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: DefiBridgeProxyInterface;
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
        convert(bridgeAddress: string, inputAssetA: AztecTypes.AztecAssetStruct, inputAssetB: AztecTypes.AztecAssetStruct, outputAssetA: AztecTypes.AztecAssetStruct, outputAssetB: AztecTypes.AztecAssetStruct, totalInputValue: BigNumberish, interactionNonce: BigNumberish, auxInputData: BigNumberish, ethPaymentsSlot: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
    };
    convert(bridgeAddress: string, inputAssetA: AztecTypes.AztecAssetStruct, inputAssetB: AztecTypes.AztecAssetStruct, outputAssetA: AztecTypes.AztecAssetStruct, outputAssetB: AztecTypes.AztecAssetStruct, totalInputValue: BigNumberish, interactionNonce: BigNumberish, auxInputData: BigNumberish, ethPaymentsSlot: BigNumberish, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    callStatic: {
        convert(bridgeAddress: string, inputAssetA: AztecTypes.AztecAssetStruct, inputAssetB: AztecTypes.AztecAssetStruct, outputAssetA: AztecTypes.AztecAssetStruct, outputAssetB: AztecTypes.AztecAssetStruct, totalInputValue: BigNumberish, interactionNonce: BigNumberish, auxInputData: BigNumberish, ethPaymentsSlot: BigNumberish, overrides?: CallOverrides): Promise<[
            BigNumber,
            BigNumber,
            boolean
        ] & {
            outputValueA: BigNumber;
            outputValueB: BigNumber;
            isAsync: boolean;
        }>;
    };
    filters: {
        "AsyncDefiBridgeProcessed(uint256,uint256,uint256,uint256,uint256,bool)"(bridgeId?: BigNumberish | null, nonce?: BigNumberish | null, totalInputValue?: null, totalOutputValueA?: null, totalOutputValueB?: null, result?: null): AsyncDefiBridgeProcessedEventFilter;
        AsyncDefiBridgeProcessed(bridgeId?: BigNumberish | null, nonce?: BigNumberish | null, totalInputValue?: null, totalOutputValueA?: null, totalOutputValueB?: null, result?: null): AsyncDefiBridgeProcessedEventFilter;
        "DefiBridgeProcessed(uint256,uint256,uint256,uint256,uint256,bool)"(bridgeId?: BigNumberish | null, nonce?: BigNumberish | null, totalInputValue?: null, totalOutputValueA?: null, totalOutputValueB?: null, result?: null): DefiBridgeProcessedEventFilter;
        DefiBridgeProcessed(bridgeId?: BigNumberish | null, nonce?: BigNumberish | null, totalInputValue?: null, totalOutputValueA?: null, totalOutputValueB?: null, result?: null): DefiBridgeProcessedEventFilter;
    };
    estimateGas: {
        convert(bridgeAddress: string, inputAssetA: AztecTypes.AztecAssetStruct, inputAssetB: AztecTypes.AztecAssetStruct, outputAssetA: AztecTypes.AztecAssetStruct, outputAssetB: AztecTypes.AztecAssetStruct, totalInputValue: BigNumberish, interactionNonce: BigNumberish, auxInputData: BigNumberish, ethPaymentsSlot: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
    };
    populateTransaction: {
        convert(bridgeAddress: string, inputAssetA: AztecTypes.AztecAssetStruct, inputAssetB: AztecTypes.AztecAssetStruct, outputAssetA: AztecTypes.AztecAssetStruct, outputAssetB: AztecTypes.AztecAssetStruct, totalInputValue: BigNumberish, interactionNonce: BigNumberish, auxInputData: BigNumberish, ethPaymentsSlot: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
    };
}
//# sourceMappingURL=DefiBridgeProxy.d.ts.map