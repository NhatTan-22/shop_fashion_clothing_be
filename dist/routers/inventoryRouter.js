"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const inventoryController_1 = require("~/app/controllers/inventoryController");
const verifyToken_1 = __importDefault(require("~/middleware/verifyToken"));
const router = (0, express_1.Router)();
router.use(verifyToken_1.default);
router.get("/inventories/add-new", inventoryController_1.addInventory);
router.get("/inventories", inventoryController_1.getInventories);
exports.default = router;
//# sourceMappingURL=inventoryRouter.js.map