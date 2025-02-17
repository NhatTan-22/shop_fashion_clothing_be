import { Document, ObjectId } from "mongoose";

export interface IBrand extends Document {
  _id: ObjectId;
  name: String;
  logo: String; // URL ảnh logo
  description: String;
  country: String; // Quốc gia thương hiệu
  createdAt?: Date;
  updatedAt?: Date;
}
