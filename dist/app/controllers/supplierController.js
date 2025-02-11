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
exports.addSupplier = exports.getSuppliers = void 0;
const SuppliersModel_1 = __importDefault(require("../models/SuppliersModel"));
const enum_1 = require("~/utils/constants/enum");
// [GET] /suppliers
const getSuppliers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { search, currentPage, limitPage } = req.query;
        if (search) {
            const query = { supplierCode: { $regex: search, $options: "i" } };
            const supplierData = yield SuppliersModel_1.default.find(query).limit(5);
            // if (!supplierData.length) {
            //   return res.status(404).json({
            //     code: 1014,
            //     message: "Not found category.",
            //     data: [],
            //   });
            // }
            const dataSearch = supplierData.map((supplier) => ({
                value: supplier.supplierCode,
                label: `${supplier.supplierCode} - ${supplier.supplierName}`,
            }));
            return res.status(200).json({
                code: 1015,
                message: "Search success.",
                data: dataSearch,
            });
        }
        const skip = (currentPage - 1) * limitPage;
        const supplierLength = yield SuppliersModel_1.default.countDocuments();
        const supplierData = yield SuppliersModel_1.default.find({})
            .skip(skip)
            .limit(limitPage);
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
        return res.status(404).json({
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
        const isSupplierCode = yield SuppliersModel_1.default.find({
            supplierCode: body.supplierCode,
        });
        if (!isSupplierCode) {
            return res.status(404).json({
                code: 1011,
                message: enum_1.MESSAGE_SUPPLIER_ENUM.WARNING_SUPPLIER_CODE,
            });
        }
        if (typeof body.isTaking === "string") {
            body.isTaking = JSON.parse(body.isTaking);
        }
        const newSupplier = yield SuppliersModel_1.default.create(Object.assign(Object.assign({}, body), { isTaking: [0], supplierImage: req.file.path }));
        return res.status(201).json({
            code: 1010,
            message: enum_1.MESSAGE_SUPPLIER_ENUM.SUCCESS_CREATE_SUPPLIER,
            data: newSupplier,
        });
    }
    catch (error) {
        return res.status(404).json({
            code: 1013,
            message: error.message,
        });
    }
});
exports.addSupplier = addSupplier;
//# sourceMappingURL=supplierController.js.map