import { Document, ObjectId } from "mongoose";

export interface IShipping extends Document {
  _id: ObjectId;
  orderId: ObjectId;
  userId: ObjectId;
  address: string;
  city: string;
  country: string;
  zipCode: string;
  phone: string;
  status: string;
  estimatedDelivery: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
