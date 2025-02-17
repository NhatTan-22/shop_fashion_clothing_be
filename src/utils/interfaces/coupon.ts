import { Document, ObjectId } from "mongoose";

export interface ICoupon extends Document {
  _id: ObjectId;
  code: String; // Mã giảm giá
  discountType: String; // "percentage" | "fixed"
  value: Number; // Giá trị giảm giá (số tiền hoặc phần trăm)
  minOrderValue: Number; // Giá trị đơn hàng tối thiểu để áp dụng mã giảm giá
  maxDiscount: Number; // Giảm tối đa
  expiryDate: Date; // Ngày hết hạn mã giảm giá
  createdAt?: Date;
  updatedAt?: Date;
}
