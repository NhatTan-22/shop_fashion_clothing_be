import { faker } from "@faker-js/faker";
import BrandModel from "~/app/models/BrandsModel";
import SupplierModel from "~/app/models/SuppliersModel";

export const seedBrands = async () => {
  const existingCount = await BrandModel.countDocuments();
  if (existingCount > 0) {
    console.log("✅ Brands đã tồn tại. Không cần seed.");
    return;
  }
  const suppliers = await SupplierModel.find();
  const usedSlugs = new Set<string>();

  const brands = Array.from({ length: 10 }).map(() => {
    const name = faker.company.name();
    const slug = faker.helpers.slugify(name.toLowerCase());

    if (usedSlugs.has(slug)) return;
    usedSlugs.add(slug);

    return {
      name,
      image: faker.image.urlPicsumPhotos(),
      slug,
      description: faker.company.catchPhrase(),
      country: faker.location.country(),
      website: faker.internet.url(),
      suppliers: faker.helpers.arrayElements(suppliers, 2).map((s) => s._id),
    };
  });

  await BrandModel.insertMany(brands);
};
