import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import {
  createSession,
  getSessionsByUser,
} from "../controllers/sessionController.js";

const router = express.Router();
router.post("/", verifyToken, createSession);
router.get("/:userId", verifyToken, getSessionsByUser);

export default router;
