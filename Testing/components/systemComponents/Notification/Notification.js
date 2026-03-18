import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import CustomCard from '~/components/cards/CustomCard';
import LucideIcon from '~/components/icon/lucideIcons/LucideIcon';
import NavHeader from '~/containers/navbar_container/NavHeader';
import { useTheme } from '~/context/ThemeContext';
import { normalize } from '~/utils/normalize/normalize';

const Notification = ({ route }) => {
  const { themeStyles } = useTheme();
  const [notifications, setNotifications] = useState([]);
  const style = themeStyles.notification;
  const metadata = route?.params || {};
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const rawNotifications = useSelector((state) => state.notification.list || []);

  const getTimeAgo = (createdAt) => {
    const now = Date.now();
    const createdTime = new Date(createdAt).getTime();
    const diffInSeconds = Math.floor((now - createdTime) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    const minutes = Math.floor(diffInSeconds / 60);
    if (minutes < 60) return `${minutes} min ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days}d ago`;
    const weeks = Math.floor(days / 7);
    return `${weeks}w ago`;
  };

  const optimizeTime = (data) =>
    data.map((item) => ({
      ...item,
      timeAgo: getTimeAgo(item.createdAt),
    }));

  useEffect(() => {
    if (rawNotifications?.length) {
      setNotifications(optimizeTime(rawNotifications));
    }
  }, [rawNotifications]);

  useEffect(() => {
    const interval = setInterval(() => {
      setNotifications((prev) => optimizeTime(prev));
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  useFocusEffect(
    useCallback(() => {
      dispatch({ type: 'RESET_UNREAD' });
    }, [dispatch])
  );

  return (
    <LinearGradient
      colors={[themeStyles.backgroundGradient.start, themeStyles.backgroundGradient.end]}
      style={StyleSheet.absoluteFill}>
      <NavHeader title={metadata?.title || 'Notifications'} />
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.mainContainer}>
          {notifications.map((item, index) => (
            <CustomCard
              className="shadow-[0_1px_6px_0px_rgba(0,0,0,.12)]"
              key={index}
              themeStyles={style}
              left={
                <View style={styles.iconContainer(style)}>
                  <LucideIcon icon_name="CircleCheckBig" size={22} color={style.color_icon} />
                </View>
              }
              onPress={() => {
                if (item.complaintId) {
                  navigation.navigate('ApplicationStatus', { applicationId: item.complaintId });
                }
              }}
              leftStyle={{ alignSelf: 'flex-start' }}
              body={
                <View style={styles.bodyContainer}>
                  <View style={styles.headerRow}>
                    <Text style={styles.title(style)}>{item.title}</Text>
                    <Text style={styles.time}>{item.timeAgo}</Text>
                  </View>
                  <Text style={styles.message(style)}>{item.body}</Text>
                  <View style={styles.statusPill(style)}>
                    <LucideIcon icon_name="Check" size={14} color="#16a34a" />
                    <Text style={styles.statusText}>Success</Text>
                  </View>
                </View>
              }
            />
          ))}
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: normalize(20),
  },
  mainContainer: {
    paddingVertical: normalize(5),
    margin: normalize(15),
  },
  iconContainer: (themeStyles) => ({
    backgroundColor: themeStyles.icon_container,
    borderRadius: normalize(30),
    padding: normalize(8),
    justifyContent: 'center',
    alignItems: 'center',
  }),
  bodyContainer: {
    justifyContent: 'space-between',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: normalize(4),
  },
  title: (style) => ({
    fontWeight: '600',
    fontSize: normalize(16),
    color: style.color_text,
  }),
  time: {
    fontSize: normalize(12),
    color: '#6b7280',
  },
  message: (style) => ({
    fontSize: normalize(13),
    color: style.color_subtext,
    marginBottom: normalize(10),
    fontFamily: 'Roboto',
  }),
  statusPill: (themeStyles) => ({
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: themeStyles.icon_container,
    borderRadius: normalize(6),
    paddingHorizontal: normalize(8),
    paddingVertical: normalize(3),
    alignSelf: 'flex-start',
  }),
  statusText: {
    fontSize: normalize(12),
    marginLeft: normalize(4),
    color: '#16a34a',
    fontWeight: '500',
  },
});

export default Notification;
