/// <reference types="node" />
import { GrumpkinAddress } from '@aztec/barretenberg/address';
import { SchnorrSignature } from '@aztec/barretenberg/crypto';
import { Signer } from './signer';
interface Schnorr {
    constructSignature(message: Buffer, privateKey: Buffer): Promise<SchnorrSignature>;
}
export declare class SchnorrSigner implements Signer {
    private schnorr;
    private publicKey;
    private privateKey;
    constructor(schnorr: Schnorr, publicKey: GrumpkinAddress, privateKey: Buffer);
    getPublicKey(): GrumpkinAddress;
    signMessage(message: Buffer): Promise<SchnorrSignature>;
}
export {};
//# sourceMappingURL=schnorr_signer.d.ts.map