import { Router } from "express";
import {
  addCategory,
  getCategories,
  searchCategories,
} from "~/app/controllers/categoryController";
import authorization from "~/middleware/authorization";
import verifyToken from "~/middleware/verifyToken";

const router = Router();

router.use(verifyToken);

router.use(authorization([0]));
router.get("/select", searchCategories);

router.post("/add-new", addCategory);

router.use(authorization([0, 1]));
router.get("/", getCategories);

export default router;
