import mongoose, { Model, Schema } from "mongoose";
import { IReview } from "~/utils/interfaces/review";

const ReviewSchema: Schema<IReview> = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "Users" },
    productId: { type: Schema.Types.ObjectId, ref: "Products" },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const ReviewModel: Model<IReview> = mongoose.model<IReview>(
  "Reviews",
  ReviewSchema
);

export default ReviewModel;
