import { Document, ObjectId } from "mongoose";

export interface ICoupon extends Document {
  _id: ObjectId;
  code: string;
  discountType: string;
  value: number;
  minOrderValue: number;
  maxDiscount: number;
  usedCount: number;
  expiryDate: Date;
  status: string;
  createdAt?: Date;
  updatedAt?: Date;
}
