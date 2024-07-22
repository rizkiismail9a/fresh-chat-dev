import express from "express";
import {
  getAllUsers,
  getUserWithChat,
} from "../controllers/user.controller.js";
import { verifyToken } from "../middlewares/verifyToken.middleware.js";

const router = express.Router();

router.get("/all", verifyToken, getAllUsers);
router.get("/conversations", verifyToken, getUserWithChat);

export default router;
