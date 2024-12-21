// Libs
import { Router } from "express";
import {
  addSupplier,
  getSuppliers,
} from "~/app/controllers/supplierController";
import verifyToken from "~/middleware/verifyToken";
import uploadImage from "~/storage/diskStorage";

const router = Router();

router.use(verifyToken);

router.post("/suppliers/new-add", uploadImage, addSupplier);

router.get("/suppliers", getSuppliers);

export default router;
