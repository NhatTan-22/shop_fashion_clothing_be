"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const seeData_1 = require("./data/seeData");
const CategoriesModel_1 = __importDefault(require("./app/models/CategoriesModel"));
const SuppliersModel_1 = __importDefault(require("./app/models/SuppliersModel"));
const BrandsModel_1 = __importDefault(require("./app/models/BrandsModel"));
const ProductsModel_1 = __importDefault(require("./app/models/ProductsModel"));
const MONGO_URI = process.env.URL_DATA_MONGODB;
const seedDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(MONGO_URI);
        console.log("✅ Connected to MongoDB");
        const categoryDocs = yield CategoriesModel_1.default.insertMany(seeData_1.categories);
        console.log("🌱 Seeded Categories");
        const supplierWithCat = seeData_1.suppliers.map((s, i) => (Object.assign(Object.assign({}, s), { categories: [categoryDocs[i % categoryDocs.length]._id] })));
        const supplierDocs = yield SuppliersModel_1.default.insertMany(supplierWithCat);
        console.log("🌱 Seeded Suppliers");
        const brandWithSuppliers = seeData_1.brands.map((b, i) => (Object.assign(Object.assign({}, b), { suppliers: [
                supplierDocs[i % supplierDocs.length]._id,
                supplierDocs[(i + 1) % supplierDocs.length]._id,
            ] })));
        const brandDocs = yield BrandsModel_1.default.insertMany(brandWithSuppliers);
        console.log("🌱 Seeded Brands");
        const productDocs = (0, seeData_1.getProducts)(categoryDocs.map((category) => category._id), brandDocs.map((brand) => brand._id), supplierDocs.map((supplier) => supplier._id));
        yield ProductsModel_1.default.insertMany(productDocs);
        console.log("🌱 Seeded Products");
        console.log("🎉 Seed completed!");
    }
    catch (error) {
        console.error("❌ Seeding error:", error);
    }
    finally {
        yield mongoose_1.default.disconnect();
    }
});
seedDatabase();
//# sourceMappingURL=seed.js.map