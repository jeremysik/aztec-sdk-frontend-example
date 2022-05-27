import { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PopulatedTransaction, Signer, utils } from "ethers";
import { FunctionFragment, Result } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";
export declare namespace ISafeEngine {
    type SAFEStruct = {
        lockedCollateral: BigNumberish;
        generatedDebt: BigNumberish;
    };
    type SAFEStructOutput = [BigNumber, BigNumber] & {
        lockedCollateral: BigNumber;
        generatedDebt: BigNumber;
    };
}
export interface ISafeEngineInterface extends utils.Interface {
    contractName: "ISafeEngine";
    functions: {
        "approveSAFEModification(address)": FunctionFragment;
        "coinBalance(address)": FunctionFragment;
        "safes(bytes32,address)": FunctionFragment;
    };
    encodeFunctionData(functionFragment: "approveSAFEModification", values: [string]): string;
    encodeFunctionData(functionFragment: "coinBalance", values: [string]): string;
    encodeFunctionData(functionFragment: "safes", values: [BytesLike, string]): string;
    decodeFunctionResult(functionFragment: "approveSAFEModification", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "coinBalance", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "safes", data: BytesLike): Result;
    events: {};
}
export interface ISafeEngine extends BaseContract {
    contractName: "ISafeEngine";
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: ISafeEngineInterface;
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
        approveSAFEModification(account: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        coinBalance(account: string, overrides?: CallOverrides): Promise<[BigNumber]>;
        safes(collateralType: BytesLike, safe: string, overrides?: CallOverrides): Promise<[ISafeEngine.SAFEStructOutput]>;
    };
    approveSAFEModification(account: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    coinBalance(account: string, overrides?: CallOverrides): Promise<BigNumber>;
    safes(collateralType: BytesLike, safe: string, overrides?: CallOverrides): Promise<ISafeEngine.SAFEStructOutput>;
    callStatic: {
        approveSAFEModification(account: string, overrides?: CallOverrides): Promise<void>;
        coinBalance(account: string, overrides?: CallOverrides): Promise<BigNumber>;
        safes(collateralType: BytesLike, safe: string, overrides?: CallOverrides): Promise<ISafeEngine.SAFEStructOutput>;
    };
    filters: {};
    estimateGas: {
        approveSAFEModification(account: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        coinBalance(account: string, overrides?: CallOverrides): Promise<BigNumber>;
        safes(collateralType: BytesLike, safe: string, overrides?: CallOverrides): Promise<BigNumber>;
    };
    populateTransaction: {
        approveSAFEModification(account: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        coinBalance(account: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        safes(collateralType: BytesLike, safe: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;
    };
}
//# sourceMappingURL=ISafeEngine.d.ts.map