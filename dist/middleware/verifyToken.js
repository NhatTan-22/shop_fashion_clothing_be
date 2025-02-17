"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const enum_1 = require("~/utils/constants/enum");
const verifyToken = (req, res, next) => {
    const authorizationHeader = req.headers["authorization"];
    if (!authorizationHeader) {
        return res.status(401).json({
            code: 1017,
            message: enum_1.MESSAGE_ENUM.ERROR_TOKEN_ACCESS_DENIED,
        });
    }
    const token = authorizationHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({
            code: 1018,
            message: enum_1.MESSAGE_ENUM.ERROR_TOKEN_ACCESS_DENIED,
        });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.userID = decoded;
        next();
    }
    catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(403).json({
                code: 1019,
                message: enum_1.MESSAGE_ENUM.ERROR_TOKEN_EXPIRED,
            });
        }
        return res.status(403).json({
            code: 1020,
            message: enum_1.MESSAGE_ENUM.ERROR_TOKEN_INVALID_TOKEN,
        });
    }
};
exports.default = verifyToken;
//# sourceMappingURL=verifyToken.js.map