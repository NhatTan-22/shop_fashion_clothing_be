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
exports.getCategory = exports.addCategory = void 0;
const CategoriesModel_1 = __importDefault(require("../models/CategoriesModel"));
// [GET] /category
const getCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { search } = req.query;
        if (search) {
            const query = { label: { $regex: search, $options: "i" } };
            const categoryData = yield CategoriesModel_1.default.find(query);
            //   if (!categoryData.length) {
            //     return res.status(404).json({
            //       code: 1014,
            //       message: "Not found category.",
            //       data: [],
            //     });
            //   }
            const dataSearch = categoryData.map((category) => ({
                value: category._id,
                label: category.label,
            }));
            return res.status(200).json({
                code: 1010,
                message: "Search success.",
                data: dataSearch,
            });
        }
    }
    catch (error) {
        return res.status(404).json({
            code: 1013,
            message: error.message,
        });
    }
});
exports.getCategory = getCategory;
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