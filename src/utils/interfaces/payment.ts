import { Document, ObjectId } from "mongoose";

export interface IPayment extends Document {
  _id: ObjectId;
  orderId: ObjectId;
  userId: ObjectId; 
  paymentMethod: String; 
  transactionId: String;
  amount: Number;
  status: String;
  createdAt?: Date;
  updatedAt?: Date;
}
