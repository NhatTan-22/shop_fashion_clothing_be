import mongoose, { Schema } from "mongoose";
import { ICategory } from "~/utils/interfaces/category";

const CategoryScheme: Schema<ICategory> = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    skuSupplier: { type: mongoose.Schema.Types.String, ref: "Suppliers" },
  },
  { timestamps: true }
);

const CategoryModel =
  mongoose.models.Category || mongoose.model("Categories", CategoryScheme);

export default CategoryModel;
