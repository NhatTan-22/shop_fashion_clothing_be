import OrderModel from "../models/OrdersModel";

// API: /financial-summary
const getSummary = async (req: any, res: any) => {
  try {
    const summaryData = await OrderModel.aggregate([
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

    const getMonthName = (month: number) =>
      new Date(2025, month - 1, 1).toLocaleString("en-US", { month: "short" });

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
  } catch (error) {
    console.error("Error fetching financial summary:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// PAI: /statistics/revenue-trend
const getStatistics = async (req: any, res: any) => {
  try {
    const revenueData = await OrderModel.aggregate([
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

    const getMonthName = (month: number) =>
      new Date(2025, month - 1, 1).toLocaleString("en-US", { month: "short" });

    const months = Array.from({ length: 12 }, (_, i) => ({
      month: getMonthName(i + 1),
      revenue: 0,
    }));

    revenueData.forEach((item) => {
      months[item._id.month - 1].revenue = item.totalRevenue;
    });

    res.json({ data: months });
  } catch (error) {
    console.error("Error fetching revenue trend:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { getSummary, getStatistics };
