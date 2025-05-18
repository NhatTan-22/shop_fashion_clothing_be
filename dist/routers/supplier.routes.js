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
const enum_1 = require("~/utils/constants/enum");
const router = (0, express_1.Router)();
router.use(verifyToken_1.default);
router.post("/new-add", (0, authorization_1.default)([enum_1.ROLE_ENUM.ADMIN]), diskStorage_1.uploadImage, supplierController_1.addSupplier);
router.delete("/:_id", (0, authorization_1.default)([enum_1.ROLE_ENUM.ADMIN]), supplierController_1.deleteSupplier);
router.get("/select", (0, authorization_1.default)([enum_1.ROLE_ENUM.ADMIN]), supplierController_1.searchSuppliers);
router.get("/", (0, authorization_1.default)([enum_1.ROLE_ENUM.ADMIN]), supplierController_1.getSuppliers);
exports.default = router;
//# sourceMappingURL=supplier.routes.js.map