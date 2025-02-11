// Libs
import { Router } from "express";
import {
  addSupplier,
  getSuppliers,
} from "~/app/controllers/supplierController";
import authorization from "~/middleware/authorization";
import verifyToken from "~/middleware/verifyToken";
import uploadImage from "~/storage/diskStorage";

const router = Router();

router.use(verifyToken);

router.use(authorization([0]));

router.post("/new-add", uploadImage, addSupplier);

router.get("/", getSuppliers);

export default router;
