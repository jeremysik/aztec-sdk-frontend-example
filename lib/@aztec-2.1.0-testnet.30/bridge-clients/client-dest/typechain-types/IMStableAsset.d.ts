import { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PopulatedTransaction, Signer, utils } from "ethers";
import { FunctionFragment, Result } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";
export interface IMStableAssetInterface extends utils.Interface {
    contractName: "IMStableAsset";
    functions: {
        "bAssetPersonal(uint256)": FunctionFragment;
        "balanceOf(address)": FunctionFragment;
        "getMintOutput(address,uint256)": FunctionFragment;
        "getRedeemOutput(address,uint256)": FunctionFragment;
        "mint(address,uint256,uint256,address)": FunctionFragment;
        "redeem(address,uint256,uint256,address)": FunctionFragment;
    };
    encodeFunctionData(functionFragment: "bAssetPersonal", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "balanceOf", values: [string]): string;
    encodeFunctionData(functionFragment: "getMintOutput", values: [string, BigNumberish]): string;
    encodeFunctionData(functionFragment: "getRedeemOutput", values: [string, BigNumberish]): string;
    encodeFunctionData(functionFragment: "mint", values: [string, BigNumberish, BigNumberish, string]): string;
    encodeFunctionData(functionFragment: "redeem", values: [string, BigNumberish, BigNumberish, string]): string;
    decodeFunctionResult(functionFragment: "bAssetPersonal", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getMintOutput", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getRedeemOutput", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "mint", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "redeem", data: BytesLike): Result;
    events: {};
}
export interface IMStableAsset extends BaseContract {
    contractName: "IMStableAsset";
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: IMStableAssetInterface;
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
        bAssetPersonal(input: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        balanceOf(account: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        getMintOutput(_input: string, _inputQuantity: BigNumberish, overrides?: CallOverrides): Promise<[BigNumber] & {
            mintOutput: BigNumber;
        }>;
        getRedeemOutput(_output: string, _mAssetQuantity: BigNumberish, overrides?: CallOverrides): Promise<[BigNumber] & {
            bAssetOutput: BigNumber;
        }>;
        mint(_input: string, _inputQuantity: BigNumberish, _minOutputQuantity: BigNumberish, _recipient: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        redeem(_output: string, _mAssetQuantity: BigNumberish, _minOutputQuantity: BigNumberish, _recipient: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
    };
    bAssetPersonal(input: BigNumberish, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    balanceOf(account: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    getMintOutput(_input: string, _inputQuantity: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
    getRedeemOutput(_output: string, _mAssetQuantity: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
    mint(_input: string, _inputQuantity: BigNumberish, _minOutputQuantity: BigNumberish, _recipient: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    redeem(_output: string, _mAssetQuantity: BigNumberish, _minOutputQuantity: BigNumberish, _recipient: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    callStatic: {
        bAssetPersonal(input: BigNumberish, overrides?: CallOverrides): Promise<[string, string, boolean, number]>;
        balanceOf(account: string, overrides?: CallOverrides): Promise<BigNumber>;
        getMintOutput(_input: string, _inputQuantity: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        getRedeemOutput(_output: string, _mAssetQuantity: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        mint(_input: string, _inputQuantity: BigNumberish, _minOutputQuantity: BigNumberish, _recipient: string, overrides?: CallOverrides): Promise<BigNumber>;
        redeem(_output: string, _mAssetQuantity: BigNumberish, _minOutputQuantity: BigNumberish, _recipient: string, overrides?: CallOverrides): Promise<BigNumber>;
    };
    filters: {};
    estimateGas: {
        bAssetPersonal(input: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        balanceOf(account: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        getMintOutput(_input: string, _inputQuantity: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        getRedeemOutput(_output: string, _mAssetQuantity: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        mint(_input: string, _inputQuantity: BigNumberish, _minOutputQuantity: BigNumberish, _recipient: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        redeem(_output: string, _mAssetQuantity: BigNumberish, _minOutputQuantity: BigNumberish, _recipient: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
    };
    populateTransaction: {
        bAssetPersonal(input: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        balanceOf(account: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        getMintOutput(_input: string, _inputQuantity: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getRedeemOutput(_output: string, _mAssetQuantity: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        mint(_input: string, _inputQuantity: BigNumberish, _minOutputQuantity: BigNumberish, _recipient: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        redeem(_output: string, _mAssetQuantity: BigNumberish, _minOutputQuantity: BigNumberish, _recipient: string, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
    };
}
//# sourceMappingURL=IMStableAsset.d.ts.map