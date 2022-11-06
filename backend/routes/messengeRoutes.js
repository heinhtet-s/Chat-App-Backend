const express = require("express");
const {
  allMessages,
  sendMessage,
} = require("../controllers/messageController");
const { protectedRoute } = require("../middleware/authMiddleware");
const router = express.Router();
router.route("/:chatId").get(protectedRoute, allMessages);
router.route("/").post(protectedRoute, sendMessage);

module.exports = router;
