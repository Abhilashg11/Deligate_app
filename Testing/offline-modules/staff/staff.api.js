import { axiosInstance } from '../../services/apiServices/axiosInstance';

export async function createStaffRemote(Staff) {
  const res = await axiosInstance.post("/staff/create", Staff);
  return res;
}

export async function updateStaffRemote(Staff) {
  return axiosInstance.put("/staff/update", Staff);
}

export async function deleteStaffRemote(id) {
  return axiosInstance.delete(`/staff/${id}`);
}