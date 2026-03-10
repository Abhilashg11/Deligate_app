import React from "react";
import { Pressable, Text } from "react-native";
import { useTheme } from "../../../themes/ThemeProvider";

export function Button({
  title,
  variant = "primary",
  onPress,
  style,
}) {
  const { colors, spacing } = useTheme();

  return (
    <Pressable
      onPress={onPress}
      style={[
        {
          backgroundColor: colors[variant],
          paddingVertical: spacing.sm,
          paddingHorizontal: spacing.lg,
          borderRadius: 6,
        },
        style,
      ]}
    >
      <Text style={{ color: "#fff", fontWeight: "600" }}>
        {title}
      </Text>
    </Pressable>
  );
}
