import { axiosInstance } from './axiosInstance';
import { USER_URL, UPDATE_USER } from './constants';

export const getUser = async (id) => {
  try {
    const response = await axiosInstance.get(`${USER_URL}/${id}`);
    console.log('fgfggf', response.data);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch user data', error);
    console.log({ error });
  }
};

export const updateProfile = async (data) => {
  try {
    const response = await axiosInstance.put(UPDATE_USER, data);
    return response.data;
  } catch (error) {
    console.log({ error });
    throw new Error('Failed to update profile', error);
  }
};
