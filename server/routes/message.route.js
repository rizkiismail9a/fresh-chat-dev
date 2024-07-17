import express from "express";
import {
  getConversation,
  sendMessage,
} from "../controllers/message.controller.js";
import { verifyToken } from "../middlewares/verifyToken.middleware.js";

const router = express.Router();

router.post("/send/:id", verifyToken, sendMessage); // The id is reciever _id
router.get("/conversation/:id", verifyToken, getConversation); // The id is reciever _id

export default router;
