"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productController_1 = require("~/app/controllers/productController");
const authorization_1 = __importDefault(require("~/middleware/authorization"));
const verifyToken_1 = __importDefault(require("~/middleware/verifyToken"));
const diskStorage_1 = require("~/storage/diskStorage");
const enum_1 = require("~/utils/constants/enum");
const router = (0, express_1.Router)();
router.get("/", productController_1.getProducts);
router.use(verifyToken_1.default);
router.use((0, authorization_1.default)([enum_1.ROLE_ENUM.ADMIN]));
router.post("/add-new", diskStorage_1.uploadMultipleImages, productController_1.addProduct);
router.post("/delete/:slug", productController_1.addProduct);
exports.default = router;
//# sourceMappingURL=productRouter.js.map