import { faker } from "@faker-js/faker";
import BrandModel from "~/app/models/BrandsModel";
import CategoryModel from "~/app/models/CategoriesModel";
import ProductModel from "~/app/models/ProductsModel";
import SupplierModel from "~/app/models/SuppliersModel";

export const seedProducts = async () => {
  const existingCount = await ProductModel.countDocuments();
  if (existingCount > 0) {
    console.log("✅ Products đã tồn tại. Không cần seed.");
    return;
  }

  const categories = await CategoryModel.find();
  const brands = await BrandModel.find();
  const suppliers = await SupplierModel.find();

  const usedSlugs = new Set<string>();
  const products = [];

  while (products.length < 10) {
    const name = faker.commerce.productName();
    const slug = faker.helpers.slugify(name.toLowerCase());

    if (usedSlugs.has(slug)) continue;
    usedSlugs.add(slug);

    const price = faker.number.float({ min: 20, max: 100 });
    const discountPercentage = faker.number.int({ min: 10, max: 40 });
    const promotionPrice = +(price * (1 - discountPercentage / 100)).toFixed(2);

    return {
      sku: faker.string.alphanumeric(8).toUpperCase(),
      name,
      slug,
      description: faker.commerce.productDescription(),
      images: [faker.image.urlPicsumPhotos(), faker.image.urlPicsumPhotos()],
      pricing: {
        price,
        promotionPrice,
        discountPercentage,
      },
      category: faker.helpers.arrayElement(categories)._id,
      brand: faker.helpers.arrayElement(brands)._id,
      supplier: faker.helpers.arrayElement(suppliers)._id,
      stock: faker.number.int({ min: 5, max: 100 }),
      sizes: faker.helpers.arrayElements(["S", "M", "L", "XL"], 3),
      colors: faker.helpers.arrayElements(["Red", "Blue", "Green", "Black"], 2),
      ratings: faker.number.float({ min: 3, max: 5 }),
      gender: faker.helpers.arrayElement(["MALE", "FEMALE", "UNISEX"]),
      status: faker.helpers.arrayElement(["ACTIVE", "DISCONTINUED"]),
      availability: faker.helpers.arrayElement(["IN_STOCK", "OUT_OF_STOCK"]),
    };
  }

  await ProductModel.insertMany(products);
};
