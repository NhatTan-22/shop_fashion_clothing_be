import { Document, ObjectId } from "mongoose";

export interface IOrder extends Document {
  _id: ObjectId;
  userId: ObjectId; // Liên kết với người dùng
  products: [
    {
      productId: ObjectId;
      quantity: Number;
      price: Number; // Giá sản phẩm lúc đặt hàng
    }
  ];
  totalPrice: Number; // Tổng giá trị đơn hàng
  discount: ObjectId; // Liên kết với mã giảm giá (nếu có)
  status: String; // Trạng thái đơn hàng: "pending" | "shipped" | "delivered" | "canceled"
  paymentStatus: String; // "paid" | "unpaid"
  shippingId: ObjectId; // Liên kết với thông tin vận chuyển
  createdAt?: Date;
  updatedAt?: Date;
}
