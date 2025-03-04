import { Document, ObjectId } from "mongoose";

export interface IReply {
  _id: ObjectId;
  userId: ObjectId;
  comment: string;
  dateComment: Date;
}

export interface IReview extends Document {
  _id: ObjectId;
  userId: ObjectId;
  productId: ObjectId;
  orderId?: ObjectId;
  parentId?: ObjectId | null;
  rating?: number;
  comment: string;
  images?: string[];
  likes?: number;
  replies?: IReply[];
  dateComment: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
