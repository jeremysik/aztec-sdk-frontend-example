"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyDao = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
let KeyDao = class KeyDao {
};
tslib_1.__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    tslib_1.__metadata("design:type", String)
], KeyDao.prototype, "name", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", Buffer)
], KeyDao.prototype, "value", void 0);
KeyDao = tslib_1.__decorate([
    (0, typeorm_1.Entity)({ name: 'key' })
], KeyDao);
exports.KeyDao = KeyDao;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2V5X2Rhby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhYmFzZS9zcWxfZGF0YWJhc2Uva2V5X2Rhby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEscUNBQXdEO0FBR3hELElBQWEsTUFBTSxHQUFuQixNQUFhLE1BQU07Q0FNbEIsQ0FBQTtBQUpDO0lBREMsSUFBQSx1QkFBYSxHQUFFOztvQ0FDSztBQUdyQjtJQURDLElBQUEsZ0JBQU0sR0FBRTtzQ0FDTSxNQUFNO3FDQUFDO0FBTFgsTUFBTTtJQURsQixJQUFBLGdCQUFNLEVBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUM7R0FDWCxNQUFNLENBTWxCO0FBTlksd0JBQU0ifQ==