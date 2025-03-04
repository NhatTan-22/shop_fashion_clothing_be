"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const reviewController_1 = require("~/app/controllers/reviewController");
const verifyToken_1 = __importDefault(require("~/middleware/verifyToken"));
const route = (0, express_1.Router)();
route.use(verifyToken_1.default);
route.get("/:slug", reviewController_1.getReviews);
route.post("/:slug", reviewController_1.addReview);
exports.default = route;
//# sourceMappingURL=review.routes.js.map