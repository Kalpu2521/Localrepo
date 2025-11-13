import { Router } from "express";
import { requireAuth, requireRole } from "../middleware/authMiddleware.js";
import { createHospital, getHospitals, getHospitalById, updateHospital, deleteHospital } from "../controllers/hospitalController.js";

const router = Router();

router.get("/", getHospitals);
router.get("/:id", getHospitalById);
router.post("/", requireAuth, requireRole(["hospital", "admin"]), createHospital);
router.put("/:id", requireAuth, requireRole(["hospital", "admin"]), updateHospital);
router.delete("/:id", requireAuth, requireRole(["admin"]), deleteHospital);

export default router;

