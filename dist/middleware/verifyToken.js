"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const enum_1 = require("~/utils/constants/enum");
const verifyToken = (req, res, next) => {
    if (!req.headers["authorization"]) {
        return next();
    }
    const authorizationHeader = req.headers["authorization"];
    let token;
    if (authorizationHeader) {
        token = authorizationHeader.split(" ")[1];
    }
    if (!token) {
        return res.status(401).json({
            message: enum_1.MESSAGE_ENUM.ERROR_TOKEN_ACCESS_DENIED,
        });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY);
        req.userID = decoded;
        next();
    }
    catch (error) {
        return res.status(401).json({
            message: enum_1.MESSAGE_ENUM.ERROR_TOKEN_INVALID_TOKEN,
        });
    }
};
exports.default = verifyToken;
//# sourceMappingURL=verifyToken.js.map