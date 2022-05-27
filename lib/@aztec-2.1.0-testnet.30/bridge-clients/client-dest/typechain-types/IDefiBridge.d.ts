import { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, PopulatedTransaction, Signer, utils } from "ethers";
import { FunctionFragment, Result } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";
export interface IDefiBridgeInterface extends utils.Interface {
    contractName: "IDefiBridge";
    functions: {
        "getDeposit(uint256)": FunctionFragment;
    };
    encodeFunctionData(functionFragment: "getDeposit", values: [BigNumberish]): string;
    decodeFunctionResult(functionFragment: "getDeposit", data: BytesLike): Result;
    events: {};
}
export interface IDefiBridge extends BaseContract {
    contractName: "IDefiBridge";
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: IDefiBridgeInterface;
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
        getDeposit(interactionNonce: BigNumberish, overrides?: CallOverrides): Promise<[
            BigNumber,
            BigNumber,
            BigNumber,
            BigNumber,
            number,
            number,
            number,
            string,
            string
        ]>;
    };
    getDeposit(interactionNonce: BigNumberish, overrides?: CallOverrides): Promise<[
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        number,
        number,
        number,
        string,
        string
    ]>;
    callStatic: {
        getDeposit(interactionNonce: BigNumberish, overrides?: CallOverrides): Promise<[
            BigNumber,
            BigNumber,
            BigNumber,
            BigNumber,
            number,
            number,
            number,
            string,
            string
        ]>;
    };
    filters: {};
    estimateGas: {
        getDeposit(interactionNonce: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
    };
    populateTransaction: {
        getDeposit(interactionNonce: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
    };
}
//# sourceMappingURL=IDefiBridge.d.ts.map