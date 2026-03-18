import React from "react";
import { Text } from "react-native";
import { typography } from "../../../themes/typography";
import { useTheme} from "../../../themes/ThemeProvider";
import { lightColors } from '../../../themes/colors'

export function DisplayText({
  variant = "body1",
  color = "primary",
  style,
  children,
  ...props
}) {
  const { colors } = useTheme();
  const textColor =
    color === "secondary"
      ? colors?.textSecondary
      : lightColors?.textPrimary || lightColors?.textPrimary;

  return (
    <Text
      {...props}
      style={[
        typography[variant],
        { color: textColor },
        style,
      ]}
    >
      {children}
    </Text>
  );
}
