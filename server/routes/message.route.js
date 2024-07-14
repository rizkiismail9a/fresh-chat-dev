import express from "express";
import { sendMessage } from "../controllers/message.controller.js";
import { verifyToken } from "../middlewares/verifyToken.middleware.js";

const router = express.Router();

router.post("/send/:id", verifyToken, sendMessage); // The id is reciever _id

export default router;
