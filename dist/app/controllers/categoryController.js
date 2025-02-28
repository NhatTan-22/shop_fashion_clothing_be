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
        const categoryLength = yield CategoriesModel_1.default.countDocuments();
        const categoryData = yield CategoriesModel_1.default.find({})
            .skip(skip)
            .limit(limitPage);
        return res.status(200).json({
            code: 1010,
            message: enum_1.MESSAGE_CATEGORY_ENUM.SUCCESS_GET_CATEGORY,
            data: {
                data: categoryData,
                pagination: {
                    lengthPage: categoryLength,
                    currentPage: Number(currentPage),
                },
            },
        });
    }
    catch (error) {
        return res.status(500).json({
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
        const query = search ? { name: { $regex: search, $options: "i" } } : {};
        const categoryData = yield CategoriesModel_1.default.find(query).limit(5);
        const dataSearch = categoryData.map((category) => ({
            value: category._id,
            label: `${category.name}`,
        }));
        return res.status(200).json({
            code: 1015,
            message: "Search success.",
            data: dataSearch,
        });
    }
    catch (error) {
        return res.status(500).json({
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
            name: body.name,
        });
        if (!isCategory) {
            return res.status(400).json({
                code: 1011,
                message: enum_1.MESSAGE_CATEGORY_ENUM.WARNING_CATEGORY_CODE,
            });
        }
        yield CategoriesModel_1.default.create(Object.assign(Object.assign({}, body), { image: req.file.path }));
        return res.status(201).json({
            code: 1010,
            message: enum_1.MESSAGE_CATEGORY_ENUM.SUCCESS_CREATE_CATEGORY,
        });
    }
    catch (error) {
        return res.status(500).json({
            code: 1013,
            message: error.message,
        });
    }
});
exports.addCategory = addCategory;
//# sourceMappingURL=categoryController.js.map