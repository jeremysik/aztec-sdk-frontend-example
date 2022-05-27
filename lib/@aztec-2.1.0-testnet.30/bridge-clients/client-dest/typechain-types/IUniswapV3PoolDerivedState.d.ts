import { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, PopulatedTransaction, Signer, utils } from "ethers";
import { FunctionFragment, Result } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";
export interface IUniswapV3PoolDerivedStateInterface extends utils.Interface {
    contractName: "IUniswapV3PoolDerivedState";
    functions: {
        "observe(uint32[])": FunctionFragment;
        "snapshotCumulativesInside(int24,int24)": FunctionFragment;
    };
    encodeFunctionData(functionFragment: "observe", values: [BigNumberish[]]): string;
    encodeFunctionData(functionFragment: "snapshotCumulativesInside", values: [BigNumberish, BigNumberish]): string;
    decodeFunctionResult(functionFragment: "observe", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "snapshotCumulativesInside", data: BytesLike): Result;
    events: {};
}
export interface IUniswapV3PoolDerivedState extends BaseContract {
    contractName: "IUniswapV3PoolDerivedState";
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: IUniswapV3PoolDerivedStateInterface;
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
        observe(secondsAgos: BigNumberish[], overrides?: CallOverrides): Promise<[
            BigNumber[],
            BigNumber[]
        ] & {
            tickCumulatives: BigNumber[];
            secondsPerLiquidityCumulativeX128s: BigNumber[];
        }>;
        snapshotCumulativesInside(tickLower: BigNumberish, tickUpper: BigNumberish, overrides?: CallOverrides): Promise<[
            BigNumber,
            BigNumber,
            number
        ] & {
            tickCumulativeInside: BigNumber;
            secondsPerLiquidityInsideX128: BigNumber;
            secondsInside: number;
        }>;
    };
    observe(secondsAgos: BigNumberish[], overrides?: CallOverrides): Promise<[
        BigNumber[],
        BigNumber[]
    ] & {
        tickCumulatives: BigNumber[];
        secondsPerLiquidityCumulativeX128s: BigNumber[];
    }>;
    snapshotCumulativesInside(tickLower: BigNumberish, tickUpper: BigNumberish, overrides?: CallOverrides): Promise<[
        BigNumber,
        BigNumber,
        number
    ] & {
        tickCumulativeInside: BigNumber;
        secondsPerLiquidityInsideX128: BigNumber;
        secondsInside: number;
    }>;
    callStatic: {
        observe(secondsAgos: BigNumberish[], overrides?: CallOverrides): Promise<[
            BigNumber[],
            BigNumber[]
        ] & {
            tickCumulatives: BigNumber[];
            secondsPerLiquidityCumulativeX128s: BigNumber[];
        }>;
        snapshotCumulativesInside(tickLower: BigNumberish, tickUpper: BigNumberish, overrides?: CallOverrides): Promise<[
            BigNumber,
            BigNumber,
            number
        ] & {
            tickCumulativeInside: BigNumber;
            secondsPerLiquidityInsideX128: BigNumber;
            secondsInside: number;
        }>;
    };
    filters: {};
    estimateGas: {
        observe(secondsAgos: BigNumberish[], overrides?: CallOverrides): Promise<BigNumber>;
        snapshotCumulativesInside(tickLower: BigNumberish, tickUpper: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
    };
    populateTransaction: {
        observe(secondsAgos: BigNumberish[], overrides?: CallOverrides): Promise<PopulatedTransaction>;
        snapshotCumulativesInside(tickLower: BigNumberish, tickUpper: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
    };
}
//# sourceMappingURL=IUniswapV3PoolDerivedState.d.ts.map