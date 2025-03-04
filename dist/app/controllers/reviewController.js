"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addReview = exports.getReviews = void 0;
const enum_1 = require("~/utils/constants/enum");
const ReviewsModel_1 = __importDefault(require("../models/ReviewsModel"));
const getReviews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { slug } = req.params;
        const reviews = yield ReviewsModel_1.default.find({ productId: slug });
        return res.status(200).json({
            code: 1010,
            message: enum_1.MESSAGE_REVIEW_ENUM.SUCCESS_GET_REVIEW,
            data: reviews,
        });
    }
    catch (error) {
        return res.status(500).json({
            code: 1013,
            message: error.message || "Lỗi server, vui lòng thử lại sau!",
        });
    }
});
exports.getReviews = getReviews;
const addReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body } = req.body;
        if (!body.comment.length) {
            return res.status(400).json({
                code: 1011,
                message: `Comment is required.`,
            });
        }
        const review = yield ReviewsModel_1.default.create(body);
        return res
            .status(201)
            .json({
            code: 1010,
            message: enum_1.MESSAGE_REVIEW_ENUM.SUCCESS_CREATE_REVIEW,
            data: review,
        });
    }
    catch (error) {
        return res.status(500).json({ message: "Error adding review" });
    }
});
exports.addReview = addReview;
//# sourceMappingURL=reviewController.js.map