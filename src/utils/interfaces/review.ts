import { Document, ObjectId } from "mongoose";

export interface IReview extends Document {
  _id: ObjectId;
  userId: ObjectId; // Liên kết với người dùng
  productId: ObjectId; // Liên kết với sản phẩm
  rating: Number; // Điểm đánh giá (1-5 sao)
  comment: String; // Bình luận
  createdAt?: Date;
  updatedAt?: Date;
}
