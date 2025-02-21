import { Document, ObjectId } from "mongoose";

export interface IReview extends Document {
  _id: ObjectId;
  userId: ObjectId;
  productId: ObjectId;
  rating: number;
  comment: string;
  createdAt?: Date;
  updatedAt?: Date;
}
