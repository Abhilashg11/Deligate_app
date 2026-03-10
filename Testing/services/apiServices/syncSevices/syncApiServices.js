import { axiosInstance } from "../axiosInstance";

export async function createPatientRemote(patient) {
  const res = await axiosInstance.post("/patients/sync", patient);
console.log("Syncing patient to server:", patient);
console.log("Server response:", res.data);
  return res
   // should return { server_id: "..." }
}