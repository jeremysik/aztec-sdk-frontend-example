import { TreeInitData } from '@aztec/barretenberg/environment';
import { Signer } from 'ethers';
export declare function deployMainnetE2e(signer: Signer, { dataTreeSize, roots }: TreeInitData, vk?: string): Promise<{
    rollup: import("ethers").Contract;
    priceFeeds: string[];
    feeDistributor: import("ethers").Contract;
}>;
//# sourceMappingURL=deploy_mainnet_e2e.d.ts.map