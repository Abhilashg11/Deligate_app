import {
  ADD_NOTIFICATION,
  INCREMENT_UNREAD,
  MARK_AS_READ,
  RESET_UNREAD,
  SET_NOTIFICATIONS,
} from '../types/notificationTypes';

const initialState = {
  list: [],
  unReadCount: 0,
};

export const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NOTIFICATIONS:
      return { ...state, list: action.payload };
    case ADD_NOTIFICATION:
      return { ...state, list: [action.payload, ...state.list] };
    case INCREMENT_UNREAD:
      return { ...state, unReadCount: state.unReadCount + 1 };
    case RESET_UNREAD:
      return { ...state, unReadCount: 0 };
    case MARK_AS_READ:
      return {
        ...state,
        list: state.list.map((n) => (n._id === action.payload ? { ...n, isRead: true } : n)),
      };
    default:
      return state;
  }
};
