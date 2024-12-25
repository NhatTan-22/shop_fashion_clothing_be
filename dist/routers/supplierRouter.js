"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Libs
const express_1 = require("express");
const supplierController_1 = require("~/app/controllers/supplierController");
const verifyToken_1 = __importDefault(require("~/middleware/verifyToken"));
const diskStorage_1 = __importDefault(require("~/storage/diskStorage"));
const router = (0, express_1.Router)();
router.use(verifyToken_1.default);
router.post("/suppliers/new-add", diskStorage_1.default, supplierController_1.addSupplier);
router.get("/suppliers", supplierController_1.getSuppliers);
exports.default = router;
//# sourceMappingURL=supplierRouter.js.map