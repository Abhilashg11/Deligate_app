import { ADD_COMPLAINTS, PROGRESS_UPDATE, SET_COMPLAINTS } from '../types/complaintTypes';

export const setComplaint = (data) => ({
  type: SET_COMPLAINTS,
  payload: data,
});

export const addComplaint = (data) => ({
  type: ADD_COMPLAINTS,
  payload: data,
});

export const progressUpdate = (data) => ({
  type: PROGRESS_UPDATE,
  payload: data,
});
