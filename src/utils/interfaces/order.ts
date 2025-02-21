import { Document, ObjectId } from "mongoose";

export interface IOrder extends Document {
  _id: ObjectId;
  userId: ObjectId;
  products: [
    {
      productId: ObjectId;
      quantity: number;
      price: number;
    }
  ];
  totalPrice: number;
  discount: ObjectId;
  status: string;
  paymentStatus: string;
  shippingId: ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}
