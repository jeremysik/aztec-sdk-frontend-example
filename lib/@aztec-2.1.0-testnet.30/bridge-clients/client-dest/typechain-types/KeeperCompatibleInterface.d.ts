import { BaseContract, BigNumber, BytesLike, CallOverrides, ContractTransaction, Overrides, PopulatedTransaction, Signer, utils } from "ethers";
import { FunctionFragment, Result } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";
export interface KeeperCompatibleInterfaceInterface extends utils.Interface {
    contractName: "KeeperCompatibleInterface";
    functions: {
        "checkUpkeep(bytes)": FunctionFragment;
        "performUpkeep(bytes)": FunctionFragment;
    };
    encodeFunctionData(functionFragment: "checkUpkeep", values: [BytesLike]): string;
    encodeFunctionData(functionFragment: "performUpkeep", values: [BytesLike]): string;
    decodeFunctionResult(functionFragment: "checkUpkeep", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "performUpkeep", data: BytesLike): Result;
    events: {};
}
export interface KeeperCompatibleInterface extends BaseContract {
    contractName: "KeeperCompatibleInterface";
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: KeeperCompatibleInterfaceInterface;
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
        checkUpkeep(data: BytesLike, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        performUpkeep(dynamicData: BytesLike, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
    };
    checkUpkeep(data: BytesLike, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    performUpkeep(dynamicData: BytesLike, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    callStatic: {
        checkUpkeep(data: BytesLike, overrides?: CallOverrides): Promise<[boolean, string] & {
            success: boolean;
            dynamicData: string;
        }>;
        performUpkeep(dynamicData: BytesLike, overrides?: CallOverrides): Promise<void>;
    };
    filters: {};
    estimateGas: {
        checkUpkeep(data: BytesLike, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        performUpkeep(dynamicData: BytesLike, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
    };
    populateTransaction: {
        checkUpkeep(data: BytesLike, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        performUpkeep(dynamicData: BytesLike, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
    };
}
//# sourceMappingURL=KeeperCompatibleInterface.d.ts.map