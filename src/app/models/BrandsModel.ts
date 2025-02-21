import mongoose, { Model, Schema } from "mongoose";
import { generateSlug } from "~/middleware/slugMiddleware";
import { IBrand } from "~/utils/interfaces/brand";

const BrandSchema: Schema<IBrand> = new Schema(
  {
    name: { type: String, required: true },
    logo: { type: String, required: true },
    slug: { type: String, unique: true, lowercase: true },
    description: { type: String, required: true },
    country: { type: String, required: true },
    website: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

generateSlug(BrandSchema);

const BrandModel: Model<IBrand> = mongoose.model<IBrand>("Brands", BrandSchema);
export default BrandModel;
