import { CoreSdkServerStub } from '../../core_sdk';
import { JobQueue } from '../job_queue';
import { ChocolateCoreSdkOptions } from './chocolate_core_sdk_options';
/**
 * Construct a chocolate version of the sdk.
 * This creates a CoreSdk for running in some remote context, e.g. a shared worker.
 * It is wrapped in a network type adapter.
 * It is not interfaced with directly, but rather via a banana sdk, over some transport layer.
 */
export declare function createChocolateCoreSdk(jobQueue: JobQueue, options: ChocolateCoreSdkOptions): Promise<CoreSdkServerStub>;
//# sourceMappingURL=create_chocolate_core_sdk.d.ts.map