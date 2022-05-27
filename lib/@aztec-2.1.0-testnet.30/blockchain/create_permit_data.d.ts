import { EthAddress } from '@aztec/barretenberg/address';
import { TypedData } from '@aztec/barretenberg/blockchain';
export declare function createPermitData(name: string, owner: EthAddress, spender: EthAddress, value: bigint, nonce: bigint, deadline: bigint, verifyingContract: EthAddress, chainId: number, version?: string): TypedData;
export declare function createPermitDataNonStandard(name: string, owner: EthAddress, spender: EthAddress, nonce: bigint, deadline: bigint, verifyingContract: EthAddress, chainId: number, version?: string): TypedData;
//# sourceMappingURL=create_permit_data.d.ts.map