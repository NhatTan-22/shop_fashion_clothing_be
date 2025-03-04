import mongoose, { Model, Schema } from "mongoose";
import { IReply, IReview } from "~/utils/interfaces/review";

const ReplySchema = new Schema<IReply>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  comment: { type: String, required: true },
  dateComment: { type: Date, default: Date.now },
});

const ReviewSchema: Schema<IReview> = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    productId: { type: Schema.Types.ObjectId, ref: "Product" },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    images: [{ type: String }],
    likes: { type: Number, default: 0 },
    replies: [ReplySchema],
    dateComment: { type: Date, default: Date.now },
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
