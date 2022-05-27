"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepositController = void 0;
const client_proofs_1 = require("@aztec/barretenberg/client_proofs");
const blockchain_1 = require("@aztec/blockchain");
const create_tx_ref_no_1 = require("./create_tx_ref_no");
const signDepositProof = async (signingData, depositor, ethSigner) => ethSigner.signMessage(signingData, depositor);
class DepositController {
    constructor(userId, userSigner, assetValue, fee, from, to, core, blockchain, provider) {
        this.userId = userId;
        this.userSigner = userSigner;
        this.assetValue = assetValue;
        this.fee = fee;
        this.from = from;
        this.to = to;
        this.core = core;
        this.blockchain = blockchain;
        this.provider = provider;
        const { assetId, value } = assetValue;
        if (!blockchain.getAsset(assetId)) {
            throw new Error('Unsupported asset');
        }
        if (!value && !fee.value) {
            throw new Error('Deposit value must be greater than 0.');
        }
        this.publicInput = { assetId, value: value + (fee.assetId === assetId ? fee.value : BigInt(0)) };
        this.requireFeePayingTx = !!fee.value && fee.assetId !== assetId;
    }
    async getPendingFunds() {
        const { assetId } = this.publicInput;
        const deposited = await this.blockchain.getUserPendingDeposit(assetId, this.from);
        const txs = await this.core.getRemoteUnsettledPaymentTxs();
        const unsettledDeposit = txs
            .filter(tx => tx.proofData.proofData.proofId === client_proofs_1.ProofId.DEPOSIT &&
            tx.proofData.publicAssetId === assetId &&
            tx.proofData.publicOwner.equals(this.from))
            .reduce((sum, tx) => sum + BigInt(tx.proofData.publicValue), BigInt(0));
        return deposited - unsettledDeposit;
    }
    async getRequiredFunds() {
        const { value } = this.publicInput;
        const pendingFunds = await this.getPendingFunds();
        return pendingFunds < value ? value - pendingFunds : BigInt(0);
    }
    async getPublicAllowance() {
        const { assetId } = this.publicInput;
        const { rollupContractAddress } = await this.core.getLocalStatus();
        return this.blockchain.getAsset(assetId).allowance(this.from, rollupContractAddress);
    }
    async approve() {
        const { assetId } = this.publicInput;
        const value = await this.getRequiredFunds();
        const { rollupContractAddress } = await this.core.getLocalStatus();
        return this.blockchain
            .getAsset(assetId)
            .approve(value, this.from, rollupContractAddress, { provider: this.provider });
    }
    async depositFundsToContract() {
        const { assetId } = this.publicInput;
        const value = await this.getRequiredFunds();
        this.txHash = await this.blockchain.depositPendingFunds(assetId, value, undefined, {
            signingAddress: this.from,
            provider: this.provider,
        });
        return this.txHash;
    }
    async depositFundsToContractWithPermit(deadline) {
        const { assetId } = this.publicInput;
        if (assetId === 0) {
            throw new Error('Permit flow unsupported for ETH.');
        }
        const value = await this.getRequiredFunds();
        const { signature } = await this.createPermitArgs(value, deadline);
        this.txHash = await this.blockchain.depositPendingFundsPermit(assetId, value, deadline, signature, undefined, {
            signingAddress: this.from,
            provider: this.provider,
        });
        return this.txHash;
    }
    async depositFundsToContractWithNonStandardPermit(deadline) {
        const { assetId } = this.publicInput;
        if (assetId === 0) {
            throw new Error('Permit flow unsupported for ETH.');
        }
        const { signature, nonce } = await this.createPermitArgsNonStandard(deadline);
        const value = await this.getRequiredFunds();
        this.txHash = await this.blockchain.depositPendingFundsPermitNonStandard(assetId, value, nonce, deadline, signature, undefined, {
            signingAddress: this.from,
            provider: this.provider,
        });
        return this.txHash;
    }
    async depositFundsToContractWithProofApproval() {
        const { assetId } = this.publicInput;
        const value = await this.getRequiredFunds();
        const proofHash = this.getTxId().toBuffer();
        this.txHash = await this.blockchain.depositPendingFunds(assetId, value, proofHash, {
            signingAddress: this.from,
            provider: this.provider,
        });
        return this.txHash;
    }
    async depositFundsToContractWithPermitAndProofApproval(deadline) {
        const { assetId } = this.publicInput;
        if (assetId === 0) {
            throw new Error('Permit flow unsupported for ETH.');
        }
        const value = await this.getRequiredFunds();
        const { signature } = await this.createPermitArgs(value, deadline);
        const proofHash = this.getTxId().toBuffer();
        this.txHash = await this.blockchain.depositPendingFundsPermit(assetId, value, deadline, signature, proofHash, {
            signingAddress: this.from,
            provider: this.provider,
        });
        return this.txHash;
    }
    async depositFundsToContractWithNonStandardPermitAndProofApproval(deadline) {
        const { assetId } = this.publicInput;
        if (assetId === 0) {
            throw new Error('Permit flow unsupported for ETH.');
        }
        const value = await this.getRequiredFunds();
        const { signature, nonce } = await this.createPermitArgsNonStandard(deadline);
        const proofHash = this.getTxId().toBuffer();
        this.txHash = await this.blockchain.depositPendingFundsPermitNonStandard(assetId, value, nonce, deadline, signature, proofHash, {
            signingAddress: this.from,
            provider: this.provider,
        });
        return this.txHash;
    }
    async awaitDepositFundsToContract() {
        if (!this.txHash) {
            throw new Error('Call depositFundsToContract() first.');
        }
        await this.blockchain.getTransactionReceipt(this.txHash);
    }
    async createProof(txRefNo = 0) {
        const { assetId, value } = this.publicInput;
        const privateOutput = this.requireFeePayingTx ? value : value - this.fee.value;
        const [recipientPrivateOutput, senderPrivateOutput] = this.to.equals(this.userId)
            ? [BigInt(0), privateOutput]
            : [privateOutput, BigInt(0)];
        if (this.requireFeePayingTx && !txRefNo) {
            txRefNo = (0, create_tx_ref_no_1.createTxRefNo)();
        }
        const spendingPublicKey = this.userSigner.getPublicKey();
        const proofInput = await this.core.createPaymentProofInput(this.userId, assetId, value, // publicInput,
        BigInt(0), // publicOutput
        BigInt(0), // privateInput
        recipientPrivateOutput, senderPrivateOutput, this.to, // noteRecipient
        this.from, // publicOwner
        spendingPublicKey, 0);
        proofInput.signature = await this.userSigner.signMessage(proofInput.signingData);
        this.proofOutput = await this.core.createPaymentProof(proofInput, txRefNo);
        if (this.requireFeePayingTx) {
            const feeProofInput = await this.core.createPaymentProofInput(this.userId, this.fee.assetId, BigInt(0), BigInt(0), this.fee.value, BigInt(0), BigInt(0), undefined, undefined, spendingPublicKey, 2);
            feeProofInput.signature = await this.userSigner.signMessage(feeProofInput.signingData);
            this.feeProofOutput = await this.core.createPaymentProof(feeProofInput, txRefNo);
        }
    }
    getSigningData() {
        return this.getTxId().toDepositSigningData();
    }
    getTxId() {
        if (!this.proofOutput) {
            throw new Error('Call createProof() first.');
        }
        return this.proofOutput.tx.txId;
    }
    async isProofApproved() {
        return !!(await this.blockchain.getUserProofApprovalStatus(this.from, this.getTxId().toBuffer()));
    }
    async approveProof() {
        return this.blockchain.approveProof(this.getTxId().toBuffer(), {
            signingAddress: this.from,
            provider: this.provider,
        });
    }
    async sign() {
        if (!this.proofOutput) {
            throw new Error('Call createProof() first.');
        }
        const ethSigner = new blockchain_1.Web3Signer(this.provider);
        const signingData = this.getSigningData();
        this.proofOutput.signature = await signDepositProof(signingData, this.from, ethSigner);
    }
    isSignatureValid() {
        if (!this.proofOutput) {
            throw new Error('Call createProof() and sign() first.');
        }
        const signingData = this.getSigningData();
        return (0, blockchain_1.validateSignature)(this.from, this.proofOutput.signature, signingData);
    }
    getProofs() {
        if (!this.proofOutput) {
            throw new Error('Call createProof() first.');
        }
        return this.requireFeePayingTx ? [this.proofOutput, this.feeProofOutput] : [this.proofOutput];
    }
    async send() {
        this.txIds = await this.core.sendProofs(this.getProofs());
        return this.txIds[0];
    }
    async awaitSettlement(timeout) {
        if (!this.txIds) {
            throw new Error('Call send() first.');
        }
        await Promise.all(this.txIds.map(txId => this.core.awaitSettlement(txId, timeout)));
    }
    async createPermitArgs(value, deadline) {
        const { assetId } = this.publicInput;
        const asset = this.blockchain.getAsset(assetId);
        const nonce = await asset.getUserNonce(this.from);
        const { rollupContractAddress, chainId } = await this.core.getLocalStatus();
        const permitData = (0, blockchain_1.createPermitData)(asset.getStaticInfo().name, this.from, rollupContractAddress, value, nonce, deadline, asset.getStaticInfo().address, chainId);
        const ethSigner = new blockchain_1.Web3Signer(this.provider);
        const signature = await ethSigner.signTypedData(permitData, this.from);
        return { signature };
    }
    async createPermitArgsNonStandard(deadline) {
        const { assetId } = this.publicInput;
        const asset = this.blockchain.getAsset(assetId);
        const nonce = await asset.getUserNonce(this.from);
        const { rollupContractAddress, chainId } = await this.core.getLocalStatus();
        const permitData = (0, blockchain_1.createPermitDataNonStandard)(asset.getStaticInfo().name, this.from, rollupContractAddress, nonce, deadline, asset.getStaticInfo().address, chainId);
        const ethSigner = new blockchain_1.Web3Signer(this.provider);
        const signature = await ethSigner.signTypedData(permitData, this.from);
        return { signature, nonce };
    }
}
exports.DepositController = DepositController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVwb3NpdF9jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbnRyb2xsZXJzL2RlcG9zaXRfY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFJQSxxRUFBNEQ7QUFFNUQsa0RBTTJCO0FBSTNCLHlEQUFtRDtBQUVuRCxNQUFNLGdCQUFnQixHQUFHLEtBQUssRUFBRSxXQUFtQixFQUFFLFNBQXFCLEVBQUUsU0FBeUIsRUFBRSxFQUFFLENBQ3ZHLFNBQVMsQ0FBQyxXQUFXLENBQUMsV0FBVyxFQUFFLFNBQVMsQ0FBQyxDQUFDO0FBRWhELE1BQWEsaUJBQWlCO0lBUTVCLFlBQ2tCLE1BQWlCLEVBQ2hCLFVBQWtCLEVBQ25CLFVBQXNCLEVBQ3RCLEdBQWUsRUFDZixJQUFnQixFQUNoQixFQUFhLEVBQ1osSUFBc0IsRUFDdEIsVUFBb0MsRUFDcEMsUUFBMEI7UUFSM0IsV0FBTSxHQUFOLE1BQU0sQ0FBVztRQUNoQixlQUFVLEdBQVYsVUFBVSxDQUFRO1FBQ25CLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdEIsUUFBRyxHQUFILEdBQUcsQ0FBWTtRQUNmLFNBQUksR0FBSixJQUFJLENBQVk7UUFDaEIsT0FBRSxHQUFGLEVBQUUsQ0FBVztRQUNaLFNBQUksR0FBSixJQUFJLENBQWtCO1FBQ3RCLGVBQVUsR0FBVixVQUFVLENBQTBCO1FBQ3BDLGFBQVEsR0FBUixRQUFRLENBQWtCO1FBRTNDLE1BQU0sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLEdBQUcsVUFBVSxDQUFDO1FBQ3RDLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ2pDLE1BQU0sSUFBSSxLQUFLLENBQUMsbUJBQW1CLENBQUMsQ0FBQztTQUN0QztRQUNELElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFO1lBQ3hCLE1BQU0sSUFBSSxLQUFLLENBQUMsdUNBQXVD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