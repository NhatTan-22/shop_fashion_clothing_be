import { ObjectId } from "mongoose";
import UserModel from "~/app/models/UsersModel";
import { MESSAGE_ENUM } from "~/utils/constants/enum";

const findUser = async (userId: ObjectId) => {
  const res = await UserModel.findOne({ _id: userId });
  return res;
};

const authorization = (permission: number[]) => {
  return async (req: any, res: any, next: () => void) => {
    try {
      if (!req.userID) {
        return res.status(401).json({ message: "Unauthorized access" });
      }

      let { _id } = req.userID;

      if (!_id) {
        return res.status(403).json({
          message: MESSAGE_ENUM.WARNING_LOGIN,
        });
      }

      const user = await findUser(_id);

      if (!user) {
        return res.status(403).json({
          message: MESSAGE_ENUM.WARNING_NOT_USER,
        });
      }

      if (!permission.includes(user.role)) {
        return res.status(401).json({
          message: MESSAGE_ENUM.WARNING_NOT_INTEREST,
        });
      }
      next();
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
};

export default authorization;
