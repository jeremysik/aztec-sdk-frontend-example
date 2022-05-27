import { Signer, ContractFactory, Overrides, BigNumberish } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { ZkAToken, ZkATokenInterface } from "../ZkAToken";
declare type ZkATokenConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class ZkAToken__factory extends ContractFactory {
    constructor(...args: ZkATokenConstructorParams);
    deploy(_name: string, _symbol: string, _decimals: BigNumberish, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ZkAToken>;
    getDeployTransaction(_name: string, _symbol: string, _decimals: BigNumberish, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): ZkAToken;
    connect(signer: Signer): ZkAToken__factory;
    static readonly contractName: "ZkAToken";
    readonly contractName: "ZkAToken";
    static readonly bytecode = "0x60c06040523480156200001157600080fd5b5060405162000f8c38038062000f8c8339810160408190526200003491620001ec565b8251839083906200004d90600390602085019062000079565b5080516200006390600490602084019062000079565b5050336080525060ff1660a05250620002ae9050565b828054620000879062000271565b90600052602060002090601f016020900481019282620000ab5760008555620000f6565b82601f10620000c657805160ff1916838001178555620000f6565b82800160010185558215620000f6579182015b82811115620000f6578251825591602001919060010190620000d9565b506200010492915062000108565b5090565b5b8082111562000104576000815560010162000109565b634e487b7160e01b600052604160045260246000fd5b600082601f8301126200014757600080fd5b81516001600160401b03808211156200016457620001646200011f565b604051601f8301601f19908116603f011681019082821181831017156200018f576200018f6200011f565b81604052838152602092508683858801011115620001ac57600080fd5b600091505b83821015620001d05785820183015181830184015290820190620001b1565b83821115620001e25760008385830101525b9695505050505050565b6000806000606084860312156200020257600080fd5b83516001600160401b03808211156200021a57600080fd5b620002288783880162000135565b945060208601519150808211156200023f57600080fd5b506200024e8682870162000135565b925050604084015160ff811681146200026657600080fd5b809150509250925092565b600181811c908216806200028657607f821691505b60208210811415620002a857634e487b7160e01b600052602260045260246000fd5b50919050565b60805160a051610caa620002e26000396000818161016d01526101df01526000818161024201526103af0152610caa6000f3fe608060405234801561001057600080fd5b50600436106101005760003560e01c806347b83d7d1161009757806395d89b411161006657806395d89b411461027c578063a457c2d714610284578063a9059cbb14610297578063dd62ed3e146102aa57600080fd5b806347b83d7d146101da57806370a082311461020157806379cc67901461022a5780638da5cb5b1461023d57600080fd5b8063313ce567116100d3578063313ce5671461016b578063395093511461019f57806340c10f19146101b257806342966c68146101c757600080fd5b806306fdde0314610105578063095ea7b31461012357806318160ddd1461014657806323b872dd14610158575b600080fd5b61010d6102bd565b60405161011a9190610aaf565b60405180910390f35b610136610131366004610b20565b61034f565b604051901515815260200161011a565b6002545b60405190815260200161011a565b610136610166366004610b4a565b610367565b7f00000000000000000000000000000000000000000000000000000000000000005b60405160ff909116815260200161011a565b6101366101ad366004610b20565b61038b565b6101c56101c0366004610b20565b6103ad565b005b6101c56101d5366004610b86565b610438565b61018d7f000000000000000000000000000000000000000000000000000000000000000081565b61014a61020f366004610b9f565b6001600160a01b031660009081526020819052604090205490565b6101c5610238366004610b20565b610445565b6102647f000000000000000000000000000000000000000000000000000000000000000081565b6040516001600160a01b03909116815260200161011a565b61010d61045a565b610136610292366004610b20565b610469565b6101366102a5366004610b20565b6104e4565b61014a6102b8366004610bc1565b6104f2565b6060600380546102cc90610bf4565b80601f01602080910402602001604051908101604052809291908181526020018280546102f890610bf4565b80156103455780601f1061031a57610100808354040283529160200191610345565b820191906000526020600020905b81548152906001019060200180831161032857829003601f168201915b5050505050905090565b60003361035d81858561051d565b5060019392505050565b600033610375858285610642565b6103808585856106bc565b506001949350505050565b60003361035d81858561039e83836104f2565b6103a89190610c45565b61051d565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316331461042a5760405162461bcd60e51b815260206004820152601760248201527f5a6b41546f6b656e3a20494e56414c4944204f574e455200000000000000000060448201526064015b60405180910390fd5b610434828261088a565b5050565b6104423382610969565b50565b610450823383610642565b6104348282610969565b6060600480546102cc90610bf4565b6000338161047782866104f2565b9050838110156104d75760405162461bcd60e51b815260206004820152602560248201527f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f77604482015264207a65726f60d81b6064820152608401610421565b610380828686840361051d565b60003361035d8185856106bc565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b6001600160a01b03831661057f5760405162461bcd60e51b8152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f206164646044820152637265737360e01b6064820152608401610421565b6001600160a01b0382166105e05760405162461bcd60e51b815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f206164647265604482015261737360f01b6064820152608401610421565b6001600160a01b0383811660008181526001602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92591015b60405180910390a3505050565b600061064e84846104f2565b905060001981146106b657818110156106a95760405162461bcd60e51b815260206004820152601d60248201527f45524332303a20696e73756666696369656e7420616c6c6f77616e63650000006044820152606401610421565b6106b6848484840361051d565b50505050565b6001600160a01b0383166107205760405162461bcd60e51b815260206004820152602560248201527f45524332303a207472616e736665722066726f6d20746865207a65726f206164604482015264647265737360d81b6064820152608401610421565b6001600160a01b0382166107825760405162461bcd60e51b815260206004820152602360248201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260448201526265737360e81b6064820152608401610421565b6001600160a01b038316600090815260208190526040902054818110156107fa5760405162461bcd60e51b815260206004820152602660248201527f45524332303a207472616e7366657220616d6f756e7420657863656564732062604482015265616c616e636560d01b6064820152608401610421565b6001600160a01b03808516600090815260208190526040808220858503905591851681529081208054849290610831908490610c45565b92505081905550826001600160a01b0316846001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8460405161087d91815260200190565b60405180910390a36106b6565b6001600160a01b0382166108e05760405162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f2061646472657373006044820152606401610421565b80600260008282546108f29190610c45565b90915550506001600160a01b0382166000908152602081905260408120805483929061091f908490610c45565b90915550506040518181526001600160a01b038316906000907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a35050565b6001600160a01b0382166109c95760405162461bcd60e51b815260206004820152602160248201527f45524332303a206275726e2066726f6d20746865207a65726f206164647265736044820152607360f81b6064820152608401610421565b6001600160a01b03821660009081526020819052604090205481811015610a3d5760405162461bcd60e51b815260206004820152602260248201527f45524332303a206275726e20616d6f756e7420657863656564732062616c616e604482015261636560f01b6064820152608401610421565b6001600160a01b0383166000908152602081905260408120838303905560028054849290610a6c908490610c5d565b90915550506040518281526000906001600160a01b038516907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef90602001610635565b600060208083528351808285015260005b81811015610adc57858101830151858201604001528201610ac0565b81811115610aee576000604083870101525b50601f01601f1916929092016040019392505050565b80356001600160a01b0381168114610b1b57600080fd5b919050565b60008060408385031215610b3357600080fd5b610b3c83610b04565b946020939093013593505050565b600080600060608486031215610b5f57600080fd5b610b6884610b04565b9250610b7660208501610b04565b9150604084013590509250925092565b600060208284031215610b9857600080fd5b5035919050565b600060208284031215610bb157600080fd5b610bba82610b04565b9392505050565b60008060408385031215610bd457600080fd5b610bdd83610b04565b9150610beb60208401610b04565b90509250929050565b600181811c90821680610c0857607f821691505b60208210811415610c2957634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052601160045260246000fd5b60008219821115610c5857610c58610c2f565b500190565b600082821015610c6f57610c6f610c2f565b50039056fea2646970667358221220825c92e3dd566f34f03e2e4b2c29d00886e6b0f2ff4804dd44c5ad4a390b148d64736f6c634300080a0033";
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
        inputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        outputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        stateMutability: string;
        type: string;
        anonymous?: undefined;
    })[];
    static createInterface(): ZkATokenInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): ZkAToken;
}
export {};
//# sourceMappingURL=ZkAToken__factory.d.ts.map