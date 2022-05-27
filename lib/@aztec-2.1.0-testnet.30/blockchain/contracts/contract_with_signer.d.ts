import { SendTxOptions, TxHash } from '@aztec/barretenberg/blockchain';
import { Contract } from 'ethers';
export declare class ContractWithSigner {
    private options;
    private readonly contract;
    constructor(contract: Contract, options?: SendTxOptions);
    sendTx(functionName: string, ...args: any[]): Promise<TxHash>;
}
//# sourceMappingURL=contract_with_signer.d.ts.map