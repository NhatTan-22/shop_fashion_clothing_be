import jwt from "jsonwebtoken";
import { MESSAGE_ENUM } from "~/utils/constants/enum";

const verifyToken = (req: any, res: any, next: any) => {
  const authorizationHeader = req.headers["authorization"];

  if (!authorizationHeader) {
    return res.status(401).json({
      code: 1017,
      message: MESSAGE_ENUM.ERROR_TOKEN_ACCESS_DENIED,
    });
  }

  const token = authorizationHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      code: 1018,
      message: MESSAGE_ENUM.ERROR_TOKEN_ACCESS_DENIED,
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET) as {
      _id: string;
      role: string;
    };
    req.userID = decoded;
    next();
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      return res.status(403).json({
        code: 1019,
        message: MESSAGE_ENUM.ERROR_TOKEN_EXPIRED,
      });
    }
    return res.status(403).json({
      code: 1020,
      message: MESSAGE_ENUM.ERROR_TOKEN_INVALID_TOKEN,
    });
  }
};

export default verifyToken;
