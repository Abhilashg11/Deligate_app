const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  refreshToken,
  logoutUser,
  forgotPassword,
  verifyOTP,
  resetPassword,
  setPassword,
  requestPasswordReset,
  resetValidatorPassword,
  getAllOwnedValidators,
  changeAdminPassword,
  checkUserRole,
} = require("../controllers/authController");
const { verifyToken } = require("../middleware/verifyToken");

// Signup route
router.post("/signup", registerUser);

// Login route
router.post("/login", loginUser);

// Refresh token route
router.get("/refresh-token", refreshToken);

// Logout route
router.post("/logout", logoutUser);

router.post("/check-role", checkUserRole);

// Additional routes for password reset
router.post("/forgot-password", forgotPassword);
router.post("/verify-otp", verifyOTP);
router.post("/reset-password", resetPassword);

router.post("/set-password", verifyToken, setPassword);
router.post("/reset-validator-password", verifyToken, resetValidatorPassword);
router.post("/request-reset", requestPasswordReset);

// ✅ Admin gets all validators they created
router.get("/validators", verifyToken, getAllOwnedValidators);

router.post("/change-password", verifyToken, changeAdminPassword);
module.exports = router;
