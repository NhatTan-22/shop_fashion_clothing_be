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
exports.getStatistics = exports.getSummary = void 0;
const OrdersModel_1 = __importDefault(require("../models/OrdersModel"));
// API: /financial-summary
const getSummary = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const summaryData = yield OrdersModel_1.default.aggregate([
            {
                $match: { status: "DELIVERED" }, // Chỉ tính đơn hàng đã hoàn thành
            },
            {
                $unwind: "$items", // Tách từng sản phẩm trong đơn hàng
            },
            {
                $lookup: {
                    from: "products",
                    localField: "items.productId",
                    foreignField: "_id",
                    as: "productDetails",
                },
            },
            {
                $unwind: "$productDetails",
            },
            {
                $group: {
                    _id: { month: { $month: "$createdAt" } },
                    totalRevenue: { $sum: "$totalAmount" },
                    totalCost: {
                        $sum: {
                            $multiply: ["$items.quantity", "$productDetails.importPrice"],
                        },
                    },
                },
            },
            {
                $project: {
                    _id: 0,
                    month: "$_id.month",
                    revenue: "$totalRevenue",
                    cost: "$totalCost",
                    profit: { $subtract: ["$totalRevenue", "$totalCost"] },
                },
            },
            {
                $sort: { month: 1 },
            },
        ]);
        const getMonthName = (month) => new Date(2025, month - 1, 1).toLocaleString("en-US", { month: "short" });
        const months = Array.from({ length: 12 }, (_, i) => ({
            month: getMonthName(i + 1),
            revenue: 0,
            cost: 0,
            profit: 0,
        }));
        summaryData.forEach((item) => {
            months[item.month - 1].revenue = item.revenue;
            months[item.month - 1].cost = item.cost;
            months[item.month - 1].profit = item.profit;
        });
        res.json({ data: months });
    }
    catch (error) {
        console.error("Error fetching financial summary:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getSummary = getSummary;
// PAI: /statistics/revenue-trend
const getStatistics = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const revenueData = yield OrdersModel_1.default.aggregate([
            {
                $match: { status: "DELIVERED" }, // Chỉ tính đơn hàng đã giao thành công
            },
            {
                $group: {
                    _id: { month: { $month: "$createdAt" } },
                    totalRevenue: { $sum: "$totalAmount" }, // Tổng doanh thu theo tháng
                },
            },
            {
                $sort: { "_id.month": 1 },
            },
        ]);
        const getMonthName = (month) => new Date(2025, month - 1, 1).toLocaleString("en-US", { month: "short" });
        const months = Array.from({ length: 12 }, (_, i) => ({
            month: getMonthName(i + 1),
            revenue: 0,
        }));
        revenueData.forEach((item) => {
            months[item._id.month - 1].revenue = item.totalRevenue;
        });
        res.json({ data: months });
    }
    catch (error) {
        console.error("Error fetching revenue trend:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getStatistics = getStatistics;
//# sourceMappingURL=dashboardController.js.map