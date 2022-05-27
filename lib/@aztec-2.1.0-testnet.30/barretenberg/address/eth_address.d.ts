/// <reference types="node" />
export interface EthAddress {
    isZero(): boolean;
    equals(rhs: EthAddress): boolean;
    toString(): string;
    toBuffer(): Buffer;
    toBuffer32(): Buffer;
}
export declare class EthAddress {
    private buffer;
    static ZERO: EthAddress;
    constructor(buffer: Buffer);
    static fromString(address: string): EthAddress;
    static randomAddress(): EthAddress;
    static isAddress(address: string): boolean;
    static checkAddressChecksum(address: string): boolean;
    static toChecksumAddress(address: string): string;
}
//# sourceMappingURL=eth_address.d.ts.map