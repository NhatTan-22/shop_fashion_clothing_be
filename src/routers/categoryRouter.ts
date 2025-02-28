import { Router } from "express";
import {
  addCategory,
  getCategories,
  searchCategories,
} from "~/app/controllers/categoryController";
import authorization from "~/middleware/authorization";
import verifyToken from "~/middleware/verifyToken";
import { uploadImage } from "~/storage/diskStorage";

const router = Router();

router.get("/", getCategories);

router.use(verifyToken);

router.use(authorization([0]));
router.get("/select", searchCategories);

router.post("/add-new", uploadImage, addCategory);

export default router;
