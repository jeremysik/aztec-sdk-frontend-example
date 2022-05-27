/// <reference types="node" />
import { EthAddress } from '@aztec/barretenberg/address';
import { EthereumProvider, SendTxOptions } from '@aztec/barretenberg/blockchain';
import { Contract } from 'ethers';
export declare class StandardVerifier {
    private verifierContractAddress;
    private provider;
    private defaults;
    verifier: Contract;
    constructor(verifierContractAddress: EthAddress, provider: EthereumProvider, defaults?: SendTxOptions);
    static deploy(provider: EthereumProvider, vk: string, defaults?: SendTxOptions): Promise<StandardVerifier>;
    get address(): EthAddress;
    get contract(): Contract;
    verify(proofData: Buffer, pubInputsHash: Buffer, options?: SendTxOptions): Promise<import("@ethersproject/bignumber").BigNumber>;
}
//# sourceMappingURL=standard_verifier.d.ts.map