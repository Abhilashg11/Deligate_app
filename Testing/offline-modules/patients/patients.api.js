import { axiosInstance } from '../../services/apiServices/axiosInstance';

export async function createPatientRemote(patient) {
  const res = await axiosInstance.post("/patients/sync", patient);
  return res;
}

export async function updatePatientRemote(patient) {
  return axiosInstance.put("/patients", patient);
}

export async function deletePatientRemote(id) {
  return axiosInstance.delete(`/patients/${id}`);
}