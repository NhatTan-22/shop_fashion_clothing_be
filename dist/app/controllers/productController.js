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
exports.deleteProduct = exports.addProduct = exports.getProducts = void 0;
const enum_1 = require("~/utils/constants/enum");
const ProductsModel_1 = __importDefault(require("../models/ProductsModel"));
// [GET] /products
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { currentPage, limitPage } = req.body;
        const skip = (currentPage - 1) * limitPage;
        const inventoryLength = yield ProductsModel_1.default.countDocuments();
        const inventoryData = yield ProductsModel_1.default.find({})
            .skip(skip)
            .limit(limitPage);
        res.status(200).json({
            code: 1010,
            data: {
                data: inventoryData,
                pagination: {
                    lengthPage: inventoryLength,
                    currentPage: Number(currentPage),
                },
            },
            message: enum_1.MESSAGE_PRODUCT_ENUM.SUCCESS_GET_PRODUCT,
        });
    }
    catch (error) {
        res.status(404).json({
            code: 1013,
            message: error.message,
        });
    }
});
exports.getProducts = getProducts;
// [POST] /products/new-add
const addProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const isProductCode = yield ProductsModel_1.default.find({
            sku: body.sku,
        });
        if (isProductCode) {
            return res.status(400).json({
                code: 1011,
                message: enum_1.MESSAGE_PRODUCT_ENUM.WARNING_PRODUCT_CODE,
            });
        }
        const newSupplier = yield ProductsModel_1.default.create(Object.assign(Object.assign({}, body), { supplierImage: req.file.path }));
        return res.status(201).json({
            code: 1010,
            message: enum_1.MESSAGE_PRODUCT_ENUM.SUCCESS_CREATE_PRODUCT,
            data: newSupplier,
        });
    }
    catch (error) {
        res.status(404).json({
            code: 1013,
            message: error.message,
        });
    }
});
exports.addProduct = addProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id } = req.params;
        if (!_id) {
            return res.status(400).json({
                code: 1011,
                message: `Not found product id: ${req.params._id}.`,
            });
        }
        yield ProductsModel_1.default.deleteOne({ _id });
        return res.status(200).json({
            code: 1010,
            message: `Delete product id: ${req.params._id} successfully.`,
            data: [],
        });
    }
    catch (error) {
        res.status(404).json({
            code: 1013,
            message: error.message,
        });
    }
});
exports.deleteProduct = deleteProduct;
//# sourceMappingURL=productController.js.map