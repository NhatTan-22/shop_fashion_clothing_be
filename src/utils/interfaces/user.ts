import { Document } from 'mongoose';

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  photoUrl?: string;
  role: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export default IUser;