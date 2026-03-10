import React, { createContext, useContext, useState } from "react";
import { useColorScheme } from "react-native";
import { lightColors, darkColors } from "./colors";
import { spacing } from "./spacing";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const systemScheme = useColorScheme();

  // null = follow system
  const [mode, setMode] = useState(null); // "light" | "dark" | null

  const isDarkMode =
    mode === "dark" ||
    (mode === null && systemScheme === "dark");

  const theme = {
    isDarkMode,
    mode,
    setMode,
    colors: isDarkMode ? darkColors : lightColors,
    spacing,
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }
  return context;
}
