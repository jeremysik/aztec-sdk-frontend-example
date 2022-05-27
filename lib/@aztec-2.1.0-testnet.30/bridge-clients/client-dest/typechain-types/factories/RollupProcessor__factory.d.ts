import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { RollupProcessor, RollupProcessorInterface } from "../RollupProcessor";
declare type RollupProcessorConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class RollupProcessor__factory extends ContractFactory {
    constructor(...args: RollupProcessorConstructorParams);
    deploy(_bridgeProxyAddress: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<RollupProcessor>;
    getDeployTransaction(_bridgeProxyAddress: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): RollupProcessor;
    connect(signer: Signer): RollupProcessor__factory;
    static readonly contractName: "RollupProcessor";
    readonly contractName: "RollupProcessor";
    static readonly bytecode = "0x608060405234801561001057600080fd5b506040516113ad3803806113ad83398101604081905261002f91610054565b600080546001600160a01b0319166001600160a01b0392909216919091179055610084565b60006020828403121561006657600080fd5b81516001600160a01b038116811461007d57600080fd5b9392505050565b61131a806100936000396000f3fe6080604052600436106100705760003560e01c80637753896c1161004e5780637753896c146101195780638188f46814610150578063d27922e614610180578063d9b5fb79146101ae57600080fd5b806312a536231461007557806314137e111461008a5780635ad98a1f146100c1575b600080fd5b610088610083366004610ecc565b6101eb565b005b34801561009657600080fd5b506100886100a5366004610f01565b6001600160a01b03909116600090815260026020526040902055565b3480156100cd57600080fd5b506100fd6100dc366004610ecc565b6000908152600360205260409020600e810154600c9091015460ff90911691565b6040805192151583526020830191909152015b60405180910390f35b34801561012557600080fd5b50610139610134366004610ecc565b610211565b6040516101109b9a99989796959493929190610f92565b34801561015c57600080fd5b5061017061016b366004610ecc565b6103d9565b6040519015158152602001610110565b34801561018c57600080fd5b506101a061019b366004610ecc565b61074c565b604051908152602001610110565b3480156101ba57600080fd5b506101ce6101c936600461102c565b61075f565b604080519384526020840192909252151590820152606001610110565b600081815260016020526040812080543492906102099084906110b4565b909155505050565b60036020818152600092835260409283902080548451606081018652600183018054825260028401546001600160a01b03808216968401969096529490921695929490939192840191600160a01b900460ff169081111561027457610274610f2b565b600381111561028557610285610f2b565b9052506040805160608101825260038481018054835260048601546001600160a01b03811660208501529495949293909290840191600160a01b90910460ff16908111156102d5576102d5610f2b565b60038111156102e6576102e6610f2b565b90525060408051606081018252600584018054825260068501546001600160a01b03811660208401529394939192909190830190600160a01b900460ff16600381111561033557610335610f2b565b600381111561034657610346610f2b565b90525060408051606081018252600784018054825260088501546001600160a01b03811660208401529394939192909190830190600160a01b900460ff16600381111561039557610395610f2b565b60038111156103a6576103a6610f2b565b9052506009820154600a830154600b840154600c850154600d860154600e90960154949593949293919290919060ff168b565b600081815260036020526040812080546001600160a01b03166104435760405162461bcd60e51b815260206004820152601e60248201527f526f6c6c757020436f6e74726163743a20554e4b4e4f574e5f4e4f4e4345000060448201526064015b60405180910390fd5b8054600a820154600b830154604051634d83e9a160e11b8152600093849384936001600160a01b0390921692639b07d342926104989260018a019260038b019260058c019260078d0192909190600401611106565b6060604051808303816000875af11580156104b7573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104db9190611160565b925092509250809450600082118015610513575060006008850154600160a01b900460ff16600381111561051157610511610f2b565b145b156105755760405162461bcd60e51b815260206004820152602c60248201527f4e6f6e2d7a65726f206f75747075742076616c7565206f6e206e6f6e2d65786960448201526b7374616e742061737365742160a01b606482015260840161043a565b82158015610581575081155b156105fb57835460408051606081018252600187018054825260028801546001600160a01b0380821660208501526105f6951693830190600160a01b900460ff1660038111156105d3576105d3610f2b565b60038111156105e4576105e4610f2b565b9052506009870154600a880154610893565b6106d5565b835460408051606081018252600587018054825260068801546001600160a01b038082166020850152610668951693830190600160a01b900460ff16600381111561064857610648610f2b565b600381111561065957610659610f2b565b815250508587600a0154610893565b835460408051606081018252600787018054825260088801546001600160a01b0380821660208501526106d5951693830190600160a01b900460ff1660038111156106b5576106b5610f2b565b60038111156106c6576106c6610f2b565b815250508487600a0154610893565b600a840154600985015460408051918252602082018690528101849052600160608201526000907f1ccb5390975e3d07503983a09c3b6a5d11a0e40c4cb4094a7187655f643ef7b49060800160405180910390a350600e8301805460ff19166001179055600c830191909155600d90910155919050565b600061075960208361119e565b92915050565b6000828152600360205260408120600b015481908190156107d65760405162461bcd60e51b815260206004820152602b60248201527f526f6c6c757020436f6e74726163743a20494e544552414354494f4e5f414c5260448201526a454144595f45584953545360a81b606482015260840161043a565b6040805161012081019091526001600160a01b038c16815260019060009060208101610807368f90038f018f6111c0565b815260200161081b368e90038e018e6111c0565b815260200161082f368d90038d018d6111c0565b8152602001610843368c90038c018c6111c0565b8152602001898152602001888152602001878152602001838152509050600061086b826109b0565b9050806000015195508060200151945080604001519350505050985098509895505050505050565b6001836040015160038111156108ab576108ab610f2b565b14156109355760008181526001602052604090205482146109215760405162461bcd60e51b815260206004820152602a60248201527f526f6c6c75702050726f636573736f723a20494e53554646494345494e545f45604482015269151217d410565351539560b21b606482015260840161043a565b6000818152600160205260408120556109aa565b60028360400151600381111561094d5761094d610f2b565b14801561095a5750600082115b156109aa5760008360200151905060006040516323b872dd60e01b8152866004820152306024820152846044820152602060006064836000875af1915050806109a7573d6000803e3d6000fd5b50505b50505050565b6109d6604051806060016040528060008152602001600081526020016000151581525090565b604080516101608101825283516001600160a01b0390811682526020808601518184019081528685015184860152606080880151908501526080808801519085015260a0808801519085015260c080880180519186019190915260e08089015190860152600061010086018190526101208601819052610140860181905290518152600380845290869020855181549086166001600160a01b0319918216178255925180516001830190815594810151600283018054919097169481168517875597810151969791969095909390926001600160a81b03199092161790600160a01b908490811115610aca57610aca610f2b565b021790555050506040828101518051600380850191825560208301516004860180546001600160a01b039092166001600160a01b031983168117825595850151949593949390926001600160a81b03199092161790600160a01b908490811115610b3657610b36610f2b565b02179055505050606082015180516005830190815560208201516006840180546001600160a01b039092166001600160a01b03198316811782556040850151926001600160a81b03191617600160a01b836003811115610b9857610b98610f2b565b02179055505050608082015180516007830190815560208201516008840180546001600160a01b039092166001600160a01b03198316811782556040850151926001600160a81b03191617600160a01b836003811115610bfa57610bfa610f2b565b0217905550505060a0820151600982015560c0820151600a82015560e0820151600b820155610100820151600c820155610120820151600d82015561014090910151600e909101805460ff191691151591909117905581516001600160a01b0316600090815260026020526040812054610c78576308f0d180610c93565b82516001600160a01b03166000908152600260205260409020545b905060008060008054906101000a90046001600160a01b03166001600160a01b03168363ffd8e7b760e01b8760000151886020015189604001518a606001518b608001518c60a001518d60c001518e60e001518f6101000151604051602401610d0499989796959493929190611239565b60408051601f198184030181529181526020820180516001600160e01b03166001600160e01b0319909416939093179092529051610d4291906112a9565b6000604051808303818686f4925050503d8060008114610d7e576040519150601f19603f3d011682016040523d82523d6000602084013e610d83565b606091505b5091509150604051806060016040528060008152602001600081526020016000151581525093508115610e8257600080600083806020019051810190610dc99190611160565b92509250925080610e2d5760c088015160a089015160408051918252602082018690528101849052600160608201526000907f1ccb5390975e3d07503983a09c3b6a5d11a0e40c4cb4094a7187655f643ef7b49060800160405180910390a3610e72565b8760c0015160007f38ce48f4c2f3454bcf130721f25a4262b2ff2c8e36af937b30edf01ba481eb1d8a60a00151604051610e6991815260200190565b60405180910390a35b9186526020860152151560408501525b81610ec45760405162461bcd60e51b8152602060048201526012602482015271125b9d195c9858dd1a5bdb8811985a5b195960721b604482015260640161043a565b505050919050565b600060208284031215610ede57600080fd5b5035919050565b80356001600160a01b0381168114610efc57600080fd5b919050565b60008060408385031215610f1457600080fd5b610f1d83610ee5565b946020939093013593505050565b634e487b7160e01b600052602160045260246000fd5b60048110610f5f57634e487b7160e01b600052602160045260246000fd5b9052565b805182526020808201516001600160a01b03169083015260408082015190610f8d90840182610f41565b505050565b6001600160a01b038c1681526102608101610fb0602083018d610f63565b610fbd608083018c610f63565b610fca60e083018b610f63565b610fd861014083018a610f63565b876101a0830152866101c0830152856101e083015284610200830152836102208301528215156102408301529c9b505050505050505050505050565b60006060828403121561102657600080fd5b50919050565b600080600080600080600080610200898b03121561104957600080fd5b61105289610ee5565b97506110618a60208b01611014565b96506110708a60808b01611014565b955061107f8a60e08b01611014565b945061108f8a6101408b01611014565b979a96995094979396956101a085013595506101c0850135946101e001359350915050565b600082198211156110d557634e487b7160e01b600052601160045260246000fd5b500190565b8054825260018101546001600160a01b0381166020840152610f8d6040840160a083901c60ff16610f41565b6101c0810161111582896110da565b61112260608301886110da565b61112f60c08301876110da565b61113d6101208301866110da565b8361018083015267ffffffffffffffff83166101a0830152979650505050505050565b60008060006060848603121561117557600080fd5b83519250602084015191506040840151801515811461119357600080fd5b809150509250925092565b6000826111bb57634e487b7160e01b600052601260045260246000fd5b500490565b6000606082840312156111d257600080fd5b6040516060810181811067ffffffffffffffff8211171561120357634e487b7160e01b600052604160045260246000fd5b6040528235815261121660208401610ee5565b602082015260408301356004811061122d57600080fd5b60408201529392505050565b6001600160a01b038a1681526102208101611257602083018b610f63565b611264608083018a610f63565b61127160e0830189610f63565b61127f610140830188610f63565b856101a0830152846101c0830152836101e0830152826102008301529a9950505050505050505050565b6000825160005b818110156112ca57602081860181015185830152016112b0565b818111156112d9576000828501525b50919091019291505056fea2646970667358221220887f68492a629e15a699cf7f07da4c53f92b1d2cb514b16848d523a3dcb9cc5864736f6c634300080a0033";
    static readonly abi: ({
        inputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        stateMutability: string;
        type: string;
        anonymous?: undefined;
        name?: undefined;
        outputs?: undefined;
    } | {
        anonymous: boolean;
        inputs: {
            indexed: boolean;
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        type: string;
        stateMutability?: undefined;
        outputs?: undefined;
    } | {
        inputs: ({
            internalType: string;
            name: string;
            type: string;
            components?: undefined;
        } | {
            components: {
                internalType: string;
                name: string;
                type: string;
            }[];
            internalType: string;
            name: string;
            type: string;
        })[];
        name: string;
        outputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        stateMutability: string;
        type: string;
        anonymous?: undefined;
    } | {
        inputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        outputs: ({
            internalType: string;
            name: string;
            type: string;
            components?: undefined;
        } | {
            components: {
                internalType: string;
                name: string;
                type: string;
            }[];
            internalType: string;
            name: string;
            type: string;
        })[];
        stateMutability: string;
        type: string;
        anonymous?: undefined;
    })[];
    static createInterface(): RollupProcessorInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): RollupProcessor;
}
export {};
//# sourceMappingURL=RollupProcessor__factory.d.ts.map