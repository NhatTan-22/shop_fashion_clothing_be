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
exports.deleteProduct = exports.addProduct = exports.getDetailProduct = exports.getProducts = void 0;
const enum_1 = require("~/utils/constants/enum");
const ProductsModel_1 = __importDefault(require("../models/ProductsModel"));
// [GET] /products
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { currentPage, limitPage } = req.query;
        const skip = (currentPage - 1) * limitPage;
        const productLength = yield ProductsModel_1.default.countDocuments();
        const productData = yield ProductsModel_1.default.find({})
            .skip(skip)
            .limit(limitPage)
            .populate({
            path: "category",
            select: "name",
        })
            .populate({
            path: "supplier",
            select: "supplierName",
        });
        // .populate({
        //   path: "brand",
        // });
        res.status(200).json({
            code: 1010,
            data: {
                data: productData,
                pagination: {
                    lengthPage: productLength,
                    currentPage: Number(currentPage),
                },
            },
            message: enum_1.MESSAGE_PRODUCT_ENUM.SUCCESS_GET_PRODUCT,
        });
    }
    catch (error) {
        return res.status(500).json({
            code: 1013,
            message: error.message || "Lỗi server, vui lòng thử lại sau!",
        });
    }
});
exports.getProducts = getProducts;
// [GET] /products/detail/:slug
const getDetailProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { slug } = req.params;
        if (!slug) {
            return res.status(400).json({
                code: 1011,
                message: `Not found product id: ${slug}.`,
            });
        }
        const productData = yield ProductsModel_1.default.findOne({ slug: slug })
            .populate("category")
            .populate({
            path: "supplier",
            select: "supplierName",
        });
        // .populate({
        //   path: "brand",
        // });
        const relatedProducts = yield ProductsModel_1.default.find({
            category: productData.category,
            _id: { $ne: productData._id },
        }).limit(4);
        res.status(200).json({
            code: 1010,
            data: {
                data: productData,
                relate: relatedProducts,
            },
            message: enum_1.MESSAGE_PRODUCT_ENUM.SUCCESS_GET_PRODUCT,
        });
    }
    catch (error) {
        return res.status(500).json({
            code: 1013,
            message: error.message,
        });
    }
});
exports.getDetailProduct = getDetailProduct;
// [POST] /products/new-add
const addProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const isProduct = yield ProductsModel_1.default.findOne({ slug: body.slug });
        if (isProduct) {
            return res.status(400).json({
                code: 1011,
                message: enum_1.MESSAGE_PRODUCT_ENUM.WARNING_PRODUCT_CODE,
            });
        }
        const parsedBody = Object.assign(Object.assign({}, body), { pricing: typeof body.pricing === "string"
                ? JSON.parse(body.pricing)
                : body.pricing, sizes: typeof body.sizes === "string" ? JSON.parse(body.sizes) : body.sizes, colors: typeof body.colors === "string" ? JSON.parse(body.colors) : body.colors, stock: Number(body.stock) });
        let images = [];
        if (req.files && Array.isArray(req.files)) {
            images = req.files.map((file) => file.path);
        }
        const newProduct = yield ProductsModel_1.default.create(Object.assign(Object.assign({}, parsedBody), { images: images }));
        return res.status(201).json({
            code: 1010,
            message: enum_1.MESSAGE_PRODUCT_ENUM.SUCCESS_CREATE_PRODUCT,
        });
    }
    catch (error) {
        return res.status(500).json({
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
        return res.status(500).json({
            code: 1013,
            message: error.message,
        });
    }
});
exports.deleteProduct = deleteProduct;
//# sourceMappingURL=productController.js.map