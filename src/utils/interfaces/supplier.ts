import { Document } from "mongoose";

export interface ISupplier extends Document {
  supplierImage?: string;
  supplierMa: string;
  supplierName: string;
  supplierPhone: string;
  supplierEmail: string;
  address: string;
  supplierProduct: string[];
  isTaking: number[];
  createdAt?: Date;
  updatedAt?: Date;
}
