// ThemeContext 2.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useColorScheme } from 'nativewind';

import { getThemeStyles } from '../styles/themeStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ThemeContext = createContext({ theme: 'light', toggleTheme: () => {} });

export const ThemeProvider = ({ children, metadata }) => {
  const [theme, setTheme] = useState('light');
  const { setColorScheme } = useColorScheme();

  const toggleTheme = async (next) => {
    setTheme(next);
    setColorScheme(next);
    await AsyncStorage.setItem('theme', next);
  };

  useEffect(() => {
    const loadTheme = async () => {
      const storedTheme = await AsyncStorage.getItem('theme');
      if (storedTheme) {
        setTheme(storedTheme);
        setColorScheme(storedTheme);
      }
    };
    loadTheme();
  }, []);

  const themeStyles = getThemeStyles(theme, metadata);
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, themeStyles }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
