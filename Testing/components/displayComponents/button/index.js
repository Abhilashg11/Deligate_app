import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useTheme } from '../../../themes/ThemeProvider';
import LinearGradient from 'react-native-linear-gradient';
import { DisplayText } from '../text';

export function Button({
  title = 'Button',
  onPress,
  style,

  // 🔥 NEW PROPS
  variant = 'gradient', // "gradient" | "solid"
  colors,
  gradientColors = ['#0D5F7A', '#1780A0', '#239EC4'],
  backgroundColor,
  textColor = '#fff',
  disabled = false,
}) {
  const { spacing } = useTheme();
  const content = (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        {
          opacity: pressed || disabled ? 0.7 : 1,
        },
        style,
      ]}
    >
      <DisplayText style={[styles.text, { color: textColor }]}>
        {title}
      </DisplayText>
    </Pressable>
  );

  // 🔥 Gradient version
  if (variant === 'gradient') {
    return (
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={gradientColors}
        style={styles.wrapper}
      >
        {content}
      </LinearGradient>
    );
  }

  // 🔥 Solid version
  return (
    <View
      style={[
        styles.wrapper,
        { backgroundColor: backgroundColor || '#1780A0' },
      ]}
    >
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 14,
  },

  button: {
    paddingVertical: 11,
    alignItems: 'center',
    borderRadius: 13,
  },

  text: {
    fontWeight: '600',
  },
});
