import { axiosInstance } from "./axiosInstance";
import { GET_COMPLAINTS_URL } from "./constants";

export const fetchComplaints = async () => {
  try {
    const res = await axiosInstance.get(GET_COMPLAINTS_URL);

    // backend returns: { message, count, complaints }
    const list = res.data?.complaints;

    // Always return an array
    return Array.isArray(list) ? list : [];
  } catch (error) {
    console.error("Error fetching complaints:", error);
    return []; // fail-safe
  }
};
