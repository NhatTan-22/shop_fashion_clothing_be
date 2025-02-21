import { Document, ObjectId } from "mongoose";

export interface IBrand extends Document {
  _id: ObjectId;
  name: string;
  logo: string;
  slug: string;
  description: string;
  country: string;
  website: string;
  createdAt?: Date;
  updatedAt?: Date;
}
