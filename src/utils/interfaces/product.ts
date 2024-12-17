import { Document, ObjectId } from "mongoose";

export interface IProduct extends Document {
  productName: string;
  supplierMa: string;
  description: string;
  productPrice: number;
  category: string;
  stockQuantity: number;
  productImage: string[];
  productReviews: IReview[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IReview {
  customer_id: ObjectId;
  rating: number;
  review_text: string;
  created_at: Date;
}
