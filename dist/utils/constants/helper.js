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
exports.getAccessToken = exports.createAdminUser = void 0;
// Libs
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Others
const enum_1 = require("./enum");
const UsersModel_1 = __importDefault(require("~/app/models/UsersModel"));
dotenv_1.default.config();
const adminData = {
    name: "Admin",
    email: process.env.EMAIL,
    password: process.env.PASSWORD,
    role: enum_1.ROLE_ENUM.ADMIN,
};
// Function Create Admin
const createAdminUser = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingAdmin = yield UsersModel_1.default.findOne({
            role: enum_1.ROLE_ENUM.ADMIN,
        });
        if (existingAdmin) {
            return "Admin user already exists.";
        }
        const hashedPassword = yield bcrypt_1.default.hash(adminData.password, 12);
        const newAdmin = new UsersModel_1.default(Object.assign(Object.assign({}, adminData), { password: hashedPassword }));
        yield newAdmin.save();
        return "Admin user created successfully!";
    }
    catch (error) {
        return `Error creating admin user: ${error}`;
    }
});
exports.createAdminUser = createAdminUser;
// Handle Get AccessToken
const getAccessToken = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const accessToken = jsonwebtoken_1.default.sign(payload, process.env.SECRET_KEY, {
        expiresIn: "30m",
    });
    return accessToken;
});
exports.getAccessToken = getAccessToken;
//# sourceMappingURL=helper.js.map