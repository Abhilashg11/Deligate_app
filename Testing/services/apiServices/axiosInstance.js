import { API_BASE_URL } from './constants';
import axios from 'axios';
import { store } from '~/store/store';
import { refreshToken } from './auth-service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logout } from '~/store/actions/authActions';
import { navigate } from '~/navigation/navigationHelper';

console.log('axiosInstance_BASE_URL', API_BASE_URL);
export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// axiosInstance.interceptors.request.use(async (config) => {
//   const token = await AsyncStorage.getItem('accessToken');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;
//     if (
//       originalRequest.url.includes('/login') ||
//       originalRequest.url.includes('/signup') ||
//       originalRequest.url.includes('/refresh-token')
//     ) {
//       return Promise.reject(error);
//     }

//     if (error.response && error.response.status === 401 && !originalRequest._retry) {
//       console.log('inside 401 error');
//       originalRequest._retry = true;
//       try {
//         const newToken = await refreshToken();
//         originalRequest.headers.Authorization = `Bearer ${newToken}`;
//         return axiosInstance(originalRequest);
//       } catch (err) {
//         console.log('Refresh failed', err);
//         store.dispatch(logout());
//         await AsyncStorage.multiRemove(['accessToken', 'refreshToken']);
//         navigate('AuthGate');
//         return Promise.reject(err);
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// axiosInstance.interceptors.request.use(
//   (config) => {
//     const state = store.getState();
//     const token = state.auth.token;

//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );
