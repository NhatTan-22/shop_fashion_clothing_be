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
exports.generateTransactionId = exports.applyDiscount = exports.getRefreshToken = exports.getAccessToken = exports.createAdminUser = void 0;
// Libs
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Others
const enum_1 = require("./enum");
const UsersModel_1 = __importDefault(require("~/app/models/UsersModel"));
dotenv_1.default.config();
const adminData = {
    firstName: "Nhat",
    lastName: "Tan",
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
    const accessToken = jsonwebtoken_1.default.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "3h",
    });
    return accessToken;
});
exports.getAccessToken = getAccessToken;
// Handle Get RefreshToken
const getRefreshToken = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const refreshToken = jsonwebtoken_1.default.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "1y",
    });
    return refreshToken;
});
exports.getRefreshToken = getRefreshToken;
// Price calculation function after applying discount code
const applyDiscount = (price, discount) => {
    let finalPrice = price;
    if (discount.discountType === "PERCENTAGE") {
        let discountAmount = (price * discount.value) / 100;
        if (discount.maxDiscount) {
            discountAmount = Math.min(discountAmount, discount.maxDiscount);
        }
        finalPrice -= discountAmount;
    }
    else if (discount.discountType === "FIXED") {
        finalPrice -= discount.value;
    }
    return Math.max(finalPrice, 0);
};
exports.applyDiscount = applyDiscount;
// Transaction Code Generation Function
const generateTransactionId = (transactionType) => {
    const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase();
    const timestamp = Date.now();
    return `${transactionType}-${timestamp}-${randomPart}`;
};
exports.generateTransactionId = generateTransactionId;
//# sourceMappingURL=helper.js.map