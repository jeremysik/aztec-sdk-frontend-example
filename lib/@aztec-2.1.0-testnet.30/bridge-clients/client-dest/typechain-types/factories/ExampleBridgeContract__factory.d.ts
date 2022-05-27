import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { ExampleBridgeContract, ExampleBridgeContractInterface } from "../ExampleBridgeContract";
declare type ExampleBridgeContractConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class ExampleBridgeContract__factory extends ContractFactory {
    constructor(...args: ExampleBridgeContractConstructorParams);
    deploy(_rollupProcessor: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ExampleBridgeContract>;
    getDeployTransaction(_rollupProcessor: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): ExampleBridgeContract;
    connect(signer: Signer): ExampleBridgeContract__factory;
    static readonly contractName: "ExampleBridgeContract";
    readonly contractName: "ExampleBridgeContract";
    static readonly bytecode = "0x60a060405234801561001057600080fd5b506040516104c73803806104c783398101604081905261002f91610040565b6001600160a01b0316608052610070565b60006020828403121561005257600080fd5b81516001600160a01b038116811461006957600080fd5b9392505050565b6080516104306100976000396000818160800152818160dc015261016901526104306000f3fe6080604052600436106100345760003560e01c806326c3b515146100395780632a113d6e1461006e5780639b07d342146100ba575b600080fd5b61004c6100473660046102b2565b6100cd565b6040805193845260208401929092521515908201526060015b60405180910390f35b34801561007a57600080fd5b506100a27f000000000000000000000000000000000000000000000000000000000000000081565b6040516001600160a01b039091168152602001610065565b61004c6100c836600461035c565b6101f8565b60008080336001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000161461014d5760405162461bcd60e51b815260206004820152601d60248201527f4578616d706c654272696467653a20494e56414c49445f43414c4c4552000000604482015260640160405180910390fd5b60208b015160405163095ea7b360e01b81526001600160a01b037f000000000000000000000000000000000000000000000000000000000000000081166004830152602482018a90528995509091169063095ea7b3906044016020604051808303816000875af11580156101c5573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906101e991906103d1565b50985098509895505050505050565b60008080600080fd5b80356001600160a01b038116811461021857600080fd5b919050565b60006060828403121561022f57600080fd5b6040516060810181811067ffffffffffffffff8211171561026057634e487b7160e01b600052604160045260246000fd5b6040528235815290508061027660208401610201565b602082015260408301356004811061028d57600080fd5b6040919091015292915050565b803567ffffffffffffffff8116811461021857600080fd5b600080600080600080600080610200898b0312156102cf57600080fd5b6102d98a8a61021d565b97506102e88a60608b0161021d565b96506102f78a60c08b0161021d565b95506103078a6101208b0161021d565b945061018089013593506101a089013592506103266101c08a0161029a565b91506103356101e08a01610201565b90509295985092959890939650565b60006060828403121561035657600080fd5b50919050565b6000806000806000806101c0878903121561037657600080fd5b6103808888610344565b955061038f8860608901610344565b945061039e8860c08901610344565b93506103ae886101208901610344565b925061018087013591506103c56101a0880161029a565b90509295509295509295565b6000602082840312156103e357600080fd5b815180151581146103f357600080fd5b939250505056fea26469706673582212205b4358d73247efe47ee1e8d86e1a124ddc9f452118f59ba21a5beccca7b9c59d64736f6c634300080a0033";
    static readonly abi: ({
        inputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        stateMutability: string;
        type: string;
        name?: undefined;
        outputs?: undefined;
    } | {
        inputs: ({
            components: {
                internalType: string;
                name: string;
                type: string;
            }[];
            internalType: string;
            name: string;
            type: string;
        } | {
            internalType: string;
            name: string;
            type: string;
            components?: undefined;
        })[];
        name: string;
        outputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        stateMutability: string;
        type: string;
    })[];
    static createInterface(): ExampleBridgeContractInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): ExampleBridgeContract;
}
export {};
//# sourceMappingURL=ExampleBridgeContract__factory.d.ts.map