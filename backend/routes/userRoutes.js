const express = require("express");
const {
  registerUser,
  getUser,
  authUser,
} = require("../controllers/userController");
const { protectedRoute } = require("../middleware/authMiddleware");
const router = express.Router();
router.route("/").post(registerUser).get(protectedRoute, getUser);
router.route("/login").post(authUser);
module.exports = router;
