// Libs
import mongoose, { Schema } from "mongoose";
// Others
import { ROLE_ENUM } from "~/utils/constants/enum";
import { IUser } from "~/utils/interfaces/user";

const UserSchema: Schema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
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
      default:
        "https://th.bing.com/th/id/OIP.Gg0lRdcH7S-EO2NWbRzCMQAAAA?pid=ImgDet&w=167&h=183&c=7&dpr=1.3",
    },
    role: {
      type: Number,
      default: ROLE_ENUM.USER,
    },
    refreshToken: { type: String },
  },
  { timestamps: true }
);

const UserModel =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default UserModel;
