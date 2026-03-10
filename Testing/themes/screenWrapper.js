import { useTheme } from "./ThemeProvider";
import { View } from "react-native";

export function ScreenWrapper({ children }) {
  const { colors } = useTheme();

  return (
    <View
      style={{
        flex: 1,
        padding: 24,
        backgroundColor: colors.background, // 🔥 REQUIRED
      }}
    >
      {children}
    </View>
  );
}
