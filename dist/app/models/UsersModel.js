"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
// Libs
const mongoose_1 = __importStar(require("mongoose"));
// Others
const enum_1 = require("~/utils/constants/enum");
const UserSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    photoUrl: {
        type: String,
        default: "https://th.bing.com/th/id/OIP.Gg0lRdcH7S-EO2NWbRzCMQAAAA?pid=ImgDet&w=167&h=183&c=7&dpr=1.3",
    },
    role: {
        type: Number,
        default: enum_1.ROLE_ENUM.USER,
        enum: [0, 1],
    },
    refreshToken: { type: String },
}, { timestamps: true });
const UserModel = mongoose_1.default.models.User || mongoose_1.default.model("User", UserSchema);
exports.default = UserModel;
//# sourceMappingURL=UsersModel.js.map