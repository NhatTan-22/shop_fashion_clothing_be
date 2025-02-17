import { Document, ObjectId } from "mongoose";

export interface IOrder extends Document {
  _id: ObjectId;
  userId: ObjectId;
  products: [
    {
      productId: ObjectId;
      quantity: Number;
      price: Number;
    }
  ];
  totalPrice: Number;
  discount: ObjectId;
  status: String;
  paymentStatus: String;
  shippingId: ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}
