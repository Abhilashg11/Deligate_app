import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  LOGOUT_REQUEST,
} from '../types/authTypes';

const initialState = {
  isLoggedIn: false,
  token: null,
  userData: null,
  loading: false,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, loading: true };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        token: action.payload.accessToken,
        userData: action.payload.user,
        loading: false,
      };
    case LOGIN_FAILURE:
      return { ...state, loading: false };
    case LOGOUT_REQUEST:
      return { ...state, isLoggedIn: false, token: null, loading: false };
    default:
      return state;
  }
};
