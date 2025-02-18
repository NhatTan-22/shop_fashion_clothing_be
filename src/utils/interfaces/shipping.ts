import { Document, ObjectId } from "mongoose";

export interface IShipping extends Document {
  _id: ObjectId;
  orderId: ObjectId;
  userId: ObjectId;
  address: String;
  city: String;
  country: String;
  zipCode: String;
  phone: String;
  status: String;
  estimatedDelivery: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
