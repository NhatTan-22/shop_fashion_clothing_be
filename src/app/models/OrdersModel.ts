import mongoose, { Model, Schema } from "mongoose";
import { IOrder } from "~/utils/interfaces/order";

const OrderSchema: Schema<IOrder> = new Schema(
  {
    sku: { type: String, required: true, unique: true },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    products: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        color: { type: String, required: true },
        size: { type: String, required: true },
        quantity: { type: Number, required: true, min: 1 },
        price: { type: Number, required: true },
      },
    ],
    totalPrice: { type: Number, required: true },
    discount: { type: Schema.Types.ObjectId, ref: "Coupon" },
    status: {
      type: String,
      enum: ["PENDING", "SHIPPED", "DELIVERED", "CANCELED"],
      default: "PENDING",
    },
    paymentStatus: {
      type: String,
      enum: ["PAID", "UNPAID"],
      default: "UNPAID",
    },
    shippingId: { type: Schema.Types.ObjectId, ref: "Shipping" },
  },
  {
    timestamps: true,
  }
);

const OrderModel: Model<IOrder> = mongoose.model<IOrder>("Order", OrderSchema);

export default OrderModel;
