// Libs
import bcrypt from "bcrypt";
//
import { MESSAGE_ENUM } from "~/utils/constants/enum";
import UserModel from "../models/UsersModel";
import { IUser } from "~/utils/interfaces/user";

// [POST] /login
const login = async (req: any, res: any) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        code: 1011,
        message: MESSAGE_ENUM.ERROR_LOGIN_EMAIL,
      });
    }

    const isMatchPassword = await bcrypt.compare(password, user.password);

    if (!isMatchPassword) {
      return res.status(404).json({
        code: 1012,
        message: MESSAGE_ENUM.ERROR_LOGIN,
      });
    }

    const { password: _doc, ...resData } = user._doc;

    return res.status(200).json({
      code: 1010,
      token: resData,
    });
  } catch (error) {
    res.status(404).json({
      code: 1013,
      message: error.message,
    });
  }
};

export { login };
