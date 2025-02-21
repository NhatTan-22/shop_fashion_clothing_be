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
exports.addBrand = exports.selectBrand = exports.getBrand = void 0;
const enum_1 = require("~/utils/constants/enum");
const BrandsModel_1 = __importDefault(require("../models/BrandsModel"));
const getBrand = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { currentPage, limitPage } = req.query;
        const skip = (currentPage - 1) * limitPage;
        const brandLength = yield BrandsModel_1.default.countDocuments();
        const brandData = yield BrandsModel_1.default.find({}).skip(skip).limit(limitPage);
        res.status(200).json({
            code: 1010,
            message: enum_1.MESSAGE_BRAND_ENUM.SUCCESS_GET_BRAND,
            data: {
                data: brandData,
                pagination: {
                    lengthPage: brandLength,
                    currentPage: currentPage,
                },
            },
        });
    }
    catch (error) {
        res.status(500).json({
            code: 1013,
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
});
exports.getBrand = getBrand;
const selectBrand = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { selectSearch } = req.query;
        const query = selectSearch
            ? { name: { $regex: selectSearch, $options: "i" } }
            : {};
        const brandData = yield BrandsModel_1.default.find(query).limit(5);
        const dataSearch = brandData.map((brand) => ({
            value: brand._id,
            label: `${brand.name}`,
        }));
        res.status(200).json({
            code: 1010,
            message: enum_1.MESSAGE_BRAND_ENUM.SUCCESS_SELECT_BRAND,
            data: dataSearch,
        });
    }
    catch (error) {
        res.status(500).json({
            code: 1013,
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
});
exports.selectBrand = selectBrand;
const addBrand = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const isBrand = yield BrandsModel_1.default.find({
            name: body.name,
        });
        if (isBrand) {
            return res.status(400).json({
                code: 1011,
                message: enum_1.MESSAGE_BRAND_ENUM.WARNING_BRAND_CREATE,
            });
        }
        yield BrandsModel_1.default.create({ body });
        res.status(200).json({
            code: 1010,
            message: enum_1.MESSAGE_BRAND_ENUM.SUCCESS_SELECT_BRAND,
        });
    }
    catch (error) {
        res.status(500).json({
            code: 1013,
            error: error instanceof Error ? error.message : enum_1.MESSAGE_BRAND_ENUM.ERROR_BRAND,
        });
    }
});
exports.addBrand = addBrand;
//# sourceMappingURL=brandController.js.map