import mongoose, { Model, Schema } from "mongoose";
import { IOrder } from "~/utils/interfaces/order";

const OrderSchema: Schema<IOrder> = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "Users" },
    products: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Products",
          required: true,
        },
        quantity: { type: Number, required: true, min: 1 },
        price: { type: Number, required: true },
      },
    ],
    totalPrice: { type: Number, required: true },
    discount: { type: Schema.Types.ObjectId, ref: "Coupons" },
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
    shippingId: { type: Schema.Types.ObjectId, ref: "Shippings" },
  },
  {
    timestamps: true,
  }
);

const OrderModel: Model<IOrder> = mongoose.model<IOrder>("Orders", OrderSchema);

export default OrderModel;
