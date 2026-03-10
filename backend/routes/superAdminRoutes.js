const express = require("express");
const {
  createAdmin,
  deactivateAdmin,
  activateAdmin,
  resetAdminPasswordBySuperAdmin,
  getAllAdminsAndValidators,
  loginSuperAdmin,
  verifySuperAdmin,
} = require("../controllers/superAdminController");

const router = express.Router();

// 🟢 Public Route — SuperAdmin Login
router.post("/login", loginSuperAdmin);

// 🔒 Protected Routes — Require SuperAdmin JWT
router.get("/all-admins", verifySuperAdmin, getAllAdminsAndValidators);
router.post("/create-admin", verifySuperAdmin, createAdmin);
router.post("/deactivate-admin", verifySuperAdmin, deactivateAdmin);
router.post("/activate-admin", verifySuperAdmin, activateAdmin);
router.post(
  "/reset-admin-password",
  verifySuperAdmin,
  resetAdminPasswordBySuperAdmin
);

module.exports = router;
