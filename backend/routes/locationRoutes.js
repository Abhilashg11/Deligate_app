const express = require("express");
const { findLocation } = require("../controllers/locationController");

const router = express.Router();

router.post("/find-location", findLocation);

module.exports = router;
