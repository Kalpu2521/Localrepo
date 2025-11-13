import { Router } from "express";
import { requireAuth } from "../middleware/authMiddleware.js";
import { createEmergency, getEmergencies, getEmergencyById, updateEmergency, deleteEmergency } from "../controllers/emergencyController.js";

const router = Router();

router.get("/", getEmergencies);
router.get("/:id", getEmergencyById);
router.post("/", requireAuth, createEmergency);
router.put("/:id", requireAuth, updateEmergency);
router.delete("/:id", requireAuth, deleteEmergency);

export default router;

