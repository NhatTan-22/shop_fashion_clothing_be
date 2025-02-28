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
const router = (0, express_1.Router)();
router.use(verifyToken_1.default);
router.use((0, authorization_1.default)([0]));
router.get("/select", brandController_1.selectBrand);
router.post("/add-new", diskStorage_1.uploadImage, brandController_1.addBrand);
router.use((0, authorization_1.default)([0, 1]));
router.get("/", brandController_1.getBrand);
exports.default = router;
//# sourceMappingURL=brandRouter.js.map