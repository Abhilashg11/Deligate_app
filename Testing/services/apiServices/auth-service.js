import AsyncStorage from '@react-native-async-storage/async-storage';
import { axiosInstance } from './axiosInstance';
import { Auth_LOGIN_URL, Auth_LOGOUT_URL, AUTH_REFRESH_URL, Auth_SIGNUP_URL } from './constants';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux-store/actions/userActions'


export const userSignIn = async (payload) => {
  try {
    const response = await axiosInstance.post(Auth_SIGNUP_URL, payload);
    return { success: true, ...response.data };
  } catch (error) {
    console.error('Signup Error:', error?.response?.data || error.message);
    return {
      success: false,
      message: error?.response?.data?.message || 'Something went wrong',
    };
  }
};

export const userLogin = async (credentials,dispatch) => {
  try {
    const response = await axiosInstance.post(Auth_LOGIN_URL, credentials);
    dispatch(setUser(response.data))
    return response.data;
  } catch (error) {
    if (error) {
      if (error.response) {
        return error.response.data;
      } else if (error.request) {
        return { message: 'Network error. Please check your connection.' };
      } else {
        return { message: 'An unexpected error occurred. Please try again.' };
      }
    }
  }
};

export const refreshToken = async () => {
  const response = await axiosInstance.get(AUTH_REFRESH_URL);
  const { accessToken } = response.data;
  await AsyncStorage.setItem('accessToken', accessToken);
  return accessToken;
};

export const userLogout = async () => {
  try {
    const response = await axiosInstance.post(Auth_LOGOUT_URL);
    return response.data;
  } catch (e) {
    console.error('Logout Error:', e?.response?.data || e.message);
    throw e;
  }
};
