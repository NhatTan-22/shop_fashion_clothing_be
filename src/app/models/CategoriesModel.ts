import mongoose, { Schema } from "mongoose";

const CategoryScheme: Schema = new Schema(
  {
    isChecked: { type: Boolean, default: false },
    name: { type: String },
  },
  { timestamps: true }
);

const CategoryModel =
  mongoose.models.Category || mongoose.model("Category", CategoryScheme);

export default CategoryModel;
