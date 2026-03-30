import { axiosInstance } from '../../services/apiServices/axiosInstance';

export async function createPatientRemote(patient) {
  const res = await axiosInstance.post("/patients/create", patient);
  return res;
}

export async function updatePatientRemote(patient) {
  return axiosInstance.put("/patients/update", patient);
}

export async function deletePatientRemote(id) {
  return axiosInstance.delete(`/patients/${id}`);
}