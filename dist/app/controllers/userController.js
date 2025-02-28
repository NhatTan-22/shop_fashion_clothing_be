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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshToken = exports.register = exports.login = void 0;
// Libs
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Others
const enum_1 = require("~/utils/constants/enum");
const UsersModel_1 = __importDefault(require("../models/UsersModel"));
const helper_1 = require("~/utils/constants/helper");
// [POST] /register
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const isMail = yield UsersModel_1.default.findOne({ email });
        if (isMail) {
            return res.status(400).json({
                code: 1012,
                message: enum_1.MESSAGE_ENUM.WARNING_LOGIN_EMAIL,
            });
        }
        const hasPassword = yield bcrypt_1.default.hash(password, 12);
        yield UsersModel_1.default.create(Object.assign(Object.assign({}, req.body), { password: hasPassword }));
        return res.status(201).json({
            code: 1010,
            message: enum_1.MESSAGE_ENUM.SUCCESS_REGISTER,
        });
    }
    catch (error) {
        return res.status(500).json({
            code: 1013,
            message: error.message,
        });
    }
});
exports.register = register;
// [POST] /login
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { email, password } = req.body;
    try {
        const user = yield UsersModel_1.default.findOne({ email });
        if (!user) {
            return res.status(404).json({
                code: 1011,
                message: enum_1.MESSAGE_ENUM.ERROR_LOGIN,
            });
        }
        const isMatchPassword = yield bcrypt_1.default.compare(password, user.password);
        if (!isMatchPassword) {
            return res.status(404).json({
                code: 1012,
                message: enum_1.MESSAGE_ENUM.ERROR_LOGIN_FAIL,
            });
        }
        const accessToken = yield (0, helper_1.getAccessToken)({
            _id: user._id,
            email: user.email,
            role: (_a = user.role) !== null && _a !== void 0 ? _a : enum_1.ROLE_ENUM.USER,
            tokenType: "AT",
        });
        const refreshToken = yield (0, helper_1.getRefreshToken)({
            _id: user._id,
            email: user.email,
            role: (_b = user.role) !== null && _b !== void 0 ? _b : enum_1.ROLE_ENUM.USER,
            tokenType: "RT",
        });
        user.refreshToken = refreshToken;
        yield user.save();
        const _c = user._doc, { password: hiddenPassword, refreshToken: hiddenToken, _id } = _c, resData = __rest(_c, ["password", "refreshToken", "_id"]);
        return res.status(200).json({
            code: 1010,
            message: enum_1.MESSAGE_ENUM.SUCCESS_LOGIN,
            data: resData,
            token: {
                access: accessToken,
                refresh: refreshToken,
            },
        });
    }
    catch (error) {
        return res.status(500).json({
            code: 1013,
            message: error.message,
        });
    }
});
exports.login = login;
// [POST] /refresh
const refreshToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken || !refreshToken.includes(refreshToken)) {
            return res.status(403).json({
                code: 1014,
                message: "Refresh token is invalid",
            });
        }
        jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json({
                    code: 1015,
                    message: "Refresh token expired",
                });
            }
            const newAccessToken = jsonwebtoken_1.default.sign({ _id: user._id, role: user.role }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "30m" });
            return res.status(200).json({
                code: 1011,
                message: "Refresh token successful",
                accessToken: newAccessToken,
            });
        });
    }
    catch (error) {
        return res.status(500).json({
            code: 1016,
            message: error.message || "Internal Server Error",
        });
    }
});
exports.refreshToken = refreshToken;
//# sourceMappingURL=userController.js.map