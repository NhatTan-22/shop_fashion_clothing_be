import { Router } from "express";
import { addProduct, getProducts } from "~/app/controllers/productController";
import authorization from "~/middleware/authorization";
import verifyToken from "~/middleware/verifyToken";
import { uploadMultipleImages } from "~/storage/diskStorage";
import { ROLE_ENUM } from "~/utils/constants/enum";

const router = Router();

router.get("/", getProducts);

router.use(verifyToken);

router.use(authorization([ROLE_ENUM.ADMIN]));

router.post("/add-new", uploadMultipleImages, addProduct);

router.post("/delete/:slug", addProduct);

export default router;
