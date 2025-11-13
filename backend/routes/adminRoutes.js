import { Router } from "express";
import { requireAuth, requireRole } from "../middleware/authMiddleware.js";
import { getStats } from "../controllers/adminController.js";

const router = Router();

router.get("/stats", requireAuth, requireRole(["admin"]), getStats);

export default router;

