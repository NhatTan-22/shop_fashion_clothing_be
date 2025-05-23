import mongoose, { Model, Schema } from "mongoose";
import { generateSlug } from "~/middleware/slugMiddleware";
import { IProduct } from "~/utils/interfaces/product";

const ProductSchema: Schema<IProduct> = new Schema(
  { 
    name: { type: String, required: true },
    description: { type: String },
    images: [{ type: String }],
    pricing: {
      price: { type: Number, required: true },
      promotionPrice: { type: Number, required: true },
      discountPercentage: { type: Number, required: true },
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    stock: { type: Number, required: true },
    brand: { type: Schema.Types.ObjectId, ref: "Brand" },
    supplier: { type: Schema.Types.ObjectId, ref: "Supplier" },
    sizes: { type: [String], required: true },
    colors: { type: [String], required: true },
    ratings: { type: Number, min: 0, max: 5, default: 5 },
    gender: {
      type: String,
      enum: ["MALE", "FEMALE", "UNISEX"],
      default: "UNISEX",
    },
    status: {
      type: String,
      enum: ["ACTIVE", "DISCONTINUED"],
      default: "ACTIVE",
    },
    availability: {
      type: String,
      enum: ["IN STOCK", "OUT OF STOCK"],
      default: "IN STOCK",
    },
    slug: { type: String, unique: true, lowercase: true },
  },
  { timestamps: true }
);

generateSlug(ProductSchema);

const ProductModel: Model<IProduct> = mongoose.model<IProduct>(
  "Product",
  ProductSchema
);

export default ProductModel;
