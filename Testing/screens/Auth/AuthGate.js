import { View, Text } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
// import MainStack from '../../navigation/MainStack';
// import AuthPage from './AuthPage';
import { useDispatch, useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { BottomTabs } from '../../navigation/BottomTabs';
// import LottieView from 'lottie-react-native';
// import NotificationHelper from '~/components/systemComponents/Notification/NotificationHelper';
// import { refreshToken } from '../../services/apiServices/auth-service';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { getAllNotifications } from '../../services/apiServices/notificationService';
// import { setNotifications } from '../../redux-store/actions/notificationActions';
// import { setComplaint } from '~/store/actions/complaintActions';
// import { fetchComplaints } from '~/services/apiServices/complaint-service';
// // import useSocket from '../../services/apiServices/socket-service';
// import LocationPermissionScreen from '~/screens/others/LocationPermission';
// import * as Location from 'expo-location';
// import NoServiceScreen from '~/screens/serviceScreen/NoServiceScreen';
// import { findLocation } from '~/services/apiServices/location-service';
// import useGeoLocation from '~/components/hooks/useGeoLocation';
// import { setLocationName } from '~/store/actions/locationActions';
import LoginForm from './LoginForm';

const AuthGate = ({ metadata }) => {
  // const { loading, token } = useSelector((state) => state.auth);
  // const userId = useSelector((state) => state.user.userData?._id);
  // const { locationName } = useSelector((state) => state.location);

  const [loggedIn, setLoggedIn] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [locationChecked, setLocationChecked] = useState(false);

  // const dispatch = useDispatch();
  // const animation = useRef(null);
  //   const { permission, requestLocation } = useGeoLocation();

  // useEffect(() => {
  //   const checkAuth = async () => {
  //     try {
  //       const accessToken = await AsyncStorage.getItem('accessToken');
  //       if (!accessToken) return setLoggedIn(false);

  //       await refreshToken();
  //       // dispatch(setNotifications((await getAllNotifications()).notifications || []));
  //       // dispatch(setComplaint(await fetchComplaints()));
  //       setLoggedIn(true);
  //     } catch (err) {
  //       await AsyncStorage.removeItem('accessToken');
  //       setLoggedIn(false);
  //     } finally {
  //       setCheckingAuth(false);
  //     }
  //   };

  //   checkAuth();
  // }, [token]);

  //   useEffect(() => {
  //     const verifyLocation = async () => {
  //       if (!loggedIn) return;

  //       // ask permission only if null
  //       if (permission === null) {
  //         await requestLocation();
  //         return;
  //       }
  //       // already granted → check panchayat
  //       if (permission === 'granted') {
  //         const loc = await Location.getCurrentPositionAsync({
  //           accuracy: Location.Accuracy.High,
  //         });
  //         const res = await findLocation(loc.coords);
  //         if (res?.found) {
  //           dispatch(setLocationName(res.locationName));
  //         } else {
  //           dispatch(setLocationName(null));
  //         }

  //         setLocationChecked(true);
  //         return;
  //       }

  //       setLocationChecked(true);
  //     };

  //     verifyLocation();
  //   }, [loggedIn, permission]);

  // useSocket(userId);

  // if (checkingAuth ) {
  //   return (
  //     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
  //       {/* <LottieView
  //         ref={animation}
  //         source={require('../../assets/loading.json')}
  //         autoPlay
  //         loop
  //         style={{ width: 100, height: 100 }}
  //       /> */}
  //       <Text>memejeje</Text>

  //     </View>
  //   );
  // }

  if (loggedIn) return <LoginForm metadata={metadata} />;

  //   if (permission === null) {
  //     return (
  //       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
  //         <LottieView
  //           source={require('../../assets/loading.json')}
  //           autoPlay
  //           loop
  //           style={{ width: 80, height: 80 }}
  //         />
  //         <Text>Getting location...</Text>
  //       </View>
  //     );
  //   }

  //   if (permission === 'denied' || permission === 'blocked') {
  //     return <LocationPermissionScreen requestLocation={requestLocation} />;
  //   }

  //   if (!locationChecked) {
  //     return (
  //       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
  //         <LottieView
  //           ref={animation}
  //           source={require('../../assets/loading.json')}
  //           autoPlay
  //           loop
  //           style={{ width: 80, height: 80 }}
  //         />
  //         <Text>Checking your service area...</Text>
  //       </View>
  //     );
  //   }

  //   if (permission === 'granted' && !locationName) {
  //     return <NoServiceScreen />;
  //   }

  return (
    <NavigationContainer>
      <BottomTabs />
    </NavigationContainer>
  );
};

export default AuthGate;
