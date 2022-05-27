import { BaseContract, BigNumber, BytesLike, CallOverrides, PopulatedTransaction, Signer, utils } from "ethers";
import { FunctionFragment, Result } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";
export interface ILidoOracleInterface extends utils.Interface {
    contractName: "ILidoOracle";
    functions: {
        "getLastCompletedReportDelta()": FunctionFragment;
    };
    encodeFunctionData(functionFragment: "getLastCompletedReportDelta", values?: undefined): string;
    decodeFunctionResult(functionFragment: "getLastCompletedReportDelta", data: BytesLike): Result;
    events: {};
}
export interface ILidoOracle extends BaseContract {
    contractName: "ILidoOracle";
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: ILidoOracleInterface;
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
        getLastCompletedReportDelta(overrides?: CallOverrides): Promise<[
            BigNumber,
            BigNumber,
            BigNumber
        ] & {
            postTotalPooledEther: BigNumber;
            preTotalPooledEther: BigNumber;
            timeElapsed: BigNumber;
        }>;
    };
    getLastCompletedReportDelta(overrides?: CallOverrides): Promise<[
        BigNumber,
        BigNumber,
        BigNumber
    ] & {
        postTotalPooledEther: BigNumber;
        preTotalPooledEther: BigNumber;
        timeElapsed: BigNumber;
    }>;
    callStatic: {
        getLastCompletedReportDelta(overrides?: CallOverrides): Promise<[
            BigNumber,
            BigNumber,
            BigNumber
        ] & {
            postTotalPooledEther: BigNumber;
            preTotalPooledEther: BigNumber;
            timeElapsed: BigNumber;
        }>;
    };
    filters: {};
    estimateGas: {
        getLastCompletedReportDelta(overrides?: CallOverrides): Promise<BigNumber>;
    };
    populateTransaction: {
        getLastCompletedReportDelta(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    };
}
//# sourceMappingURL=ILidoOracle.d.ts.map