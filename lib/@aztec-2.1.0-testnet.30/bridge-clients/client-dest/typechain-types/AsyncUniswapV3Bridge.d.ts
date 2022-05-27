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
export interface AsyncUniswapV3BridgeInterface extends utils.Interface {
    contractName: "AsyncUniswapV3Bridge";
    functions: {
        "MAGIC_NUMBER_DAYS()": FunctionFragment;
        "WETH()": FunctionFragment;
        "WETH9()": FunctionFragment;
        "asyncOrders(uint256)": FunctionFragment;
        "call(address,uint256,bytes)": FunctionFragment;
        "canFinalise(uint256)": FunctionFragment;
        "cancel(uint256)": FunctionFragment;
        "convert((uint256,address,uint8),(uint256,address,uint8),(uint256,address,uint8),(uint256,address,uint8),uint256,uint256,uint64,address)": FunctionFragment;
        "delegatecall(address,bytes)": FunctionFragment;
        "deposits(uint256)": FunctionFragment;
        "factory()": FunctionFragment;
        "finalise((uint256,address,uint8),(uint256,address,uint8),(uint256,address,uint8),(uint256,address,uint8),uint256,uint64)": FunctionFragment;
        "finalised(uint256)": FunctionFragment;
        "getDeposit(uint256)": FunctionFragment;
        "getExpiry(uint256)": FunctionFragment;
        "getLiquidity(address,address,uint64)": FunctionFragment;
        "getPresentValue(uint256)": FunctionFragment;
        "nonfungiblePositionManager()": FunctionFragment;
        "onERC721Received(address,address,uint256,bytes)": FunctionFragment;
        "owner()": FunctionFragment;
        "packData(int24,int24,uint8,uint8)": FunctionFragment;
        "quoter()": FunctionFragment;
        "rollupProcessor()": FunctionFragment;
        "staticcall(address,bytes)": FunctionFragment;
        "swapRouter()": FunctionFragment;
        "trigger(uint256)": FunctionFragment;
        "uniswapFactory()": FunctionFragment;
        "uniswapV3MintCallback(uint256,uint256,bytes)": FunctionFragment;
    };
    encodeFunctionData(functionFragment: "MAGIC_NUMBER_DAYS", values?: undefined): string;
    encodeFunctionData(functionFragment: "WETH", values?: undefined): string;
    encodeFunctionData(functionFragment: "WETH9", values?: undefined): string;
    encodeFunctionData(functionFragment: "asyncOrders", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "call", values: [string, BigNumberish, BytesLike]): string;
    encodeFunctionData(functionFragment: "canFinalise", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "cancel", values: [BigNumberish]): string;
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
    encodeFunctionData(functionFragment: "finalised", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "getDeposit", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "getExpiry", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "getLiquidity", values: [string, string, BigNumberish]): string;
    encodeFunctionData(functionFragment: "getPresentValue", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "nonfungiblePositionManager", values?: undefined): string;
    encodeFunctionData(functionFragment: "onERC721Received", values: [string, string, BigNumberish, BytesLike]): string;
    encodeFunctionData(functionFragment: "owner", values?: undefined): string;
    encodeFunctionData(functionFragment: "packData", values: [BigNumberish, BigNumberish, BigNumberish, BigNumberish]): string;
    encodeFunctionData(functionFragment: "quoter", values?: undefined): string;
    encodeFunctionData(functionFragment: "rollupProcessor", values?: undefined): string;
    encodeFunctionData(functionFragment: "staticcall", values: [string, BytesLike]): string;
    encodeFunctionData(functionFragment: "swapRouter", values?: undefined): string;
    encodeFunctionData(functionFragment: "trigger", values: [BigNumberish]): string;
    encodeFunctionData(functionFragment: "uniswapFactory", values?: undefined): string;
    encodeFunctionData(functionFragment: "uniswapV3MintCallback", values: [BigNumberish, BigNumberish, BytesLike]): string;
    decodeFunctionResult(functionFragment: "MAGIC_NUMBER_DAYS", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "WETH", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "WETH9", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "asyncOrders", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "call", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "canFinalise", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "cancel", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "convert", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "delegatecall", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "deposits", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "factory", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "finalise", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "finalised", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getDeposit", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getExpiry", data: BytesLike): Result;
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
    decodeFunctionResult(functionFragment: "trigger", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "uniswapFactory", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "uniswapV3MintCallback", data: BytesLike): Result;
    events: {};
}
export interface AsyncUniswapV3Bridge extends BaseContract {
    contractName: "AsyncUniswapV3Bridge";
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: AsyncUniswapV3BridgeInterface;
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
        MAGIC_NUMBER_DAYS(overrides?: CallOverrides): Promise<[BigNumber]>;
        WETH(overrides?: CallOverrides): Promise<[string]>;
        WETH9(overrides?: CallOverrides): Promise<[string]>;
        asyncOrders(arg0: BigNumberish, overrides?: CallOverrides): Promise<[
            boolean,
            BigNumber
        ] & {
            finalisable: boolean;
            expiry: BigNumber;
        }>;
        call(_to: string, _value: BigNumberish, _data: BytesLike, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        canFinalise(interactionNonce: BigNumberish, overrides?: CallOverrides): Promise<[boolean]>;
        cancel(interactionNonce: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
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
        finalised(interactionNonce: BigNumberish, overrides?: CallOverrides): Promise<[boolean]>;
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
        getExpiry(interactionNonce: BigNumberish, overrides?: CallOverrides): Promise<[BigNumber]>;
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
        packData(tickLower: BigNumberish, tickUpper: BigNumberish, days_to_cancel: BigNumberish, fee: BigNumberish, overrides?: CallOverrides): Promise<[BigNumber] & {
            data: BigNumber;
        }>;
        quoter(overrides?: CallOverrides): Promise<[string]>;
        rollupProcessor(overrides?: CallOverrides): Promise<[string]>;
        staticcall(_to: string, _data: BytesLike, overrides?: CallOverrides): Promise<[string]>;
        swapRouter(overrides?: CallOverrides): Promise<[string]>;
        trigger(interactionNonce: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
        uniswapFactory(overrides?: CallOverrides): Promise<[string]>;
        uniswapV3MintCallback(amount0Owed: BigNumberish, amount1Owed: BigNumberish, data: BytesLike, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<ContractTransaction>;
    };
    MAGIC_NUMBER_DAYS(overrides?: CallOverrides): Promise<BigNumber>;
    WETH(overrides?: CallOverrides): Promise<string>;
    WETH9(overrides?: CallOverrides): Promise<string>;
    asyncOrders(arg0: BigNumberish, overrides?: CallOverrides): Promise<[
        boolean,
        BigNumber
    ] & {
        finalisable: boolean;
        expiry: BigNumber;
    }>;
    call(_to: string, _value: BigNumberish, _data: BytesLike, overrides?: PayableOverrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    canFinalise(interactionNonce: BigNumberish, overrides?: CallOverrides): Promise<boolean>;
    cancel(interactionNonce: BigNumberish, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
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
    finalised(interactionNonce: BigNumberish, overrides?: CallOverrides): Promise<boolean>;
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
    getExpiry(interactionNonce: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
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
    packData(tickLower: BigNumberish, tickUpper: BigNumberish, days_to_cancel: BigNumberish, fee: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
    quoter(overrides?: CallOverrides): Promise<string>;
    rollupProcessor(overrides?: CallOverrides): Promise<string>;
    staticcall(_to: string, _data: BytesLike, overrides?: CallOverrides): Promise<string>;
    swapRouter(overrides?: CallOverrides): Promise<string>;
    trigger(interactionNonce: BigNumberish, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    uniswapFactory(overrides?: CallOverrides): Promise<string>;
    uniswapV3MintCallback(amount0Owed: BigNumberish, amount1Owed: BigNumberish, data: BytesLike, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ContractTransaction>;
    callStatic: {
        MAGIC_NUMBER_DAYS(overrides?: CallOverrides): Promise<BigNumber>;
        WETH(overrides?: CallOverrides): Promise<string>;
        WETH9(overrides?: CallOverrides): Promise<string>;
        asyncOrders(arg0: BigNumberish, overrides?: CallOverrides): Promise<[
            boolean,
            BigNumber
        ] & {
            finalisable: boolean;
            expiry: BigNumber;
        }>;
        call(_to: string, _value: BigNumberish, _data: BytesLike, overrides?: CallOverrides): Promise<string>;
        canFinalise(interactionNonce: BigNumberish, overrides?: CallOverrides): Promise<boolean>;
        cancel(interactionNonce: BigNumberish, overrides?: CallOverrides): Promise<[
            BigNumber,
            BigNumber
        ] & {
            amount0: BigNumber;
            amount1: BigNumber;
        }>;
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
        finalised(interactionNonce: BigNumberish, overrides?: CallOverrides): Promise<boolean>;
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
        getExpiry(interactionNonce: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
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
        packData(tickLower: BigNumberish, tickUpper: BigNumberish, days_to_cancel: BigNumberish, fee: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        quoter(overrides?: CallOverrides): Promise<string>;
        rollupProcessor(overrides?: CallOverrides): Promise<string>;
        staticcall(_to: string, _data: BytesLike, overrides?: CallOverrides): Promise<string>;
        swapRouter(overrides?: CallOverrides): Promise<string>;
        trigger(interactionNonce: BigNumberish, overrides?: CallOverrides): Promise<[
            BigNumber,
            BigNumber
        ] & {
            amount0: BigNumber;
            amount1: BigNumber;
        }>;
        uniswapFactory(overrides?: CallOverrides): Promise<string>;
        uniswapV3MintCallback(amount0Owed: BigNumberish, amount1Owed: BigNumberish, data: BytesLike, overrides?: CallOverrides): Promise<void>;
    };
    filters: {};
    estimateGas: {
        MAGIC_NUMBER_DAYS(overrides?: CallOverrides): Promise<BigNumber>;
        WETH(overrides?: CallOverrides): Promise<BigNumber>;
        WETH9(overrides?: CallOverrides): Promise<BigNumber>;
        asyncOrders(arg0: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        call(_to: string, _value: BigNumberish, _data: BytesLike, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        canFinalise(interactionNonce: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        cancel(interactionNonce: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
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
        finalised(interactionNonce: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        getDeposit(interactionNonce: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        getExpiry(interactionNonce: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        getLiquidity(tokenA: string, tokenB: string, auxData: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        getPresentValue(interactionNonce: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        nonfungiblePositionManager(overrides?: CallOverrides): Promise<BigNumber>;
        onERC721Received(operator: string, arg1: string, tokenId: BigNumberish, arg3: BytesLike, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        owner(overrides?: CallOverrides): Promise<BigNumber>;
        packData(tickLower: BigNumberish, tickUpper: BigNumberish, days_to_cancel: BigNumberish, fee: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
        quoter(overrides?: CallOverrides): Promise<BigNumber>;
        rollupProcessor(overrides?: CallOverrides): Promise<BigNumber>;
        staticcall(_to: string, _data: BytesLike, overrides?: CallOverrides): Promise<BigNumber>;
        swapRouter(overrides?: CallOverrides): Promise<BigNumber>;
        trigger(interactionNonce: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
        uniswapFactory(overrides?: CallOverrides): Promise<BigNumber>;
        uniswapV3MintCallback(amount0Owed: BigNumberish, amount1Owed: BigNumberish, data: BytesLike, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<BigNumber>;
    };
    populateTransaction: {
        MAGIC_NUMBER_DAYS(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        WETH(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        WETH9(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        asyncOrders(arg0: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        call(_to: string, _value: BigNumberish, _data: BytesLike, overrides?: PayableOverrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        canFinalise(interactionNonce: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        cancel(interactionNonce: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
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
        finalised(interactionNonce: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getDeposit(interactionNonce: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getExpiry(interactionNonce: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getLiquidity(tokenA: string, tokenB: string, auxData: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getPresentValue(interactionNonce: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        nonfungiblePositionManager(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        onERC721Received(operator: string, arg1: string, tokenId: BigNumberish, arg3: BytesLike, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        packData(tickLower: BigNumberish, tickUpper: BigNumberish, days_to_cancel: BigNumberish, fee: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        quoter(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        rollupProcessor(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        staticcall(_to: string, _data: BytesLike, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        swapRouter(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        trigger(interactionNonce: BigNumberish, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
        uniswapFactory(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        uniswapV3MintCallback(amount0Owed: BigNumberish, amount1Owed: BigNumberish, data: BytesLike, overrides?: Overrides & {
            from?: string | Promise<string>;
        }): Promise<PopulatedTransaction>;
    };
}
//# sourceMappingURL=AsyncUniswapV3Bridge.d.ts.map