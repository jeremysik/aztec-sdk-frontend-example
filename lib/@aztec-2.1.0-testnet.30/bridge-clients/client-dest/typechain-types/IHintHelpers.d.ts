import { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, PopulatedTransaction, Signer, utils } from "ethers";
import { FunctionFragment, Result } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";
export interface IHintHelpersInterface extends utils.Interface {
    contractName: "IHintHelpers";
    functions: {
        "getApproxHint(uint256,uint256,uint256)": FunctionFragment;
    };
    encodeFunctionData(functionFragment: "getApproxHint", values: [BigNumberish, BigNumberish, BigNumberish]): string;
    decodeFunctionResult(functionFragment: "getApproxHint", data: BytesLike): Result;
    events: {};
}
export interface IHintHelpers extends BaseContract {
    contractName: "IHintHelpers";
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: IHintHelpersInterface;
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
        getApproxHint(_CR: BigNumberish, _numTrials: BigNumberish, _inputRandomSeed: BigNumberish, overrides?: CallOverrides): Promise<[
            string,
            BigNumber,
            BigNumber
        ] & {
            hintAddress: string;
            diff: BigNumber;
            latestRandomSeed: BigNumber;
        }>;
    };
    getApproxHint(_CR: BigNumberish, _numTrials: BigNumberish, _inputRandomSeed: BigNumberish, overrides?: CallOverrides): Promise<[
        string,
        BigNumber,
        BigNumber
    ] & {
        hintAddress: string;
        diff: BigNumber;
        latestRandomSeed: BigNumber;
    }>;
    callStatic: {
        getApproxHint(_CR: BigNumberish, _numTrials: BigNumberish, _inputRandomSeed: BigNumberish, overrides?: CallOverrides): Promise<[
            string,
            BigNumber,
            BigNumber
        ] & {
            hintAddress: string;
            diff: BigNumber;
            latestRandomSeed: BigNumber;
        }>;
    };
    filters: {};
    estimateGas: {
        getApproxHint(_CR: BigNumberish, _numTrials: BigNumberish, _inputRandomSeed: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
    };
    populateTransaction: {
        getApproxHint(_CR: BigNumberish, _numTrials: BigNumberish, _inputRandomSeed: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
    };
}
//# sourceMappingURL=IHintHelpers.d.ts.map