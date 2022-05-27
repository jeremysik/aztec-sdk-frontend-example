export declare class BitConfig {
    readonly secondInputInUse: boolean;
    readonly secondOutputInUse: boolean;
    static EMPTY: BitConfig;
    constructor(secondInputInUse: boolean, secondOutputInUse: boolean);
    static fromBigInt(val: bigint): BitConfig;
    toBigInt(): bigint;
}
//# sourceMappingURL=bit_config.d.ts.map