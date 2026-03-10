const Users = require("../models/userModel");

exports.getAllUsers = async (req, res) => {
  try {
    const allUsers = await Users.find();
    // Strip sensitive fields
    const safe = allUsers.map(({ user_password, refresh_token, otp, reset_token, ...u }) => u);
    res.json({ allUsers: safe, count: safe.length });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await Users.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    const { user_password, refresh_token, otp, reset_token, ...safe } = user;
    res.json(safe);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    // Whitelist updatable fields
    const allowed = ["user_name", "user_dob", "user_phonenumber", "user_country", "user_state", "user_pincode", "category"];
    const updates = {};
    allowed.forEach((k) => { if (req.body[k] !== undefined) updates[k] = req.body[k]; });

    const updated = await Users.updateById(req.user.id, updates);
    if (!updated) return res.status(404).json({ message: "User not found" });

    const { user_password, refresh_token, otp, reset_token, ...safe } = updated;
    res.json({ message: "User updated successfully", user: safe });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const deleted = await Users.deleteById(req.params.id);
    if (!deleted) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
