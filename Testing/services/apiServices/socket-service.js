import { API_BASE_URL } from './constants';
import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import { addNotification, incrementUnread } from '~/store/actions/notificationActions';
import { useRef } from 'react';
import { progressUpdate } from '~/store/actions/complaintActions';

export default function useSocket(userid) {
  const hasConnected = useRef(false);
  // const userId = useSelector((state) => state.user.userData?._id) || userid;
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userId || hasConnected.current) return;

    hasConnected.current = true; // prevent re-run

    const socket = io(API_BASE_URL, {
      transports: ['websocket'],
    });

    socket.on('connect', () => {
      socket.emit('joinRoom', userId);
    });

    socket.on('newNotification', (notification) => {
      dispatch(addNotification(notification));
      dispatch(incrementUnread());
    });
    socket.on('progressUpdate', (data) => {
      dispatch(progressUpdate(data));
    });

    return () => {
      socket.off('newNotification');
      socket.off('progressUpdated');
      socket.disconnect();
      hasConnected.current = false;
    };
  }, [userId]);
}
