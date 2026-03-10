const Users = require("../models/userModel");
const Notification = require("../models/notificationModel");
const admin = require("../config/firebase"); // Firebase Admin SDK

// --------------------------------------------------
// Helper: Send FCM push to a list of device tokens
// --------------------------------------------------
const sendFCMNotifications = async (tokens, title, body, data = {}) => {
  if (!tokens.length) return { successCount: 0, failureTokens: [] };

  const failureTokens = [];
  let successCount = 0;

  // FCM supports up to 500 tokens per multicast message
  const chunkSize = 500;
  for (let i = 0; i < tokens.length; i += chunkSize) {
    const chunk = tokens.slice(i, i + chunkSize);

    const message = {
      tokens: chunk,
      notification: { title, body },
      data: Object.fromEntries(
        Object.entries(data).map(([k, v]) => [k, String(v ?? "")])
      ),
      android: {
        priority: "high",
        notification: { sound: "default" },
      },
      apns: {
        payload: {
          aps: { sound: "default" },
        },
      },
    };

    try {
      const response = await admin.messaging().sendEachForMulticast(message);

      response.responses.forEach((resp, idx) => {
        if (resp.success) {
          successCount++;
        } else {
          const errCode = resp.error?.code;
          // Collect tokens that are no longer valid
          if (
            errCode === "messaging/registration-token-not-registered" ||
            errCode === "messaging/invalid-registration-token"
          ) {
            failureTokens.push(chunk[idx]);
          }
          console.error(`FCM error for token ${chunk[idx]}:`, resp.error?.message);
        }
      });
    } catch (err) {
      console.error("FCM multicast error:", err);
    }
  }

  return { successCount, failureTokens };
};

// --------------------------------------------------
// Send notifications to a category (general / member)
// --------------------------------------------------
exports.sendNotifications = async (req, res) => {
  const { category, title, body, complaintId } = req.body;
  let insertedNotifications = [];

  try {
    // 1. Get target users
    const filter = { is_admin: false, is_validator: false };
    if (category === "member") filter.category = "member";
    else if (category !== "general") {
      return res.status(400).json({ message: "Invalid category type" });
    }

    const finalUsers = await Users.find(filter);

    // 2. Collect all FCM tokens for these users
    const tokenRows = await Promise.all(finalUsers.map((u) => Users.getPushTokens(u.id)));
    const allTokens = [...new Set(tokenRows.flat())];

    console.log("Total Users:", finalUsers.length);
    console.log("Total FCM Tokens:", allTokens.length);

    // 3. Save notifications in DB
    if (finalUsers.length > 0) {
      const notificationsToInsert = finalUsers.map((u) => ({
        userId: u.id,
        category,
        title,
        body,
        complaintId,
      }));
      insertedNotifications = await Notification.insertMany(notificationsToInsert);
    }

    // 4. Emit via Socket.IO (realtime in-app)
    const io = req.app.get("io");
    if (io) {
      insertedNotifications.forEach((n) => {
        io.to(n.user_id.toString()).emit("newNotification", n);
      });
    }

    // 5. Send FCM push notifications
    const { successCount, failureTokens } = await sendFCMNotifications(
      allTokens,
      title,
      body,
      { complaintId: complaintId || "" }
    );

    // 6. Remove invalid tokens from DB
    if (failureTokens.length > 0) {
      await Promise.all(failureTokens.map((t) => Users.removePushToken(t)));
      console.log(`Removed ${failureTokens.length} invalid FCM token(s)`);
    }

    res.status(200).json({
      success: true,
      message: "Notifications sent successfully",
      saved: insertedNotifications.length,
      tokensSent: successCount,
    });
  } catch (error) {
    console.error("Error sending notifications:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// --------------------------------------------------
// Send notification to a single user by ID
// --------------------------------------------------
exports.sendNotificationById = async (req, res) => {
  try {
    const userId = req.params.id;
    const { title, body, complaintId } = req.body;

    const user = await Users.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    // Save to DB
    const savedNotification = await Notification.create({
      userId: user.id,
      category: "single",
      title,
      body,
      complaintId,
    });

    // Emit via socket
    const io = req.app.get("io");
    if (io) io.to(userId.toString()).emit("newNotification", savedNotification);

    // Send FCM push
    const tokens = await Users.getPushTokens(user.id);
    if (tokens.length > 0) {
      const { failureTokens } = await sendFCMNotifications(tokens, title, body, {
        complaintId: complaintId || "",
      });
      if (failureTokens.length > 0) {
        await Promise.all(failureTokens.map((t) => Users.removePushToken(t)));
      }
    }

    res.status(200).json({
      success: true,
      message: "Notification sent successfully",
      notification: savedNotification,
    });
  } catch (error) {
    console.error("Error in sendNotificationById:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// --------------------------------------------------
// Save FCM device token for a user
// --------------------------------------------------
exports.saveTokens = async (req, res) => {
  const { userId, token } = req.body;

  if (!userId || !token) {
    return res.status(400).json({ message: "userId and token are required" });
  }

  try {
    const user = await Users.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    await Users.addPushToken(userId, token);
    const tokens = await Users.getPushTokens(userId);

    res.json({ success: true, tokens });
  } catch (error) {
    console.error("Error saving token:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// --------------------------------------------------
// Get all notifications (grouped/deduped, admin view)
// --------------------------------------------------
exports.getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.findAllGrouped();
    res.json({ success: true, count: notifications.length, notifications });
  } catch (error) {
    console.error("Error fetching all notifications:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// --------------------------------------------------
// Get notifications for the logged-in user
// --------------------------------------------------
exports.getUserNotifications = async (req, res) => {
  try {
    const notifications = await Notification.findByUserId(req.user.id);
    res.json({ success: true, notifications });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// --------------------------------------------------
// Mark a notification as read
// --------------------------------------------------
exports.markAsRead = async (req, res) => {
  const { notificationId } = req.body;
  try {
    const notification = await Notification.markAsRead(notificationId);
    if (!notification) return res.status(404).json({ message: "Notification not found" });
    res.json({ success: true, notification });
  } catch (error) {
    console.error("Error marking notification as read:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// --------------------------------------------------
// Delete all notifications
// --------------------------------------------------
exports.deleteAll = async (req, res) => {
  try {
    const result = await Notification.deleteAll();
    res.status(200).json({
      message: "All notifications deleted successfully",
      count: result.deletedCount,
    });
  } catch (error) {
    console.error("Error deleting all notifications:", error);
    res.status(500).json({ message: "Server error during mass deletion.", error: error.message });
  }
};
