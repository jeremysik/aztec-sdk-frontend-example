import { TreeInitData } from '@aztec/barretenberg/environment';
import { Signer } from 'ethers';
export declare function deployMainnet(signer: Signer, { dataTreeSize, roots }: TreeInitData, vk?: string): Promise<{
    rollup: import("ethers").Contract;
    priceFeeds: string[];
    feeDistributor: import("ethers").Contract;
}>;
//# sourceMappingURL=deploy_mainnet.d.ts.map