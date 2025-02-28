import { MESSAGE_BRAND_ENUM, MESSAGE_ORDER_ENUM } from "~/utils/constants/enum";
import OrderModel from "../models/OrdersModel";
import CouponModel from "../models/CouponsModel";

// [GET] /suppliers
const getOrders = async (req: any, res: any) => {
  try {
    const { currentPage, limitPage } = req.query;
    const orderLength = await OrderModel.countDocuments();
    const skip = (currentPage - 1) * limitPage;

    const orderData = await OrderModel.find({})
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
      message: MESSAGE_ORDER_ENUM.SUCCESS_GET_ORDER,
      data: {
        data: orderData,
        pagination: {
          lengthPage: orderLength,
          currentPage: Number(currentPage),
        },
      },
    });
  } catch (error) {
    return res.status(500).json({
      code: 1013,
      message: error.message,
    });
  }
};

export { getOrders };
