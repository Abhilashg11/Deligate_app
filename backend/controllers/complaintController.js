const Complaint = require("../models/complaintModel");

exports.createComplaint = async (req, res) => {
  try {
    const newComplaint = await Complaint.create({
      userId: req.user.id,
      ...req.body,
    });
    res.status(201).json({ message: "Grievance submitted", complaint: newComplaint });
  } catch (error) {
    console.error("Create Complaint Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.getComplaintsByUserId = async (req, res) => {
  try {
    const complaints = await Complaint.findByUserId(req.user.id);
    res.status(200).json({ success: true, count: complaints.length, complaints });
  } catch (error) {
    console.error("Error fetching user complaints:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

exports.getComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.findAll();
    res.json({ message: "All complaints fetched", count: complaints.length, complaints });
  } catch (err) {
    res.status(500).json({ message: "Server error", err });
  }
};

exports.getComplaintsById = async (req, res) => {
  try {
    const comp = await Complaint.findById(req.params.id);
    if (!comp) return res.status(404).json({ message: "Complaint not found" });
    res.json(comp);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.updateComplaint = async (req, res) => {
  try {
    const { status, message, rejectionReason } = req.body;

    if (!status && !message && !rejectionReason) {
      return res.status(400).json({ message: "Only status, message, and rejectionReason can be updated." });
    }

    const existing = await Complaint.findById(req.params.id);
    if (!existing) return res.status(404).json({ message: "Complaint not found" });

    const updated = await Complaint.update(req.params.id, { status, message, rejectionReason });

    const io = req.app.get("io");
    if (io) {
      io.to(existing.user_id.toString()).emit("progressUpdate", {
        complaintId: existing.complaint_id,
        status,
        message: message || null,
        date: new Date(),
      });
    }

    res.json({ message: "Complaint updated successfully", complaint: updated, success: true });
  } catch (error) {
    console.error("Error updating complaint:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

exports.deleteComplaint = async (req, res) => {
  try {
    const deleted = await Complaint.deleteById(req.body.id);
    if (!deleted) return res.status(404).json({ message: "Complaint not found" });
    res.json({ message: "Complaint deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.deleteAllComplaint = async (req, res) => {
  try {
    const result = await Complaint.deleteAll();
    res.status(200).json({ message: "All complaints deleted successfully", count: result.deletedCount });
  } catch (error) {
    res.status(500).json({ message: "Server error during mass deletion.", error: error.message });
  }
};
