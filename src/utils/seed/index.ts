import mongoose from 'mongoose';
import { seedCategories } from './categories';
import { seedSuppliers } from './suppliers';
import { seedBrands } from './brands';
import { seedProducts } from './products';
import dotenv from "dotenv";

dotenv.config();

const runSeed = async () => {
  try {
    const MONGO_URI = process.env.MONGO_URI;
    await mongoose.connect(MONGO_URI);

    await seedCategories();
    await seedSuppliers();
    await seedBrands();
    await seedProducts();

    console.log('🎉 All data seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

runSeed();
