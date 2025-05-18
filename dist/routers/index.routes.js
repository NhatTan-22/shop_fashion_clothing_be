"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_routes_1 = __importDefault(require("./auth.routes"));
const supplier_routes_1 = __importDefault(require("./supplier.routes"));
const product_routes_1 = __importDefault(require("./product.routes"));
const category_routes_1 = __importDefault(require("./category.routes"));
const brand_routes_1 = __importDefault(require("./brand.routes"));
const order_routes_1 = __importDefault(require("./order.routes"));
const appRouter = (app) => {
    app.use("/auth", auth_routes_1.default);
    app.use("/suppliers", supplier_routes_1.default);
    app.use("/products", product_routes_1.default);
    app.use("/brands", brand_routes_1.default);
    app.use("/categories", category_routes_1.default);
    app.use("/orders", order_routes_1.default);
};
exports.default = appRouter;
//# sourceMappingURL=index.routes.js.map