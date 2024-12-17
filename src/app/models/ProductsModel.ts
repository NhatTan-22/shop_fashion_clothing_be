import mongoose, { Schema } from "mongoose";
import { IProduct } from "~/utils/interfaces/product";

const ProductSchema: Schema = new Schema({
  productName: {
    type: String,
    require: true,
  },
  productImage: {
    type: [String],
  },
  supplierMa: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  productPrice: {
    type: Number,
    require: true,
  },
  productReviews: {
    type: [
      {
        customer_id: {
          type: Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        rating: { type: Number, required: true },
        review_text: { type: String, required: true },
        created_at: { type: Date, required: true },
      },
    ],
    required: false,
  },
  category: {
    type: Number,
    require: true,
  },
  stockQuantity: {
    type: Number,
    require: true,
  },
});

const ProductModel =
  mongoose.models.Product ||
  mongoose.model<IProduct>("Products", ProductSchema);

export default ProductModel;
