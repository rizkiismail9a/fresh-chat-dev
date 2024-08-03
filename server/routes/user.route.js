const express = require("express");
const {
  getAllUsers,
  getUserWithChat,
} = require("../controllers/user.controller.js");
const verifyToken = require("../middlewares/verifyToken.middleware.js");

const router = express.Router();

router.get("/all", verifyToken, getAllUsers);
router.get("/conversations", verifyToken, getUserWithChat);

module.exports = router;
