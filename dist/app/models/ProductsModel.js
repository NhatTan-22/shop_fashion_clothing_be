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
const ProductSchema = new mongoose_1.Schema({
    sku: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String },
    images: [{ type: String }],
    pricing: {
        price: { type: Number, required: true },
        promotionPrice: { type: Number, required: true },
        discountPercentage: { type: Number, required: true },
    },
    category: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Categories",
        required: true,
    },
    stock: { type: Number, required: true },
    brand: { type: mongoose_1.Schema.Types.ObjectId, ref: "Brands" },
    supplier: { type: mongoose_1.Schema.Types.ObjectId, ref: "Suppliers" },
    sizes: { type: [String], required: true },
    colors: { type: [String], required: true },
    ratings: { type: Number, min: 0, max: 5 },
    gender: {
        type: [String],
        enum: ["MALE", "FEMALE", "BOTH"],
        default: ["BOTH"],
    },
    status: {
        type: String,
        enum: ["ACTIVE", "DISCONTINUED"],
        default: "active",
    },
    availability: {
        type: String,
        enum: ["IN_STOCK", "OUT_OF_STOCK"],
        default: "IN_STOCK",
    },
}, { timestamps: true });
const ProductModel = mongoose_1.default.model("Products", ProductSchema);
exports.default = ProductModel;
//# sourceMappingURL=ProductsModel.js.map