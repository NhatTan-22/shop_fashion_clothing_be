import { Document, ObjectId } from "mongoose";

export interface IProduct extends Document {
  _id: ObjectId;
  sku: String;
  name: String;
  description: String;
  pricing: {
    price: Number;
    promotionPrice: Number;
    discountPercentage: Number;
  };
  stock: Number;
  category: ObjectId;
  brand: ObjectId;
  supplier: ObjectId;
  sizes: [String];
  colors: [String];
  images: [String];
  ratings: Number;
  gender?: [String];
  status: String;
  availability: String;
  createdAt?: Date;
  updatedAt?: Date;
}
