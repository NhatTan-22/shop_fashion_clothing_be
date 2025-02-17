import { Document, ObjectId } from "mongoose";

export interface ICategory extends Document {
  _id: ObjectId;
  name: String;
  skuSupplier: String;
  description: String;
  createdAt?: Date;
  updatedAt?: Date;
}
