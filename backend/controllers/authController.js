const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const Users = require("../models/userModel");
const sendEmail = require("../utils/sendEmail");
const { generateAdminId } = require("../utils/generateUniqueId");
require("dotenv").config();

// -----------------------------------------------
// REGISTER
// -----------------------------------------------
exports.register = async (req, res) => {
  try {
    const { name, email, password, phonenumber, dob, country, state, pincode, aadhaarNumber, category } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email and password are required" });
    }

    const existing = await Users.findByEmail(email);
    if (existing) return res.status(409).json({ message: "Email already registered" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await Users.create({
      user_name: name,
      user_email: email,
      user_password: hashedPassword,
      user_dob: dob || null,
      user_phonenumber: phonenumber || null,
      user_country: country || null,
      user_state: state || null,
      user_pincode: pincode || null,
      aadhaar_number: aadhaarNumber || null,
      category: category || null,
    });

    res.status(201).json({ message: "User registered successfully", userId: newUser.id });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// -----------------------------------------------
// LOGIN
// -----------------------------------------------
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Email and password required" });

    const user = await Users.findByEmail(email);
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.user_password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    // Check if admin and active
    if (user.is_admin && !user.is_admin_active) {
      return res.status(403).json({ message: "Admin account is not active" });
    }

    // Check if validator and active
    if (user.is_validator && !user.is_validator_active) {
      return res.status(403).json({ message: "Validator account is not active" });
    }

    // First login - admin must reset password
    if (user.first_login) {
      return res.status(200).json({
        message: "First login - password reset required",
        first_login: true,
        userId: user.id,
      });
    }

    const accessToken = jwt.sign(
      { id: user.id },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: "15m" }
    );
    const refreshToken = jwt.sign(
      { id: user.id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "7d" }
    );

    await Users.updateById(user.id, { refresh_token: refreshToken });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    const { user_password, refresh_token, otp, reset_token, ...safeUser } = user;

    res.status(200).json({ message: "Login successful", accessToken, user: safeUser });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// -----------------------------------------------
// LOGOUT
// -----------------------------------------------
exports.logout = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    if (refreshToken) {
      // Clear the token in DB
      const pool = require("../config/db");
      await pool.query(
        `UPDATE users SET refresh_token = NULL WHERE refresh_token = $1`,
        [refreshToken]
      );
    }
    res.clearCookie("refreshToken");
    res.json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// -----------------------------------------------
// REFRESH TOKEN
// -----------------------------------------------
exports.refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) return res.status(401).json({ message: "No refresh token" });

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const user = await Users.findById(decoded.id);

    if (!user || user.refresh_token !== refreshToken) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    const newAccessToken = jwt.sign({ id: user.id }, process.env.JWT_ACCESS_SECRET, { expiresIn: "15m" });
    res.json({ accessToken: newAccessToken });
  } catch (error) {
    res.status(403).json({ message: "Invalid or expired refresh token" });
  }
};

// -----------------------------------------------
// SEND OTP
// -----------------------------------------------
exports.sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await Users.findByEmail(email);
    if (!user) return res.status(404).json({ message: "User not found" });

    const now = new Date();
    const windowStart = new Date(now - 60 * 60 * 1000); // 1 hour window

    if (user.otp_request_time && user.otp_request_time > windowStart && user.otp_request_count >= 3) {
      return res.status(429).json({ message: "OTP limit reached. Try again after 1 hour." });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpire = new Date(now.getTime() + 10 * 60 * 1000); // 10 minutes

    const newCount = user.otp_request_time && user.otp_request_time > windowStart
      ? user.otp_request_count + 1
      : 1;

    await Users.updateById(user.id, {
      otp,
      otp_expire: otpExpire,
      otp_request_count: newCount,
      otp_request_time: now,
    });

    await sendEmail(email, "Your OTP Code", `Your OTP is: ${otp}. It expires in 10 minutes.`);

    res.json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("sendOtp error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// -----------------------------------------------
// VERIFY OTP
// -----------------------------------------------
exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await Users.findByEmail(email);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (!user.otp || user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }
    if (new Date() > new Date(user.otp_expire)) {
      return res.status(400).json({ message: "OTP expired" });
    }

    await Users.updateById(user.id, { otp: null, otp_expire: null });

    res.json({ message: "OTP verified successfully" });
  } catch (error) {
    console.error("verifyOtp error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// -----------------------------------------------
// FORGOT PASSWORD
// -----------------------------------------------
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await Users.findByEmail(email);
    if (!user) return res.status(404).json({ message: "User not found" });

    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpire = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    await Users.updateById(user.id, { reset_token: resetToken, reset_token_expire: resetTokenExpire });

    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}&email=${email}`;
    await sendEmail(email, "Password Reset", `Reset your password: ${resetLink}`);

    res.json({ message: "Password reset email sent" });
  } catch (error) {
    console.error("forgotPassword error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// -----------------------------------------------
// RESET PASSWORD
// -----------------------------------------------
exports.resetPassword = async (req, res) => {
  try {
    const { email, token, newPassword } = req.body;
    const user = await Users.findByEmail(email);

    if (
      !user ||
      user.reset_token !== token ||
      !user.reset_token_expire ||
      new Date() > new Date(user.reset_token_expire)
    ) {
      return res.status(400).json({ message: "Invalid or expired reset token" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);
    await Users.updateById(user.id, {
      user_password: hashedPassword,
      reset_token: null,
      reset_token_expire: null,
      first_login: false,
      is_admin_active: user.is_admin ? true : user.is_admin_active,
    });

    res.json({ message: "Password reset successful" });
  } catch (error) {
    console.error("resetPassword error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
