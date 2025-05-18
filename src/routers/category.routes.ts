import { Router } from "express";
import {
  addCategory,
  getCategories,
  searchCategories,
} from "~/app/controllers/categoryController";
import authorization from "~/middleware/authorization";
import verifyToken from "~/middleware/verifyToken";
import { uploadImage } from "~/storage/diskStorage";
import { ROLE_ENUM } from "~/utils/constants/enum";

const router = Router();

router.get("/", getCategories);

router.use(verifyToken);

router.use(authorization([0]));
router.get("/select", searchCategories);

router.post("/add-new", uploadImage, addCategory);
router.get("/select", authorization([ROLE_ENUM.ADMIN]), searchCategories);

router.post("/add-new", authorization([ROLE_ENUM.ADMIN]), uploadImage, addCategory);

export default router;
