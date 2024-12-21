import mongoose, { Schema } from "mongoose";
import { ISupplier } from "~/utils/interfaces/supplier";

const SupplierSchema: Schema = new Schema(
  {
    supplierImage: {
      type: String,
      default:
        "https://static.vecteezy.com/system/resources/previews/009/734/564/non_2x/default-avatar-profile-icon-of-social-media-user-vector.jpg",
    },
    supplierCode: {
      type: String,
      require: true,
    },
    supplierName: {
      type: String,
      require: true,
    },
    supplierPhone: {
      type: String,
      require: true,
    },
    supplierEmail: {
      type: String,
      require: true,
    },
    supplierAddress: {
      type: String,
      require: true,
    },
    supplierProduct: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    isTaking: {
      type: [Number],
      default: 0,
      enum: [0, 1],
    },
  },
  {
    timestamps: true,
  }
);

const SupplierModel =
  mongoose.models.Supplier ||
  mongoose.model<ISupplier>("Suppliers", SupplierSchema);

export default SupplierModel;
