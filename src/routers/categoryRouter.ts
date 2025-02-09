import { Router } from "express";
import { addCategory } from "~/app/controllers/categoryController";
import authorization from "~/middleware/authorization";
import verifyToken from "~/middleware/verifyToken";

const router = Router();

router.use(verifyToken);

router.use(authorization([0]));

router.post("/add-new", addCategory);

export default router;
