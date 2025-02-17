import mongoose, { Model, Schema } from "mongoose";
import { ISupplier } from "~/utils/interfaces/supplier";

const SupplierSchema: Schema<ISupplier> = new Schema(
  {
    sku: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    contactPerson: { type: String, required: true },
    image: {
      type: String,
      default:
        "https://static.vecteezy.com/system/resources/previews/009/734/564/non_2x/default-avatar-profile-icon-of-social-media-user-vector.jpg",
    },
    phone: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    categories: [{ type: Schema.Types.ObjectId, ref: "Categories" }],
    orderQuantity: { type: Number, required: true, default: 0, min: 0 },
    expectedArrivalDate: { type: Date, required: true },
    restockStatus: {
      type: [Number],
      default: [0],
      enum: ["PENDING", "SHIPPED", "RECEIVED"],
    },
  },
  {
    timestamps: true,
  }
);

const SupplierModel: Model<ISupplier> = mongoose.model<ISupplier>(
  "Suppliers",
  SupplierSchema
);

export default SupplierModel;
