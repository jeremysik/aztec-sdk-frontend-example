/// <reference types="node" />
import { EthAddress } from '@aztec/barretenberg/address';
import { EthereumProvider, SendTxOptions } from '@aztec/barretenberg/blockchain';
import { Contract } from 'ethers';
export declare class HashInputs {
    private hashInputsContractAddress;
    private provider;
    private defaults;
    hashInputs: Contract;
    constructor(hashInputsContractAddress: EthAddress, provider: EthereumProvider, defaults?: SendTxOptions);
    static deploy(provider: EthereumProvider, defaults?: SendTxOptions): Promise<HashInputs>;
    get address(): EthAddress;
    get contract(): Contract;
    computePublicInputHash(proofData: Buffer, options?: SendTxOptions): Promise<any>;
    validate(proofData: Buffer, options?: SendTxOptions): Promise<void>;
}
//# sourceMappingURL=hash_inputs.d.ts.map