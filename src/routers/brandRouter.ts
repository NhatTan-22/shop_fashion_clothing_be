import { Router } from "express";
import {
  addBrand,
  getBrand,
  selectBrand,
} from "~/app/controllers/brandController";
import authorization from "~/middleware/authorization";
import verifyToken from "~/middleware/verifyToken";
import { uploadImage } from "~/storage/diskStorage";

const router = Router();

router.use(verifyToken);

router.use(authorization([0]));
router.get("/select", selectBrand);

router.post("/add-new", uploadImage, addBrand);

router.use(authorization([0, 1]));
router.get("/", getBrand);

export default router;
