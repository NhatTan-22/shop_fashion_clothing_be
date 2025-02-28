"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Libs
const express_1 = require("express");
const orderController_1 = require("~/app/controllers/orderController");
const authorization_1 = __importDefault(require("~/middleware/authorization"));
const verifyToken_1 = __importDefault(require("~/middleware/verifyToken"));
const router = (0, express_1.Router)();
router.use(verifyToken_1.default);
router.use((0, authorization_1.default)([0]));
// router.post("/new-add", uploadImage, addSupplier);
// router.delete("/:_id/delete", deleteSupplier);
router.get("/", orderController_1.getOrders);
exports.default = router;
//# sourceMappingURL=orderRouter.js.map