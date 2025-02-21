"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSlug = generateSlug;
const slugify_1 = __importDefault(require("slugify"));
function generateSlug(schema, field = "name") {
    schema.pre("save", function (next) {
        const doc = this;
        if (doc.isModified(field)) {
            doc.slug = (0, slugify_1.default)(doc[field], { lower: true, strict: true });
        }
        next();
    });
}
//# sourceMappingURL=slugMiddleware.js.map