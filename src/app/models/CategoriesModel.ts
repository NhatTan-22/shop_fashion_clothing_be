import mongoose, { Schema } from "mongoose";

const CategoryScheme: Schema = new Schema(
  {
    isChecked: { type: Boolean, default: false },
    label: { type: String },
    supplierCode: { type: mongoose.Schema.Types.String, ref: "Supplier" },
  },
  { timestamps: true }
);

const CategoryModel =
  mongoose.models.Category || mongoose.model("Category", CategoryScheme);

export default CategoryModel;
