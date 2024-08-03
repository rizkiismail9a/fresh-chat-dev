const express = require("express");
const {
  login,
  logout,
  refreshToken,
  signUp,
} = require("../controllers/auth.controller.js");
const verifyToken = require("../middlewares/verifyToken.middleware.js");

const router = express.Router();

router.post("/login", login);
router.post("/logout", logout);
router.post("/signup", signUp);
router.post("/refresh", verifyToken, refreshToken);

module.exports = router;
