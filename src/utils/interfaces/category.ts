import { Document, ObjectId } from "mongoose";

export interface ICategory extends Document {
  _id: ObjectId;
  logo: string;
  name: string;
  slug: string;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
}
