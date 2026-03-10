const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Users = require("../models/userModel");
const SuperAdmin = require("../models/superAdminModel");

exports.loginSuperAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res.status(400).json({ message: "Username and password are required" });

    const superAdmin = await SuperAdmin.findByUsername(username);
    if (!superAdmin) return res.status(401).json({ message: "Invalid username or password" });

    const isMatch = await bcrypt.compare(password, superAdmin.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid username or password" });

    const token = jwt.sign(
      { id: superAdmin.id, role: "superadmin" },
      process.env.JWT_ACCESS_SECRET || "SUPERADMIN_SECRET",
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "SuperAdmin login successful",
      token,
      superAdmin: { id: superAdmin.id, username: superAdmin.username },
    });
  } catch (err) {
    console.error("loginSuperAdmin error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.verifySuperAdmin = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer "))
      return res.status(401).json({ message: "No token provided" });

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET || "SUPERADMIN_SECRET");

    if (decoded.role !== "superadmin")
      return res.status(403).json({ message: "Access denied" });

    req.superAdmin = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

exports.getAllAdminsAndValidators = async (req, res) => {
  try {
    const admins = await Users.find({ is_admin: true });
    if (!admins.length) return res.status(404).json({ message: "No admins found" });

    const results = await Promise.all(
      admins.map(async (admin) => {
        const validators = await Users.find({
          validator_owner_id: admin.admin_profile_id,
          is_validator: true,
        });

        const { user_password, refresh_token, otp, reset_token, ...safeAdmin } = admin;

        return {
          ...safeAdmin,
          total_validators: validators.length,
          validators: validators.map(({ user_password, refresh_token, otp, reset_token, ...v }) => v),
        };
      })
    );

    res.status(200).json({
      message: "Admins and their validators fetched successfully",
      total_admins: results.length,
      admins: results,
    });
  } catch (err) {
    console.error("getAllAdminsAndValidators error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.createAdmin = async (req, res) => {
  try {
    const { name, email, phoneNumber, location, password } = req.body;
    if (!name || !email || !phoneNumber || !location)
      return res.status(400).json({ message: "All fields are required" });

    const existing = await Users.findByEmail(email);
    if (existing) return res.status(409).json({ message: "Email already registered" });

    const { generateAdminId } = require("../utils/generateUniqueId");
    const admin_profile_id = await generateAdminId();

    const tempPassword = password || Math.random().toString(36).slice(-4) + Math.random().toString(36).slice(-4);
    const hashedPassword = await bcrypt.hash(tempPassword, 12);

    const newAdmin = await Users.create({
      user_name: name,
      user_email: email,
      user_password: hashedPassword,
      user_phonenumber: phoneNumber,
      location,
      is_admin: true,
      is_admin_active: false,
      first_login: true,
      admin_profile_id,
    });

    res.status(201).json({
      message: "Admin created successfully. They must set a new password on first login.",
      admin: {
        id: newAdmin.id,
        name: newAdmin.user_name,
        email: newAdmin.user_email,
        phoneNumber: newAdmin.user_phonenumber,
        location: newAdmin.location,
        first_login: newAdmin.first_login,
      },
      credentials: { username: newAdmin.user_email, password: tempPassword },
    });
  } catch (err) {
    console.error("createAdmin error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.deactivateAdmin = async (req, res) => {
  try {
    const { admin_profile_id } = req.body;
    if (!admin_profile_id) return res.status(400).json({ message: "Admin profile ID is required" });

    const admin = await Users.findOne({ admin_profile_id, is_admin: true });
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    await Users.updateById(admin.id, { is_admin_active: false });

    const result = await Users.updateMany(
      { validator_owner_id: admin_profile_id },
      { is_validator_active: false }
    );

    res.status(200).json({
      message: `Admin deactivated successfully. ${result.modifiedCount} validators also deactivated.`,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.activateAdmin = async (req, res) => {
  try {
    const { admin_profile_id } = req.body;
    if (!admin_profile_id) return res.status(400).json({ message: "Admin profile ID is required" });

    const admin = await Users.findOne({ admin_profile_id, is_admin: true });
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    await Users.updateById(admin.id, { is_admin_active: true });

    res.status(200).json({ message: "Admin activated successfully (validators remain inactive)." });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.resetAdminPasswordBySuperAdmin = async (req, res) => {
  try {
    const { email, resetToken } = req.body;
    if (!email || !resetToken)
      return res.status(400).json({ message: "Email and reset token are required" });

    const pool = require("../config/db");
    const { rows } = await pool.query(
      `SELECT * FROM users WHERE user_email = $1 AND is_admin = true AND reset_token = $2 AND reset_token_expire > NOW() LIMIT 1`,
      [email, resetToken]
    );
    const admin = rows[0];
    if (!admin) return res.status(400).json({ message: "Invalid or expired token" });

    const newPassword = Math.random().toString(36).slice(-4) + Math.random().toString(36).slice(-4);
    const hashedPassword = await bcrypt.hash(newPassword, 12);

    await Users.updateById(admin.id, {
      user_password: hashedPassword,
      reset_token: null,
      reset_token_expire: null,
      first_login: true,
    });

    res.status(200).json({
      message: "Admin password reset successfully. They must set a new password on next login.",
      newTempPassword: newPassword,
    });
  } catch (err) {
    console.error("resetAdminPasswordBySuperAdmin error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
