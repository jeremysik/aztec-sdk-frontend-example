/// <reference types="node" />
import { EthAddress } from '@aztec/barretenberg/address';
import { EthereumProvider, EthereumSignature, EthereumSigner, TypedData } from '@aztec/barretenberg/blockchain';
export declare class Web3Signer implements EthereumSigner {
    private provider;
    constructor(provider: EthereumProvider);
    signPersonalMessage(message: Buffer, address: EthAddress): Promise<Buffer>;
    signMessage(message: Buffer, address: EthAddress): Promise<Buffer>;
    signTypedData({ domain, types, message }: TypedData, address: EthAddress): Promise<EthereumSignature>;
    validateSignature(publicOwner: EthAddress, signature: Buffer, signingData: Buffer): boolean;
}
//# sourceMappingURL=web3_signer.d.ts.map