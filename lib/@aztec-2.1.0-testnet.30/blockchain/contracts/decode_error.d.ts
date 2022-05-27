import { EthereumProvider, RevertError, TxHash } from '@aztec/barretenberg/blockchain';
import { Contract } from 'ethers';
export interface Fragment {
    name: string;
    type: string;
    fullHash: string;
    inputs: string[];
}
export declare function decodeSelector(contract: Contract, selector: string): Fragment;
export declare function retrieveContractSelectors(contract: Contract, type?: string): {
    [key: string]: Fragment;
};
export declare function decodeErrorFromContract(contract: Contract, data: string): RevertError | undefined;
export declare function decodeErrorFromContractByTxHash(contract: Contract, txHash: TxHash, provider: EthereumProvider): Promise<RevertError | undefined>;
//# sourceMappingURL=decode_error.d.ts.map