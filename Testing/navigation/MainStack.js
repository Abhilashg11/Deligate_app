import { StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Drainage from '~/screens/sliderScreens/Drainage';
import MetaData from '../meta_data/metadata.json';
import MainLayout from '~/layout/MainLayout';
import ApplicationStatus from '~/screens/applicationStatusScreen/ApplicationStatus';
import EditProfile from '~/screens/profileScreen/editProfileScreen/EditProfile';
import Settings from '~/screens/settingScreen/Settings';
import Grievances from '~/screens/grievancesScreen/Grievances';
import uiTemplate from '../template/uiTemplate.json';
import Notification from '~/components/systemComponents/Notification/Notification';
import ContentScreen from '~/screens/contentScreen/ContentScreen';
import AboutScreen from '~/screens/settingScreen/extraSettingsScreens/AboutScreen';
import PrivacyPolicy from '~/screens/settingScreen/extraSettingsScreens/PrivacyPolicy';
import TermsAndConditions from '~/screens/settingScreen/extraSettingsScreens/TermsAndConditions';
import AuthGate from '~/access/AuthGate';
import LocationPermission from '~/screens/others/LocationPermission';
import Home from '~/screens/homeScreen/Home';
import AuthPage from '~/access/AuthPage';
import NoServiceScreen from '~/screens/serviceScreen/NoServiceScreen';
const MainStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={MainLayout} />
      {/* <Stack.Screen
        name="sliderScreen"
        component={Grievances}
        uiTemplate={uiTemplate}
        initialParams={{ metadata: MetaData }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        initialParams={{ metadata: MetaData }}
      />
      <Stack.Screen
        name="ApplicationStatus"
        component={ApplicationStatus}
        initialParams={{ metadata: MetaData }}
      />
      <Stack.Screen
        name="Notifications"
        component={Notification}
        initialParams={{ metadata: MetaData }}
      />
      <Stack.Screen
        name="contentScreen"
        component={ContentScreen}
        initialParams={{ metadata: MetaData }}
      />
      <Stack.Screen name="Settings" component={Settings} initialParams={{ metadata: MetaData }} />
      <Stack.Screen
        name="AboutScreen"
        component={AboutScreen}
        initialParams={{ metadata: MetaData }}
      />
      <Stack.Screen
        name="Privacy Policy"
        component={PrivacyPolicy}
        initialParams={{ metadata: MetaData }}
      />
      <Stack.Screen
        name="Terms and Conditions"
        component={TermsAndConditions}
        initialParams={{ metadata: MetaData }}
      />
      <Stack.Screen name="AuthGate" component={AuthGate} />
      <Stack.Screen
        name="LocationPermission"
        component={LocationPermission}
        initialParams={{ metadata: MetaData }}
      />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="AuthPage" component={AuthPage} />
      <Stack.Screen name="NoService" component={NoServiceScreen} /> */}
    </Stack.Navigator>
  );
};

export default MainStack;

const styles = StyleSheet.create({});
