import { Document, ObjectId } from "mongoose";

export interface ISupplier extends Document {
  _id: ObjectId;
  sku: string;
  slug: string;
  supplierName: string;
  contactPerson: string;
  image: string;
  email: string;
  phone: string;
  address: string;
  categories: [ObjectId];
  orderQuantity: number;
  restockStatus: string; // "pending" | "shipped" | "received"
  expectedArrivalDate: Date;
  lastRestockDate?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
