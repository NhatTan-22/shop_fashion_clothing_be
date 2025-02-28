import mongoose, { Model, Schema } from "mongoose";
import { IShipping } from "~/utils/interfaces/shipping";

const ShippingSchema: Schema<IShipping> = new Schema(
  {
    orderId: { type: Schema.Types.ObjectId, ref: "Order", required: true },
    userId: { type: Schema.Types.ObjectId, ref: "Order", required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    zipCode: { type: String, required: true },
    phone: { type: String, required: true },
    status: {
      type: String,
      enum: ["PENDING", "IN TRANSIT", "DELIVERED"],
      default: "PENDING",
    },
    estimatedDelivery: { type: Date, required: true },
  },
  { timestamps: true }
);

const ShippingModel: Model<IShipping> = mongoose.model<IShipping>(
  "Shipping",
  ShippingSchema
);

export default ShippingModel;
