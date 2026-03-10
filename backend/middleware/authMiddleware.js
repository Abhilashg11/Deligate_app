const jwt = require("jsonwebtoken");
const Users = require("../models/userModel");
require("dotenv").config();

// ---------------------------------------------
// 1. PROTECT - Verifies JWT access token
// ---------------------------------------------
const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

    const user = await Users.findById(decoded.id);
    if (!user) return res.status(401).json({ message: "User not found" });

    req.user = user;
    next();
  } catch (error) {
    console.error("Auth Error:", error);
    res.status(401).json({ message: "Unauthorized" });
  }
};

// ---------------------------------------------
// 2. ADMIN-ONLY Middleware
// ---------------------------------------------
const isAdmin = (req, res, next) => {
  if (req.user?.is_admin === true) return next();
  return res.status(403).json({ message: "Forbidden - Admin only" });
};

// ---------------------------------------------
// 3. VALIDATOR-ONLY Middleware
// ---------------------------------------------
const isValidator = (req, res, next) => {
  if (req.user?.is_validator === true) return next();
  return res.status(403).json({ message: "Forbidden - Validator only" });
};

// ---------------------------------------------
// 4. ADMIN OR VALIDATOR Middleware
// ---------------------------------------------
const isAdminOrValidator = (req, res, next) => {
  if (req.user?.is_admin === true || req.user?.is_validator === true) return next();
  return res.status(403).json({ message: "Forbidden - Only Admin or Validator can access this" });
};

// ---------------------------------------------
// 5. Generic token verify (alias)
// ---------------------------------------------
const verifyToken = async (req, res, next) => {
  try {
    const header = req.headers.authorization;
    if (!header?.startsWith("Bearer "))
      return res.status(401).json({ message: "No token provided" });

    const token = header.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET || "SECRET123");

    const user = await Users.findById(decoded.id);
    if (!user) return res.status(401).json({ message: "Invalid user" });

    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = { protect, isAdmin, isValidator, isAdminOrValidator, verifyToken };
