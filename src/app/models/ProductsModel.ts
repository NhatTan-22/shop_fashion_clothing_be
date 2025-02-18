import mongoose, { Model, Schema } from "mongoose";
import { IProduct } from "~/utils/interfaces/product";

const ProductSchema: Schema<IProduct> = new Schema(
  {
    sku: { type: String, required: true, unique: true },
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
      ref: "Categories",
      required: true,
    },
    stock: { type: Number, required: true },
    brand: { type: Schema.Types.ObjectId, ref: "Brands" },
    supplier: { type: Schema.Types.ObjectId, ref: "Suppliers" },
    sizes: { type: [String], required: true },
    colors: { type: [String], required: true },
    ratings: { type: Number, min: 0, max: 5 },
    gender: {
      type: [String],
      enum: ["MALE", "FEMALE", "BOTH"],
      default: ["BOTH"],
    },
    status: {
      type: String,
      enum: ["ACTIVE", "DISCONTINUED"],
      default: "ACTIVE",
    },
    availability: {
      type: String,
      enum: ["IN_STOCK", "OUT_OF_STOCK"],
      default: "IN_STOCK",
    },
  },
  { timestamps: true }
);

const ProductModel: Model<IProduct> = mongoose.model<IProduct>(
  "Products",
  ProductSchema
);

export default ProductModel;
