import { Router } from "express";
import { requireAuth, requireRole } from "../middleware/authMiddleware.js";
import { createDonor, getDonors, getDonorById, updateDonor, deleteDonor, getMyDonorProfile } from "../controllers/donorController.js";

const router = Router();

router.get("/", getDonors);
router.get("/me", requireAuth, getMyDonorProfile);
router.get("/:id", getDonorById);
router.post("/", requireAuth, requireRole(["donor", "admin"]), createDonor);
router.put("/:id", requireAuth, requireRole(["donor", "admin"]), updateDonor);
router.delete("/:id", requireAuth, requireRole(["admin"]), deleteDonor);

export default router;

