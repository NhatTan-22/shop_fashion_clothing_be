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
exports.getOrders = void 0;
const enum_1 = require("~/utils/constants/enum");
const OrdersModel_1 = __importDefault(require("../models/OrdersModel"));
// [GET] /suppliers
const getOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { currentPage, limitPage } = req.query;
        const orderLength = yield OrdersModel_1.default.countDocuments();
        const skip = (currentPage - 1) * limitPage;
        const orderData = yield OrdersModel_1.default.find({})
            .skip(skip)
            .limit(limitPage)
            .populate({
            path: "User",
            select: ["name", "phone", 'email', "pricing"],
        })
            .populate({
            path: "Product",
            select: ["name", "images"],
        })
            .populate({
            path: "Coupon",
        })
            .populate({
            path: "Shipping",
        });
        return res.status(200).json({
            code: 1010,
            message: enum_1.MESSAGE_ORDER_ENUM.SUCCESS_GET_ORDER,
            data: {
                data: orderData,
                pagination: {
                    lengthPage: orderLength,
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
exports.getOrders = getOrders;
//# sourceMappingURL=orderController.js.map