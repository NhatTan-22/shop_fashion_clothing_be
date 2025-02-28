// Libs
import { Router } from "express";
import { getOrders } from "~/app/controllers/orderController";
import authorization from "~/middleware/authorization";
import verifyToken from "~/middleware/verifyToken";

const router = Router();

router.use(verifyToken);

router.use(authorization([0]));

// router.post("/new-add", uploadImage, addSupplier);

// router.delete("/:_id/delete", deleteSupplier);

router.get("/", getOrders);

export default router;
