const Users = require("../models/userModel");
const bcrypt = require("bcryptjs");
const { generateValidatorId } = require("../utils/generateUniqueId");

exports.createValidator = async (req, res) => {
  try {
    const admin = req.user;
    if (!admin.is_admin || !admin.is_admin_active)
      return res.status(403).json({ message: "Only active admins can create validators" });

    const { name, email, phoneNumber, address, aadhaarNumber } = req.body;
    if (!name || !email || !phoneNumber || !aadhaarNumber)
      return res.status(400).json({ message: "Missing fields" });

    const existing = await Users.findByEmail(email);
    if (existing) return res.status(409).json({ message: "Email already exists" });

    const plainPassword = Math.random().toString(36).slice(-8);
    const hashed = await bcrypt.hash(plainPassword, 12);

    const validator_profile_id = generateValidatorId(admin.admin_profile_id);

    const validator = await Users.create({
      user_name: name,
      user_email: email,
      user_password: hashed,
      user_phonenumber: phoneNumber,
      aadhaar_number: aadhaarNumber,
      address: address || "Not Provided",
      is_validator: true,
      is_validator_active: true,
      validator_profile_id,
      validator_owner_id: admin.admin_profile_id,
      location: admin.location || "Unassigned",
    });

    return res.status(201).json({
      message: "Validator created successfully",
      validator: {
        name: validator.user_name,
        email: validator.user_email,
        validator_profile_id: validator.validator_profile_id,
        validator_owner_id: validator.validator_owner_id,
      },
      credentials: { username: validator.user_email, password: plainPassword },
    });
  } catch (err) {
    console.error("createValidator error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.deactivateValidator = async (req, res) => {
  try {
    const admin = req.user;
    if (!admin.is_admin) return res.status(403).json({ message: "Only admin can deactivate validators" });

    const { validator_profile_id } = req.body;
    if (!validator_profile_id) return res.status(400).json({ message: "Validator profile ID required" });

    const validator = await Users.findOne({ validator_profile_id });
    if (!validator) return res.status(404).json({ message: "Validator not found" });

    if (validator.validator_owner_id !== admin.admin_profile_id)
      return res.status(403).json({ message: "This validator does not belong to you" });

    await Users.updateById(validator.id, { is_validator_active: false });
    res.status(200).json({ message: "Validator deactivated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.activateValidator = async (req, res) => {
  try {
    const admin = req.user;
    if (!admin.is_admin) return res.status(403).json({ message: "Only admin can activate validators" });

    const { validator_profile_id } = req.body;
    if (!validator_profile_id) return res.status(400).json({ message: "Validator profile ID required" });

    const validator = await Users.findOne({ validator_profile_id });
    if (!validator) return res.status(404).json({ message: "Validator not found" });

    if (validator.validator_owner_id !== admin.admin_profile_id)
      return res.status(403).json({ message: "This validator does not belong to you" });

    await Users.updateById(validator.id, { is_validator_active: true });
    res.status(200).json({ message: "Validator activated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateValidator = async (req, res) => {
  try {
    const admin = req.user;
    if (!admin.is_admin || !admin.is_admin_active)
      return res.status(403).json({ message: "Only active admins can update validators" });

    const { validator_profile_id, name, email, phoneNumber, address, location } = req.body;
    if (!validator_profile_id) return res.status(400).json({ message: "Validator profile ID required" });

    const validator = await Users.findOne({ validator_profile_id });
    if (!validator) return res.status(404).json({ message: "Validator not found" });

    if (validator.validator_owner_id !== admin.admin_profile_id)
      return res.status(403).json({ message: "This validator does not belong to you" });

    const updates = {};
    if (name) updates.user_name = name;
    if (email) updates.user_email = email;
    if (phoneNumber) updates.user_phonenumber = phoneNumber;
    if (address) updates.address = address;
    if (location) updates.location = location;

    const updated = await Users.updateById(validator.id, updates);

    res.status(200).json({
      message: "Validator updated successfully",
      updatedValidator: {
        name: updated.user_name,
        email: updated.user_email,
        phoneNumber: updated.user_phonenumber,
        address: updated.address,
        location: updated.location,
        validator_profile_id: updated.validator_profile_id,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
