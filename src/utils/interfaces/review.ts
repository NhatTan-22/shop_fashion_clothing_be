import { Document, ObjectId } from "mongoose";

export interface IReview extends Document {
  _id: ObjectId;
  userId: ObjectId;
  productId: ObjectId;
  rating: Number;
  comment: String;
  createdAt?: Date;
  updatedAt?: Date;
}
