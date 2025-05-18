// Libs
import { Router } from "express";
import { getOrders } from "~/app/controllers/orderController";
import authorization from "~/middleware/authorization";
import verifyToken from "~/middleware/verifyToken";
import { ROLE_ENUM } from "~/utils/constants/enum";

const router = Router();

router.use(verifyToken);

// router.post("/new-add", uploadImage, addSupplier);

// router.delete("/:_id/delete", deleteSupplier);

router.get("/", authorization([ROLE_ENUM.ADMIN, ROLE_ENUM.USER]), getOrders);

export default router;
