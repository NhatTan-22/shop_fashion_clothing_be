import { Document } from "mongoose";

export interface ISupplier extends Document {
  supplierImage?: string;
  supplierCode: string;
  supplierName: string;
  supplierPhone: string;
  supplierEmail: string;
  supplierAddress: string;
  productCode: string;
  quantityImported: number;
  isTaking: [number];
  createdAt?: Date;
  updatedAt?: Date;
}
