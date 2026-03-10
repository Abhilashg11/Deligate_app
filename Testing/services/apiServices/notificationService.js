import { axiosInstance } from './axiosInstance';
import { NOTIFICATIONTOKEN_URL, GET_NOTIFICATIONS_URL, MARK_AS_READ_URL } from './constants';

export const saveNotificationToken = async (token, userId) => {
  try {
    const response = await axiosInstance.post(NOTIFICATIONTOKEN_URL, {
      userId,
      token,
    });
  } catch (error) {
    console.error('Error saving notification token:', error);
  }
};

export const getAllNotifications = async () => {
  try {
    const response = await axiosInstance.get(GET_NOTIFICATIONS_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching notifications:', error);
  }
};

export const markAsRead = async (id) => {
  try {
    const response = await axiosInstance.post(MARK_AS_READ_URL, {
      notificationId: id,
    });
    return response.data;
  } catch (error) {
    console.error('Error marking notification as read:', error);
  }
};
