import { Document, ObjectId } from "mongoose";

export interface IProduct extends Document {
  id: string;
  productCode?: string;
  productName?: string;
  productImage?: string;
  description?: string;
  supplierCode: string;
  status: boolean;
  price?: IPrice;
  variants: IVariant[];
  category: ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IPrice extends Document {
  sellingPrice?: number;
  importPrice?: number;
  promotionPrice?: number;
}

export interface IVariant extends Document {
  image: string;
  productColor: string;
  productSize: string;
  storeQuantity?: number;
  importQuantity?: number;
  sellingQuantity?: number;
}
