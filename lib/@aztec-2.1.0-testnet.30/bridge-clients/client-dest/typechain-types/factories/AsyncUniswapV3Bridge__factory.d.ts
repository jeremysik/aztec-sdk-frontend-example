import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { AsyncUniswapV3Bridge, AsyncUniswapV3BridgeInterface } from "../AsyncUniswapV3Bridge";
declare type AsyncUniswapV3BridgeConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class AsyncUniswapV3Bridge__factory extends ContractFactory {
    constructor(...args: AsyncUniswapV3BridgeConstructorParams);
    deploy(_rollupProcessor: string, _router: string, _nonfungiblePositionManager: string, _factory: string, _WETH: string, _quoter: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<AsyncUniswapV3Bridge>;
    getDeployTransaction(_rollupProcessor: string, _router: string, _nonfungiblePositionManager: string, _factory: string, _WETH: string, _quoter: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): AsyncUniswapV3Bridge;
    connect(signer: Signer): AsyncUniswapV3Bridge__factory;
    static readonly contractName: "AsyncUniswapV3Bridge";
    readonly contractName: "AsyncUniswapV3Bridge";
    static readonly bytecode = "0x6101a06040523480156200001257600080fd5b50604051620042083803806200420883398101604081905262000035916200009b565b6001600160a01b03928316608081905291831660a08190529383166101205294821660e0529281166101005261016091909152610140919091523360c05216610180526200011c565b80516001600160a01b03811681146200009657600080fd5b919050565b60008060008060008060c08789031215620000b557600080fd5b620000c0876200007e565b9550620000d0602088016200007e565b9450620000e0604088016200007e565b9350620000f0606088016200007e565b925062000100608088016200007e565b91506200011060a088016200007e565b90509295509295509295565b60805160a05160c05160e0516101005161012051610140516101605161018051613f9462000274600039600061087b015260008181610709015281816114d30152818161164e0152818161191a015261198a0152600081816104f401528181610c3101528181610dea015261268a0152600081816107df01528181611a3501528181611a6001528181611b0401528181611bb601528181611bf701528181611ccd015281816127b60152612a6501526000610813015260008181610379015281816109590152818161125c015281816112c10152818161146d015281816114980152818161154b015281816115e801528181611613015281816116c60152818161170701526117320152600081816105280152818161107a015261116d0152600081816101cb015281816103fa015281816124570152818161249d0152612532015260008181610847015261179c0152613f946000f3fe6080604052600436106101bb5760003560e01c80638bdb2afa116100ec578063b34344bc1161008a578063c45a015511610064578063c45a015514610835578063c6bbd5a714610869578063d34879971461089d578063ed684cc6146108bd57600080fd5b8063b34344bc146107b6578063b44a2722146107cd578063c31c9c071461080157600080fd5b80639f9fb968116100c65780639f9fb9681461055d578063a7c7f7411461068e578063ad5c4648146106f7578063b02c43d01461072b57600080fd5b80638bdb2afa146104e25780638da5cb5b146105165780639b07d3421461054a57600080fd5b80634aa4a4fc116101595780635eb585f2116101335780635eb585f21461045c5780636dbf2fa01461049c5780636e0aacf7146104af5780637224f4eb146104c257600080fd5b80634aa4a4fc146103e85780634da969851461041c5780635c0325881461043c57600080fd5b8063260558a011610195578063260558a01461030a57806326c3b515146103375780632a113d6e1461036757806340e58ee5146103b357600080fd5b80630bce54d31461023057806313c7260814610286578063150b7a02146102c557600080fd5b3661022b57336001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016146102295760405162461bcd60e51b81526020600482015260096024820152684e6f7420574554483960b81b60448201526064015b60405180910390fd5b005b600080fd5b34801561023c57600080fd5b5061026a61024b36600461326c565b6001602081905260009182526040909120805491015460ff9091169082565b6040805192151583526020830191909152015b60405180910390f35b34801561029257600080fd5b506102b76102a136600461326c565b6000908152600160208190526040909120015490565b60405190815260200161027d565b3480156102d157600080fd5b506102f16102e03660046132e5565b630a85bd0160e11b95945050505050565b6040516001600160e01b0319909116815260200161027d565b34801561031657600080fd5b5061032a610325366004613357565b6108dd565b60405161027d91906133d7565b61034a610345366004613439565b61094a565b60408051938452602084019290925215159082015260600161027d565b34801561037357600080fd5b5061039b7f000000000000000000000000000000000000000000000000000000000000000081565b6040516001600160a01b03909116815260200161027d565b3480156103bf57600080fd5b506103d36103ce36600461326c565b610ba7565b6040805192835260208301919091520161027d565b3480156103f457600080fd5b5061039b7f000000000000000000000000000000000000000000000000000000000000000081565b34801561042857600080fd5b506103d361043736600461326c565b610c04565b34801561044857600080fd5b506103d36104573660046134cf565b610dad565b34801561046857600080fd5b5061048c61047736600461326c565b60009081526001602052604090205460ff1690565b604051901515815260200161027d565b61032a6104aa366004613516565b61106d565b61032a6104bd366004613357565b611160565b3480156104ce57600080fd5b5061048c6104dd36600461326c565b61124f565b3480156104ee57600080fd5b5061039b7f000000000000000000000000000000000000000000000000000000000000000081565b34801561052257600080fd5b5061039b7f000000000000000000000000000000000000000000000000000000000000000081565b61034a610558366004613571565b6112b2565b34801561056957600080fd5b5061062d61057836600461326c565b60009081526020818152604091829020825161012081018452815480825260018301546001600160801b0316938201849052600280840154958301869052600384015460608401819052600485015480830b608086018190526301000000820490930b60a08601819052600160301b820462ffffff1660c08701819052600160481b9092046001600160a01b0390811660e0880181905260059098015416610100909601869052939896979691959294909291565b60408051998a526001600160801b0390981660208a0152968801959095526060870193909352600291820b6080870152900b60a085015262ffffff1660c08401526001600160a01b0390811660e0840152166101008201526101200161027d565b34801561069a57600080fd5b506106df6106a9366004613604565b600160089190911b61ff001662ffffff9390931660189490941b65ffffff000000169390931760101b9190911791909117919050565b6040516001600160401b03909116815260200161027d565b34801561070357600080fd5b5061039b7f000000000000000000000000000000000000000000000000000000000000000081565b34801561073757600080fd5b5061062d61074636600461326c565b6000602081905290815260409020805460018201546002808401546003850154600486015460059096015494956001600160801b03909416949193909281810b926301000000830490910b9162ffffff600160301b820416916001600160a01b03600160481b9092048216911689565b3480156107c257600080fd5b506102b76201518081565b3480156107d957600080fd5b5061039b7f000000000000000000000000000000000000000000000000000000000000000081565b34801561080d57600080fd5b5061039b7f000000000000000000000000000000000000000000000000000000000000000081565b34801561084157600080fd5b5061039b7f000000000000000000000000000000000000000000000000000000000000000081565b34801561087557600080fd5b5061039b7f000000000000000000000000000000000000000000000000000000000000000081565b3480156108a957600080fd5b506102296108b8366004613660565b611787565b3480156108c957600080fd5b506103d36108d836600461326c565b611805565b6060600080856001600160a01b031685856040516108fc92919061369a565b600060405180830381855afa9150503d8060008114610937576040519150601f19603f3d011682016040523d82523d6000602084013e61093c565b606091505b5093505050505b9392505050565b60008080336001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016146109965760405162461bcd60e51b8152600401610220906136aa565b50600160006109ab60608c0160408d016136e8565b60038111156109bc576109bc6136d2565b146109fc5760405162461bcd60e51b815260206004820152601060248201526f24a721a7a92922a1aa2fa4a7282aaa2160811b6044820152606401610220565b6000610a078c6118ed565b90506000610a148b6118ed565b9050610a1f8a6118ed565b6001600160a01b0316826001600160a01b031614610a705760405162461bcd60e51b815260206004820152600e60248201526d1253959053125117d4915195539160921b6044820152606401610220565b610b38816001600160a01b0316836001600160a01b031610610a925781610a94565b825b826001600160a01b0316846001600160a01b031610610ab35783610ab5565b825b836001600160a01b0316856001600160a01b031610610ad5576000610ad7565b8b5b846001600160a01b0316866001600160a01b031610610af6578c610af9565b60005b60288c6001600160401b0316901c60108d6001600160401b0316901c60088e6001600160401b0316901c60ff166064610b32919061371f565b8f611a2a565b5050604080518082019091526000815288915060208101610b69610b6260ff851662015180611c3b565b4290611c47565b90526000998a52600160208181526040909b208251815460ff191690151517815591909a015199019890985550929b919a5098509650505050505050565b60008181526001602081905260408220015481904211610bff576000838152600160208181526040808420805460ff191684179055908390529091200154610bf99084906001600160801b0316611c53565b90925090505b915091565b60008181526020819052604080822080546004918201549251630b4c774160e11b815284939192849283927f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0390811693631698ee8293610c8793600160481b8204909316928392600160301b90920462ffffff16910161374a565b602060405180830381865afa158015610ca4573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610cc8919061377d565b9050806001600160a01b0316633850c7bd6040518163ffffffff1660e01b815260040160e060405180830381865afa158015610d08573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610d2c91906137c7565b50505060008a815260208190526040902060040154939550610da194508593610d5c935060020b9150611e329050565b600088815260208190526040902060040154610d81906301000000900460020b611e32565b6000898152602081905260409020600101546001600160801b0316612251565b90969095509350505050565b604051630b4c774160e11b8152600090819061ffff84169062ffffff602886901c169065ffffffffffff601087901c169084906001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001690631698ee8290610e23908c908c90899060040161374a565b602060405180830381865afa158015610e40573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e64919061377d565b90506000816001600160a01b031663d0c93a7c6040518163ffffffff1660e01b8152600401602060405180830381865afa158015610ea6573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610eca9190613854565b90506000610ed88286613887565b60020b158015610ef25750610eed8285613887565b60020b155b610f285760405162461bcd60e51b815260206004820152600760248201526653504143494e4760c81b6044820152606401610220565b845b8460020b8160020b13610fd15760405163f30dba9360e01b8152600282900b60048201526000906001600160a01b0386169063f30dba939060240161010060405180830381865afa158015610f83573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610fa791906138c0565b5050505050505090508083610fbc919061396a565b9250610fca90508382613995565b9050610f2a565b506000836001600160a01b0316633850c7bd6040518163ffffffff1660e01b815260040160e060405180830381865afa158015611012573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061103691906137c7565b505050505050905061105a8161104b88611e32565b61105488611e32565b85612251565b909d909c509a5050505050505050505050565b6060336001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016146110d45760405162461bcd60e51b815260206004820152600a60248201526927a7262c9027aba722a960b11b6044820152606401610220565b6001600160a01b0385166110e757600080fd5b600080866001600160a01b031686868660405161110592919061369a565b60006040518083038185875af1925050503d8060008114611142576040519150601f19603f3d011682016040523d82523d6000602084013e611147565b606091505b50915091508161115657600080fd5b9695505050505050565b6060336001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016146111c75760405162461bcd60e51b815260206004820152600a60248201526927a7262c9027aba722a960b11b6044820152606401610220565b6001600160a01b0384166111da57600080fd5b600080856001600160a01b031685856040516111f792919061369a565b600060405180830381855af49150503d8060008114611232576040519150601f19603f3d011682016040523d82523d6000602084013e611237565b606091505b50915091508161124657600080fd5b95945050505050565b6000336001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016146112995760405162461bcd60e51b8152600401610220906136aa565b5060008181526001602052604090205460ff165b919050565b60008080336001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016146112fe5760405162461bcd60e51b8152600401610220906136aa565b60008581526001602052604090205460ff161561177b576000611320886118ed565b9050600061132d886118ed565b600088815260208190526040812060048101546005909101549293506001600160a01b03600160481b909104811692811691908516831480156113815750836001600160a01b0316826001600160a01b0316145b806113b95750826001600160a01b0316846001600160a01b03161480156113b95750846001600160a01b0316826001600160a01b0316145b9050806113fa5760405162461bcd60e51b815260206004820152600f60248201526e494e56414c49445f4f55545055545360881b6044820152606401610220565b5050506000878152602081905260409020600281015460038201546004909201549096509094506001600160a01b03838116600160481b909204161461143e579293925b600161145060608d0160408e016136e8565b6003811115611461576114616136d2565b14156115b957611492817f0000000000000000000000000000000000000000000000000000000000000000866122ed565b6114bd827f000000000000000000000000000000000000000000000000000000000000000087612339565b604051632e1a7d4d60e01b8152600481018690527f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031690632e1a7d4d90602401600060405180830381600087803b15801561151f57600080fd5b505af1158015611533573d6000803e3d6000fd5b50506040516312a5362360e01b8152600481018a90527f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031692506312a53623915087906024015b6000604051808303818588803b15801561159b57600080fd5b505af11580156115af573d6000803e3d6000fd5b5050505050611757565b60016115cb60608c0160408d016136e8565b60038111156115dc576115dc6136d2565b14156117015761160d817f000000000000000000000000000000000000000000000000000000000000000086612339565b611638827f0000000000000000000000000000000000000000000000000000000000000000876122ed565b604051632e1a7d4d60e01b8152600481018590527f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031690632e1a7d4d90602401600060405180830381600087803b15801561169a57600080fd5b505af11580156116ae573d6000803e3d6000fd5b50506040516312a5362360e01b8152600481018a90527f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031692506312a5362391508690602401611582565b61172c817f0000000000000000000000000000000000000000000000000000000000000000866122ed565b611757827f0000000000000000000000000000000000000000000000000000000000000000876122ed565b50505060008481526001602081905260408220805460ff1916821781558101919091555b96509650969350505050565b600061179582840184613a23565b90506117c57f00000000000000000000000000000000000000000000000000000000000000008260000151612432565b5084156117e05780515160208201516117e091903388612455565b83156117fe576117fe81600001516020015182602001513387612455565b5050505050565b600080611811836125dc565b15610bff576000838152600160208181526040808420805460ff19168417905590839052909120015461184e9084906001600160801b0316611c53565b60008581526020819052604090206004015491935091506118aa90600160481b81046001600160a01b031690339061189690620f424090600160301b900462ffffff16613ad5565b6118a59062ffffff1686613af7565b6122ed565b60008381526020819052604090206005810154600490910154610bff916001600160a01b031690339061189690620f424090600160301b900462ffffff16613ad5565b6000600161190160608401604085016136e8565b6003811115611912576119126136d2565b14156119b3577f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031663d0e30db0346040518263ffffffff1660e01b81526004016000604051808303818588803b15801561197357600080fd5b505af1158015611987573d6000803e3d6000fd5b507f00000000000000000000000000000000000000000000000000000000000000009695505050505050565b60026119c560608401604085016136e8565b60038111156119d6576119d66136d2565b14156119f2576119ec6040830160208401613b16565b92915050565b60405162461bcd60e51b815260206004820152600d60248201526c1253959053125117d253941555609a1b6044820152606401610220565b6000806000611a5a8b7f00000000000000000000000000000000000000000000000000000000000000008b6122ed565b611a858a7f00000000000000000000000000000000000000000000000000000000000000008a6122ed565b60006040518061016001604052808d6001600160a01b031681526020018c6001600160a01b031681526020018762ffffff1681526020018960020b81526020018860020b81526020018b81526020018a81526020016000815260200160008152602001306001600160a01b0316815260200142815250905060008060007f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03166388316456856040518263ffffffff1660e01b8152600401611b4e9190613b33565b6080604051808303816000875af1158015611b6d573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611b919190613bf7565b919950945092509050611ba7818985858d6127ac565b508b821015611be957611bdc8e7f00000000000000000000000000000000000000000000000000000000000000006000612339565b611be6828d613c33565b94505b8a811015611c2a57611c1d8d7f00000000000000000000000000000000000000000000000000000000000000006000612339565b611c27818c613c33565b93505b505050985098509895505050505050565b60006109438284613af7565b60006109438284613c4a565b6040805160a081018252600084815260208181528382205483526001600160801b038581169184019182528385018381526060850184815242608087019081529651630624e65f60e11b815286516004820152935190921660248401525160448301525160648201529251608484015291829190829081907f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031690630c49ccbe9060a40160408051808303816000875af1158015611d1d573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611d419190613c62565b6000898152602081905260409020549193509150611d609083836129f7565b60008981526020819052604090206001015491965094506001600160801b0380881691161015611dbb5760405162461bcd60e51b8152600401610220906020808252600490820152632147544560e01b604082015260600190565b600087815260208190526040902060010154611de19087906001600160801b0316613c86565b6000978852602088905260409097206001810180546fffffffffffffffffffffffffffffffff19166001600160801b0390991698909817909755505050600284018290556003909301839055929050565b60008060008360020b12611e49578260020b611e56565b8260020b611e5690613cae565b9050611e65620d89e719613ccb565b62ffffff16811115611e9d5760405162461bcd60e51b81526020600482015260016024820152601560fa1b6044820152606401610220565b600060018216611eb157600160801b611ec3565b6ffffcb933bd6fad37aa2d162d1a5940015b70ffffffffffffffffffffffffffffffffff1690506002821615611f02576080611efd826ffff97272373d413259a46990580e213a613af7565b901c90505b6004821615611f2c576080611f27826ffff2e50f5f656932ef12357cf3c7fdcc613af7565b901c90505b6008821615611f56576080611f51826fffe5caca7e10e4e61c3624eaa0941cd0613af7565b901c90505b6010821615611f80576080611f7b826fffcb9843d60f6159c9db58835c926644613af7565b901c90505b6020821615611faa576080611fa5826fff973b41fa98c081472e6896dfb254c0613af7565b901c90505b6040821615611fd4576080611fcf826fff2ea16466c96a3843ec78b326b52861613af7565b901c90505b6080821615611ffe576080611ff9826ffe5dee046a99a2a811c461f1969c3053613af7565b901c90505b610100821615612029576080612024826ffcbe86c7900a88aedcffc83b479aa3a4613af7565b901c90505b61020082161561205457608061204f826ff987a7253ac413176f2b074cf7815e54613af7565b901c90505b61040082161561207f57608061207a826ff3392b0822b70005940c7a398e4b70f3613af7565b901c90505b6108008216156120aa5760806120a5826fe7159475a2c29b7443b29c7fa6e889d9613af7565b901c90505b6110008216156120d55760806120d0826fd097f3bdfd2022b8845ad8f792aa5825613af7565b901c90505b6120008216156121005760806120fb826fa9f746462d870fdf8a65dc1f90e061e5613af7565b901c90505b61400082161561212b576080612126826f70d869a156d2a1b890bb3df62baf32f7613af7565b901c90505b618000821615612156576080612151826f31be135f97d08fd981231505542fcfa6613af7565b901c90505b6201000082161561218257608061217d826f09aa508b5b7a84e1c677de54f3e99bc9613af7565b901c90505b620200008216156121ad5760806121a8826e5d6af8dedb81196699c329225ee604613af7565b901c90505b620400008216156121d75760806121d2826d2216e584f5fa1ea926041bedfe98613af7565b901c90505b620800008216156121ff5760806121fa826b048a170391f7dc42444e8fa2613af7565b901c90505b60008460020b131561221a5761221781600019613cee565b90505b61222964010000000082613d02565b15612235576001612238565b60005b6122499060ff16602083901c613c4a565b949350505050565b600080836001600160a01b0316856001600160a01b03161115612272579293925b846001600160a01b0316866001600160a01b03161161229d57612296858585612ae0565b91506122e4565b836001600160a01b0316866001600160a01b031610156122d6576122c2868585612ae0565b91506122cf858785612b53565b90506122e4565b6122e1858585612b53565b90505b94509492505050565b73dac17f958d2ee523a2206206994597c13d831ec76001600160a01b03841614801561231857508015155b156123295761232983836000612339565b612334838383612339565b505050565b604080516001600160a01b038481166024830152604480830185905283518084039091018152606490920183526020820180516001600160e01b031663095ea7b360e01b17905291516000928392908716916123959190613d16565b6000604051808303816000865af19150503d80600081146123d2576040519150601f19603f3d011682016040523d82523d6000602084013e6123d7565b606091505b50915091508180156124015750805115806124015750808060200190518101906124019190613d32565b6117fe5760405162461bcd60e51b8152602060048201526002602482015261534160f01b6044820152606401610220565b600061243e8383612b9d565b9050336001600160a01b038216146119ec57600080fd5b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316846001600160a01b03161480156124965750804710155b156125a9577f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031663d0e30db0826040518263ffffffff1660e01b81526004016000604051808303818588803b1580156124f657600080fd5b505af115801561250a573d6000803e3d6000fd5b505060405163a9059cbb60e01b81526001600160a01b038681166004830152602482018690527f000000000000000000000000000000000000000000000000000000000000000016935063a9059cbb925060440190506020604051808303816000875af115801561257f573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906125a39190613d32565b506125d6565b6001600160a01b0383163014156125ca576125c5848383612c81565b6125d6565b6125d684848484612d7a565b50505050565b6000818152602081815260408083208151610120810183528154815260018201546001600160801b031693810193909352600280820154848401526003820154606085015260048083015480830b60808701526301000000810490920b60a086015262ffffff600160301b83041660c086018190526001600160a01b03600160481b909304831660e08701819052600590940154831661010087018190529451630b4c774160e11b815287957f000000000000000000000000000000000000000000000000000000000000000090941694631698ee82946126c3949193909290910161374a565b602060405180830381865afa1580156126e0573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612704919061377d565b90506000816001600160a01b0316633850c7bd6040518163ffffffff1660e01b815260040160e060405180830381865afa158015612746573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061276a91906137c7565b5050505050509050600061277d82612e84565b90508060020b846080015160020b1315801561115657508360a0015160020b8160020b13159695505050505050565b60008060008060007f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03166399fbab888b6040518263ffffffff1660e01b815260040161280291815260200190565b61018060405180830381865afa158015612820573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906128449190613d58565b50505050975097509750509650965050506040518061012001604052808b8152602001826001600160801b031681526020018981526020018881526020018460020b81526020018360020b81526020018762ffffff168152602001866001600160a01b03168152602001856001600160a01b03168152506000808b81526020019081526020016000206000820151816000015560208201518160010160006101000a8154816001600160801b0302191690836001600160801b03160217905550604082015181600201556060820151816003015560808201518160040160006101000a81548162ffffff021916908360020b62ffffff16021790555060a08201518160040160036101000a81548162ffffff021916908360020b62ffffff16021790555060c08201518160040160066101000a81548162ffffff021916908362ffffff16021790555060e08201518160040160096101000a8154816001600160a01b0302191690836001600160a01b031602179055506101008201518160050160006101000a8154816001600160a01b0302191690836001600160a01b0316021790555090505050505050505050505050565b6040805160808101825284815230602082019081526001600160801b0385811683850190815285821660608501908152945163fc6f786560e01b81528451600482015292516001600160a01b03908116602485015290518216604484015293511660648201526000928392917f00000000000000000000000000000000000000000000000000000000000000009091169063fc6f78659060840160408051808303816000875af1158015612aaf573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612ad39190613c62565b9097909650945050505050565b6000826001600160a01b0316846001600160a01b03161115612b00579192915b6001600160a01b038416612b496fffffffffffffffffffffffffffffffff60601b606085901b16612b318787613e39565b6001600160a01b0316866001600160a01b03166131bd565b6122499190613cee565b6000826001600160a01b0316846001600160a01b03161115612b73579192915b6122496001600160801b038316612b8a8686613e39565b6001600160a01b0316600160601b6131bd565b600081602001516001600160a01b031682600001516001600160a01b031610612bc557600080fd5b82826000015183602001518460400151604051602001612be79392919061374a565b60408051601f19818403018152908290528051602091820120612c62939290917fe34f199b19b2b4f47f68442619d555527d244f78a3297ea89325f843f87b8b5491016001600160f81b0319815260609390931b6bffffffffffffffffffffffff191660018401526015830191909152603582015260550190565b60408051601f1981840301815291905280516020909101209392505050565b604080516001600160a01b038481166024830152604480830185905283518084039091018152606490920183526020820180516001600160e01b031663a9059cbb60e01b1790529151600092839290871691612cdd9190613d16565b6000604051808303816000865af19150503d8060008114612d1a576040519150601f19603f3d011682016040523d82523d6000602084013e612d1f565b606091505b5091509150818015612d49575080511580612d49575080806020019051810190612d499190613d32565b6117fe5760405162461bcd60e51b815260206004820152600260248201526114d560f21b6044820152606401610220565b604080516001600160a01b0385811660248301528481166044830152606480830185905283518084039091018152608490920183526020820180516001600160e01b03166323b872dd60e01b1790529151600092839290881691612dde9190613d16565b6000604051808303816000865af19150503d8060008114612e1b576040519150601f19603f3d011682016040523d82523d6000602084013e612e20565b606091505b5091509150818015612e4a575080511580612e4a575080806020019051810190612e4a9190613d32565b612e7c5760405162461bcd60e51b815260206004820152600360248201526229aa2360e91b6044820152606401610220565b505050505050565b60006401000276a36001600160a01b03831610801590612ec0575073fffd8963efd1fc6a506488495d951d5263988d266001600160a01b038316105b612ef05760405162461bcd60e51b81526020600482015260016024820152602960f91b6044820152606401610220565b640100000000600160c01b03602083901b166001600160801b03811160071b81811c6001600160401b03811160061b90811c63ffffffff811160051b90811c61ffff811160041b90811c60ff8111600390811b91821c600f811160021b90811c918211600190811b92831c97908811961790941790921717909117171760808110612f8a57612f80607f82613c33565b83901c9150612f9b565b612f9581607f613c33565b83901b91505b60006040612faa608084613e59565b901b9050828302607f1c92508260801c80603f1b8217915083811c935050828302607f1c92508260801c80603e1b8217915083811c935050828302607f1c92508260801c80603d1b8217915083811c935050828302607f1c92508260801c80603c1b8217915083811c935050828302607f1c92508260801c80603b1b8217915083811c935050828302607f1c92508260801c80603a1b8217915083811c935050828302607f1c92508260801c8060391b8217915083811c935050828302607f1c92508260801c8060381b8217915083811c935050828302607f1c92508260801c8060371b8217915083811c935050828302607f1c92508260801c8060361b8217915083811c935050828302607f1c92508260801c8060351b8217915083811c935050828302607f1c92508260801c8060341b8217915083811c935050828302607f1c92508260801c8060331b8217915083811c935050828302607f1c92508260801c8060321b8217915050600081693627a301d71055774c8561312d9190613e98565b90506000608061314d6f028f6481ab7f045a5af012a19d003aaa84613e59565b901d90506000608061316f846fdb2df09e81959a81455e260799a0632f613f1d565b901d90508060020b8260020b146131ae57886001600160a01b031661319382611e32565b6001600160a01b031611156131a857816131b0565b806131b0565b815b9998505050505050505050565b6000808060001985870985870292508281108382030391505080600014156131f757600084116131ec57600080fd5b508290049050610943565b80841161320357600080fd5b60008486880960026001871981018816978890046003810283188082028403028082028403028082028403028082028403028082028403029081029092039091026000889003889004909101858311909403939093029303949094049190911702949350505050565b60006020828403121561327e57600080fd5b5035919050565b6001600160a01b038116811461329a57600080fd5b50565b60008083601f8401126132af57600080fd5b5081356001600160401b038111156132c657600080fd5b6020830191508360208285010111156132de57600080fd5b9250929050565b6000806000806000608086880312156132fd57600080fd5b853561330881613285565b9450602086013561331881613285565b93506040860135925060608601356001600160401b0381111561333a57600080fd5b6133468882890161329d565b969995985093965092949392505050565b60008060006040848603121561336c57600080fd5b833561337781613285565b925060208401356001600160401b0381111561339257600080fd5b61339e8682870161329d565b9497909650939450505050565b60005b838110156133c65781810151838201526020016133ae565b838111156125d65750506000910152565b60208152600082518060208401526133f68160408501602087016133ab565b601f01601f19169190910160400192915050565b60006060828403121561341c57600080fd5b50919050565b80356001600160401b03811681146112ad57600080fd5b600080600080600080600080610200898b03121561345657600080fd5b6134608a8a61340a565b975061346f8a60608b0161340a565b965061347e8a60c08b0161340a565b955061348e8a6101208b0161340a565b945061018089013593506101a089013592506134ad6101c08a01613422565b91506101e08901356134be81613285565b809150509295985092959890939650565b6000806000606084860312156134e457600080fd5b83356134ef81613285565b925060208401356134ff81613285565b915061350d60408501613422565b90509250925092565b6000806000806060858703121561352c57600080fd5b843561353781613285565b93506020850135925060408501356001600160401b0381111561355957600080fd5b6135658782880161329d565b95989497509550505050565b6000806000806000806101c0878903121561358b57600080fd5b613595888861340a565b95506135a4886060890161340a565b94506135b38860c0890161340a565b93506135c388610120890161340a565b925061018087013591506135da6101a08801613422565b90509295509295509295565b8060020b811461329a57600080fd5b60ff8116811461329a57600080fd5b6000806000806080858703121561361a57600080fd5b8435613625816135e6565b93506020850135613635816135e6565b92506040850135613645816135f5565b91506060850135613655816135f5565b939692955090935050565b6000806000806060858703121561367657600080fd5b843593506020850135925060408501356001600160401b0381111561355957600080fd5b8183823760009101908152919050565b6020808252600e908201526d24a72b20a624a22fa1a0a62622a960911b604082015260600190565b634e487b7160e01b600052602160045260246000fd5b6000602082840312156136fa57600080fd5b81356004811061094357600080fd5b634e487b7160e01b600052601160045260246000fd5b600062ffffff8083168185168183048111821515161561374157613741613709565b02949350505050565b6001600160a01b03938416815291909216602082015262ffffff909116604082015260600190565b80516112ad81613285565b60006020828403121561378f57600080fd5b815161094381613285565b80516112ad816135e6565b805161ffff811681146112ad57600080fd5b805180151581146112ad57600080fd5b600080600080600080600060e0888a0312156137e257600080fd5b87516137ed81613285565b60208901519097506137fe816135e6565b955061380c604089016137a5565b945061381a606089016137a5565b9350613828608089016137a5565b925060a0880151613838816135f5565b915061384660c089016137b7565b905092959891949750929550565b60006020828403121561386657600080fd5b8151610943816135e6565b634e487b7160e01b600052601260045260246000fd5b60008260020b8061389a5761389a613871565b808360020b0791505092915050565b80516001600160801b03811681146112ad57600080fd5b600080600080600080600080610100898b0312156138dd57600080fd5b6138e6896138a9565b9750602089015180600f0b81146138fc57600080fd5b80975050604089015195506060890151945060808901518060060b811461392257600080fd5b60a08a015190945061393381613285565b60c08a015190935063ffffffff8116811461394d57600080fd5b915061395b60e08a016137b7565b90509295985092959890939650565b60006001600160801b0380831681851680830382111561398c5761398c613709565b01949350505050565b60008160020b8360020b6000821282627fffff038213811516156139bb576139bb613709565b82627fffff190382128116156139d3576139d3613709565b50019392505050565b604051606081016001600160401b0381118282101715613a0c57634e487b7160e01b600052604160045260246000fd5b60405290565b62ffffff8116811461329a57600080fd5b60008183036080811215613a3657600080fd5b604051604081018181106001600160401b0382111715613a6657634e487b7160e01b600052604160045260246000fd5b6040526060821215613a7757600080fd5b613a7f6139dc565b91508335613a8c81613285565b82526020840135613a9c81613285565b60208301526040840135613aaf81613a12565b6040830152908152606083013590613ac682613285565b60208101919091529392505050565b600062ffffff80841680613aeb57613aeb613871565b92169190910492915050565b6000816000190483118215151615613b1157613b11613709565b500290565b600060208284031215613b2857600080fd5b813561094381613285565b81516001600160a01b0316815261016081016020830151613b5f60208401826001600160a01b03169052565b506040830151613b76604084018262ffffff169052565b506060830151613b8b606084018260020b9052565b506080830151613ba0608084018260020b9052565b5060a083015160a083015260c083015160c083015260e083015160e083015261010080840151818401525061012080840151613be6828501826001600160a01b03169052565b505061014092830151919092015290565b60008060008060808587031215613c0d57600080fd5b84519350613c1d602086016138a9565b6040860151606090960151949790965092505050565b600082821015613c4557613c45613709565b500390565b60008219821115613c5d57613c5d613709565b500190565b60008060408385031215613c7557600080fd5b505080516020909101519092909150565b60006001600160801b0383811690831681811015613ca657613ca6613709565b039392505050565b6000600160ff1b821415613cc457613cc4613709565b5060000390565b60008160020b627fffff19811415613ce557613ce5613709565b60000392915050565b600082613cfd57613cfd613871565b500490565b600082613d1157613d11613871565b500690565b60008251613d288184602087016133ab565b9190910192915050565b600060208284031215613d4457600080fd5b610943826137b7565b80516112ad81613a12565b6000806000806000806000806000806000806101808d8f031215613d7b57600080fd5b8c516bffffffffffffffffffffffff81168114613d9757600080fd5b9b50613da560208e01613772565b9a50613db360408e01613772565b9950613dc160608e01613772565b9850613dcf60808e01613d4d565b9750613ddd60a08e0161379a565b9650613deb60c08e0161379a565b9550613df960e08e016138a9565b94506101008d015193506101208d01519250613e186101408e016138a9565b9150613e276101608e016138a9565b90509295989b509295989b509295989b565b60006001600160a01b0383811690831681811015613ca657613ca6613709565b60008083128015600160ff1b850184121615613e7757613e77613709565b6001600160ff1b0384018313811615613e9257613e92613709565b50500390565b60006001600160ff1b0381841382841380821686840486111615613ebe57613ebe613709565b600160ff1b6000871282811687830589121615613edd57613edd613709565b60008712925087820587128484161615613ef957613ef9613709565b87850587128184161615613f0f57613f0f613709565b505050929093029392505050565b600080821280156001600160ff1b0384900385131615613f3f57613f3f613709565b600160ff1b8390038412811615613f5857613f58613709565b5050019056fea26469706673582212200662fce8f3519791a6feb78ecaa301c69e926ba41291a1547a1034b4cad2aac564736f6c634300080a0033";
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
    } | {
        stateMutability: string;
        type: string;
        inputs?: undefined;
        name?: undefined;
        outputs?: undefined;
    })[];
    static createInterface(): AsyncUniswapV3BridgeInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): AsyncUniswapV3Bridge;
}
export {};
//# sourceMappingURL=AsyncUniswapV3Bridge__factory.d.ts.map