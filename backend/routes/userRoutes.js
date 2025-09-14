import express from "express";
import {
  registerUser,
  loginUser,
  updateInfo,
} from "../controllers/userController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/updateInfo", verifyToken, updateInfo);

export default router;
