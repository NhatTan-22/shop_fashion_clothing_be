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
  category: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IPrice extends Document {
  sellingPrice?: number;
  importPrice?: number;
  promotionPrice?: number;
}

export interface IVariant extends Document {
  image: [string];
  color: string;
  sizes: ISizeQuantity[];
}

export interface ISizeQuantity extends Document {
  size: string;
  storeQuantity?: number;
  importQuantity?: number;
  sellingQuantity?: number;
}
