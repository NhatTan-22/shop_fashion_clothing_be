import { Document, ObjectId } from "mongoose";

export interface IReview extends Document {
  _id: ObjectId;
  orderId: ObjectId; // Liên kết với đơn hàng
  userId: ObjectId; // Liên kết với người dùng
  paymentMethod: String; // "credit_card" | "paypal" | "cod"
  transactionId: String; // Mã giao dịch
  amount: Number; // Số tiền thanh toán
  status: String; // "success" | "failed" | "pending"
  createdAt?: Date;
  updatedAt?: Date;
}
