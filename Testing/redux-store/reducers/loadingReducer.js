// ~/store/reducers/loadingReducer.js
const initialState = {
  isLoading: false,
};

export const loadingReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SHOW_LOADING":
      return { ...state, isLoading: true };
    case "HIDE_LOADING":
      return { ...state, isLoading: false };
    default:
      return state;
  }
};

// Actions
export const showLoading = () => ({ type: "SHOW_LOADING" });
export const hideLoading = () => ({ type: "HIDE_LOADING" });
