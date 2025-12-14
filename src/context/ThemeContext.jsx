import React, { createContext, useContext, useState, useEffect } from 'react';

const colorSchemes = {
  default: {
    light: {
      primary: '#3b82f6',
      secondary: '#60a5fa',
      accent: '#93c5fd',
      bg: '#f8fafc',
      cardBg: '#ffffff',
    },
    dark: {
      primary: '#60a5fa',
      secondary: '#3b82f6',
      accent: '#1e40af',
      bg: '#0f172a',
      cardBg: '#1e293b',
    },
  },
  ocean: {
    light: {
      primary: '#0891b2',
      secondary: '#06b6d4',
      accent: '#67e8f9',
      bg: '#ecfeff',
      cardBg: '#ffffff',
    },
    dark: {
      primary: '#22d3ee',
      secondary: '#06b6d4',
      accent: '#155e75',
      bg: '#164e63',
      cardBg: '#0e7490',
    },
  },
  sunset: {
    light: {
      primary: '#f97316',
      secondary: '#fb923c',
      accent: '#fdba74',
      bg: '#fff7ed',
      cardBg: '#ffffff',
    },
    dark: {
      primary: '#fb923c',
      secondary: '#f97316',
      accent: '#9a3412',
      bg: '#431407',
      cardBg: '#7c2d12',
    },
  },
  forest: {
    light: {
      primary: '#16a34a',
      secondary: '#22c55e',
      accent: '#86efac',
      bg: '#f0fdf4',
      cardBg: '#ffffff',
    },
    dark: {
      primary: '#4ade80',
      secondary: '#22c55e',
      accent: '#166534',
      bg: '#14532d',
      cardBg: '#166534',
    },
  },
  lavender: {
    light: {
      primary: '#a855f7',
      secondary: '#c084fc',
      accent: '#e9d5ff',
      bg: '#faf5ff',
      cardBg: '#ffffff',
    },
    dark: {
      primary: '#c084fc',
      secondary: '#a855f7',
      accent: '#6b21a8',
      bg: '#3b0764',
      cardBg: '#581c87',
    },
  },
};

const ThemeContext = createContext(undefined);

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(false);
  const [colorScheme, setColorScheme] = useState('default');

  useEffect(() => {
    const root = document.documentElement;
    // Se utiliza la indexación dinámica sin chequeo de tipos
    const colors = colorSchemes[colorScheme][isDark ? 'dark' : 'light'];

    root.style.setProperty('--color-primary', colors.primary);
    root.style.setProperty('--color-secondary', colors.secondary);
    root.style.setProperty('--color-accent', colors.accent);
    root.style.setProperty('--color-bg', colors.bg);
    root.style.setProperty('--color-card-bg', colors.cardBg);

    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark, colorScheme]);

  const toggleDark = () => setIsDark(!isDark);

  return (
    <ThemeContext.Provider value={{ isDark, toggleDark, colorScheme, setColorScheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}