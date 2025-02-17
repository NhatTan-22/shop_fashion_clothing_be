// Libs
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// Others
import { MESSAGE_ENUM, ROLE_ENUM } from "~/utils/constants/enum";
import UserModel from "../models/UsersModel";
import { getAccessToken, getRefreshToken } from "~/utils/constants/helper";
import { IUser } from "~/utils/interfaces/user";

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

    return res.status(201).json({
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

    const accessToken = await getAccessToken({
      _id: user._id,
      email: user.email,
      role: user.role ?? ROLE_ENUM.USER,
      tokenType: "AT",
    });

    const refreshToken = await getRefreshToken({
      _id: user._id,
      email: user.email,
      role: user.role ?? ROLE_ENUM.USER,
      tokenType: "RT",
    });

    user.refreshToken = refreshToken;
    await user.save();

    const {
      password: hiddenPassword,
      refreshToken: hiddenToken,
      _id,
      ...resData
    } = user._doc;

    return res.status(200).json({
      code: 1010,
      message: MESSAGE_ENUM.SUCCESS_LOGIN,
      data: resData,
      token: {
        access: accessToken,
        refresh: refreshToken,
      },
    });
  } catch (error) {
    res.status(404).json({
      code: 1013,
      message: error.message,
    });
  }
};

// [POST] /refresh
const refreshToken = async (req: any, res: any) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken || !refreshToken.includes(refreshToken)) {
      return res.status(403).json({
        code: 1014,
        message: "Refresh token is invalid",
      });
    }

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err: any, user: IUser) => {
        if (err) {
          return res.status(403).json({
            code: 1015,
            message: "Refresh token expired",
          });
        }

        const newAccessToken = jwt.sign(
          { _id: user._id, role: user.role },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "30m" }
        );

        return res.status(200).json({
          code: 1011,
          message: "Refresh token successful",
          accessToken: newAccessToken,
        });
      }
    );
  } catch (error: any) {
    return res.status(500).json({
      code: 1016,
      message: error.message || "Internal Server Error",
    });
  }
};

export { login, register, refreshToken };
