"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const inventoryController_1 = require("~/app/controllers/inventoryController");
const authorization_1 = __importDefault(require("~/middleware/authorization"));
const verifyToken_1 = __importDefault(require("~/middleware/verifyToken"));
const router = (0, express_1.Router)();
router.get("/", inventoryController_1.getProducts);
router.use(verifyToken_1.default);
router.use((0, authorization_1.default)([0]));
router.post("/add-new", inventoryController_1.addProduct);
router.post("/delete/:_id", inventoryController_1.addProduct);
exports.default = router;
//# sourceMappingURL=inventoryRouter.js.map