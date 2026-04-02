import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Button,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { userLogin } from '../../services/apiServices/auth-service';
import { useTheme } from '../../themes/ThemeProvider';
import { DisplayText } from '../../components/displayComponents/text';
import LucideIcon from '../../components/displayComponents/icon/lucideIcons/LucideIcon';
import LinearGradient from 'react-native-linear-gradient';
import { loginForm } from '../../metadata/home/login.metadata';
import { useDispatch } from 'react-redux';
// import { normalize } from '~/utils/normalize/normalize';
// import { useDispatch } from 'react-redux';
// import LucideIcon from '~/components/icon/lucideIcons/LucideIcon';
// import { login } from '~/store/actions/authActions';
// import { hideLoading, showLoading } from '~/store/reducers/loadingReducer';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { setUser } from '~/store/actions/userActions';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { themeStyles } = useTheme();
  const dispatch = useDispatch();
  const handleLogin = async () => {
    if (!email || !password) return;

    try {
      const res = await userLogin(
        { email: email.toLowerCase(), password },
        dispatch,
      );
      console.log('everything going well');
      console.log(res);
    } catch (err) {
      console.log('Login error', err);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header Image */}
      <ImageBackground
        source={require('../../assets/image.png')}
        style={styles.header}
      >
        <DisplayText style={styles.logo}>{loginForm.logoName}</DisplayText>
        <DisplayText style={styles.heroText}>{loginForm.heroText}</DisplayText>
      </ImageBackground>

      {/* Card */}
      <View style={styles.card}>
        <DisplayText style={styles.title}>{loginForm.title}</DisplayText>
        <DisplayText style={styles.subtitle}>{loginForm.subtitle}</DisplayText>

        {/* Email */}
        <DisplayText style={styles.label}>{loginForm.emailLabel}</DisplayText>
        <View style={styles.input}>
          <LucideIcon icon_name="Mail" size={20} color="#D0D0D0" />
          <TextInput
            placeholder={loginForm.emailPlaceHolder}
            value={email}
            placeholderTextColor="#D0D0D0"
            onChangeText={setEmail}
          />
        </View>
        {/* Password */}
        <DisplayText style={styles.label}>
          {loginForm.passwordLabel}
        </DisplayText>
        <View style={styles.passwordContainer}>
          <LucideIcon icon_name="Lock" size={20} color="#D0D0D0" />
          <TextInput
            style={styles.passwordInput}
            placeholder={loginForm.passwordPlaceHolder}
            secureTextEntry={!showPassword}
            value={password}
            placeholderTextColor="#D0D0D0"
            onChangeText={setPassword}
          />

          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <LucideIcon icon_name={showPassword ? 'Eye' : 'EyeOff'} size={20} />
          </TouchableOpacity>
        </View>

        {/* Forgot */}
        <TouchableOpacity>
          <DisplayText style={styles.forgot}>
            {loginForm.forgotLabel}
          </DisplayText>
        </TouchableOpacity>

        {/* Login */}
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={['#0D5F7A', '#1780A0', '#239EC4']}
          style={styles.loginButton}
        >
          <Button
            color={'#ffffff'}
            title={'SignIn'}
            // disabled={disabled || formState.isSubmitting}
            onPress={handleLogin}
          />
        </LinearGradient>

        {/* OR */}
        <DisplayText style={styles.or}>OR</DisplayText>

        {/* SSO */}
        <TouchableOpacity style={styles.ssoButton}>
          <LucideIcon icon_name="Lock" size={20} color="#D0D0D0" />
          <DisplayText style={styles.ssoText}>{loginForm.ssoText}</DisplayText>
        </TouchableOpacity>

        {/* Request account */}
        <DisplayText style={styles.bottom}>
          Need access?{' '}
          <DisplayText style={styles.link}>Request an account</DisplayText>
        </DisplayText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    borderWidth: 1,
  },

  header: {
    height: 300,
    justifyContent: 'center',
    padding: 20,
  },

  logo: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },

  heroText: {
    color: '#fff',
    fontSize: 34,
    fontWeight: 'bold',
    marginTop: 10,
  },

  card: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 24,
    marginTop: -40,
  },

  title: {
    fontSize: 24,
    fontWeight: '700',
  },

  subtitle: {
    color: '#777',
    marginBottom: 20,
  },

  label: {
    fontSize: 12,
    marginBottom: 6,
    color: '#999999',
    fontWeight: 600,
  },

  input: {
    borderWidth: 1,
    borderColor: '#EAEAEA',
    borderRadius: 13,
    // padding: 10,
    marginBottom: 16,
    flexDirection: 'row',
    gap: 15,
    backgroundColor: '#F6F6F6',
    paddingHorizontal: 12,
    alignItems: 'center',
    height: 45,
  },

  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 14,
    paddingHorizontal: 12,
    backgroundColor: '#F6F6F6',
    marginBottom: 10,
    height: 45,
    gap: 15,
  },

  passwordInput: {
    flex: 1,
    paddingVertical: 12,
  },

  forgot: {
    alignSelf: 'flex-end',
    color: '#2B7C93',
    marginBottom: 20,
  },

  loginButton: {
    borderRadius: 14,
    height: 49,
    justifyContent: 'center',
  },

  loginText: {
    color: '#fff',
    fontWeight: '700',
  },

  or: {
    textAlign: 'center',
    marginVertical: 16,
    color: '#999',
  },

  ssoButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2B7C93',
    padding: 12,
    borderRadius: 12,
  },

  ssoText: {
    marginLeft: 8,
    color: '#2B7C93',
    fontWeight: '600',
  },

  bottom: {
    textAlign: 'center',
    marginTop: 20,
    color: '#777',
  },

  link: {
    color: '#2B7C93',
    fontWeight: '600',
  },
  icon: {
    color: '#D0D0D0',
  },
});
