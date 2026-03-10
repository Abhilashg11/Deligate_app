const express = require("express");

const router = express.Router();

const {
  createComplaint,
  getComplaints,
  getComplaintsById,
  updateComplaint,
  // deleteComplaint,
  // deleteAllComplaint,
  getComplaintsByUserId,
} = require("../controllers/complaintController");
const { protect } = require("../middleware/authMiddleware");

router.post("/create", protect, createComplaint);

router.get("/my-complaints", protect, getComplaintsByUserId);

router.get("/", protect, getComplaints);

router.get("/:id", protect, getComplaintsById);

router.put("/:id", protect, updateComplaint);

// router.delete("/deleteAll",  deleteAllComplaint);

// router.delete("/:id", protect, deleteComplaint);




module.exports = router;
