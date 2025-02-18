import { Document, ObjectId } from "mongoose";

export interface IBrand extends Document {
  _id: ObjectId;
  name: String;
  logo: String;
  description: String;
  country: String;
  website: String;
  createdAt?: Date;
  updatedAt?: Date;
}
