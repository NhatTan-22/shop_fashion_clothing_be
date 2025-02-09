import mongoose, { Model, Schema, Types } from "mongoose";
import { IPrice, IProduct, IVariant } from "~/utils/interfaces/product";

const PriceSchema: Schema<IPrice> = new Schema({
  sellingPrice: { type: Number },
  importPrice: { type: Number },
  promotionPrice: { type: Number },
});

const VariantSchema: Schema<IVariant> = new Schema({
  image: { type: String },
  productColor: { type: String },
  productSize: { type: String },
  storeQuantity: { type: Number },
  importQuantity: { type: Number },
  sellingQuantity: { type: Number },
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
    supplierCode: { type: String, ref: "Supplier" },
    price: PriceSchema,
    variants: VariantSchema,
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
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
