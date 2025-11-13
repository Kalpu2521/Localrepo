import { Router } from "express";
import { requireAuth, requireRole } from "../middleware/authMiddleware.js";
import { createRecipient, getRecipients, getRecipientById, updateRecipient, deleteRecipient } from "../controllers/recipientController.js";

const router = Router();

router.get("/", getRecipients);
router.get("/:id", getRecipientById);
router.post("/", requireAuth, requireRole(["recipient", "admin"]), createRecipient);
router.put("/:id", requireAuth, requireRole(["recipient", "admin"]), updateRecipient);
router.delete("/:id", requireAuth, requireRole(["admin"]), deleteRecipient);

export default router;

