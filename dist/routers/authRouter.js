"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Libs
const express_1 = require("express");
//
const userController_1 = require("../app/controllers/userController");
const router = (0, express_1.Router)();
router.post("/login", userController_1.login);
exports.default = router;
//# sourceMappingURL=authRouter.js.map