import { BaseContract, BigNumber, BytesLike, CallOverrides, PopulatedTransaction, Signer, utils } from "ethers";
import { FunctionFragment, Result } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";
export interface ILendingPoolAddressesProviderInterface extends utils.Interface {
    contractName: "ILendingPoolAddressesProvider";
    functions: {
        "getLendingPool()": FunctionFragment;
    };
    encodeFunctionData(functionFragment: "getLendingPool", values?: undefined): string;
    decodeFunctionResult(functionFragment: "getLendingPool", data: BytesLike): Result;
    events: {};
}
export interface ILendingPoolAddressesProvider extends BaseContract {
    contractName: "ILendingPoolAddressesProvider";
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: ILendingPoolAddressesProviderInterface;
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
        getLendingPool(overrides?: CallOverrides): Promise<[string]>;
    };
    getLendingPool(overrides?: CallOverrides): Promise<string>;
    callStatic: {
        getLendingPool(overrides?: CallOverrides): Promise<string>;
    };
    filters: {};
    estimateGas: {
        getLendingPool(overrides?: CallOverrides): Promise<BigNumber>;
    };
    populateTransaction: {
        getLendingPool(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    };
}
//# sourceMappingURL=ILendingPoolAddressesProvider.d.ts.map