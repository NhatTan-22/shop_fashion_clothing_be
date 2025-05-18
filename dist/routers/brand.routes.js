"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const brandController_1 = require("~/app/controllers/brandController");
const authorization_1 = __importDefault(require("~/middleware/authorization"));
const verifyToken_1 = __importDefault(require("~/middleware/verifyToken"));
const diskStorage_1 = require("~/storage/diskStorage");
const enum_1 = require("~/utils/constants/enum");
const router = (0, express_1.Router)();
router.use(verifyToken_1.default);
router.get("/select", (0, authorization_1.default)([enum_1.ROLE_ENUM.ADMIN]), brandController_1.selectBrand);
router.post("/add-new", (0, authorization_1.default)([enum_1.ROLE_ENUM.ADMIN]), diskStorage_1.uploadImage, brandController_1.addBrand);
router.get("/", (0, authorization_1.default)([enum_1.ROLE_ENUM.ADMIN, enum_1.ROLE_ENUM.USER]), brandController_1.getBrand);
exports.default = router;
//# sourceMappingURL=brand.routes.js.map