import mongoose, { Model, Schema } from "mongoose";
import { IBrand } from "~/utils/interfaces/brand";

const BrandSchema: Schema<IBrand> = new Schema(
  {
    name: { type: String, required: true },
    logo: { type: String, required: true },
    description: { type: String, required: true },
    country: { type: String, required: true },
    website: { type: String, default: '' },
  },
  {
    timestamps: true,
  }
);

const BrandModel: Model<IBrand> = mongoose.model<IBrand>("Brands", BrandSchema);
export default BrandModel;
