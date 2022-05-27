import { EthereumProvider, RequestArguments } from '@aztec/barretenberg/blockchain/ethereum_provider';
import { Signer } from 'ethers';
import { Provider } from '@ethersproject/abstract-provider';
/**
 * Adapts an ethers provider into an EIP1193 compatible provider for injecting into the sdk.
 */
export declare class EthersAdapter implements EthereumProvider {
    private provider;
    constructor(ethersProvider: Signer | Provider);
    request(args: RequestArguments): Promise<any>;
    on(): this;
    removeListener(): this;
}
//# sourceMappingURL=ethers_adapter.d.ts.map