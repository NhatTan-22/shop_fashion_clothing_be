"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const storage = multer_1.default.diskStorage({
    //   destination: (req, file, cb) => {
    //     cb(null, "public/images");
    //   },
    //   filename: (req, file, cb) => {
    //     const ext = path.extname(file.originalname);
    //     cb(null, Date.now() + ext);
    //   },
    destination: function (req, file, cb) {
        cb(null, "public/images");
    },
    filename: function (req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}_${path_1.default.extname(file.originalname)}`);
    },
});
const upload = (0, multer_1.default)({ storage: storage });
const uploadImage = upload.single("supplierImage");
exports.default = uploadImage;
//# sourceMappingURL=diskStorage.js.map