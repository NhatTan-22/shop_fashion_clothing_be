import { Router } from "express";
import { addProduct, getProducts } from "~/app/controllers/inventoryController";
import authorization from "~/middleware/authorization";
import verifyToken from "~/middleware/verifyToken";

const router = Router();

router.get("/", getProducts);

router.use(verifyToken);

router.use(authorization([0]));

router.post("/add-new", addProduct);

router.post("/delete/:_id", addProduct);

export default router;
