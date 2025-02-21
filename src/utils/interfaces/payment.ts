import { Document, ObjectId } from "mongoose";

export interface IPayment extends Document {
  _id: ObjectId;
  orderId: ObjectId;
  userId: ObjectId; 
  paymentMethod: string; 
  transactionId: string;
  amount: number;
  status: string;
  createdAt?: Date;
  updatedAt?: Date;
}
