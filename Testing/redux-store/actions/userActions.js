// action types

import axios from 'axios';
import { getUser } from '~/services/apiServices/user-service';
import { SET_USER,CLEAR_USER,SET_LOADING, } from '../types/userTypes';

//action creators

export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

export const clearUser = () => ({
  type: CLEAR_USER,
});
export const setLoading = (loading) => ({
  type: SET_LOADING,
  payload: loading,
});

// thunk for fetching user data from an API

export const fetchUser = () => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const response = await getUser('6878b6623c4506891a9ec3c4');

      dispatch(setUser(response));
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      dispatch(setLoading(false));
    }
  };
};
