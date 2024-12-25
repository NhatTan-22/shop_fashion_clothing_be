import { Router } from "express";
import {
  addInventory,
  getInventories,
} from "~/app/controllers/inventoryController";
import verifyToken from "~/middleware/verifyToken";

const router = Router();

router.use(verifyToken);

router.get("/inventories/add-new", addInventory);
router.get("/inventories", getInventories);

export default router;
