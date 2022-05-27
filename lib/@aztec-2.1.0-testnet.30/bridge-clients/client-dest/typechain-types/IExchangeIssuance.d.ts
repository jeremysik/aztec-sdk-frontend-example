import { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PayableOverrides, PopulatedTransaction, Signer, utils } from "ethers";
import { FunctionFragment, Result } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";
export interface IExchangeIssuanceInterface extends utils.Interface {
    contractName: "IExchangeIssuance";
    functions: {
        "issueExactSetFromETH(address,uint256)": FunctionFragment;
        "issueExactSetFromToken(address,address,uint256,uint256)": FunctionFragment;
        "issueSetForExactETH(address,uint256)": FunctionFragment;
        "issueSetForExactToken(address,address,uint256,uint256)": FunctionFragment;
        "redeemExactSetForETH(address,uint256,uint256)": FunctionFragment;
        "redeemExactSetForToken(address,address,uint256,uint256)": FunctionFragment;
    };
    encodeFunctionData(functionFragment: "issueExactSetFromETH", values: [string, BigNumberish]): string;
    encodeFunctionData(functionFragment: "issueExactSetFromToken", values: [string, string, BigNumberish, BigNumberish]): string;
    encodeFunctionData(functionFragment: "issueSetForExactETH", values: [string, BigNumberish]): string;
    encodeFunctionData(functionFragment: "issueSetForExactToken", values: [string, string, BigNumberish, BigNumberish]): string;
    encodeFunctionData(functionFragment: "redeemExactSetForETH", values: [string, BigNumberish, BigNumberish]): string;
    encodeFunctionData(functionFragment: "redeemExactSetForToken", values: [string, string, BigNumberish, BigNumberish]): string;
    decodeFunctionResult(functionFragment: "issueExactSetFromETH", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "issueExactSetFromToken", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "issueSetForExactETH", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "issueSetForExactToken", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "redeemExactSetForETH", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "redeemExactSetForToken", data: BytesLike): Result;
    events: {};
}
export interface IExchangeIssuance extends BaseContract {
    contractName: "IExchangeIssuance";
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: IExchangeIssuanceInterface;
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
        issueExactSetFromETH(_setToken: string, _amountSetToken: BigNumberish, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        issueExactSetFromToken(_setToken: string, _inputToken: string, _amountSetToken: BigNumberish, _maxAmountInputToken: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        issueSetForExactETH(_setToken: string, _minSetReceive: BigNumberish, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        issueSetForExactToken(_setToken: string, _inputToken: string, _amountInput: BigNumberish, _minSetReceive: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        redeemExactSetForETH(_setToken: string, _amountSetToken: BigNumberish, _minEthOut: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        redeemExactSetForToken(_setToken: string, _outputToken: string, _amountSetToken: BigNumberish, _minOutputReceive: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
    };
    issueExactSetFromETH(_setToken: string, _amountSetToken: BigNumberish, overrides?: PayableOverrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    issueExactSetFromToken(_setToken: string, _inputToken: string, _amountSetToken: BigNumberish, _maxAmountInputToken: BigNumberish, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    issueSetForExactETH(_setToken: string, _minSetReceive: BigNumberish, overrides?: PayableOverrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    issueSetForExactToken(_setToken: string, _inputToken: string, _amountInput: BigNumberish, _minSetReceive: BigNumberish, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    redeemExactSetForETH(_setToken: string, _amountSetToken: BigNumberish, _minEthOut: BigNumberish, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    redeemExactSetForToken(_setToken: string, _outputToken: string, _amountSetToken: BigNumberish, _minOutputReceive: BigNumberish, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    callStatic: {
        issueExactSetFromETH(_setToken: string, _amountSetToken: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        issueExactSetFromToken(_setToken: string, _inputToken: string, _amountSetToken: BigNumberish, _maxAmountInputToken: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        issueSetForExactETH(_setToken: string, _minSetReceive: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        issueSetForExactToken(_setToken: string, _inputToken: string, _amountInput: BigNumberish, _minSetReceive: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        redeemExactSetForETH(_setToken: string, _amountSetToken: BigNumberish, _minEthOut: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        redeemExactSetForToken(_setToken: string, _outputToken: string, _amountSetToken: BigNumberish, _minOutputReceive: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
    };
    filters: {};
    estimateGas: {
        issueExactSetFromETH(_setToken: string, _amountSetToken: BigNumberish, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        issueExactSetFromToken(_setToken: string, _inputToken: string, _amountSetToken: BigNumberish, _maxAmountInputToken: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        issueSetForExactETH(_setToken: string, _minSetReceive: BigNumberish, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        issueSetForExactToken(_setToken: string, _inputToken: string, _amountInput: BigNumberish, _minSetReceive: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        redeemExactSetForETH(_setToken: string, _amountSetToken: BigNumberish, _minEthOut: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        redeemExactSetForToken(_setToken: string, _outputToken: string, _amountSetToken: BigNumberish, _minOutputReceive: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
    };
    populateTransaction: {
        issueExactSetFromETH(_setToken: string, _amountSetToken: BigNumberish, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        issueExactSetFromToken(_setToken: string, _inputToken: string, _amountSetToken: BigNumberish, _maxAmountInputToken: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        issueSetForExactETH(_setToken: string, _minSetReceive: BigNumberish, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        issueSetForExactToken(_setToken: string, _inputToken: string, _amountInput: BigNumberish, _minSetReceive: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        redeemExactSetForETH(_setToken: string, _amountSetToken: BigNumberish, _minEthOut: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        redeemExactSetForToken(_setToken: string, _outputToken: string, _amountSetToken: BigNumberish, _minOutputReceive: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
    };
}
//# sourceMappingURL=IExchangeIssuance.d.ts.map