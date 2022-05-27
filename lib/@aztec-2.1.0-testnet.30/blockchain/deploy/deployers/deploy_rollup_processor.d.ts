/// <reference types="node" />
import { Contract, Signer } from 'ethers';
export declare function deployRollupProcessor(signer: Signer, verifier: Contract, defiProxy: Contract, escapeHatchBlockLower: number, escapeHatchBlockUpper: number, initDataRoot: Buffer, initNullRoot: Buffer, initRootsRoot: Buffer, initDataSize: number, allowThirdPartyContracts: boolean): Promise<Contract>;
//# sourceMappingURL=deploy_rollup_processor.d.ts.map