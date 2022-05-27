import { EthAddress } from '@aztec/barretenberg/address';
import { EthereumProvider, SendTxOptions, TxHash } from '@aztec/barretenberg/blockchain';
import { Contract } from 'ethers';
export declare class FeeDistributor {
    private feeDistributorContractAddress;
    private provider;
    private defaults;
    feeDistributor: Contract;
    constructor(feeDistributorContractAddress: EthAddress, provider: EthereumProvider, defaults?: SendTxOptions);
    get address(): EthAddress;
    get contract(): Contract;
    WETH(): Promise<EthAddress>;
    aztecFeeClaimer(): Promise<EthAddress>;
    feeLimit(): Promise<bigint>;
    convertConstant(): Promise<bigint>;
    txFeeBalance(asset: EthAddress): Promise<bigint>;
    deposit(asset: EthAddress, amount: bigint, options?: SendTxOptions): Promise<TxHash>;
    convert(asset: EthAddress, minOutputValue: bigint, options?: SendTxOptions): Promise<TxHash>;
    setConvertConstant(constant: bigint, options?: SendTxOptions): Promise<TxHash>;
    setFeeLimit(constant: bigint, options?: SendTxOptions): Promise<TxHash>;
    setFeeClaimer(address: EthAddress, options?: SendTxOptions): Promise<TxHash>;
    getLastReimbursement(): Promise<bigint>;
    private getContractWithSigner;
}
//# sourceMappingURL=fee_distributor.d.ts.map