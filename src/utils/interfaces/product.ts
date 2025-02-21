import { Document, ObjectId } from "mongoose";

export interface IProduct extends Document {
  _id: ObjectId;
  sku: object;
  name: object;
  description: object;
  pricing: {
    price: number;
    promotionPrice: number;
    discountPercentage: number;
  };
  stock: number;
  category: ObjectId;
  brand?: ObjectId;
  supplier: ObjectId;
  sizes: [object];
  colors: [object];
  images: [object];
  ratings?: number;
  gender?: object;
  status: object;
  availability: object;
  slug: object;
  createdAt?: Date;
  updatedAt?: Date;
}
