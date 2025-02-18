import mongoose, { Model, Schema } from "mongoose";
import { ICoupon } from "~/utils/interfaces/coupon";

const CouponSchema: Schema<ICoupon> = new Schema(
  {
    code: { type: String, required: true, unique: true },
    discountType: {
      type: String,
      enum: ["PERCENTAGE", "FIXED"],
      default: "PERCENTAGE",
    },
    value: { type: Number, required: true },
    minOrderValue: { type: Number, default: 0 },
    maxDiscount: { type: Number, default: null },
    expiryDate: { type: Date, required: true },
    usedCount: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ["ACTIVE", "EXPIRED", "USED_UP", "DISABLED", "PENDING"],
      default: "ACTIVE",
    },
  },
  {
    timestamps: true,
  }
);

const CouponModel: Model<ICoupon> = mongoose.model<ICoupon>(
  "Coupons",
  CouponSchema
);

export default CouponModel;
