import React from 'react';
import { View, Switch } from 'react-native';
import { useTheme } from '../../../themes/ThemeProvider';
import { DisplayText } from '../text';

export function ThemeToggle() {
  const { isDarkMode, setMode } = useTheme();

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <DisplayText style={{ marginRight: 12 }}>Dark Mode</DisplayText>

      <Switch
        value={isDarkMode}
        onValueChange={value => setMode(value ? 'dark' : 'light')}
      />
    </View>
  );
}
