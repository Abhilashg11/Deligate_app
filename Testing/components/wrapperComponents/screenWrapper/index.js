import { View, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../../themes/ThemeProvider';

export function ScreenWrapper({ children }) {
  const { colors, isDarkMode } = useTheme();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
    >
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

      <View style={{ flex: 1, padding: 16 }}>{children}</View>
    </SafeAreaView>
  );
}
