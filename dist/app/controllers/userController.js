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
exports.register = exports.login = void 0;
// Libs
const bcrypt_1 = __importDefault(require("bcrypt"));
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
        return res.status(200).json({
            code: 1010,
            message: enum_1.MESSAGE_ENUM.SUCCESS_REGISTER,
        });
    }
    catch (error) {
        res.status(404).json({
            code: 1013,
            message: error.message,
        });
    }
});
exports.register = register;
// [POST] /login
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
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
        const payload = yield (0, helper_1.getAccessToken)({
            _id: user._id,
            email: user.email,
            role: (_a = user.role) !== null && _a !== void 0 ? _a : enum_1.ROLE_ENUM.USER,
            tokenType: "AT",
        });
        const _b = user._doc, { password: _doc } = _b, resData = __rest(_b, ["password"]);
        return res.status(200).json({
            code: 1010,
            message: enum_1.MESSAGE_ENUM.SUCCESS_LOGIN,
            data: resData,
            token: {
                access: payload,
                refresh: "",
            },
        });
    }
    catch (error) {
        res.status(404).json({
            code: 1013,
            message: error.message,
        });
    }
});
exports.login = login;
//# sourceMappingURL=userController.js.map