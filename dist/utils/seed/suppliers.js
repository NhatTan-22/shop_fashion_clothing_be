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
exports.seedSuppliers = void 0;
const faker_1 = require("@faker-js/faker");
const CategoriesModel_1 = __importDefault(require("~/app/models/CategoriesModel"));
const SuppliersModel_1 = __importDefault(require("~/app/models/SuppliersModel"));
const seedSuppliers = () => __awaiter(void 0, void 0, void 0, function* () {
    const existingCount = yield CategoriesModel_1.default.countDocuments();
    if (existingCount > 0) {
        console.log("✅ Categorys đã tồn tại. Không cần seed.");
        return;
    }
    const categories = yield CategoriesModel_1.default.find();
    const usedSlugs = new Set();
    const suppliers = Array.from({ length: 10 }).map(() => {
        const name = faker_1.faker.company.name();
        const slug = faker_1.faker.helpers.slugify(name.toLowerCase());
        if (usedSlugs.has(slug))
            return;
        usedSlugs.add(slug);
        return {
            sku: faker_1.faker.string.alphanumeric(8).toUpperCase(),
            supplierName: name,
            contactPerson: faker_1.faker.person.fullName(),
            image: "https://static.vecteezy.com/system/resources/previews/009/734/564/non_2x/default-avatar-profile-icon-of-social-media-user-vector.jpg",
            phone: faker_1.faker.phone.number(),
            email: faker_1.faker.internet.email(),
            address: faker_1.faker.location.streetAddress(),
            categories: faker_1.faker.helpers.arrayElements(categories, 3).map(c => c._id),
            orderQuantity: faker_1.faker.number.int({ min: 10, max: 100 }),
            importPrice: faker_1.faker.number.float({ min: 100, max: 500 }),
            expectedArrivalDate: faker_1.faker.date.soon(),
            lastRestockDate: faker_1.faker.date.recent(),
            restockStatus: faker_1.faker.helpers.arrayElement(['PENDING', 'SHIPPED', 'RECEIVED']),
            slug,
        };
    });
    yield SuppliersModel_1.default.insertMany(suppliers);
});
exports.seedSuppliers = seedSuppliers;
//# sourceMappingURL=suppliers.js.map