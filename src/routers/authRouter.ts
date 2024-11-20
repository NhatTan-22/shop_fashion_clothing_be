// Libs
import { Router } from "express";
//
import { login } from "../app/controllers/userController";

const router = Router();

router.post("/login", login);

export default router;
