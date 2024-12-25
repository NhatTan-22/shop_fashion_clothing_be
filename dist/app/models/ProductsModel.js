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
const PriceSchema = new mongoose_1.Schema({
    sellingPrice: { type: Number },
    importPrice: { type: Number },
    promotionPrice: { type: Number },
});
const SizeQuantitySchema = new mongoose_1.Schema({
    size: { type: String },
    storeQuantity: { type: Number },
    importQuantity: { type: Number },
    sellingQuantity: { type: Number },
});
const VariantSchema = new mongoose_1.Schema({
    image: { type: [String] },
    color: { type: String },
    sizes: SizeQuantitySchema,
});
const ProductSchema = new mongoose_1.Schema({
    productCode: {
        type: String,
        require: true,
    },
    productName: {
        type: String,
        require: true,
    },
    productImage: {
        type: String,
    },
    description: {
        type: String,
        require: true,
    },
    supplierCode: {
        type: String,
        require: true,
    },
    price: PriceSchema,
    variants: VariantSchema,
    category: {
        type: String,
        require: true,
    },
    status: {
        type: Boolean,
    },
}, { timestamps: true });
const ProductModel = mongoose_1.default.model("Products", ProductSchema);
exports.default = ProductModel;
//# sourceMappingURL=ProductsModel.js.map