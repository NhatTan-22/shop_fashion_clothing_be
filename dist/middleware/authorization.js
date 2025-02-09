"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UsersModel_1 = __importDefault(require("~/app/models/UsersModel"));
const enum_1 = require("~/utils/constants/enum");
const findUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield UsersModel_1.default.findOne({ _id: userId });
    return res;
});
const authorization = (permission) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (!req.userID) {
                return res.status(401).json({ message: "Unauthorized access" });
            }
            let { _id } = req.userID;
            if (!_id) {
                return res.status(403).json({
                    message: enum_1.MESSAGE_ENUM.WARNING_LOGIN,
                });
            }
            const user = yield findUser(_id);
            if (!user) {
                return res.status(403).json({
                    message: enum_1.MESSAGE_ENUM.WARNING_NOT_USER,
                });
            }
            if (!permission.includes(user.role)) {
                return res.status(401).json({
                    message: enum_1.MESSAGE_ENUM.WARNING_NOT_INTEREST,
                });
            }
            next();
        }
        catch (error) {
            res.status(500).json({ message: "Server error", error: error.message });
        }
    });
};
exports.default = authorization;
//# sourceMappingURL=authorization.js.map