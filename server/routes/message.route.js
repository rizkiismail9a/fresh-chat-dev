const express = require("express");
const {
  getConversation,
  sendMessage,
} = require("../controllers/message.controller.js");
const verifyToken = require("../middlewares/verifyToken.middleware.js");

const router = express.Router();

router.post("/send/:id", verifyToken, sendMessage); // The id is reciever _id
router.get("/conversation/:id", verifyToken, getConversation); // The id is reciever _id

module.exports = router;
