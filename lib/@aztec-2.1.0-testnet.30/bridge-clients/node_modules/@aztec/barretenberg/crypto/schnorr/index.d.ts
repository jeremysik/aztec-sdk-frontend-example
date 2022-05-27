/// <reference types="node" />
import { BarretenbergWasm } from '../../wasm';
import { SchnorrSignature } from './signature';
export * from './signature';
export declare class Schnorr {
    private wasm;
    constructor(wasm: BarretenbergWasm);
    constructSignature(msg: Uint8Array, pk: Uint8Array): SchnorrSignature;
    computePublicKey(pk: Uint8Array): Buffer;
    verifySignature(msg: Uint8Array, pubKey: Uint8Array, sig: SchnorrSignature): boolean;
    multiSigComputePublicKey(pk: Uint8Array): Buffer;
    multiSigValidateAndCombinePublicKeys(pubKeys: Buffer[]): Buffer;
    multiSigRoundOne(): {
        publicOutput: Buffer;
        privateOutput: Buffer;
    };
    multiSigRoundTwo(msg: Uint8Array, pk: Uint8Array, signerrRoundOnePrivateOutput: Buffer, pubKeys: Buffer[], roundOnePublicOutputs: Buffer[]): Buffer;
    multiSigCombineSignatures(msg: Uint8Array, pubKeys: Buffer[], roundOneOutputs: Buffer[], roundTwoOutputs: Buffer[]): SchnorrSignature;
}
//# sourceMappingURL=index.d.ts.map