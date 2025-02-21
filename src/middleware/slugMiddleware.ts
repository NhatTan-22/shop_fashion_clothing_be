import slugify from "slugify";
import { Document, Schema } from "mongoose";

export function generateSlug(schema: Schema, field: string = "name") {
  schema.pre("save", function (next) {
    const doc = this as unknown as Document & {
      slug: string;
      [key: string]: any;
    };

    if (doc.isModified(field)) {
      doc.slug = slugify(doc[field], { lower: true, strict: true });
    }

    next();
  });
}
