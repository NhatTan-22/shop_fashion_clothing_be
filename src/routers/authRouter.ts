// Libs
import { Router } from "express";
// Others
import {
  login,
  refreshToken,
  register,
} from "../app/controllers/userController";

const router = Router();

router.post("/login", login);

router.post("/refresh", refreshToken);

router.post("/register", register);

export default router;
