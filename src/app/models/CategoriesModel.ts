import mongoose, { Schema } from "mongoose";
import { generateSlug } from "~/middleware/slugMiddleware";
import { ICategory } from "~/utils/interfaces/category";

const CategoryScheme: Schema<ICategory> = new Schema(
  {
    logo: { type: String },
    slug: { type: String, unique: true, lowercase: true },
    name: { type: String, required: true },
    description: { type: String },
  },
  { timestamps: true }
);

generateSlug(CategoryScheme);

const CategoryModel =
  mongoose.models.Category || mongoose.model("Categories", CategoryScheme);

export default CategoryModel;
