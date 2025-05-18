"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categoryController_1 = require("~/app/controllers/categoryController");
const authorization_1 = __importDefault(require("~/middleware/authorization"));
const verifyToken_1 = __importDefault(require("~/middleware/verifyToken"));
const diskStorage_1 = require("~/storage/diskStorage");
const enum_1 = require("~/utils/constants/enum");
const router = (0, express_1.Router)();
router.get("/", categoryController_1.getCategories);
router.use(verifyToken_1.default);
router.use((0, authorization_1.default)([0]));
router.get("/select", categoryController_1.searchCategories);
router.post("/add-new", diskStorage_1.uploadImage, categoryController_1.addCategory);
router.get("/select", (0, authorization_1.default)([enum_1.ROLE_ENUM.ADMIN]), categoryController_1.searchCategories);
router.post("/add-new", (0, authorization_1.default)([enum_1.ROLE_ENUM.ADMIN]), diskStorage_1.uploadImage, categoryController_1.addCategory);
exports.default = router;
//# sourceMappingURL=category.routes.js.map