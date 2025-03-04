import { Router } from "express";
import {
  addProduct,
  deleteProduct,
  getDetailProduct,
  getProducts,
} from "~/app/controllers/productController";
import authorization from "~/middleware/authorization";
import verifyToken from "~/middleware/verifyToken";
import { uploadMultipleImages } from "~/storage/diskStorage";
import { ROLE_ENUM } from "~/utils/constants/enum";

const router = Router();

router.get("/", getProducts);

router.use(verifyToken);

router.post(
  "/add-new",
  authorization([ROLE_ENUM.ADMIN]),
  uploadMultipleImages,
  addProduct
);

router.delete("/:_id", authorization([ROLE_ENUM.ADMIN]), deleteProduct);

router.get(
  "/:slug",
  authorization([ROLE_ENUM.ADMIN, ROLE_ENUM.USER]),
  getDetailProduct
);

export default router;
