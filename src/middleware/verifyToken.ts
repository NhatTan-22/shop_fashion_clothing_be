import jwt from "jsonwebtoken";
import { MESSAGE_ENUM } from "~/utils/constants/enum";

const verifyToken = (
  req: { headers: { [x: string]: any }; userID: any },
  res: {
    status: (arg0: number) => {
      (): any;
      new (): any;
      json: { (arg0: { message: string }): any; new (): any };
    };
  },
  next: () => void
) => {
  if (!req.headers["authorization"]) {
    return next();
  }
  const authorizationHeader = req.headers["authorization"];
  let token: any;
  if (authorizationHeader) {
    token = authorizationHeader.split(" ")[1];
  }
  if (!token) {
    return res.status(401).json({
      message: MESSAGE_ENUM.ERROR_TOKEN_ACCESS_DENIED,
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.userID = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: MESSAGE_ENUM.ERROR_TOKEN_INVALID_TOKEN,
    });
  }
};

module.exports = verifyToken;