import { LOGIN_SUCCESS, LOGOUT_REQUEST } from '../types/authTypes';

export const login = (data) => ({
  type: LOGIN_SUCCESS,
  payload: data,
});

export const logout = (data) => ({
  type: LOGOUT_REQUEST,
  payload: data,
});
