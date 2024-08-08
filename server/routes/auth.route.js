const express = require("express");
const {
  login,
  logout,
  refreshToken,
  signUp,
  changePassword,
} = require("../controllers/auth.controller.js");
const verifyToken = require("../middlewares/verifyToken.middleware.js");

const router = express.Router();

router.post("/login", login);
router.post("/logout", logout);
router.post("/signup", signUp);
router.post("/refresh", verifyToken, refreshToken);
router.put("/change-password", verifyToken, changePassword);

module.exports = router;
