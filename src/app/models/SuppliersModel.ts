import mongoose, { Model, Schema } from "mongoose";
import { ISupplier } from "~/utils/interfaces/supplier";

const SupplierSchema: Schema<ISupplier> = new Schema(
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
    productCode: {
      type: String,
      ref: "Product",
    },
    quantityImported: {
      type: Number,
      require: true,
      default: 0,
    },
    isTaking: {
      type: [Number],
      default: [0],
      enum: [0, 1, 2],
    },
  },
  {
    timestamps: true,
  }
);

const SupplierModel: Model<ISupplier> = mongoose.model<ISupplier>(
  "Supplier",
  SupplierSchema
);

export default SupplierModel;
