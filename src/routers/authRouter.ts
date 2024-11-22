// Libs
import { Router } from "express";
// Others
import { login, register } from "../app/controllers/userController";

const router = Router();

router.post("/register", register);

router.post("/login", login);

export default router;
