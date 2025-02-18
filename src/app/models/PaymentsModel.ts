import mongoose, { Model, Schema } from "mongoose";
import { IPayment } from "~/utils/interfaces/payment";

const PaymentSchema: Schema<IPayment> = new Schema(
  {
    orderId: { type: Schema.Types.ObjectId, ref: "Orders", required: true },
    userId: { type: Schema.Types.ObjectId, ref: "Users", required: true },
    paymentMethod: {
      type: String,
      enum: ["CREDIT_CARD", "PAYPAL", "COD"],
      required: true,
    },
    transactionId: { type: String, default: null },
    amount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["SUCCESS", "FAILED", "PENDING"],
      default: "PENDING",
    },
  },
  { timestamps: true }
);

const PaymentModel: Model<IPayment> = mongoose.model<IPayment>(
  "Payments",
  PaymentSchema
);

export default PaymentModel;
