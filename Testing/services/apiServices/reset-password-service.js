// src/services/apiServices/reset-password-service.js

import { axiosInstance } from './axiosInstance';

// Forgot Password
export const forgotPassword = async (email) => {
  const res = await axiosInstance.post('/auth/forgot-password', { email });
  return res.data;
};

// Verify OTP
export const verifyOtp = async (email, otp) => {
  const res = await axiosInstance.post('/auth/verify-otp', { email, otp });
  return res.data;
};

// Reset Password
export const resetPassword = async (email, resetToken, newPassword) => {
  const res = await axiosInstance.post('/auth/reset-password', {
    email,
    resetToken,
    newPassword,
  });
  return res.data;
};
