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
exports.deleteSupplier = exports.searchSuppliers = exports.addSupplier = exports.getSuppliers = void 0;
const SuppliersModel_1 = __importDefault(require("../models/SuppliersModel"));
const enum_1 = require("~/utils/constants/enum");
const helper_1 = require("~/utils/constants/helper");
// [GET] /select
const searchSuppliers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { search } = req.query;
        const query = search ? { sku: { $regex: search, $options: "i" } } : {};
        const supplierData = yield SuppliersModel_1.default.find(query).limit(5);
        const dataSearch = supplierData.map((supplier) => ({
            value: supplier._id,
            label: `${supplier.sku} - ${supplier.supplierName}`,
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
exports.searchSuppliers = searchSuppliers;
// [GET] /suppliers
const getSuppliers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { currentPage, limitPage } = req.query;
        const supplierLength = yield SuppliersModel_1.default.countDocuments();
        const skip = (currentPage - 1) * limitPage;
        const supplierData = yield SuppliersModel_1.default.find({})
            .skip(skip)
            .limit(limitPage)
            .populate({
            path: "categories",
            select: "name",
        });
        return res.status(200).json({
            code: 1010,
            message: enum_1.MESSAGE_SUPPLIER_ENUM.SUCCESS_GET_SUPPLIER,
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
        return res.status(500).json({
            code: 1013,
            message: error.message,
        });
    }
});
exports.getSuppliers = getSuppliers;
// [POST] /suppliers/new-add
const addSupplier = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const supplierSku = (0, helper_1.generateTransactionId)("SUP");
        if (body.importPrice && body.importPrice < 999999) {
            body.importPrice *= 1000;
        }
        if (typeof req.body.categories === "string") {
            req.body.categories = JSON.parse(req.body.categories);
        }
        yield SuppliersModel_1.default.create(Object.assign(Object.assign({}, body), { sku: supplierSku, image: req.file.path }));
        return res.status(201).json({
            code: 1010,
            message: enum_1.MESSAGE_SUPPLIER_ENUM.SUCCESS_CREATE_SUPPLIER,
        });
    }
    catch (error) {
        return res.status(500).json({
            code: 1013,
            message: error.message,
        });
    }
});
exports.addSupplier = addSupplier;
// [DELETE] /:_id
const deleteSupplier = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id: idSupplier } = req.params;
        const isSupplier = yield SuppliersModel_1.default.findOne({ _id: idSupplier });
        if (isSupplier) {
            yield SuppliersModel_1.default.deleteOne({ _id: idSupplier });
            return res.status(200).json({
                code: 1010,
                message: enum_1.MESSAGE_SUPPLIER_ENUM.SUCCESS_DELETE_SUPPLIER,
            });
        }
    }
    catch (error) {
        return res.status(505).json({
            code: 1013,
            message: error.message,
        });
    }
});
exports.deleteSupplier = deleteSupplier;
//# sourceMappingURL=supplierController.js.map