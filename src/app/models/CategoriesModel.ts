import mongoose, { Model, Schema } from "mongoose";
import { generateSlug } from "~/middleware/slugMiddleware";
import { ICategory } from "~/utils/interfaces/category";

const CategoryScheme: Schema<ICategory> = new Schema(
  {
    image: { type: String },
    name: { type: String, required: true },
    slug: { type: String, unique: true, lowercase: true },
    description: { type: String },
  },
  { timestamps: true }
);

generateSlug(CategoryScheme);

const CategoryModel: Model<ICategory> = mongoose.model<ICategory>(
  "Category",
  CategoryScheme
);

export default CategoryModel;
