"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authRouter_1 = __importDefault(require("./authRouter"));
const appRouter = (app) => {
    app.use('/auth', authRouter_1.default);
};
exports.default = appRouter;
//# sourceMappingURL=indexRouter.js.map