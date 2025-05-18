import { faker } from "@faker-js/faker";
import CategoryModel from "~/app/models/CategoriesModel";

export const seedCategories = async () => {
  const existingCount = await CategoryModel.countDocuments();
  if (existingCount > 0) {
    console.log("✅ Categories đã tồn tại. Không cần seed.");
    return;
  }

  const usedSlugs = new Set<string>();
  const categories = [];

  while (categories.length < 10) {
    const name = faker.commerce.department();
    const slug = faker.helpers.slugify(name.toLowerCase());

    if (usedSlugs.has(slug)) continue;
    usedSlugs.add(slug);

    categories.push({
      name,
      slug,
      description: faker.commerce.productDescription(),
      image: `https://picsum.photos/seed/${faker.string.uuid()}/400/300`,
    });
  }

  await CategoryModel.insertMany(categories);
};
