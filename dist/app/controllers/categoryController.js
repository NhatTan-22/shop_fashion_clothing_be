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
exports.searchCategories = exports.getCategories = exports.addCategory = void 0;
const enum_1 = require("~/utils/constants/enum");
const CategoriesModel_1 = __importDefault(require("../models/CategoriesModel"));
// [GET] /categories
const getCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { currentPage, limitPage } = req.query;
        const skip = (currentPage - 1) * limitPage;
        const supplierLength = yield CategoriesModel_1.default.countDocuments();
        const supplierData = yield CategoriesModel_1.default.find({})
            .skip(skip)
            .limit(limitPage);
        return res.status(200).json({
            code: 1010,
            message: enum_1.MESSAGE_CATEGORY_ENUM.SUCCESS_GET_CATEGORY,
            data: {
                data: supplierData,
                pagination: {
                    lengthPage: supplierLength,
                    currentPage: Number(currentPage),
                },
            },
        });
    }
    catch (error) {
        return res.status(404).json({
            code: 1013,
            message: error.message,
        });
    }
});
exports.getCategories = getCategories;
// [GET] /select
const searchCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { search } = req.query;
        const query = search ? { label: { $regex: search, $options: "i" } } : {};
        const categoryData = yield CategoriesModel_1.default.find(query).limit(5);
        if (!categoryData.length) {
            return res.status(404).json({
                code: 1014,
                message: "Not found category.",
                data: [],
            });
        }
        const dataSearch = categoryData.map((supplier) => ({
            value: supplier.supplierCode,
            label: `${supplier.supplierCode} - ${supplier.supplierName}`,
        }));
        return res.status(200).json({
            code: 1015,
            message: "Search success.",
            data: dataSearch,
        });
    }
    catch (error) {
        return res.status(404).json({
            code: 1013,
            message: error.message,
        });
    }
});
exports.searchCategories = searchCategories;
// [POST] /category/new-add
const addCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const isCategory = yield CategoriesModel_1.default.find({
            label: body.label,
        });
        if (isCategory) {
            return res.status(400).json({
                code: 1011,
                message: "Category already exists.",
            });
        }
        const newCategory = yield CategoriesModel_1.default.create({
            body,
        });
        return res.status(201).json({
            code: 1010,
            message: "Create category successfully.",
            data: newCategory,
        });
    }
    catch (error) {
        return res.status(200).json({
            code: 1013,
            message: error.message,
        });
    }
});
exports.addCategory = addCategory;
//# sourceMappingURL=categoryController.js.map