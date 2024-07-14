import express from "express";
import {
  login,
  logout,
  refreshToken,
  signUp,
} from "../controllers/auth.controller.js";
import { verifyToken } from "../middlewares/verifyToken.middleware.js";

const router = express.Router();

router.post("/login", login);
router.post("/logout", logout);
router.post("/signup", signUp);
router.post("/refresh", verifyToken, refreshToken);

export default router;
