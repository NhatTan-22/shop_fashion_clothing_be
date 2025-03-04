import { Router } from "express";
import { addReview, getReviews } from "~/app/controllers/reviewController";
import verifyToken from "~/middleware/verifyToken";

const route = Router();

route.use(verifyToken);

route.get("/:slug", getReviews);

route.post("/:slug", addReview);

export default route;
