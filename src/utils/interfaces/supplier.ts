import { Document, ObjectId } from "mongoose";

export interface ISupplier extends Document {
  _id: ObjectId;
  sku: String;
  name: String;
  contactPerson: String;
  image: String;
  email: String;
  phone: String;
  address: String;
  categories: [ObjectId];
  orderQuantity: Number;
  restockStatus: String; // "pending" | "shipped" | "received"
  expectedArrivalDate: Date;
  lastRestockDate?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
