import { Document, ObjectId } from "mongoose";

export interface ISupplier extends Document {
  _id: ObjectId;
  sku: object;
  slug: object;
  supplierName: string;
  contactPerson: string;
  image: object;
  email: string;
  phone: string;
  address: string;
  categories: string[];
  orderQuantity: number;
  restockStatus: string; // "pending" | "shipped" | "received"
  importPrice: number;
  expectedArrivalDate: Date;
  lastRestockDate?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
