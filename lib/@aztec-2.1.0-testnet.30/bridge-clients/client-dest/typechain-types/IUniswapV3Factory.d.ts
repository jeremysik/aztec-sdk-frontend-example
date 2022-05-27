import { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, PopulatedTransaction, Signer, utils } from "ethers";
import { FunctionFragment, Result } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";
export interface IUniswapV3FactoryInterface extends utils.Interface {
    contractName: "IUniswapV3Factory";
    functions: {
        "getPool(address,address,uint24)": FunctionFragment;
    };
    encodeFunctionData(functionFragment: "getPool", values: [string, string, BigNumberish]): string;
    decodeFunctionResult(functionFragment: "getPool", data: BytesLike): Result;
    events: {};
}
export interface IUniswapV3Factory extends BaseContract {
    contractName: "IUniswapV3Factory";
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: IUniswapV3FactoryInterface;
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
        getPool(tokenA: string, tokenB: string, fee: BigNumberish, overrides?: CallOverrides): Promise<[string] & {
            pool: string;
        }>;
    };
    getPool(tokenA: string, tokenB: string, fee: BigNumberish, overrides?: CallOverrides): Promise<string>;
    callStatic: {
        getPool(tokenA: string, tokenB: string, fee: BigNumberish, overrides?: CallOverrides): Promise<string>;
    };
    filters: {};
    estimateGas: {
        getPool(tokenA: string, tokenB: string, fee: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
    };
    populateTransaction: {
        getPool(tokenA: string, tokenB: string, fee: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
    };
}
//# sourceMappingURL=IUniswapV3Factory.d.ts.map