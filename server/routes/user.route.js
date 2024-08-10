const express = require("express");
const {
  getAllUsers,
  getUserWithChat,
  editUser,
} = require("../controllers/user.controller.js");
const verifyToken = require("../middlewares/verifyToken.middleware.js");

const router = express.Router();

router.get("/all", verifyToken, getAllUsers);
router.get("/conversations", verifyToken, getUserWithChat);
router.put("/edit-user", verifyToken, editUser);

module.exports = router;
