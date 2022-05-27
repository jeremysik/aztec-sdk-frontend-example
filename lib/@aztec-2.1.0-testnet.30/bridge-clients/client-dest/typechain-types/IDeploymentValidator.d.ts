import { BaseContract, BigNumber, BytesLike, CallOverrides, ContractTransaction, Overrides, PopulatedTransaction, Signer, utils } from "ethers";
import { FunctionFragment, Result } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";
export interface IDeploymentValidatorInterface extends utils.Interface {
    contractName: "IDeploymentValidator";
    functions: {
        "checkPairValidation(address,address)": FunctionFragment;
        "checkPoolValidation(address)": FunctionFragment;
        "checkWPValidation(address)": FunctionFragment;
        "validateAddresses(address,address)": FunctionFragment;
        "validatePoolAddress(address)": FunctionFragment;
        "validateWPAddress(address)": FunctionFragment;
    };
    encodeFunctionData(functionFragment: "checkPairValidation", values: [string, string]): string;
    encodeFunctionData(functionFragment: "checkPoolValidation", values: [string]): string;
    encodeFunctionData(functionFragment: "checkWPValidation", values: [string]): string;
    encodeFunctionData(functionFragment: "validateAddresses", values: [string, string]): string;
    encodeFunctionData(functionFragment: "validatePoolAddress", values: [string]): string;
    encodeFunctionData(functionFragment: "validateWPAddress", values: [string]): string;
    decodeFunctionResult(functionFragment: "checkPairValidation", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "checkPoolValidation", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "checkWPValidation", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "validateAddresses", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "validatePoolAddress", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "validateWPAddress", data: BytesLike): Result;
    events: {};
}
export interface IDeploymentValidator extends BaseContract {
    contractName: "IDeploymentValidator";
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: IDeploymentValidatorInterface;
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
        checkPairValidation(wrappedPosition: string, pool: string, overrides?: CallOverrides): Promise<[boolean]>;
        checkPoolValidation(pool: string, overrides?: CallOverrides): Promise<[boolean]>;
        checkWPValidation(wrappedPosition: string, overrides?: CallOverrides): Promise<[boolean]>;
        validateAddresses(wrappedPosition: string, pool: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        validatePoolAddress(pool: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        validateWPAddress(wrappedPosition: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
    };
    checkPairValidation(wrappedPosition: string, pool: string, overrides?: CallOverrides): Promise<boolean>;
    checkPoolValidation(pool: string, overrides?: CallOverrides): Promise<boolean>;
    checkWPValidation(wrappedPosition: string, overrides?: CallOverrides): Promise<boolean>;
    validateAddresses(wrappedPosition: string, pool: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    validatePoolAddress(pool: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    validateWPAddress(wrappedPosition: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    callStatic: {
        checkPairValidation(wrappedPosition: string, pool: string, overrides?: CallOverrides): Promise<boolean>;
        checkPoolValidation(pool: string, overrides?: CallOverrides): Promise<boolean>;
        checkWPValidation(wrappedPosition: string, overrides?: CallOverrides): Promise<boolean>;
        validateAddresses(wrappedPosition: string, pool: string, overrides?: CallOverrides): Promise<void>;
        validatePoolAddress(pool: string, overrides?: CallOverrides): Promise<void>;
        validateWPAddress(wrappedPosition: string, overrides?: CallOverrides): Promise<void>;
    };
    filters: {};
    estimateGas: {
        checkPairValidation(wrappedPosition: string, pool: string, overrides?: CallOverrides): Promise<BigNumber>;
        checkPoolValidation(pool: string, overrides?: CallOverrides): Promise<BigNumber>;
        checkWPValidation(wrappedPosition: string, overrides?: CallOverrides): Promise<BigNumber>;
        validateAddresses(wrappedPosition: string, pool: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        validatePoolAddress(pool: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        validateWPAddress(wrappedPosition: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
    };
    populateTransaction: {
        checkPairValidation(wrappedPosition: string, pool: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        checkPoolValidation(pool: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        checkWPValidation(wrappedPosition: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        validateAddresses(wrappedPosition: string, pool: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        validatePoolAddress(pool: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        validateWPAddress(wrappedPosition: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
    };
}
//# sourceMappingURL=IDeploymentValidator.d.ts.map