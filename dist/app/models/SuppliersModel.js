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
const mongoose_1 = __importStar(require("mongoose"));
const SupplierSchema = new mongoose_1.Schema({
    supplierImage: {
        type: String,
        default: "https://static.vecteezy.com/system/resources/previews/009/734/564/non_2x/default-avatar-profile-icon-of-social-media-user-vector.jpg",
    },
    supplierCode: {
        type: String,
        require: true,
    },
    supplierName: {
        type: String,
        require: true,
    },
    supplierPhone: {
        type: String,
        require: true,
    },
    supplierEmail: {
        type: String,
        require: true,
    },
    supplierAddress: {
        type: String,
        require: true,
    },
    productCode: {
        type: String,
        ref: "Product",
    },
    quantityImported: {
        type: Number,
        require: true,
        default: 0,
    },
    isTaking: {
        type: [Number],
        default: [0],
        enum: [0, 1, 2],
    },
}, {
    timestamps: true,
});
const SupplierModel = mongoose_1.default.model("Supplier", SupplierSchema);
exports.default = SupplierModel;
//# sourceMappingURL=SuppliersModel.js.map