"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Libs
const express_1 = require("express");
// Others
const userController_1 = require("../app/controllers/userController");
const router = (0, express_1.Router)();
router.post("/login", userController_1.login);
router.post("/refresh", userController_1.refreshToken);
router.post("/register", userController_1.register);
exports.default = router;
//# sourceMappingURL=authRouter.js.map