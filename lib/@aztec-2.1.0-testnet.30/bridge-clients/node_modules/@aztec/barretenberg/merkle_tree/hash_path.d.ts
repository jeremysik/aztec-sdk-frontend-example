/// <reference types="node" />
export declare class HashPath {
    data: Buffer[][];
    constructor(data?: Buffer[][]);
    toBuffer(): Buffer;
    static fromBuffer(buf: Buffer, offset?: number): HashPath;
    static deserialize(buf: Buffer, offset?: number): {
        elem: HashPath;
        adv: number;
    };
}
//# sourceMappingURL=hash_path.d.ts.map