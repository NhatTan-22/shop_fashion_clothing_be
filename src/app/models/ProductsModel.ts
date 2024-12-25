import mongoose, { Model, Schema } from "mongoose";
import {
  IPrice,
  IProduct,
  ISizeQuantity,
  IVariant,
} from "~/utils/interfaces/product";

const PriceSchema: Schema<IPrice> = new Schema({
  sellingPrice: { type: Number },
  importPrice: { type: Number },
  promotionPrice: { type: Number },
});

const SizeQuantitySchema: Schema<ISizeQuantity> = new Schema({
  size: { type: String },
  storeQuantity: { type: Number },
  importQuantity: { type: Number },
  sellingQuantity: { type: Number },
});

const VariantSchema: Schema<IVariant> = new Schema({
  image: { type: [String] },
  color: { type: String },
  sizes: SizeQuantitySchema,
});

const ProductSchema: Schema<IProduct> = new Schema(
  {
    productCode: {
      type: String,
      require: true,
    },
    productName: {
      type: String,
      require: true,
    },
    productImage: {
      type: String,
    },
    description: {
      type: String,
      require: true,
    },
    supplierCode: {
      type: String,
      require: true,
    },
    price: PriceSchema,
    variants: VariantSchema,
    category: {
      type: String,
      require: true,
    },
    status: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

const ProductModel: Model<IProduct> = mongoose.model<IProduct>(
  "Products",
  ProductSchema
);

export default ProductModel;
