import { EthereumProvider, RequestArguments } from '@aztec/barretenberg/blockchain';
export declare class JsonRpcProvider implements EthereumProvider {
    private host;
    private id;
    constructor(host: string);
    request({ method, params }: RequestArguments): Promise<any>;
    on(): this;
    removeListener(): this;
}
//# sourceMappingURL=json_rpc_provider.d.ts.map