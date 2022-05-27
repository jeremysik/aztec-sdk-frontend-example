import { BaseContract, BigNumber, BytesLike, CallOverrides, PopulatedTransaction, Signer, utils } from "ethers";
import { FunctionFragment, Result } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";
export interface IUniswapV3PoolInterface extends utils.Interface {
    contractName: "IUniswapV3Pool";
    functions: {
        "slot0()": FunctionFragment;
    };
    encodeFunctionData(functionFragment: "slot0", values?: undefined): string;
    decodeFunctionResult(functionFragment: "slot0", data: BytesLike): Result;
    events: {};
}
export interface IUniswapV3Pool extends BaseContract {
    contractName: "IUniswapV3Pool";
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: IUniswapV3PoolInterface;
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
        slot0(overrides?: CallOverrides): Promise<[
            BigNumber,
            number,
            number,
            number,
            number,
            number,
            boolean
        ] & {
            sqrtPriceX96: BigNumber;
            tick: number;
            observationIndex: number;
            observationCardinality: number;
            observationCardinalityNext: number;
            feeProtocol: number;
            unlocked: boolean;
        }>;
    };
    slot0(overrides?: CallOverrides): Promise<[
        BigNumber,
        number,
        number,
        number,
        number,
        number,
        boolean
    ] & {
        sqrtPriceX96: BigNumber;
        tick: number;
        observationIndex: number;
        observationCardinality: number;
        observationCardinalityNext: number;
        feeProtocol: number;
        unlocked: boolean;
    }>;
    callStatic: {
        slot0(overrides?: CallOverrides): Promise<[
            BigNumber,
            number,
            number,
            number,
            number,
            number,
            boolean
        ] & {
            sqrtPriceX96: BigNumber;
            tick: number;
            observationIndex: number;
            observationCardinality: number;
            observationCardinalityNext: number;
            feeProtocol: number;
            unlocked: boolean;
        }>;
    };
    filters: {};
    estimateGas: {
        slot0(overrides?: CallOverrides): Promise<BigNumber>;
    };
    populateTransaction: {
        slot0(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    };
}
//# sourceMappingURL=IUniswapV3Pool.d.ts.map