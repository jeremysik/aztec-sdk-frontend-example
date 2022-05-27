"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTxRefNo = void 0;
const crypto_1 = require("@aztec/barretenberg/crypto");
const createTxRefNo = () => (0, crypto_1.randomBytes)(4).readUInt32BE(0);
exports.createTxRefNo = createTxRefNo;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlX3R4X3JlZl9uby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250cm9sbGVycy9jcmVhdGVfdHhfcmVmX25vLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHVEQUF5RDtBQUVsRCxNQUFNLGFBQWEsR0FBRyxHQUFHLEVBQUUsQ0FBQyxJQUFBLG9CQUFXLEVBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQXJELFFBQUEsYUFBYSxpQkFBd0MifQ==