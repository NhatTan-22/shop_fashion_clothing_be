import { Document, ObjectId } from "mongoose";

export interface IOrder extends Document {
  sku: object;
  userId: ObjectId;
  products: [
    {
      productId: ObjectId;
      color: string;
      size: string;
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
