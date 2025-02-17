import { Document, ObjectId } from "mongoose";

export interface ICoupon extends Document {
  _id: ObjectId;
  code: String;
  discountType: String;
  value: Number;
  minOrderValue: Number;
  maxDiscount: Number;
  usedCount: Number;
  expiryDate: Date;
  status: String;
  createdAt?: Date;
  updatedAt?: Date;
}
