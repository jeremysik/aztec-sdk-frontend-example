import { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, PayableOverrides, PopulatedTransaction, Signer, utils } from "ethers";
import { FunctionFragment, Result } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";
export declare namespace ISwapRouter {
    type ExactInputParamsStruct = {
        path: BytesLike;
        recipient: string;
        deadline: BigNumberish;
        amountIn: BigNumberish;
        amountOutMinimum: BigNumberish;
    };
    type ExactInputParamsStructOutput = [
        string,
        string,
        BigNumber,
        BigNumber,
        BigNumber
    ] & {
        path: string;
        recipient: string;
        deadline: BigNumber;
        amountIn: BigNumber;
        amountOutMinimum: BigNumber;
    };
    type ExactInputSingleParamsStruct = {
        tokenIn: string;
        tokenOut: string;
        fee: BigNumberish;
        recipient: string;
        deadline: BigNumberish;
        amountIn: BigNumberish;
        amountOutMinimum: BigNumberish;
        sqrtPriceLimitX96: BigNumberish;
    };
    type ExactInputSingleParamsStructOutput = [
        string,
        string,
        number,
        string,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber
    ] & {
        tokenIn: string;
        tokenOut: string;
        fee: number;
        recipient: string;
        deadline: BigNumber;
        amountIn: BigNumber;
        amountOutMinimum: BigNumber;
        sqrtPriceLimitX96: BigNumber;
    };
    type ExactOutputParamsStruct = {
        path: BytesLike;
        recipient: string;
        deadline: BigNumberish;
        amountOut: BigNumberish;
        amountInMaximum: BigNumberish;
    };
    type ExactOutputParamsStructOutput = [
        string,
        string,
        BigNumber,
        BigNumber,
        BigNumber
    ] & {
        path: string;
        recipient: string;
        deadline: BigNumber;
        amountOut: BigNumber;
        amountInMaximum: BigNumber;
    };
    type ExactOutputSingleParamsStruct = {
        tokenIn: string;
        tokenOut: string;
        fee: BigNumberish;
        recipient: string;
        deadline: BigNumberish;
        amountOut: BigNumberish;
        amountInMaximum: BigNumberish;
        sqrtPriceLimitX96: BigNumberish;
    };
    type ExactOutputSingleParamsStructOutput = [
        string,
        string,
        number,
        string,
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber
    ] & {
        tokenIn: string;
        tokenOut: string;
        fee: number;
        recipient: string;
        deadline: BigNumber;
        amountOut: BigNumber;
        amountInMaximum: BigNumber;
        sqrtPriceLimitX96: BigNumber;
    };
}
export interface ISwapRouterInterface extends utils.Interface {
    contractName: "ISwapRouter";
    functions: {
        "exactInput((bytes,address,uint256,uint256,uint256))": FunctionFragment;
        "exactInputSingle((address,address,uint24,address,uint256,uint256,uint256,uint160))": FunctionFragment;
        "exactOutput((bytes,address,uint256,uint256,uint256))": FunctionFragment;
        "exactOutputSingle((address,address,uint24,address,uint256,uint256,uint256,uint160))": FunctionFragment;
    };
    encodeFunctionData(functionFragment: "exactInput", values: [ISwapRouter.ExactInputParamsStruct]): string;
    encodeFunctionData(functionFragment: "exactInputSingle", values: [ISwapRouter.ExactInputSingleParamsStruct]): string;
    encodeFunctionData(functionFragment: "exactOutput", values: [ISwapRouter.ExactOutputParamsStruct]): string;
    encodeFunctionData(functionFragment: "exactOutputSingle", values: [ISwapRouter.ExactOutputSingleParamsStruct]): string;
    decodeFunctionResult(functionFragment: "exactInput", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "exactInputSingle", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "exactOutput", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "exactOutputSingle", data: BytesLike): Result;
    events: {};
}
export interface ISwapRouter extends BaseContract {
    contractName: "ISwapRouter";
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: ISwapRouterInterface;
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
        exactInput(params: ISwapRouter.ExactInputParamsStruct, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        exactInputSingle(params: ISwapRouter.ExactInputSingleParamsStruct, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        exactOutput(params: ISwapRouter.ExactOutputParamsStruct, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        exactOutputSingle(params: ISwapRouter.ExactOutputSingleParamsStruct, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
    };
    exactInput(params: ISwapRouter.ExactInputParamsStruct, overrides?: PayableOverrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    exactInputSingle(params: ISwapRouter.ExactInputSingleParamsStruct, overrides?: PayableOverrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    exactOutput(params: ISwapRouter.ExactOutputParamsStruct, overrides?: PayableOverrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    exactOutputSingle(params: ISwapRouter.ExactOutputSingleParamsStruct, overrides?: PayableOverrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    callStatic: {
        exactInput(params: ISwapRouter.ExactInputParamsStruct, overrides?: CallOverrides): Promise<BigNumber>;
        exactInputSingle(params: ISwapRouter.ExactInputSingleParamsStruct, overrides?: CallOverrides): Promise<BigNumber>;
        exactOutput(params: ISwapRouter.ExactOutputParamsStruct, overrides?: CallOverrides): Promise<BigNumber>;
        exactOutputSingle(params: ISwapRouter.ExactOutputSingleParamsStruct, overrides?: CallOverrides): Promise<BigNumber>;
    };
    filters: {};
    estimateGas: {
        exactInput(params: ISwapRouter.ExactInputParamsStruct, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        exactInputSingle(params: ISwapRouter.ExactInputSingleParamsStruct, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        exactOutput(params: ISwapRouter.ExactOutputParamsStruct, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        exactOutputSingle(params: ISwapRouter.ExactOutputSingleParamsStruct, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
    };
    populateTransaction: {
        exactInput(params: ISwapRouter.ExactInputParamsStruct, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        exactInputSingle(params: ISwapRouter.ExactInputSingleParamsStruct, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        exactOutput(params: ISwapRouter.ExactOutputParamsStruct, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        exactOutputSingle(params: ISwapRouter.ExactOutputSingleParamsStruct, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
    };
}
//# sourceMappingURL=ISwapRouter.d.ts.map