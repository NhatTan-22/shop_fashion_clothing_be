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
const categories_1 = require("./categories");
const suppliers_1 = require("./suppliers");
const brands_1 = require("./brands");
const products_1 = require("./products");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const runSeed = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const MONGO_URI = process.env.MONGO_URI;
        yield mongoose_1.default.connect(MONGO_URI);
        yield (0, categories_1.seedCategories)();
        yield (0, suppliers_1.seedSuppliers)();
        yield (0, brands_1.seedBrands)();
        yield (0, products_1.seedProducts)();
        console.log('🎉 All data seeded successfully!');
        process.exit(0);
    }
    catch (error) {
        console.error('❌ Seeding failed:', error);
        process.exit(1);
    }
});
runSeed();
//# sourceMappingURL=index.js.map