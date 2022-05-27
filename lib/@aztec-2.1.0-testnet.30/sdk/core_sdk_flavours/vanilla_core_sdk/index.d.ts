import { LevelUp } from 'levelup';
import { CoreSdk, CoreSdkOptions } from '../../core_sdk';
import { DexieDatabase, SQLDatabase } from '../../database';
export declare function getLevelDb(memoryDb?: boolean, identifier?: string): LevelUp;
export declare function getDb(memoryDb?: boolean, identifier?: string): Promise<DexieDatabase | SQLDatabase>;
export interface VanillaCoreSdkOptions extends CoreSdkOptions {
    serverUrl: string;
    pollInterval?: number;
    memoryDb?: boolean;
    identifier?: string;
    numWorkers?: number;
}
/**
 * Construct a vanilla version of the CodeSdk.
 * This is used in backend node apps.
 * Dapps should use either strawberry or chocolate.
 */
export declare function createVanillaCoreSdk(options: VanillaCoreSdkOptions): Promise<CoreSdk>;
//# sourceMappingURL=index.d.ts.map