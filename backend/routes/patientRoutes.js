const {syncPatient} = require ("../controllers/patientController")
const express = require("express");
const router = express.Router();

router.post("/sync", syncPatient);

module.exports = router;