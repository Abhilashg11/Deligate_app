const { createPatient } = require("../models/patientModel")

exports.syncPatient = async (req, res) => {
  console.log("Syncing patient:", req.body);
  try {
   const patient = req.body;

    patient.created_at = new Date(patient.created_at);
    patient.updated_at = new Date(patient.updated_at);

    const serverData = await createPatient(patient);

    res.status(201).json({
      server_id: serverData.server_id
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to sync patient" });
  }
}