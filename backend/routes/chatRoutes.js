const express = require("express");
const { protectedRoute } = require("../middleware/authMiddleware");
const {
  accessChat,
  fetchChat,
  createGroupChat,
  updatedChat,
  addChat,
  deleteChat,
  connectChat,
} = require("../controllers/chatController");
const router = express.Router();
router.route("/").get(protectedRoute, fetchChat);
router.route("/:userId").get(protectedRoute, accessChat);
router.route("/connectChat").post(protectedRoute, connectChat);
router.route("/group").post(protectedRoute, createGroupChat);
router.route("/rename").put(protectedRoute, updatedChat);
router.route("/groupadd").put(protectedRoute, addChat);
router.route("/groupremove").delete(protectedRoute, deleteChat);
module.exports = router;
