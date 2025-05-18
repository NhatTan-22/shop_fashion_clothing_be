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
exports.seedProducts = void 0;
const faker_1 = require("@faker-js/faker");
const BrandsModel_1 = __importDefault(require("~/app/models/BrandsModel"));
const CategoriesModel_1 = __importDefault(require("~/app/models/CategoriesModel"));
const ProductsModel_1 = __importDefault(require("~/app/models/ProductsModel"));
const SuppliersModel_1 = __importDefault(require("~/app/models/SuppliersModel"));
const seedProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    const existingCount = yield ProductsModel_1.default.countDocuments();
    if (existingCount > 0) {
        console.log("✅ Products đã tồn tại. Không cần seed.");
        return;
    }
    const categories = yield CategoriesModel_1.default.find();
    const brands = yield BrandsModel_1.default.find();
    const suppliers = yield SuppliersModel_1.default.find();
    const usedSlugs = new Set();
    const products = [];
    while (products.length < 10) {
        const name = faker_1.faker.commerce.productName();
        const slug = faker_1.faker.helpers.slugify(name.toLowerCase());
        if (usedSlugs.has(slug))
            continue;
        usedSlugs.add(slug);
        const price = faker_1.faker.number.float({ min: 20, max: 100 });
        const discountPercentage = faker_1.faker.number.int({ min: 10, max: 40 });
        const promotionPrice = +(price * (1 - discountPercentage / 100)).toFixed(2);
        return {
            sku: faker_1.faker.string.alphanumeric(8).toUpperCase(),
            name,
            slug,
            description: faker_1.faker.commerce.productDescription(),
            images: [faker_1.faker.image.urlPicsumPhotos(), faker_1.faker.image.urlPicsumPhotos()],
            pricing: {
                price,
                promotionPrice,
                discountPercentage,
            },
            category: faker_1.faker.helpers.arrayElement(categories)._id,
            brand: faker_1.faker.helpers.arrayElement(brands)._id,
            supplier: faker_1.faker.helpers.arrayElement(suppliers)._id,
            stock: faker_1.faker.number.int({ min: 5, max: 100 }),
            sizes: faker_1.faker.helpers.arrayElements(["S", "M", "L", "XL"], 3),
            colors: faker_1.faker.helpers.arrayElements(["Red", "Blue", "Green", "Black"], 2),
            ratings: faker_1.faker.number.float({ min: 3, max: 5 }),
            gender: faker_1.faker.helpers.arrayElement(["MALE", "FEMALE", "UNISEX"]),
            status: faker_1.faker.helpers.arrayElement(["ACTIVE", "DISCONTINUED"]),
            availability: faker_1.faker.helpers.arrayElement(["IN_STOCK", "OUT_OF_STOCK"]),
        };
    }
    yield ProductsModel_1.default.insertMany(products);
});
exports.seedProducts = seedProducts;
//# sourceMappingURL=products.js.map