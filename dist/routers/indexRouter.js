"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authRouter_1 = __importDefault(require("./authRouter"));
const supplierRouter_1 = __importDefault(require("./supplierRouter"));
const productRouter_1 = __importDefault(require("./productRouter"));
const categoryRouter_1 = __importDefault(require("./categoryRouter"));
const brandRouter_1 = __importDefault(require("./brandRouter"));
const orderRouter_1 = __importDefault(require("./orderRouter"));
const appRouter = (app) => {
    app.use("/auth", authRouter_1.default);
    app.use("/suppliers", supplierRouter_1.default);
    app.use("/products", productRouter_1.default);
    app.use("/brands", brandRouter_1.default);
    app.use("/categories", categoryRouter_1.default);
    app.use("/orders", orderRouter_1.default);
};
exports.default = appRouter;
//# sourceMappingURL=indexRouter.js.map