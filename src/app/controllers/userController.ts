// Libs
import bcrypt from "bcrypt";
// Others
import { MESSAGE_ENUM, ROLE_ENUM } from "~/utils/constants/enum";
import UserModel from "../models/UsersModel";
import { getAccessToken } from "~/utils/constants/helper";

// [POST] /register
const register = async (req: any, res: any) => {
  try {
    const { email, password } = req.body;

    const isMail = await UserModel.findOne({ email });

    if (isMail) {
      return res.status(400).json({
        code: 1012,
        message: MESSAGE_ENUM.WARNING_LOGIN_EMAIL,
      });
    }

    const hasPassword = await bcrypt.hash(password, 12);
    await UserModel.create({ ...req.body, password: hasPassword });

    return res.status(200).json({
      code: 1010,
      message: MESSAGE_ENUM.SUCCESS_REGISTER,
    });
  } catch (error) {
    res.status(404).json({
      code: 1013,
      message: error.message,
    });
  }
};

// [POST] /login
const login = async (req: any, res: any) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        code: 1011,
        message: MESSAGE_ENUM.ERROR_LOGIN,
      });
    }

    const isMatchPassword = await bcrypt.compare(password, user.password);
    if (!isMatchPassword) {
      return res.status(404).json({
        code: 1012,
        message: MESSAGE_ENUM.ERROR_LOGIN_FAIL,
      });
    }

    const payload = await getAccessToken({
      _id: user._id,
      email: user.email,
      role: user.role ?? ROLE_ENUM.USER,
    });

    const { password: _doc, ...resData } = user._doc;

    return res.status(200).json({
      code: 1010,
      message: MESSAGE_ENUM.SUCCESS_LOGIN,
      data: resData,
      token: {
        access: payload,
        refresh: "",
      },
    });
  } catch (error) {
    res.status(404).json({
      code: 1013,
      message: error.message,
    });
  }
};

export { login, register };
