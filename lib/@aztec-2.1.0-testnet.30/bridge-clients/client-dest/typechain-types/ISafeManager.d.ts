import { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PopulatedTransaction, Signer, utils } from "ethers";
import { FunctionFragment, Result } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";
export interface ISafeManagerInterface extends utils.Interface {
    contractName: "ISafeManager";
    functions: {
        "modifySAFECollateralization(uint256,int256,int256)": FunctionFragment;
        "openSAFE(bytes32,address)": FunctionFragment;
        "safes(uint256)": FunctionFragment;
        "transferCollateral(uint256,address,uint256)": FunctionFragment;
        "transferInternalCoins(uint256,address,uint256)": FunctionFragment;
    };
    encodeFunctionData(functionFragment: "modifySAFECollateralization", values: [BigNumberish, BigNumberish, BigNumberish]): string;
    encodeFunctionData(functionFragment: "openSAFE", values: [BytesLike, string]): string;
    encodeFunctionData(functionFragment: "safes", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "transferCollateral", values: [BigNumberish, string, BigNumberish]): string;
    encodeFunctionData(functionFragment: "transferInternalCoins", values: [BigNumberish, string, BigNumberish]): string;
    decodeFunctionResult(functionFragment: "modifySAFECollateralization", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "openSAFE", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "safes", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transferCollateral", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transferInternalCoins", data: BytesLike): Result;
    events: {};
}
export interface ISafeManager extends BaseContract {
    contractName: "ISafeManager";
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: ISafeManagerInterface;
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
        modifySAFECollateralization(safe: BigNumberish, deltaCollateral: BigNumberish, deltaDebt: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        openSAFE(collateralType: BytesLike, usr: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        safes(_safeId: BigNumberish, overrides?: CallOverrides): Promise<[string]>;
        transferCollateral(safe: BigNumberish, dst: string, wad: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        transferInternalCoins(safe: BigNumberish, dst: string, rad: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
    };
    modifySAFECollateralization(safe: BigNumberish, deltaCollateral: BigNumberish, deltaDebt: BigNumberish, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    openSAFE(collateralType: BytesLike, usr: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    safes(_safeId: BigNumberish, overrides?: CallOverrides): Promise<string>;
    transferCollateral(safe: BigNumberish, dst: string, wad: BigNumberish, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    transferInternalCoins(safe: BigNumberish, dst: string, rad: BigNumberish, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    callStatic: {
        modifySAFECollateralization(safe: BigNumberish, deltaCollateral: BigNumberish, deltaDebt: BigNumberish, overrides?: CallOverrides): Promise<void>;
        openSAFE(collateralType: BytesLike, usr: string, overrides?: CallOverrides): Promise<BigNumber>;
        safes(_safeId: BigNumberish, overrides?: CallOverrides): Promise<string>;
        transferCollateral(safe: BigNumberish, dst: string, wad: BigNumberish, overrides?: CallOverrides): Promise<void>;
        transferInternalCoins(safe: BigNumberish, dst: string, rad: BigNumberish, overrides?: CallOverrides): Promise<void>;
    };
    filters: {};
    estimateGas: {
        modifySAFECollateralization(safe: BigNumberish, deltaCollateral: BigNumberish, deltaDebt: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        openSAFE(collateralType: BytesLike, usr: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        safes(_safeId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        transferCollateral(safe: BigNumberish, dst: string, wad: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        transferInternalCoins(safe: BigNumberish, dst: string, rad: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
    };
    populateTransaction: {
        modifySAFECollateralization(safe: BigNumberish, deltaCollateral: BigNumberish, deltaDebt: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        openSAFE(collateralType: BytesLike, usr: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        safes(_safeId: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        transferCollateral(safe: BigNumberish, dst: string, wad: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        transferInternalCoins(safe: BigNumberish, dst: string, rad: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
    };
}
//# sourceMappingURL=ISafeManager.d.ts.map