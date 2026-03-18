import React, { useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  ImageBackground,
  Animated,
  Easing,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Logo from '../../assets/logo.svg';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import ForgotPasswordForm from './forgetPassword/ForgetPassword';
import ResetPassword from './forgetPassword/ResetPassword';
import OtpForm from './forgetPassword/OtpForm';
import PasswordResetSuccess from './forgetPassword/PasswordResetSuccess';
import { normalize } from '~/utils/normalize/normalize';
import { useTheme } from '~/context/ThemeContext';
import { useTranslation } from 'react-i18next';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CustomSnackBar from '~/components/snackBar/CustomSnackBar';

const { width, height } = Dimensions.get('screen');

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [resetEmail, setResetEmail] = useState(null);
  const [resetToken, setResetToken] = useState(null); // NEW: store token
  const insets = useSafeAreaInsets();
  const { themeStyles } = useTheme();
  const { t } = useTranslation();
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const translateAnim = useRef(new Animated.Value(0)).current;

  const text = t('welcome_back');
  const [first, second] = text.split(' ');
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const fade = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 450,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(translateAnim, {
        toValue: -20,
        duration: 450,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start(() => {
      setTimeout(() => {
        setActiveTab('login');
        translateAnim.setValue(20);
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 450,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(translateAnim, {
            toValue: 0,
            duration: 450,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ]).start();
      }, 150);
    });
  };
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../../assets/image.png')}
        style={styles.backgroundImage}
        blurRadius={5}
      />
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        enableOnAndroid={true}
        extraHeight={200}
        keyboardShouldPersistTaps="handled">
        {/* Login / SignUp */}
        <CustomSnackBar
          visible={snackbarVisible}
          message={snackbarMessage}
          position="top"
          backgroundColor="#FF6B6B"
          textColor="#fff"
          borderRadius={12}
          onDismiss={() => setSnackbarVisible(false)}
        />
        {activeTab === 'login' || activeTab === 'signup' ? (
          <>
            <View style={styles.topSection}>
              <Logo width={normalize(100)} height={normalize(100)} />
              <Text style={styles.titleText(themeStyles.authPage)}>
                {t('Government of Karnataka')}
                {'\n'}
                {t('Citizen Complaint Portal')}
              </Text>
            </View>
            <View style={{ paddingBottom: insets.bottom + 10, width: '100%' }}>
              <View
                style={styles.card(themeStyles.authPage)}
                className="shadow-[0_6px_20px_0px_rgba(0,0,0,0.12)]">
                {activeTab === 'login' ? (
                  <Text style={styles.welcome(themeStyles.authPage)}>
                    {first} <Text style={styles.bold}>{second}</Text>!
                  </Text>
                ) : (
                  <Text style={styles.welcome(themeStyles.authPage)}>Create Your Account</Text>
                )}

                <View style={styles.tabHeader(themeStyles.authPage)}>
                  <TouchableOpacity
                    className={activeTab === 'login' ? 'shadow-xl' : 'shadow-none'}
                    style={[
                      styles.tabButton,
                      activeTab === 'login' && styles.activeTabButton(themeStyles.authPage),
                    ]}
                    onPress={() => setActiveTab('login')}>
                    <Text
                      style={[
                        styles.tabText(themeStyles.authPage),
                        activeTab === 'login' && styles.activeTabText(themeStyles.authPage),
                      ]}>
                      Login
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    className={activeTab === 'signup' ? 'shadow-xl' : 'shadow-none'}
                    style={[
                      styles.tabButton,
                      activeTab === 'signup' && styles.activeTabButton(themeStyles.authPage),
                    ]}
                    onPress={() => setActiveTab('signup')}>
                    <Text
                      style={[
                        styles.tabText(themeStyles.authPage),
                        activeTab === 'signup' && styles.activeTabText(themeStyles.authPage),
                      ]}>
                      Sign Up
                    </Text>
                  </TouchableOpacity>
                </View>

                <Animated.ScrollView
                  style={{
                    paddingHorizontal: normalize(18),
                    opacity: fadeAnim,
                    transform: [{ translateY: translateAnim }],
                  }}
                  contentContainerStyle={styles.formContainer}
                  showsVerticalScrollIndicator={false}>
                  {activeTab === 'login' ? (
                    <LoginForm
                      themeStyles={themeStyles?.authPage?.loginForm}
                      onForgot={() => setActiveTab('forgot')}
                      onSignUp={() => setActiveTab('signup')}
                      setSnackbarMessage={setSnackbarMessage}
                      setSnackbarVisible={setSnackbarVisible}
                    />
                  ) : (
                    <SignUpForm
                      themeStyles={themeStyles?.authPage?.signUpForm}
                      setSnackbarMessage={setSnackbarMessage}
                      setSnackbarVisible={setSnackbarVisible}
                      setActiveTab={setActiveTab}
                      fade={fade}
                    />
                  )}
                </Animated.ScrollView>
              </View>
            </View>
          </>
        ) : (
          <View style={{ flex: 1, paddingBottom: insets.bottom + 10 }}>
            {/* Forgot Password */}
            {activeTab === 'forgot' && (
              <ForgotPasswordForm
                themeStyles={themeStyles?.authPage?.forgotForm}
                onBack={() => setActiveTab('login')}
                onNext={(data) => {
                  setResetEmail(data.email);
                  setResetToken(data.resetToken); // store token here
                  setActiveTab('otp');
                }}
              />
            )}

            {/* OTP */}
            {activeTab === 'otp' && (
              <OtpForm
                themeStyles={themeStyles?.authPage?.otpForm}
                onBack={() => setActiveTab('forgot')}
                onNext={(data) => {
                  setResetEmail(data.email);
                  setResetToken(data.resetToken);
                  setActiveTab('newPassword');
                }}
                routeData={{ email: resetEmail, resetToken: resetToken }}
              />
            )}

            {/* Reset Password */}
            {activeTab === 'newPassword' && (
              <ResetPassword
                themeStyles={themeStyles?.authPage?.newPasswordForm}
                onBack={() => setActiveTab('login')}
                onComplete={() => setActiveTab('login')}
                onNext={() => setActiveTab('resetSuccess')}
                routeData={{ email: resetEmail, resetToken: resetToken }}
              />
            )}

            {/* Password Reset Success */}
            {activeTab === 'resetSuccess' && (
              <PasswordResetSuccess onReturnToLogin={() => setActiveTab('login')} />
            )}
          </View>
        )}
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default AuthPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: normalize(15),
  },
  topSection: {
    alignItems: 'center',
    marginTop: normalize(20),
    marginBottom: normalize(15),
  },
  titleText: (authPage) => ({
    fontSize: normalize(14),
    color: authPage.titleTextColor,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: normalize(2),
    fontFamily: 'RobotoSlab_500Medium',
  }),
  card: (authPage) => ({
    borderRadius: normalize(29),
    backgroundColor: authPage.cardBackgroundColor,
    paddingTop: normalize(15),
    height: normalize(565),
  }),
  welcome: (authPage) => ({
    fontSize: normalize(20),
    fontWeight: '400',
    color: authPage.welcomeTextColor,
    marginTop: normalize(8),
    marginBottom: normalize(25),
    textAlign: 'center',
    fontFamily: 'RobotoSlab_500Medium',
  }),
  bold: {
    fontWeight: 'bold',
  },
  tabHeader: (authPage) => ({
    flexDirection: 'row',
    marginBottom: normalize(20),
    borderRadius: normalize(30),
    height: normalize(54),
    width: normalize(325),
    padding: normalize(4),
    backgroundColor: authPage.tabHeaderBackgroundColor,
    alignSelf: 'center',
  }),
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTabButton: (authPage) => ({
    borderRadius: normalize(30),
    backgroundColor: authPage.activeTabButtonColor,
  }),
  tabText: (authPage) => ({
    fontSize: normalize(14),
    color: authPage.tabTextColor,
  }),
  activeTabText: (authPage) => ({
    color: authPage.activeTabTextColor,
    fontWeight: 'bold',
  }),
  formContainer: {
    paddingBottom: normalize(20),
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    position: 'absolute',
    top: 0,
    left: 0,
    width: width,
    height: height,
    opacity: 0.8,
  },
});
