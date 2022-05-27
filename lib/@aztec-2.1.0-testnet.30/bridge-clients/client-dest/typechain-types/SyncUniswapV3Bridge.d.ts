import { BaseContract, BigNumber, BigNumberish, BytesLike, CallOverrides, ContractTransaction, Overrides, PayableOverrides, PopulatedTransaction, Signer, utils } from "ethers";
import { FunctionFragment, Result } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";
export declare namespace AztecTypes {
    type AztecAssetStruct = {
        id: BigNumberish;
        erc20Address: string;
        assetType: BigNumberish;
    };
    type AztecAssetStructOutput = [BigNumber, string, number] & {
        id: BigNumber;
        erc20Address: string;
        assetType: number;
    };
}
export interface SyncUniswapV3BridgeInterface extends utils.Interface {
    contractName: "SyncUniswapV3Bridge";
    functions: {
        "SyncMintFundingMap(uint256)": FunctionFragment;
        "WETH()": FunctionFragment;
        "WETH9()": FunctionFragment;
        "call(address,uint256,bytes)": FunctionFragment;
        "canFinalise(uint256)": FunctionFragment;
        "convert((uint256,address,uint8),(uint256,address,uint8),(uint256,address,uint8),(uint256,address,uint8),uint256,uint256,uint64,address)": FunctionFragment;
        "delegatecall(address,bytes)": FunctionFragment;
        "deposits(uint256)": FunctionFragment;
        "factory()": FunctionFragment;
        "finalise((uint256,address,uint8),(uint256,address,uint8),(uint256,address,uint8),(uint256,address,uint8),uint256,uint64)": FunctionFragment;
        "getDeposit(uint256)": FunctionFragment;
        "getLiquidity(address,address,uint64)": FunctionFragment;
        "getPresentValue(uint256)": FunctionFragment;
        "nonfungiblePositionManager()": FunctionFragment;
        "onERC721Received(address,address,uint256,bytes)": FunctionFragment;
        "owner()": FunctionFragment;
        "packData(int24,int24,uint24)": FunctionFragment;
        "quoter()": FunctionFragment;
        "rollupProcessor()": FunctionFragment;
        "staticcall(address,bytes)": FunctionFragment;
        "swapRouter()": FunctionFragment;
        "uniswapFactory()": FunctionFragment;
        "uniswapV3MintCallback(uint256,uint256,bytes)": FunctionFragment;
        "unpack_1_to_24(uint64)": FunctionFragment;
        "unpack_24_to_48(uint64)": FunctionFragment;
        "unpack_48_to_64(uint64)": FunctionFragment;
    };
    encodeFunctionData(functionFragment: "SyncMintFundingMap", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "WETH", values?: undefined): string;
    encodeFunctionData(functionFragment: "WETH9", values?: undefined): string;
    encodeFunctionData(functionFragment: "call", values: [string, BigNumberish, BytesLike]): string;
    encodeFunctionData(functionFragment: "canFinalise", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "convert", values: [
        AztecTypes.AztecAssetStruct,
        AztecTypes.AztecAssetStruct,
        AztecTypes.AztecAssetStruct,
        AztecTypes.AztecAssetStruct,
        BigNumberish,
        BigNumberish,
        BigNumberish,
        string
    ]): string;
    encodeFunctionData(functionFragment: "delegatecall", values: [string, BytesLike]): string;
    encodeFunctionData(functionFragment: "deposits", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "factory", values?: undefined): string;
    encodeFunctionData(functionFragment: "finalise", values: [
        AztecTypes.AztecAssetStruct,
        AztecTypes.AztecAssetStruct,
        AztecTypes.AztecAssetStruct,
        AztecTypes.AztecAssetStruct,
        BigNumberish,
        BigNumberish
    ]): string;
    encodeFunctionData(functionFragment: "getDeposit", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "getLiquidity", values: [string, string, BigNumberish]): string;
    encodeFunctionData(functionFragment: "getPresentValue", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "nonfungiblePositionManager", values?: undefined): string;
    encodeFunctionData(functionFragment: "onERC721Received", values: [string, string, BigNumberish, BytesLike]): string;
    encodeFunctionData(functionFragment: "owner", values?: undefined): string;
    encodeFunctionData(functionFragment: "packData", values: [BigNumberish, BigNumberish, BigNumberish]): string;
    encodeFunctionData(functionFragment: "quoter", values?: undefined): string;
    encodeFunctionData(functionFragment: "rollupProcessor", values?: undefined): string;
    encodeFunctionData(functionFragment: "staticcall", values: [string, BytesLike]): string;
    encodeFunctionData(functionFragment: "swapRouter", values?: undefined): string;
    encodeFunctionData(functionFragment: "uniswapFactory", values?: undefined): string;
    encodeFunctionData(functionFragment: "uniswapV3MintCallback", values: [BigNumberish, BigNumberish, BytesLike]): string;
    encodeFunctionData(functionFragment: "unpack_1_to_24", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "unpack_24_to_48", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "unpack_48_to_64", values: [BigNumberish]): string;
    decodeFunctionResult(functionFragment: "SyncMintFundingMap", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "WETH", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "WETH9", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "call", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "canFinalise", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "convert", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "delegatecall", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "deposits", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "factory", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "finalise", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getDeposit", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getLiquidity", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getPresentValue", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "nonfungiblePositionManager", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "onERC721Received", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "packData", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "quoter", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "rollupProcessor", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "staticcall", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "swapRouter", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "uniswapFactory", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "uniswapV3MintCallback", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "unpack_1_to_24", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "unpack_24_to_48", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "unpack_48_to_64", data: BytesLike): Result;
    events: {};
}
export interface SyncUniswapV3Bridge extends BaseContract {
    contractName: "SyncUniswapV3Bridge";
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: SyncUniswapV3BridgeInterface;
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
        SyncMintFundingMap(arg0: BigNumberish, overrides?: CallOverrides): Promise<[string, BigNumber] & {
            token: string;
            amount: BigNumber;
        }>;
        WETH(overrides?: CallOverrides): Promise<[string]>;
        WETH9(overrides?: CallOverrides): Promise<[string]>;
        call(_to: string, _value: BigNumberish, _data: BytesLike, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        canFinalise(interactionNonce: BigNumberish, overrides?: CallOverrides): Promise<[boolean]>;
        convert(inputAssetA: AztecTypes.AztecAssetStruct, inputAssetB: AztecTypes.AztecAssetStruct, outputAssetA: AztecTypes.AztecAssetStruct, outputAssetB: AztecTypes.AztecAssetStruct, inputValue: BigNumberish, interactionNonce: BigNumberish, auxData: BigNumberish, arg7: string, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        delegatecall(_to: string, _data: BytesLike, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        deposits(arg0: BigNumberish, overrides?: CallOverrides): Promise<[
            BigNumber,
            BigNumber,
            BigNumber,
            BigNumber,
            number,
            number,
            number,
            string,
            string
        ] & {
            tokenId: BigNumber;
            liquidity: BigNumber;
            amount0: BigNumber;
            amount1: BigNumber;
            tickLower: number;
            tickUpper: number;
            fee: number;
            token0: string;
            token1: string;
        }>;
        factory(overrides?: CallOverrides): Promise<[string]>;
        finalise(inputAssetA: AztecTypes.AztecAssetStruct, inputAssetB: AztecTypes.AztecAssetStruct, outputAssetA: AztecTypes.AztecAssetStruct, outputAssetB: AztecTypes.AztecAssetStruct, interactionNonce: BigNumberish, auxData: BigNumberish, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
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
        getLiquidity(tokenA: string, tokenB: string, auxData: BigNumberish, overrides?: CallOverrides): Promise<[
            BigNumber,
            BigNumber
        ] & {
            balance0: BigNumber;
            balance1: BigNumber;
        }>;
        getPresentValue(interactionNonce: BigNumberish, overrides?: CallOverrides): Promise<[
            BigNumber,
            BigNumber
        ] & {
            amount0: BigNumber;
            amount1: BigNumber;
        }>;
        nonfungiblePositionManager(overrides?: CallOverrides): Promise<[string]>;
        onERC721Received(operator: string, arg1: string, tokenId: BigNumberish, arg3: BytesLike, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        owner(overrides?: CallOverrides): Promise<[string]>;
        packData(tickLower: BigNumberish, tickUpper: BigNumberish, fee: BigNumberish, overrides?: CallOverrides): Promise<[BigNumber] & {
            auxData: BigNumber;
        }>;
        quoter(overrides?: CallOverrides): Promise<[string]>;
        rollupProcessor(overrides?: CallOverrides): Promise<[string]>;
        staticcall(_to: string, _data: BytesLike, overrides?: CallOverrides): Promise<[string]>;
        swapRouter(overrides?: CallOverrides): Promise<[string]>;
        uniswapFactory(overrides?: CallOverrides): Promise<[string]>;
        uniswapV3MintCallback(amount0Owed: BigNumberish, amount1Owed: BigNumberish, data: BytesLike, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        unpack_1_to_24(a: BigNumberish, overrides?: CallOverrides): Promise<[number] & {
            b: number;
        }>;
        unpack_24_to_48(a: BigNumberish, overrides?: CallOverrides): Promise<[number] & {
            b: number;
        }>;
        unpack_48_to_64(a: BigNumberish, overrides?: CallOverrides): Promise<[number] & {
            b: number;
        }>;
    };
    SyncMintFundingMap(arg0: BigNumberish, overrides?: CallOverrides): Promise<[string, BigNumber] & {
        token: string;
        amount: BigNumber;
    }>;
    WETH(overrides?: CallOverrides): Promise<string>;
    WETH9(overrides?: CallOverrides): Promise<string>;
    call(_to: string, _value: BigNumberish, _data: BytesLike, overrides?: PayableOverrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    canFinalise(interactionNonce: BigNumberish, overrides?: CallOverrides): Promise<boolean>;
    convert(inputAssetA: AztecTypes.AztecAssetStruct, inputAssetB: AztecTypes.AztecAssetStruct, outputAssetA: AztecTypes.AztecAssetStruct, outputAssetB: AztecTypes.AztecAssetStruct, inputValue: BigNumberish, interactionNonce: BigNumberish, auxData: BigNumberish, arg7: string, overrides?: PayableOverrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    delegatecall(_to: string, _data: BytesLike, overrides?: PayableOverrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    deposits(arg0: BigNumberish, overrides?: CallOverrides): Promise<[
        BigNumber,
        BigNumber,
        BigNumber,
        BigNumber,
        number,
        number,
        number,
        string,
        string
    ] & {
        tokenId: BigNumber;
        liquidity: BigNumber;
        amount0: BigNumber;
        amount1: BigNumber;
        tickLower: number;
        tickUpper: number;
        fee: number;
        token0: string;
        token1: string;
    }>;
    factory(overrides?: CallOverrides): Promise<string>;
    finalise(inputAssetA: AztecTypes.AztecAssetStruct, inputAssetB: AztecTypes.AztecAssetStruct, outputAssetA: AztecTypes.AztecAssetStruct, outputAssetB: AztecTypes.AztecAssetStruct, interactionNonce: BigNumberish, auxData: BigNumberish, overrides?: PayableOverrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
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
    getLiquidity(tokenA: string, tokenB: string, auxData: BigNumberish, overrides?: CallOverrides): Promise<[
        BigNumber,
        BigNumber
    ] & {
        balance0: BigNumber;
        balance1: BigNumber;
    }>;
    getPresentValue(interactionNonce: BigNumberish, overrides?: CallOverrides): Promise<[
        BigNumber,
        BigNumber
    ] & {
        amount0: BigNumber;
        amount1: BigNumber;
    }>;
    nonfungiblePositionManager(overrides?: CallOverrides): Promise<string>;
    onERC721Received(operator: string, arg1: string, tokenId: BigNumberish, arg3: BytesLike, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    owner(overrides?: CallOverrides): Promise<string>;
    packData(tickLower: BigNumberish, tickUpper: BigNumberish, fee: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
    quoter(overrides?: CallOverrides): Promise<string>;
    rollupProcessor(overrides?: CallOverrides): Promise<string>;
    staticcall(_to: string, _data: BytesLike, overrides?: CallOverrides): Promise<string>;
    swapRouter(overrides?: CallOverrides): Promise<string>;
    uniswapFactory(overrides?: CallOverrides): Promise<string>;
    uniswapV3MintCallback(amount0Owed: BigNumberish, amount1Owed: BigNumberish, data: BytesLike, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    unpack_1_to_24(a: BigNumberish, overrides?: CallOverrides): Promise<number>;
    unpack_24_to_48(a: BigNumberish, overrides?: CallOverrides): Promise<number>;
    unpack_48_to_64(a: BigNumberish, overrides?: CallOverrides): Promise<number>;
    callStatic: {
        SyncMintFundingMap(arg0: BigNumberish, overrides?: CallOverrides): Promise<[string, BigNumber] & {
            token: string;
            amount: BigNumber;
        }>;
        WETH(overrides?: CallOverrides): Promise<string>;
        WETH9(overrides?: CallOverrides): Promise<string>;
        call(_to: string, _value: BigNumberish, _data: BytesLike, overrides?: CallOverrides): Promise<string>;
        canFinalise(interactionNonce: BigNumberish, overrides?: CallOverrides): Promise<boolean>;
        convert(inputAssetA: AztecTypes.AztecAssetStruct, inputAssetB: AztecTypes.AztecAssetStruct, outputAssetA: AztecTypes.AztecAssetStruct, outputAssetB: AztecTypes.AztecAssetStruct, inputValue: BigNumberish, interactionNonce: BigNumberish, auxData: BigNumberish, arg7: string, overrides?: CallOverrides): Promise<[
            BigNumber,
            BigNumber,
            boolean
        ] & {
            outputValueA: BigNumber;
            outputValueB: BigNumber;
            isAsync: boolean;
        }>;
        delegatecall(_to: string, _data: BytesLike, overrides?: CallOverrides): Promise<string>;
        deposits(arg0: BigNumberish, overrides?: CallOverrides): Promise<[
            BigNumber,
            BigNumber,
            BigNumber,
            BigNumber,
            number,
            number,
            number,
            string,
            string
        ] & {
            tokenId: BigNumber;
            liquidity: BigNumber;
            amount0: BigNumber;
            amount1: BigNumber;
            tickLower: number;
            tickUpper: number;
            fee: number;
            token0: string;
            token1: string;
        }>;
        factory(overrides?: CallOverrides): Promise<string>;
        finalise(inputAssetA: AztecTypes.AztecAssetStruct, inputAssetB: AztecTypes.AztecAssetStruct, outputAssetA: AztecTypes.AztecAssetStruct, outputAssetB: AztecTypes.AztecAssetStruct, interactionNonce: BigNumberish, auxData: BigNumberish, overrides?: CallOverrides): Promise<[
            BigNumber,
            BigNumber,
            boolean
        ] & {
            outputValueA: BigNumber;
            outputValueB: BigNumber;
            interactionComplete: boolean;
        }>;
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
        getLiquidity(tokenA: string, tokenB: string, auxData: BigNumberish, overrides?: CallOverrides): Promise<[
            BigNumber,
            BigNumber
        ] & {
            balance0: BigNumber;
            balance1: BigNumber;
        }>;
        getPresentValue(interactionNonce: BigNumberish, overrides?: CallOverrides): Promise<[
            BigNumber,
            BigNumber
        ] & {
            amount0: BigNumber;
            amount1: BigNumber;
        }>;
        nonfungiblePositionManager(overrides?: CallOverrides): Promise<string>;
        onERC721Received(operator: string, arg1: string, tokenId: BigNumberish, arg3: BytesLike, overrides?: CallOverrides): Promise<string>;
        owner(overrides?: CallOverrides): Promise<string>;
        packData(tickLower: BigNumberish, tickUpper: BigNumberish, fee: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        quoter(overrides?: CallOverrides): Promise<string>;
        rollupProcessor(overrides?: CallOverrides): Promise<string>;
        staticcall(_to: string, _data: BytesLike, overrides?: CallOverrides): Promise<string>;
        swapRouter(overrides?: CallOverrides): Promise<string>;
        uniswapFactory(overrides?: CallOverrides): Promise<string>;
        uniswapV3MintCallback(amount0Owed: BigNumberish, amount1Owed: BigNumberish, data: BytesLike, overrides?: CallOverrides): Promise<void>;
        unpack_1_to_24(a: BigNumberish, overrides?: CallOverrides): Promise<number>;
        unpack_24_to_48(a: BigNumberish, overrides?: CallOverrides): Promise<number>;
        unpack_48_to_64(a: BigNumberish, overrides?: CallOverrides): Promise<number>;
    };
    filters: {};
    estimateGas: {
        SyncMintFundingMap(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        WETH(overrides?: CallOverrides): Promise<BigNumber>;
        WETH9(overrides?: CallOverrides): Promise<BigNumber>;
        call(_to: string, _value: BigNumberish, _data: BytesLike, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        canFinalise(interactionNonce: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        convert(inputAssetA: AztecTypes.AztecAssetStruct, inputAssetB: AztecTypes.AztecAssetStruct, outputAssetA: AztecTypes.AztecAssetStruct, outputAssetB: AztecTypes.AztecAssetStruct, inputValue: BigNumberish, interactionNonce: BigNumberish, auxData: BigNumberish, arg7: string, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        delegatecall(_to: string, _data: BytesLike, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        deposits(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        factory(overrides?: CallOverrides): Promise<BigNumber>;
        finalise(inputAssetA: AztecTypes.AztecAssetStruct, inputAssetB: AztecTypes.AztecAssetStruct, outputAssetA: AztecTypes.AztecAssetStruct, outputAssetB: AztecTypes.AztecAssetStruct, interactionNonce: BigNumberish, auxData: BigNumberish, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        getDeposit(interactionNonce: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        getLiquidity(tokenA: string, tokenB: string, auxData: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        getPresentValue(interactionNonce: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        nonfungiblePositionManager(overrides?: CallOverrides): Promise<BigNumber>;
        onERC721Received(operator: string, arg1: string, tokenId: BigNumberish, arg3: BytesLike, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        owner(overrides?: CallOverrides): Promise<BigNumber>;
        packData(tickLower: BigNumberish, tickUpper: BigNumberish, fee: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        quoter(overrides?: CallOverrides): Promise<BigNumber>;
        rollupProcessor(overrides?: CallOverrides): Promise<BigNumber>;
        staticcall(_to: string, _data: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;
        swapRouter(overrides?: CallOverrides): Promise<BigNumber>;
        uniswapFactory(overrides?: CallOverrides): Promise<BigNumber>;
        uniswapV3MintCallback(amount0Owed: BigNumberish, amount1Owed: BigNumberish, data: BytesLike, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        unpack_1_to_24(a: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        unpack_24_to_48(a: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        unpack_48_to_64(a: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
    };
    populateTransaction: {
        SyncMintFundingMap(arg0: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        WETH(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        WETH9(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        call(_to: string, _value: BigNumberish, _data: BytesLike, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        canFinalise(interactionNonce: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        convert(inputAssetA: AztecTypes.AztecAssetStruct, inputAssetB: AztecTypes.AztecAssetStruct, outputAssetA: AztecTypes.AztecAssetStruct, outputAssetB: AztecTypes.AztecAssetStruct, inputValue: BigNumberish, interactionNonce: BigNumberish, auxData: BigNumberish, arg7: string, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        delegatecall(_to: string, _data: BytesLike, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        deposits(arg0: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        factory(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        finalise(inputAssetA: AztecTypes.AztecAssetStruct, inputAssetB: AztecTypes.AztecAssetStruct, outputAssetA: AztecTypes.AztecAssetStruct, outputAssetB: AztecTypes.AztecAssetStruct, interactionNonce: BigNumberish, auxData: BigNumberish, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        getDeposit(interactionNonce: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getLiquidity(tokenA: string, tokenB: string, auxData: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getPresentValue(interactionNonce: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        nonfungiblePositionManager(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        onERC721Received(operator: string, arg1: string, tokenId: BigNumberish, arg3: BytesLike, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        packData(tickLower: BigNumberish, tickUpper: BigNumberish, fee: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        quoter(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        rollupProcessor(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        staticcall(_to: string, _data: BytesLike, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        swapRouter(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        uniswapFactory(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        uniswapV3MintCallback(amount0Owed: BigNumberish, amount1Owed: BigNumberish, data: BytesLike, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        unpack_1_to_24(a: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        unpack_24_to_48(a: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        unpack_48_to_64(a: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
    };
}
//# sourceMappingURL=SyncUniswapV3Bridge.d.ts.map