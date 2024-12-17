import { Document } from "mongoose";

interface IUser extends IAdmin, Document {
  firstName?: string;
  lastName: string;
  photoUrl?: string;
  role: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface IUserLogin {
  email: string;
  password: string;
}

interface IAdmin extends IUserLogin {
  firstName?: string;
  lastName: string;
  photoUrl?: string;
  role: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export { IUser, IUserLogin, IAdmin };
