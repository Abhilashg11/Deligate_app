import { ADD_COMPLAINTS, PROGRESS_UPDATE, SET_COMPLAINTS } from '../types/complaintTypes';

const initialState = {
  list: {
    complaints: [],
    count: 0,
  },
};

export const complaintReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_COMPLAINTS:
      return {
        ...state,
        list: {
          complaints: action.payload, 
          count: action.payload.length,
        },
      };

    case ADD_COMPLAINTS:
      return {
        ...state,
        list: {
          complaints: [action.payload, ...state.list.complaints],
          count: state.list.count + 1,
        },
      };

    case PROGRESS_UPDATE:
      return {
        ...state,
        list: {
          complaints: state.list.complaints.map((item) =>
            item.complaintId === action.payload.complaintId
              ? {
                  ...item,
                  progress: [
                    ...item.progress,
                    {
                      status: action.payload.status,
                      message: action.payload.message,
                      date: action.payload.date,
                    },
                  ],
                }
              : item
          ),
          count: state.list.count,
        },
      };

    default:
      return state;
  }
};
