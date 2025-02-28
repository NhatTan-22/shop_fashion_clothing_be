import { Document, ObjectId } from "mongoose";

export interface ICategory extends Document {
  _id: ObjectId;
  image: string;
  name: string;
  slug: string;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
}
