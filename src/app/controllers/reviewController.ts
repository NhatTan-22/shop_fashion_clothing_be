import { MESSAGE_REVIEW_ENUM } from "~/utils/constants/enum";
import ReviewModel from "../models/ReviewsModel";

const getReviews = async (req: any, res: any) => {
  try {
    const { slug } = req.params;

    const reviews = await ReviewModel.find({ productId: slug });

    return res.status(200).json({
      code: 1010,
      message: MESSAGE_REVIEW_ENUM.SUCCESS_GET_REVIEW,
      data: reviews,
    });
  } catch (error) {
    return res.status(500).json({
      code: 1013,
      message: error.message || "Lỗi server, vui lòng thử lại sau!",
    });
  }
};

const addReview = async (req: any, res: any) => {
  try {
    const { body } = req.body;

    if (!body.comment.length) {
      return res.status(400).json({
        code: 1011,
        message: `Comment is required.`,
      });
    }

    const review = await ReviewModel.create(body);
    return res
      .status(201)
      .json({
        code: 1010,
        message: MESSAGE_REVIEW_ENUM.SUCCESS_CREATE_REVIEW,
        data: review,
      });
  } catch (error) {
    return res.status(500).json({ message: "Error adding review" });
  }
};

export { getReviews, addReview };
