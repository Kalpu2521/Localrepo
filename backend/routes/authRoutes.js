import { Router } from "express";
import { login, register, me } from "../controllers/authController.js";
import { requireAuth } from "../middleware/authMiddleware.js";
import { validateRegister, validateLogin } from "../middleware/validationMiddleware.js";

const router = Router();

router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);
router.get("/me", requireAuth, me);

export default router;

