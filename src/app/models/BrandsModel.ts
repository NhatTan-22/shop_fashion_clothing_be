import mongoose, { Model, Schema } from "mongoose";
import { generateSlug } from "~/middleware/slugMiddleware";
import { IBrand } from "~/utils/interfaces/brand";

const BrandSchema: Schema<IBrand> = new Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    slug: { type: String, unique: true, lowercase: true },
    description: { type: String, required: true },
    country: { type: String, required: true },
    website: { type: String, default: "" },
    suppliers: [{ type: Schema.Types.ObjectId, ref: "Supplier" }],
  },
  {
    timestamps: true,
  }
);

generateSlug(BrandSchema);

const BrandModel: Model<IBrand> = mongoose.model<IBrand>("Brand", BrandSchema);
export default BrandModel;
