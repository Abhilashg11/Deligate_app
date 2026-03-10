import {
  ADD_NOTIFICATION,
  INCREMENT_UNREAD,
  MARK_AS_READ,
  RESET_UNREAD,
  SET_NOTIFICATIONS,
} from '../types/notificationTypes';

export const setNotifications = (data) => ({
  type: SET_NOTIFICATIONS,
  payload: data,
});

export const incrementUnread = (data) => ({
  type: INCREMENT_UNREAD,
  payload: data,
});

export const resetUnread = (data) => ({
  type: RESET_UNREAD,
  payload: data,
});

export const markAsRead = (data) => ({
  type: MARK_AS_READ,
  payload: data,
});

export const addNotification = (data) => ({
  type: ADD_NOTIFICATION,
  payload: data,
});
