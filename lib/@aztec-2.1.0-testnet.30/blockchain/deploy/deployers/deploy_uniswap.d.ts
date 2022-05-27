import { Contract, Signer } from 'ethers';
export declare const deployUniswapPair: (owner: Signer, router: Contract, asset: Contract, initialTokenSupply?: bigint, initialEthSupply?: bigint) => Promise<void>;
export declare const deployUniswap: (owner: Signer) => Promise<Contract>;
export declare const deployUniswapBridge: (signer: Signer, rollupProcessor: Contract, uniswapRouter: Contract) => Promise<Contract>;
//# sourceMappingURL=deploy_uniswap.d.ts.map