"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categoryController_1 = require("~/app/controllers/categoryController");
const authorization_1 = __importDefault(require("~/middleware/authorization"));
const verifyToken_1 = __importDefault(require("~/middleware/verifyToken"));
const router = (0, express_1.Router)();
router.use(verifyToken_1.default);
router.use((0, authorization_1.default)([0]));
router.post("/add-new", categoryController_1.addCategory);
exports.default = router;
//# sourceMappingURL=categoryRouter.js.map