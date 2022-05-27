import { TreeInitData } from '@aztec/barretenberg/environment';
import { Signer } from 'ethers';
export declare function deployDev(signer: Signer, { dataTreeSize, roots }: TreeInitData, vk?: string): Promise<{
    rollup: import("ethers").Contract;
    priceFeeds: string[];
    feeDistributor: import("ethers").Contract;
}>;
//# sourceMappingURL=deploy_dev.d.ts.map