import { faker } from "@faker-js/faker";
import CategoryModel from "~/app/models/CategoriesModel";
import SupplierModel from "~/app/models/SuppliersModel";

export const seedSuppliers = async () => {
  const existingCount = await CategoryModel.countDocuments();
  if (existingCount > 0) {
    console.log("✅ Categorys đã tồn tại. Không cần seed.");
    return;
  }
  const categories = await CategoryModel.find();

  const usedSlugs = new Set<string>();

  const suppliers = Array.from({ length: 10 }).map(() => {
    const name = faker.company.name();
    const slug = faker.helpers.slugify(name.toLowerCase());

    if (usedSlugs.has(slug)) return;
    usedSlugs.add(slug);

    return {
      sku: faker.string.alphanumeric(8).toUpperCase(),
      supplierName: name,
      contactPerson: faker.person.fullName(),
      image: "https://static.vecteezy.com/system/resources/previews/009/734/564/non_2x/default-avatar-profile-icon-of-social-media-user-vector.jpg",
      phone: faker.phone.number(),
      email: faker.internet.email(),
      address: faker.location.streetAddress(),
      categories: faker.helpers.arrayElements(categories, 3).map(c => c._id),
      orderQuantity: faker.number.int({ min: 10, max: 100 }),
      importPrice: faker.number.float({ min: 100, max: 500 }),
      expectedArrivalDate: faker.date.soon(),
      lastRestockDate: faker.date.recent(),
      restockStatus: faker.helpers.arrayElement(['PENDING', 'SHIPPED', 'RECEIVED']),
      slug,
    };
  });

  await SupplierModel.insertMany(suppliers);
};
