import { Document, ObjectId } from "mongoose";

export interface IReview extends Document {
  _id: ObjectId;
  orderId: ObjectId; // Liên kết với đơn hàng
  userId: ObjectId; // Liên kết với người dùng
  address: String;
  city: String;
  country: String;
  zipCode: String;
  phone: String;
  status: String; // "pending" | "in transit" | "delivered"
  estimatedDelivery: Date; // Ngày dự kiến giao hàng
  createdAt?: Date;
  updatedAt?: Date;
}
