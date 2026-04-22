
const express = require("express");
const router = express.Router();
const { createStaff } = require("../controllers/staffController");

router.post("/create", createStaff);

module.exports = router;