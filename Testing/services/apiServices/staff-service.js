import { axiosInstance } from './axiosInstance';
import { STAFF_CREATE_URL } from './constants';

export const createStaffAPI = async payload => {
  try {
    const response = await axiosInstance.post(STAFF_CREATE_URL, payload);
    return response.data;
    // console.log('Simulating API call to create staff with payload:', payload);
    // return payload;
  } catch (err) {
    console.log('Create staff error:', err);
    throw err;
  }
};
