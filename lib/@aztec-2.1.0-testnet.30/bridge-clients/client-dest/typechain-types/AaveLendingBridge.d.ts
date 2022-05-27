import { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PayableOverrides, PopulatedTransaction, Signer, utils } from "ethers";
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
export interface AaveLendingBridgeInterface extends utils.Interface {
    contractName: "AaveLendingBridge";
    functions: {
        "claimLiquidityRewards(address)": FunctionFragment;
        "convert((uint256,address,uint8),(uint256,address,uint8),(uint256,address,uint8),(uint256,address,uint8),uint256,uint256,uint64,address)": FunctionFragment;
        "finalise((uint256,address,uint8),(uint256,address,uint8),(uint256,address,uint8),(uint256,address,uint8),uint256,uint64)": FunctionFragment;
        "rollupProcessor()": FunctionFragment;
        "setUnderlyingToZkAToken(address)": FunctionFragment;
        "underlyingToZkAToken(address)": FunctionFragment;
        "weth()": FunctionFragment;
    };
    encodeFunctionData(functionFragment: "claimLiquidityRewards", values: [string]): string;
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
    encodeFunctionData(functionFragment: "rollupProcessor", values?: undefined): string;
    encodeFunctionData(functionFragment: "setUnderlyingToZkAToken", values: [string]): string;
    encodeFunctionData(functionFragment: "underlyingToZkAToken", values: [string]): string;
    encodeFunctionData(functionFragment: "weth", values?: undefined): string;
    decodeFunctionResult(functionFragment: "claimLiquidityRewards", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "convert", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "finalise", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "rollupProcessor", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setUnderlyingToZkAToken", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "underlyingToZkAToken", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "weth", data: BytesLike): Result;
    events: {};
}
export interface AaveLendingBridge extends BaseContract {
    contractName: "AaveLendingBridge";
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: AaveLendingBridgeInterface;
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
        claimLiquidityRewards(a: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        convert(inputAssetA: AztecTypes.AztecAssetStruct, inputAssetB: AztecTypes.AztecAssetStruct, outputAssetA: AztecTypes.AztecAssetStruct, outputAssetB: AztecTypes.AztecAssetStruct, totalInputValue: BigNumberish, interactionNonce: BigNumberish, auxData: BigNumberish, rollupBeneficiary: string, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        finalise(inputAssetA: AztecTypes.AztecAssetStruct, inputAssetB: AztecTypes.AztecAssetStruct, outputAssetA: AztecTypes.AztecAssetStruct, outputAssetB: AztecTypes.AztecAssetStruct, interactionNonce: BigNumberish, auxData: BigNumberish, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        rollupProcessor(overrides?: CallOverrides): Promise<[string]>;
        setUnderlyingToZkAToken(underlyingAsset: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        underlyingToZkAToken(arg0: string, overrides?: CallOverrides): Promise<[string]>;
        weth(overrides?: CallOverrides): Promise<[string]>;
    };
    claimLiquidityRewards(a: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    convert(inputAssetA: AztecTypes.AztecAssetStruct, inputAssetB: AztecTypes.AztecAssetStruct, outputAssetA: AztecTypes.AztecAssetStruct, outputAssetB: AztecTypes.AztecAssetStruct, totalInputValue: BigNumberish, interactionNonce: BigNumberish, auxData: BigNumberish, rollupBeneficiary: string, overrides?: PayableOverrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    finalise(inputAssetA: AztecTypes.AztecAssetStruct, inputAssetB: AztecTypes.AztecAssetStruct, outputAssetA: AztecTypes.AztecAssetStruct, outputAssetB: AztecTypes.AztecAssetStruct, interactionNonce: BigNumberish, auxData: BigNumberish, overrides?: PayableOverrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    rollupProcessor(overrides?: CallOverrides): Promise<string>;
    setUnderlyingToZkAToken(underlyingAsset: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    underlyingToZkAToken(arg0: string, overrides?: CallOverrides): Promise<string>;
    weth(overrides?: CallOverrides): Promise<string>;
    callStatic: {
        claimLiquidityRewards(a: string, overrides?: CallOverrides): Promise<void>;
        convert(inputAssetA: AztecTypes.AztecAssetStruct, inputAssetB: AztecTypes.AztecAssetStruct, outputAssetA: AztecTypes.AztecAssetStruct, outputAssetB: AztecTypes.AztecAssetStruct, totalInputValue: BigNumberish, interactionNonce: BigNumberish, auxData: BigNumberish, rollupBeneficiary: string, overrides?: CallOverrides): Promise<[
            BigNumber,
            BigNumber,
            boolean
        ] & {
            outputValueA: BigNumber;
            outputValueB: BigNumber;
            isAsync: boolean;
        }>;
        finalise(inputAssetA: AztecTypes.AztecAssetStruct, inputAssetB: AztecTypes.AztecAssetStruct, outputAssetA: AztecTypes.AztecAssetStruct, outputAssetB: AztecTypes.AztecAssetStruct, interactionNonce: BigNumberish, auxData: BigNumberish, overrides?: CallOverrides): Promise<[BigNumber, BigNumber, boolean]>;
        rollupProcessor(overrides?: CallOverrides): Promise<string>;
        setUnderlyingToZkAToken(underlyingAsset: string, overrides?: CallOverrides): Promise<void>;
        underlyingToZkAToken(arg0: string, overrides?: CallOverrides): Promise<string>;
        weth(overrides?: CallOverrides): Promise<string>;
    };
    filters: {};
    estimateGas: {
        claimLiquidityRewards(a: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        convert(inputAssetA: AztecTypes.AztecAssetStruct, inputAssetB: AztecTypes.AztecAssetStruct, outputAssetA: AztecTypes.AztecAssetStruct, outputAssetB: AztecTypes.AztecAssetStruct, totalInputValue: BigNumberish, interactionNonce: BigNumberish, auxData: BigNumberish, rollupBeneficiary: string, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        finalise(inputAssetA: AztecTypes.AztecAssetStruct, inputAssetB: AztecTypes.AztecAssetStruct, outputAssetA: AztecTypes.AztecAssetStruct, outputAssetB: AztecTypes.AztecAssetStruct, interactionNonce: BigNumberish, auxData: BigNumberish, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        rollupProcessor(overrides?: CallOverrides): Promise<BigNumber>;
        setUnderlyingToZkAToken(underlyingAsset: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        underlyingToZkAToken(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;
        weth(overrides?: CallOverrides): Promise<BigNumber>;
    };
    populateTransaction: {
        claimLiquidityRewards(a: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        convert(inputAssetA: AztecTypes.AztecAssetStruct, inputAssetB: AztecTypes.AztecAssetStruct, outputAssetA: AztecTypes.AztecAssetStruct, outputAssetB: AztecTypes.AztecAssetStruct, totalInputValue: BigNumberish, interactionNonce: BigNumberish, auxData: BigNumberish, rollupBeneficiary: string, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        finalise(inputAssetA: AztecTypes.AztecAssetStruct, inputAssetB: AztecTypes.AztecAssetStruct, outputAssetA: AztecTypes.AztecAssetStruct, outputAssetB: AztecTypes.AztecAssetStruct, interactionNonce: BigNumberish, auxData: BigNumberish, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        rollupProcessor(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        setUnderlyingToZkAToken(underlyingAsset: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        underlyingToZkAToken(arg0: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        weth(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    };
}
//# sourceMappingURL=AaveLendingBridge.d.ts.map