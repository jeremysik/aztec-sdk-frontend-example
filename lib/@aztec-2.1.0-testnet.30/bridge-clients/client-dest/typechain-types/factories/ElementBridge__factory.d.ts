import { Signer, ContractFactory, Overrides, BytesLike } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { ElementBridge, ElementBridgeInterface } from "../ElementBridge";
declare type ElementBridgeConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class ElementBridge__factory extends ContractFactory {
    constructor(...args: ElementBridgeConstructorParams);
    deploy(_rollupProcessor: string, _trancheFactory: string, _trancheBytecodeHash: BytesLike, _balancerVaultAddress: string, _elementDeploymentValidatorAddress: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<ElementBridge>;
    getDeployTransaction(_rollupProcessor: string, _trancheFactory: string, _trancheBytecodeHash: BytesLike, _balancerVaultAddress: string, _elementDeploymentValidatorAddress: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): ElementBridge;
    connect(signer: Signer): ElementBridge__factory;
    static readonly contractName: "ElementBridge";
    readonly contractName: "ElementBridge";
    static readonly bytecode = "0x6101206040523480156200001257600080fd5b50604051620036c8380380620036c8833981016040819052620000359162000103565b6001600160a01b0385811660c05284811660805260a084905282811660e05281166101005262000074600560646200007f602090811b62000dfb17901c565b50505050506200016a565b60005b8163ffffffff16811015620000d757600180840180548083018255600091825260209091206004820401805460086003909316929092026101000a6001600160401b0302801990921690911790550162000082565b5050805463ffffffff19169055565b80516001600160a01b0381168114620000fe57600080fd5b919050565b600080600080600060a086880312156200011c57600080fd5b6200012786620000e6565b94506200013760208701620000e6565b9350604086015192506200014e60608701620000e6565b91506200015e60808701620000e6565b90509295509295909350565b60805160a05160c05160e051610100516134e8620001e06000396000611fcd01526000818161149501528181611505015281816118e601526119ef0152600081816101a30152818161034a0152818161079b01528181610ba60152611c9f01526000610fb901526000610f8801526134e86000f3fe6080604052600436106100915760003560e01c80639b07d342116100595780639b07d3421461020b578063a46b17231461021e578063ac4afa381461023e578063beb5ca32146102bf578063e03da821146102f757600080fd5b806305ff03ba146100965780630ba460ff146100b857806326c3b515146101615780632a113d6e14610191578063748c72d4146101dd575b600080fd5b3480156100a257600080fd5b506100b66100b1366004612e6d565b610324565b005b3480156100c457600080fd5b5061011c6100d3366004612eb4565b600060208190529081526040902080546001909101546001600160a01b038116906001600160401b03600160a01b8204169060ff600160e01b8204811691600160e81b90041685565b604080519586526001600160a01b0390941660208601526001600160401b039092169284019290925290151560608301521515608082015260a0015b60405180910390f35b61017461016f366004612ee5565b610334565b604080519384526020840192909252151590820152606001610158565b34801561019d57600080fd5b506101c57f000000000000000000000000000000000000000000000000000000000000000081565b6040516001600160a01b039091168152602001610158565b3480156101e957600080fd5b506101fd6101f8366004612eb4565b610723565b604051908152602001610158565b610174610219366004612f7b565b610785565b34801561022a57600080fd5b506101fd610239366004612ff0565b610cc1565b34801561024a57600080fd5b50610290610259366004612eb4565b6002602081905260009182526040909120805460018201549282015460039092015490926001600160a01b03908116928116911684565b604080519485526001600160a01b03938416602086015291831691840191909152166060820152608001610158565b3480156102cb57600080fd5b506102df6102da366004613025565b610d11565b6040516001600160401b039091168152602001610158565b34801561030357600080fd5b50610317610312366004613051565b610d5d565b604051610158919061306e565b61032f838383610e60565b505050565b6000806000805a90506000336001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001614610388576040516306a8611160e11b815260040160405180910390fd5b8c358b35146103aa57604051633a8b0fa560e01b815260040160405180910390fd5b60028d60400160208101906103bf91906130d1565b60038111156103d0576103d06130bb565b146103ee57604051633841b42760e21b815260040160405180910390fd5b600061040060608e0160408f016130d1565b6003811115610411576104116130bb565b1461042f5760405163057d2bf960e51b815260040160405180910390fd5b600061044160608c0160408d016130d1565b6003811115610452576104526130bb565b14610470576040516338e2878f60e01b815260040160405180910390fd5b600088815260208190526040902060010154600160a01b90046001600160401b0316156104b05760405163691f18df60e01b815260040160405180910390fd5b600192506000945060009350600060405180608001604052808f60200160208101906104dc9190613051565b6001600160a01b031681526020018b81526020018a8152602001896001600160401b0316815250905060006002600061051d84600001518560600151610cc1565b8152602081019190915260400160002060018101549091506001600160a01b03168061055c576040516301de8c6d60e01b815260040160405180910390fd5b60008190506000816001600160a01b031663aa082a9d6040518163ffffffff1660e01b8152600401602060405180830381865afa1580156105a1573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105c591906130f2565b9050806001600160401b031642106105f057604051635a1032c960e11b815260040160405180910390fd5b60006106058660000151868860200151611859565b6040808801805160009081526020819052919091208281556001810180546001600160401b038716600160a01b026001600160e01b03199091166001600160a01b038a161717905590519192509061065d9084611b5f565b506001600160a01b038516600090815260036020526040812080549091849183919061068a908490613121565b909155505060038101805463ffffffff8082166001011663ffffffff199091161790555a8a03985087604001517fc621d102de25d9fb4a882d97639da3cb4a20f336efcf731704d7ba6e2d36f4ea89602001518b6040516106f892919091825260070b602082015260400190565b60405180910390a261070b6107d0611c0c565b50505050505050505050985098509895505050505050565b60008181526020819052604081206001810154600160a01b90046001600160401b03166107635760405163c2c1a8e760e01b815260040160405180910390fd5b600101546001600160a01b031660009081526004602052604090205492915050565b6000806000805a90506000336001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016146107d9576040516306a8611160e11b815260040160405180910390fd5b60008781526020819052604090206001810154600160a01b90046001600160401b03166108195760405163c2c1a8e760e01b815260040160405180910390fd5b600181015442600160a01b9091046001600160401b03161061084e57604051634010786d60e11b815260040160405180910390fd5b6001810154600160e01b900460ff161561087b5760405163db4c3b1160e01b815260040160405180910390fd5b60018101546001600160a01b0316600090815260036020819052604090912090810154815463ffffffff9091169081610901576108e0848c6040518060400160405280600d81526020016c2727afa222a827a9a4aa29af9960991b8152506000611d1e565b6108ea848c611d78565b506000806000985098509850505050505050610cb5565b60026003840154600160401b900460ff166002811115610923576109236130bb565b14610aa457600184015460405163884e17f360e01b8152600481018390523060248201526001600160a01b0390911690819063884e17f3906044016020604051808303816000875af1925050508015610999575060408051601f3d908101601f19168201909252610996918101906130f2565b60015b610a7c576109a5613139565b806308c379a01415610a0e57506109ba61318f565b806109c55750610a10565b5a880396506109d6868e838a611d1e565b60038501805460ff60401b1916600160401b1790556109f5868e611d78565b5060008060009a509a509a505050505050505050610cb5565b505b5a87039550610a45858d6040518060400160405280600c81526020016b2ba4aa24222920abafa2a92960a11b81525089611d1e565b60038401805460ff60401b1916600160401b179055610a64858d611d78565b50600080600099509950995050505050505050610cb5565b6001850181905560028501555060038301805460ff60401b1916680200000000000000001790555b600081610ac8578263ffffffff168460010154610ac19190613218565b9050610ade565b610adb8460010154866000015484611ef9565b90505b6003840154600090610b029063ffffffff640100000000909104811690861661323a565b9050600181131580610b175750846002015482115b15610b2457846002015491505b81856002016000828254610b389190613279565b9250508190555084600301600481819054906101000a900463ffffffff168092919060010191906101000a81548163ffffffff021916908363ffffffff160217905550508e6020016020810190610b8f9190613051565b60405163095ea7b360e01b81526001600160a01b037f00000000000000000000000000000000000000000000000000000000000000008116600483015260248201859052919091169063095ea7b3906044016020604051808303816000875af1158015610c00573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c249190613290565b5060018601805460ff60e01b1916600160e01b179055610c44868e611d78565b50819a5060009950600198505a880396508c7fcdb222b9bdf555fd0196a74228f1d9a5eb9b4dd230de179690409b2fa1e7ee0e8a89604051610ca4929190911515825260606020830181905260009083015260070b604082015260800190565b60405180910390a250505050505050505b96509650969350505050565b6040516bffffffffffffffffffffffff19606084901b1660208201526001600160401b038216603482015260009060540160408051601f1981840301815291905280516020909101209392505050565b60016020528160005260406000208181548110610d2d57600080fd5b9060005260206000209060049182820401919006600802915091509054906101000a90046001600160401b031681565b6001600160a01b038116600090815260016020908152604091829020805483518184028101840190945280845260609392830182828015610def57602002820191906000526020600020906000905b82829054906101000a90046001600160401b03166001600160401b031681526020019060080190602082600701049283019260010382029150808411610dac5790505b50505050509050919050565b60005b8163ffffffff16811015610e5157600180840180548083018255600091825260209091206004820401805460086003909316929092026101000a6001600160401b03028019909216909117905501610dfe565b5050805463ffffffff19169055565b6040805161010081018252600080825260208201819052918101829052606081018290526080810182905260a0810182905260c0810182905260e08101919091526000839050806001600160a01b031663fc0c546a6040518163ffffffff1660e01b8152600401602060405180830381865afa925050508015610f00575060408051601f3d908101601f19168201909252610efd918101906132b2565b60015b610f1d5760405163eda1d2cf60e01b815260040160405180910390fd5b6001600160a01b031660408381019190915280516bffffffffffffffffffffffff19606087811b82166020808501919091526001600160401b038816603480860191909152855180860390910181526054850186528051908201206001600160f81b031960748601527f000000000000000000000000000000000000000000000000000000000000000090921b909216607584015260898301527f000000000000000000000000000000000000000000000000000000000000000060a9808401919091528351808403909101815260c990920190925280519101206001600160a01b031660608301819052604080516309218e9160e01b8152905182916309218e919160048083019260209291908290030181865afa925050508015611060575060408051601f3d908101601f1916820190925261105d918101906132b2565b60015b61107d57604051633299481b60e01b815260040160405180910390fd5b6001600160a01b03166080840152806001600160a01b0316636f307dc36040518163ffffffff1660e01b8152600401602060405180830381865afa9250505080156110e5575060408051601f3d908101601f191682019092526110e2918101906132b2565b60015b61110257604051633299481b60e01b815260040160405180910390fd5b6001600160a01b031660a08401526000816001600160a01b031663aa082a9d6040518163ffffffff1660e01b8152600401602060405180830381865afa92505050801561116c575060408051601f3d908101601f19168201909252611169918101906130f2565b60015b61118957604051633299481b60e01b815260040160405180910390fd5b9050846001600160401b0316816001600160401b0316146111bc576040516249491b60e41b815260040160405180910390fd5b856001600160a01b031684608001516001600160a01b0316146111f1576040516259150160e81b815260040160405180910390fd5b83604001516001600160a01b03168460a001516001600160a01b03161461122b57604051635ffd9a8d60e11b815260040160405180910390fd5b6000879050806001600160a01b0316636f307dc36040518163ffffffff1660e01b8152600401602060405180830381865afa92505050801561128a575060408051601f3d908101601f19168201909252611287918101906132b2565b60015b6112a75760405163015216d560e21b815260040160405180910390fd5b6001600160a01b031660c0860152806001600160a01b0316634665096d6040518163ffffffff1660e01b8152600401602060405180830381865afa92505050801561130f575060408051601f3d908101601f1916820190925261130c918101906130f2565b60015b61132c5760405163015216d560e21b815260040160405180910390fd5b8552806001600160a01b0316638d928af86040518163ffffffff1660e01b8152600401602060405180830381865afa925050508015611388575060408051601f3d908101601f19168201909252611385918101906132b2565b60015b6113a55760405163015216d560e21b815260040160405180910390fd5b6001600160a01b031660e0860152806001600160a01b03166338fff2d06040518163ffffffff1660e01b8152600401602060405180830381865afa92505050801561140d575060408051601f3d908101601f1916820190925261140a918101906130f2565b60015b61142a5760405163015216d560e21b815260040160405180910390fd5b602086015284604001516001600160a01b03168560c001516001600160a01b03161461146957604051631c368bd160e11b815260040160405180910390fd5b84516001600160401b0387161461149357604051630cb15d9960e31b815260040160405180910390fd5b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03168560e001516001600160a01b0316146114e957604051630adf24e160e31b815260040160405180910390fd5b602085015160405163f6c0092760e01b815260048101919091527f0000000000000000000000000000000000000000000000000000000000000000906000906001600160a01b0383169063f6c00927906024016040805180830381865afa158015611558573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061157c91906132cf565b509050806001600160a01b03168a6001600160a01b0316146115b157604051630e7c481d60e31b815260040160405180910390fd5b6115bb898b611fae565b60006115cb886040015186610cc1565b905060405180608001604052808960200151815260200189606001516001600160a01b031681526020018c6001600160a01b031681526020018b6001600160a01b0316815250600260008381526020019081526020016000206000820151816000015560208201518160010160006101000a8154816001600160a01b0302191690836001600160a01b0316021790555060408201518160020160006101000a8154816001600160a01b0302191690836001600160a01b0316021790555060608201518160030160006101000a8154816001600160a01b0302191690836001600160a01b031602179055509050506000600160008a604001516001600160a01b03166001600160a01b03168152602001908152602001600020905060005b8154811080156117395750866001600160401b031682828154811061170f5761170f61330d565b6000918252602090912060048204015460039091166008026101000a90046001600160401b031614155b15611746576001016116e8565b815481141561178d5781546001810183556000838152602090206004820401805460039092166008026101000a6001600160401b0381810219909316928a16029190911790555b61179a8a6060015161216e565b6001600160401b038716600090815260076020526040902080546117e6576001600160401b03881660009081526007602090815260408220805460018101825590835291206000199101555b7f5ee59c475c00a3d1aadd3f845a455b20c79ba7f236b2c185f3f9bd8ca995c9438e8e8a604051611841939291906001600160a01b0393841681529190921660208201526001600160401b0391909116604082015260600190565b60405180910390a15050505050505050505050505050565b6040805160c08101825283548152600060208083018290526001600160a01b03878116848601819052600188015482166060808701919091526080808701899052875180890189526004808252630307830360e41b8288015260a0890191909152885191820189523080835295820187905281890195909552908101859052955163095ea7b360e01b81527f0000000000000000000000000000000000000000000000000000000000000000909216928201929092526024810186905291939163095ea7b3906044016020604051808303816000875af1158015611941573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906119659190613290565b5060018501546040516370a0823160e01b81523060048201526000916001600160a01b0316906370a0823190602401602060405180830381865afa1580156119b1573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906119d591906130f2565b6040516352bbbe2960e01b81529091506001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016906352bbbe2990611a2a90869086908a904290600401613370565b6020604051808303816000875af1158015611a49573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611a6d91906130f2565b60018701546040516370a0823160e01b81523060048201529195506000916001600160a01b03909116906370a0823190602401602060405180830381865afa158015611abd573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611ae191906130f2565b905081811015611b045760405163037d1b3160e41b815260040160405180910390fd5b6000611b108383613279565b9050858114611b32576040516304e41c7d60e31b815260040160405180910390fd5b86861015611b535760405163c2ef4e0560e01b815260040160405180910390fd5b50505050509392505050565b6001600160401b03811660009081526007602052604081208054600181148015611ba7575060001982600081548110611b9a57611b9a61330d565b9060005260206000200154145b15611bd1578482600081548110611bc057611bc061330d565b600091825260209091200155611beb565b815460018181018455600084815260209020909101869055015b8060011415611c0457611bff6005856121ac565b600192505b505092915050565b600081611c1d6107d0619c40613121565b611c279190613121565b90506000611c37836107d0613121565b90505b815a111561032f57600080611c4e83612287565b9150915081611c5e575050505050565b60005a9050838111611c7257505050505050565b6000611c7e8583613279565b6040516310311e8d60e31b8152600481018590529091506001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001690638188f46890839060240160206040518083038160008887f193505050508015611d07575060408051601f3d908101601f19168201909252611d0491810190613290565b60015b611d145750505050505050565b5050505050611c3a565b60018401805460ff60e81b1916600160e81b17905560405183907fcdb222b9bdf555fd0196a74228f1d9a5eb9b4dd230de179690409b2fa1e7ee0e90611d6a906000908690869061344e565b60405180910390a250505050565b6001820154600160a01b90046001600160401b03166000818152600760205260408120805491929180611db15760009350505050611ef3565b6000611dbe600183613279565b90505b600081118015611ded575085838281548110611ddf57611ddf61330d565b906000526020600020015414155b15611dfb5760001901611dc1565b85838281548110611e0e57611e0e61330d565b906000526020600020015414611e2b576000945050505050611ef3565b611e36600183613279565b8114611e825782611e48600184613279565b81548110611e5857611e5861330d565b9060005260206000200154838281548110611e7557611e7561330d565b6000918252602090912001555b82805480611e9257611e9261347c565b600190038181906000526020600020016000905590558160011415611eea57611ebc6005856124ac565b6001600160401b0384166000908152600760205260408120611edd91612e02565b6001945050505050611ef3565b60009450505050505b92915050565b600080806000198587098587029250828110838203039150508060001415611f335760008411611f2857600080fd5b508290049050611fa7565b808411611f3f57600080fd5b600084868809851960019081018716968790049682860381900495909211909303600082900391909104909201919091029190911760038402600290811880860282030280860282030280860282030280860282030280860282030280860290910302029150505b9392505050565b6040516318d2af8560e31b81526001600160a01b0382811660048301527f0000000000000000000000000000000000000000000000000000000000000000919082169063c6957c2890602401602060405180830381865afa158015612017573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061203b9190613290565b6120585760405163bdc96a2960e01b815260040160405180910390fd5b604051639221015760e01b81526001600160a01b038481166004830152821690639221015790602401602060405180830381865afa15801561209e573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906120c29190613290565b6120df5760405163764c28c560e11b815260040160405180910390fd5b60405163c1c6917560e01b81526001600160a01b038481166004830152838116602483015282169063c1c6917590604401602060405180830381865afa15801561212d573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906121519190613290565b61032f5760405163064a479b60e01b815260040160405180910390fd5b6001600160a01b038116600090815260046020526040902054806121a8576001600160a01b03821660009081526004602052604090204390555b5050565b8154600183015463ffffffff90911690811415612209576001838101805491820181556000908152602090206004820401805460039092166008026101000a6001600160401b03818102199093169285160291909117905561225f565b81836001018263ffffffff16815481106122255761222561330d565b90600052602060002090600491828204019190066008026101000a8154816001600160401b0302191690836001600160401b031602179055505b825463ffffffff19166001820163ffffffff90811691909117845561032f90849083166125a4565b60008061229960055463ffffffff1690565b6122a857506000928392509050565b60006122b460056126f6565b905042816001600160401b0316106122d25750600093849350915050565b6001600160401b0381166000908152600760205260408120805490916122fa614e2088613121565b90505b60008211801561230d5750805a10155b1561247457600083612320600185613279565b815481106123305761233061330d565b9060005260206000200154905060001981141561237c57838054806123575761235761347c565b60019003818190600052602060002001600090559055828060019003935050506122fd565b60008181526020819052604090206001810154600160a01b90046001600160401b031615806123b657506001810154600160e01b900460ff165b806123cc57506001810154600160e81b900460ff165b1561240757848054806123e1576123e161347c565b6001900381819060005260206000200160009055905583806001900394505050506122fd565b60008061241383612764565b9150915081612461576124298385836000611d1e565b868054806124395761243961347c565b60019003818190600052602060002001600090559055858060019003965050505050506122fd565b5060019a92995091975050505050505050565b8115801561248d57506124896161a888613121565b5a10155b1561249d5761249d6005856124ac565b50600096879650945050505050565b815460009063ffffffff165b8063ffffffff16821080156125115750826001600160401b03168460010183815481106124e7576124e761330d565b6000918252602090912060048204015460039091166008026101000a90046001600160401b031614155b15612521578160010191506124b8565b8063ffffffff168214156125355750505050565b81156125955760008460010183815481106125525761255261330d565b90600052602060002090600491828204019190066008026101000a8154816001600160401b0302191690836001600160401b0316021790555061259584836125a4565b61259e84612ba1565b50505050565b60008260010182815481106125bb576125bb61330d565b60009182526020822060048204015460039091166008026101000a90046001600160401b031691505b82156126a15760006001808503901c9150826001600160401b03168560010183815481106126145761261461330d565b6000918252602090912060048204015460039091166008026101000a90046001600160401b03169150811161264957506126a1565b8085600101858154811061265f5761265f61330d565b90600052602060002090600491828204019190066008026101000a8154816001600160401b0302191690836001600160401b03160217905550819350506125e4565b818460010184815481106126b7576126b761330d565b90600052602060002090600491828204019190066008026101000a8154816001600160401b0302191690836001600160401b0316021790555050505050565b805460009063ffffffff1661271e57604051639622ab6160e01b815260040160405180910390fd5b816001016000815481106127345761273461330d565b90600052602060002090600491828204019190066008029054906101000a90046001600160401b03169050919050565b60018101546001600160a01b031660009081526003602081905260408220908101546060919063ffffffff166127c65760006040518060400160405280600d81526020016c4e4f5f4445504f534954535f3160981b8152509250925050915091565b60016003820154600160401b900460ff1660028111156127e8576127e86130bb565b141561282457600060405180604001604052806011815260200170149151115354151253d397d19052531151607a1b8152509250925050915091565b60026003820154600160401b900460ff166002811115612846576128466130bb565b14156128a55760028101546128895760006040518060400160405280600f81526020016e119553131657d0531313d0d0551151608a1b8152509250925050915091565b6001604051806020016040528060008152509250925050915091565b60018401546040805163421b15c160e01b815290516001600160a01b0390921691600091839163421b15c1916004808201926020929091908290030181865afa1580156128f6573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061291a91906130f2565b9050801561297e5760006129316202a30083613121565b90504281111561297c57505050600301805460ff60401b1916600160401b17905550506040805180820190915260098152680535045454442554d560bc1b6020820152600092909150565b505b6000826001600160a01b03166309218e916040518163ffffffff1660e01b8152600401602060405180830381865afa1580156129be573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906129e291906132b2565b905060008190506000816001600160a01b031663fc0c546a6040518163ffffffff1660e01b8152600401602060405180830381865afa158015612a29573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612a4d91906132b2565b90506000826001600160a01b031663fbfa77cf6040518163ffffffff1660e01b8152600401602060405180830381865afa158015612a8f573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612ab391906132b2565b6040516370a0823160e01b81526001600160a01b0380831660048301529192506000918416906370a0823190602401602060405180830381865afa158015612aff573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612b2391906130f2565b90508088600001541115612b7e5750505050600393909301805460ff60401b1916600160401b179055505060408051808201909152600d81526c5641554c545f42414c414e434560981b602082015260009590945092505050565b600160405180602001604052806000815250995099505050505050505050915091565b805463ffffffff1680612bb2575050565b600060018301612bc183613492565b92508263ffffffff1681548110612bda57612bda61330d565b60009182526020822060048204015460039091166008026101000a90046001600160401b0316915080805b8463ffffffff16831015612de3575050600181811b908101906002018284600063ffffffff881685108015612c805750816001600160401b0316896001018681548110612c5457612c5461330d565b6000918252602090912060048204015460039091166008026101000a90046001600160401b0316915081105b15612c8c578492508091505b8763ffffffff1684108015612ce45750816001600160401b0316896001018581548110612cbb57612cbb61330d565b6000918252602090912060048204015460039091166008026101000a90046001600160401b0316105b15612ced578392505b85831415612d4c5781896001018781548110612d0b57612d0b61330d565b90600052602060002090600491828204019190066008026101000a8154816001600160401b0302191690836001600160401b03160217905550505050612de3565b886001018381548110612d6157612d6161330d565b90600052602060002090600491828204019190066008029054906101000a90046001600160401b0316896001018781548110612d9f57612d9f61330d565b90600052602060002090600491828204019190066008026101000a8154816001600160401b0302191690836001600160401b03160217905550829550505050612c05565b5050835463ffffffff191663ffffffff93909316929092179092555050565b5080546000825590600052602060002090810190612e209190612e23565b50565b5b80821115612e385760008155600101612e24565b5090565b6001600160a01b0381168114612e2057600080fd5b80356001600160401b0381168114612e6857600080fd5b919050565b600080600060608486031215612e8257600080fd5b8335612e8d81612e3c565b92506020840135612e9d81612e3c565b9150612eab60408501612e51565b90509250925092565b600060208284031215612ec657600080fd5b5035919050565b600060608284031215612edf57600080fd5b50919050565b600080600080600080600080610200898b031215612f0257600080fd5b612f0c8a8a612ecd565b9750612f1b8a60608b01612ecd565b9650612f2a8a60c08b01612ecd565b9550612f3a8a6101208b01612ecd565b945061018089013593506101a08901359250612f596101c08a01612e51565b91506101e0890135612f6a81612e3c565b809150509295985092959890939650565b6000806000806000806101c08789031215612f9557600080fd5b612f9f8888612ecd565b9550612fae8860608901612ecd565b9450612fbd8860c08901612ecd565b9350612fcd886101208901612ecd565b92506101808701359150612fe46101a08801612e51565b90509295509295509295565b6000806040838503121561300357600080fd5b823561300e81612e3c565b915061301c60208401612e51565b90509250929050565b6000806040838503121561303857600080fd5b823561304381612e3c565b946020939093013593505050565b60006020828403121561306357600080fd5b8135611fa781612e3c565b6020808252825182820181905260009190848201906040850190845b818110156130af5783516001600160401b03168352928401929184019160010161308a565b50909695505050505050565b634e487b7160e01b600052602160045260246000fd5b6000602082840312156130e357600080fd5b813560048110611fa757600080fd5b60006020828403121561310457600080fd5b5051919050565b634e487b7160e01b600052601160045260246000fd5b600082198211156131345761313461310b565b500190565b600060033d11156131525760046000803e5060005160e01c5b90565b601f8201601f191681016001600160401b038111828210171561318857634e487b7160e01b600052604160045260246000fd5b6040525050565b600060443d101561319d5790565b6040516003193d81016004833e81513d6001600160401b0381602484011181841117156131cc57505050505090565b82850191508151818111156131e45750505050505090565b843d87010160208285010111156131fe5750505050505090565b61320d60208286010187613155565b509095945050505050565b60008261323557634e487b7160e01b600052601260045260246000fd5b500490565b60008083128015600160ff1b8501841216156132585761325861310b565b6001600160ff1b03840183138116156132735761327361310b565b50500390565b60008282101561328b5761328b61310b565b500390565b6000602082840312156132a257600080fd5b81518015158114611fa757600080fd5b6000602082840312156132c457600080fd5b8151611fa781612e3c565b600080604083850312156132e257600080fd5b82516132ed81612e3c565b60208401519092506003811061330257600080fd5b809150509250929050565b634e487b7160e01b600052603260045260246000fd5b6000815180845260005b818110156133495760208185018101518683018201520161332d565b8181111561335b576000602083870101525b50601f01601f19169290920160200192915050565b60e08152845160e082015260006020860151600281106133a057634e487b7160e01b600052602160045260246000fd5b61010083015260408601516001600160a01b031661012083015260608601516133d56101408401826001600160a01b03169052565b50608086015161016083015260a086015160c06101808401526133fc6101a0840182613323565b91505061343c602083018680516001600160a01b039081168352602080830151151590840152604080830151909116908301526060908101511515910152565b60a082019390935260c0015292915050565b83151581526060602082015260006134696060830185613323565b90508260070b6040830152949350505050565b634e487b7160e01b600052603160045260246000fd5b600063ffffffff8216806134a8576134a861310b565b600019019291505056fea2646970667358221220e194def71c26b2aead4fbc140224390f49d44e2e8c0dd5e2905ca6af36ead91664736f6c634300080a0033";
    static readonly abi: ({
        inputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        stateMutability: string;
        type: string;
        name?: undefined;
        anonymous?: undefined;
        outputs?: undefined;
    } | {
        inputs: never[];
        name: string;
        type: string;
        stateMutability?: undefined;
        anonymous?: undefined;
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
        anonymous?: undefined;
    })[];
    static createInterface(): ElementBridgeInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): ElementBridge;
}
export {};
//# sourceMappingURL=ElementBridge__factory.d.ts.map