import { SET_USER, CLEAR_USER, FETCH_USER, SET_LOADING } from '../types/userTypes';

const initialState = {
  userData: null,
  loading: false,
};

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
     console.log("Dispatching SET_USER", data);
      return { ...state, userData: action.payload };

    case CLEAR_USER:
      return { ...state, userData: null };

    case FETCH_USER:
      return { ...state, userData: action.payload };

    case SET_LOADING:
      return { ...state, loading: action.payload };

    default:
      return state;
  }
};
