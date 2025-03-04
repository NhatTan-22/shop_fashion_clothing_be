// Libs
import { Router } from "express";
import {
  addSupplier,
  deleteSupplier,
  getSuppliers,
  searchSuppliers,
} from "~/app/controllers/supplierController";
import authorization from "~/middleware/authorization";
import verifyToken from "~/middleware/verifyToken";
import { uploadImage } from "~/storage/diskStorage";
import { ROLE_ENUM } from "~/utils/constants/enum";

const router = Router();

router.use(verifyToken);

router.post(
  "/new-add",
  authorization([ROLE_ENUM.ADMIN]),
  uploadImage,
  addSupplier
);

router.delete("/:_id", authorization([ROLE_ENUM.ADMIN]), deleteSupplier);

router.get("/select", authorization([ROLE_ENUM.ADMIN]), searchSuppliers);

router.get("/", authorization([ROLE_ENUM.ADMIN]), getSuppliers);

export default router;
