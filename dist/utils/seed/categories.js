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
exports.seedCategories = void 0;
const faker_1 = require("@faker-js/faker");
const CategoriesModel_1 = __importDefault(require("~/app/models/CategoriesModel"));
const seedCategories = () => __awaiter(void 0, void 0, void 0, function* () {
    const existingCount = yield CategoriesModel_1.default.countDocuments();
    if (existingCount > 0) {
        console.log("✅ Categories đã tồn tại. Không cần seed.");
        return;
    }
    const usedSlugs = new Set();
    const categories = [];
    while (categories.length < 10) {
        const name = faker_1.faker.commerce.department();
        const slug = faker_1.faker.helpers.slugify(name.toLowerCase());
        if (usedSlugs.has(slug))
            continue;
        usedSlugs.add(slug);
        categories.push({
            name,
            slug,
            description: faker_1.faker.commerce.productDescription(),
            image: `https://picsum.photos/seed/${faker_1.faker.string.uuid()}/400/300`,
        });
    }
    yield CategoriesModel_1.default.insertMany(categories);
});
exports.seedCategories = seedCategories;
//# sourceMappingURL=categories.js.map