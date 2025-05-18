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
exports.seedBrands = void 0;
const faker_1 = require("@faker-js/faker");
const BrandsModel_1 = __importDefault(require("~/app/models/BrandsModel"));
const SuppliersModel_1 = __importDefault(require("~/app/models/SuppliersModel"));
const seedBrands = () => __awaiter(void 0, void 0, void 0, function* () {
    const existingCount = yield BrandsModel_1.default.countDocuments();
    if (existingCount > 0) {
        console.log("✅ Brands đã tồn tại. Không cần seed.");
        return;
    }
    const suppliers = yield SuppliersModel_1.default.find();
    const usedSlugs = new Set();
    const brands = Array.from({ length: 10 }).map(() => {
        const name = faker_1.faker.company.name();
        const slug = faker_1.faker.helpers.slugify(name.toLowerCase());
        if (usedSlugs.has(slug))
            return;
        usedSlugs.add(slug);
        return {
            name,
            image: faker_1.faker.image.urlPicsumPhotos(),
            slug,
            description: faker_1.faker.company.catchPhrase(),
            country: faker_1.faker.location.country(),
            website: faker_1.faker.internet.url(),
            suppliers: faker_1.faker.helpers.arrayElements(suppliers, 2).map((s) => s._id),
        };
    });
    yield BrandsModel_1.default.insertMany(brands);
});
exports.seedBrands = seedBrands;
//# sourceMappingURL=brands.js.map