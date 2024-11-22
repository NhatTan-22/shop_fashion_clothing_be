import { Types } from "mongoose";

interface IPayloadAccessToken {
  _id: Types.ObjectId;
  email: string;
  role?: number;
}

export { IPayloadAccessToken };