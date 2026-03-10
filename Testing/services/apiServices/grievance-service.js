import { axiosInstance } from './axiosInstance';
import { GRIEVANCES_CREATE_URL } from './constants';

export const createGrievance = async (payload, grievanceType) => {
  try {
    // console.log('payload', payload);
    const response = await axiosInstance.post(GRIEVANCES_CREATE_URL, {
      title: payload.subject,
      description: payload.description,
      locCoords: payload.locCoords,
      grievanceType: grievanceType,
      // user: payload.userId,
    });
    return response.data;
  } catch {
    console.log('Create grievance error:', err);
    throw err;
  }
};
