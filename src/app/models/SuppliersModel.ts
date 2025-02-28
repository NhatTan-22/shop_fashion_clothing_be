import mongoose, { Model, Schema } from "mongoose";
import { generateSlug } from "~/middleware/slugMiddleware";
import { ISupplier } from "~/utils/interfaces/supplier";

const SupplierSchema: Schema<ISupplier> = new Schema(
  {
    sku: { type: String, required: true, unique: true },
    supplierName: { type: String, required: true },
    contactPerson: { type: String, required: true },
    image: {
      type: String,
      default:
        "https://static.vecteezy.com/system/resources/previews/009/734/564/non_2x/default-avatar-profile-icon-of-social-media-user-vector.jpg",
    },
    phone: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    categories: [{ type: Schema.Types.ObjectId, ref: "Category" }],
    orderQuantity: { type: Number, required: true, default: 0, min: 0 },
    importPrice: { type: Number, required: true, default: 0, min: 0 },
    expectedArrivalDate: { type: Date, required: true },
    lastRestockDate: { type: Date, required: true },
    restockStatus: {
      type: String,
      default: "PENDING",
      enum: ["PENDING", "SHIPPED", "RECEIVED"],
    },
    slug: { type: String, unique: true, lowercase: true },
  },
  {
    timestamps: true,
  }
);

generateSlug(SupplierSchema, "supplierName");

const SupplierModel: Model<ISupplier> = mongoose.model<ISupplier>(
  "Supplier",
  SupplierSchema
);

export default SupplierModel;
