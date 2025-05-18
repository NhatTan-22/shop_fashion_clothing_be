import { Router } from "express";
import {
  addBrand,
  getBrand,
  selectBrand,
} from "~/app/controllers/brandController";
import authorization from "~/middleware/authorization";
import verifyToken from "~/middleware/verifyToken";
import { uploadImage } from "~/storage/diskStorage";
import { ROLE_ENUM } from "~/utils/constants/enum";

const router = Router();

router.use(verifyToken);

router.get("/select", authorization([ROLE_ENUM.ADMIN]), selectBrand);

router.post("/add-new", authorization([ROLE_ENUM.ADMIN]), uploadImage, addBrand);

router.get("/", authorization([ROLE_ENUM.ADMIN, ROLE_ENUM.USER]), getBrand);

export default router;
