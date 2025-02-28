import { Document, ObjectId } from "mongoose";

export interface IBrand extends Document {
  _id: ObjectId;
  name: string;
  image: string;
  slug: string;
  description: string;
  country: string;
  website: string;
  suppliers?: ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
}
