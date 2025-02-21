"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Libs
const express_1 = require("express");
const supplierController_1 = require("~/app/controllers/supplierController");
const authorization_1 = __importDefault(require("~/middleware/authorization"));
const verifyToken_1 = __importDefault(require("~/middleware/verifyToken"));
const diskStorage_1 = require("~/storage/diskStorage");
const router = (0, express_1.Router)();
router.use(verifyToken_1.default);
router.use((0, authorization_1.default)([0]));
router.post("/new-add", diskStorage_1.uploadImage, supplierController_1.addSupplier);
router.delete("/:_id/delete", supplierController_1.deleteSupplier);
router.get("/select", supplierController_1.searchSuppliers);
router.get("/", supplierController_1.getSuppliers);
exports.default = router;
//# sourceMappingURL=supplierRouter.js.map