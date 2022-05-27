import { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, PayableOverrides, PopulatedTransaction, Signer, utils } from "ethers";
import { FunctionFragment, Result } from "@ethersproject/abi";
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
export interface LidoBridgeInterface extends utils.Interface {
    contractName: "LidoBridge";
    functions: {
        "convert((uint256,address,uint8),(uint256,address,uint8),(uint256,address,uint8),(uint256,address,uint8),uint256,uint256,uint64,address)": FunctionFragment;
        "curvePool()": FunctionFragment;
        "finalise((uint256,address,uint8),(uint256,address,uint8),(uint256,address,uint8),(uint256,address,uint8),uint256,uint64)": FunctionFragment;
        "lido()": FunctionFragment;
        "referral()": FunctionFragment;
        "rollupProcessor()": FunctionFragment;
        "wrappedStETH()": FunctionFragment;
    };
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
    encodeFunctionData(functionFragment: "curvePool", values?: undefined): string;
    encodeFunctionData(functionFragment: "finalise", values: [
        AztecTypes.AztecAssetStruct,
        AztecTypes.AztecAssetStruct,
        AztecTypes.AztecAssetStruct,
        AztecTypes.AztecAssetStruct,
        BigNumberish,
        BigNumberish
    ]): string;
    encodeFunctionData(functionFragment: "lido", values?: undefined): string;
    encodeFunctionData(functionFragment: "referral", values?: undefined): string;
    encodeFunctionData(functionFragment: "rollupProcessor", values?: undefined): string;
    encodeFunctionData(functionFragment: "wrappedStETH", values?: undefined): string;
    decodeFunctionResult(functionFragment: "convert", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "curvePool", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "finalise", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "lido", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "referral", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "rollupProcessor", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "wrappedStETH", data: BytesLike): Result;
    events: {};
}
export interface LidoBridge extends BaseContract {
    contractName: "LidoBridge";
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: LidoBridgeInterface;
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
        convert(inputAssetA: AztecTypes.AztecAssetStruct, arg1: AztecTypes.AztecAssetStruct, outputAssetA: AztecTypes.AztecAssetStruct, arg3: AztecTypes.AztecAssetStruct, inputValue: BigNumberish, interactionNonce: BigNumberish, arg6: BigNumberish, arg7: string, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        curvePool(overrides?: CallOverrides): Promise<[string]>;
        finalise(arg0: AztecTypes.AztecAssetStruct, arg1: AztecTypes.AztecAssetStruct, arg2: AztecTypes.AztecAssetStruct, arg3: AztecTypes.AztecAssetStruct, arg4: BigNumberish, arg5: BigNumberish, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        lido(overrides?: CallOverrides): Promise<[string]>;
        referral(overrides?: CallOverrides): Promise<[string]>;
        rollupProcessor(overrides?: CallOverrides): Promise<[string]>;
        wrappedStETH(overrides?: CallOverrides): Promise<[string]>;
    };
    convert(inputAssetA: AztecTypes.AztecAssetStruct, arg1: AztecTypes.AztecAssetStruct, outputAssetA: AztecTypes.AztecAssetStruct, arg3: AztecTypes.AztecAssetStruct, inputValue: BigNumberish, interactionNonce: BigNumberish, arg6: BigNumberish, arg7: string, overrides?: PayableOverrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    curvePool(overrides?: CallOverrides): Promise<string>;
    finalise(arg0: AztecTypes.AztecAssetStruct, arg1: AztecTypes.AztecAssetStruct, arg2: AztecTypes.AztecAssetStruct, arg3: AztecTypes.AztecAssetStruct, arg4: BigNumberish, arg5: BigNumberish, overrides?: PayableOverrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    lido(overrides?: CallOverrides): Promise<string>;
    referral(overrides?: CallOverrides): Promise<string>;
    rollupProcessor(overrides?: CallOverrides): Promise<string>;
    wrappedStETH(overrides?: CallOverrides): Promise<string>;
    callStatic: {
        convert(inputAssetA: AztecTypes.AztecAssetStruct, arg1: AztecTypes.AztecAssetStruct, outputAssetA: AztecTypes.AztecAssetStruct, arg3: AztecTypes.AztecAssetStruct, inputValue: BigNumberish, interactionNonce: BigNumberish, arg6: BigNumberish, arg7: string, overrides?: CallOverrides): Promise<[
            BigNumber,
            BigNumber,
            boolean
        ] & {
            outputValueA: BigNumber;
            isAsync: boolean;
        }>;
        curvePool(overrides?: CallOverrides): Promise<string>;
        finalise(arg0: AztecTypes.AztecAssetStruct, arg1: AztecTypes.AztecAssetStruct, arg2: AztecTypes.AztecAssetStruct, arg3: AztecTypes.AztecAssetStruct, arg4: BigNumberish, arg5: BigNumberish, overrides?: CallOverrides): Promise<[BigNumber, BigNumber, boolean]>;
        lido(overrides?: CallOverrides): Promise<string>;
        referral(overrides?: CallOverrides): Promise<string>;
        rollupProcessor(overrides?: CallOverrides): Promise<string>;
        wrappedStETH(overrides?: CallOverrides): Promise<string>;
    };
    filters: {};
    estimateGas: {
        convert(inputAssetA: AztecTypes.AztecAssetStruct, arg1: AztecTypes.AztecAssetStruct, outputAssetA: AztecTypes.AztecAssetStruct, arg3: AztecTypes.AztecAssetStruct, inputValue: BigNumberish, interactionNonce: BigNumberish, arg6: BigNumberish, arg7: string, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        curvePool(overrides?: CallOverrides): Promise<BigNumber>;
        finalise(arg0: AztecTypes.AztecAssetStruct, arg1: AztecTypes.AztecAssetStruct, arg2: AztecTypes.AztecAssetStruct, arg3: AztecTypes.AztecAssetStruct, arg4: BigNumberish, arg5: BigNumberish, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        lido(overrides?: CallOverrides): Promise<BigNumber>;
        referral(overrides?: CallOverrides): Promise<BigNumber>;
        rollupProcessor(overrides?: CallOverrides): Promise<BigNumber>;
        wrappedStETH(overrides?: CallOverrides): Promise<BigNumber>;
    };
    populateTransaction: {
        convert(inputAssetA: AztecTypes.AztecAssetStruct, arg1: AztecTypes.AztecAssetStruct, outputAssetA: AztecTypes.AztecAssetStruct, arg3: AztecTypes.AztecAssetStruct, inputValue: BigNumberish, interactionNonce: BigNumberish, arg6: BigNumberish, arg7: string, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        curvePool(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        finalise(arg0: AztecTypes.AztecAssetStruct, arg1: AztecTypes.AztecAssetStruct, arg2: AztecTypes.AztecAssetStruct, arg3: AztecTypes.AztecAssetStruct, arg4: BigNumberish, arg5: BigNumberish, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        lido(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        referral(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        rollupProcessor(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        wrappedStETH(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    };
}
//# sourceMappingURL=LidoBridge.d.ts.map