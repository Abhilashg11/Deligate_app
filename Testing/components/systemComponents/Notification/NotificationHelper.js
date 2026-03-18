// Notification.js
import React, { useEffect } from 'react';
import { Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { addNotification, incrementUnread } from '~/store/actions/notificationActions';
import { axiosInstance } from '~/services/apiServices/axiosInstance';

// Notification handler: how the notification behaves
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const NotificationHelper = () => {
  const userId = useSelector((state) => state.user.userData?._id);
  const dispatch = useDispatch();
  // ✅ Register for push notifications
  async function registerForPushNotificationsAsync() {
    if (!Device.isDevice) {
      alert('Must use physical device for Push Notifications');
      return;
    }

    // Android channel setup
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    // Permissions
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }

    // ✅ Get token
    const token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log('Expo Push Token:', token);

    // ✅ Send token to backend
    if (userId && token) {
      const response = await axiosInstance.post(
        'http://192.168.0.110:4000/notifications/save-token',
        {
          userId: userId,
          token: token,
        }
      );
    }

    return token;
  }

  useEffect(() => {
    if (userId) {
      registerForPushNotificationsAsync();
    }

    // ✅ Notification listeners
    const subscriptionReceived = Notifications.addNotificationReceivedListener((notification) => {
      console.log('📩 Notification received:', notification);
      // dispatch(addNotification(notification.messages))
    });

    const subscriptionResponse = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log('📲 Notification clicked:', response);
      }
    );

    return () => {
      subscriptionReceived.remove();
      subscriptionResponse.remove();
    };
  }, [userId]);

  return null;
};

export default NotificationHelper;
