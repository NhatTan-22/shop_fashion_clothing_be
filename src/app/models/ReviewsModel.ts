import mongoose, { Model, Schema } from "mongoose";
import { IReview } from "~/utils/interfaces/review";

const ReviewSchema: Schema<IReview> = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    productId: { type: Schema.Types.ObjectId, ref: "Product" },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const ReviewModel: Model<IReview> = mongoose.model<IReview>(
  "Review",
  ReviewSchema
);

export default ReviewModel;
