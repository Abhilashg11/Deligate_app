const express = require("express");

const router = express.Router();

const {
  sendNotifications,
  saveTokens,
  getAllNotifications,
  markAsRead,
  deleteAll,
  getUserNotifications,
  sendNotificationById,
} = require("../controllers/notificationController");
const { protect } = require("../middleware/authMiddleware");

router.post("/send-notifications", sendNotifications);

router.post("/send-single-notification/:id", sendNotificationById);

router.post("/save-token", saveTokens);

router.get("/all-notifications", protect, getAllNotifications);

router.get("/get-notifications", protect, getUserNotifications);

router.post("/mark-as-read", markAsRead);

router.delete("/deleteAll", deleteAll);

module.exports = router;
