import mongoose, { Schema } from "mongoose";
import { ROLE_ENUM } from "~/utils/constants/enum";
import IUser from "~/utils/interfaces/user";

const User: Schema<IUser> = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    photoUrl: {
      type: String,
      default: "https://static.vecteezy.com/system/resources/previews/009/734/564/non_2x/default-avatar-profile-icon-of-social-media-user-vector.jpg",
    },
    role: {
      type: String,
      default: ROLE_ENUM.USER,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);


const UserModel = mongoose.model<IUser>("Users", User);

export default UserModel;
