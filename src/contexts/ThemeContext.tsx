import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Theme {
  id: string;
  name: string;
  description: string;
  colors: {
    primary: {
      50: string;
      100: string;
      200: string;
      300: string;
      400: string;
      500: string;
      600: string;
      700: string;
      800: string;
      900: string;
    };
    background: {
      primary: string;
      secondary: string;
      tertiary: string;
    };
    text: {
      primary: string;
      secondary: string;
      muted: string;
    };
    border: {
      primary: string;
      secondary: string;
    };
  };
}

export const themes: Theme[] = [
  {
    id: 'default',
    name: 'Default',
    description: 'Classic blue theme',
    colors: {
      primary: {
        50: '#f0f1f4',
        100: '#e1e3e9',
        200: '#c3c7d3',
        300: '#a5abbd',
        400: '#878fa7',
        500: '#262B50',
        600: '#1e223f',
        700: '#161a2e',
        800: '#0f111d',
        900: '#07080b',
      },
      background: {
        primary: '#ffffff',
        secondary: '#f9fafb',
        tertiary: '#f3f4f6',
      },
      text: {
        primary: '#111827',
        secondary: '#374151',
        muted: '#6b7280',
      },
      border: {
        primary: '#d1d5db',
        secondary: '#e5e7eb',
      },
    },
  },
  {
    id: 'dark',
    name: 'Dark',
    description: 'Modern dark theme',
    colors: {
      primary: {
        50: '#1f2937',
        100: '#374151',
        200: '#4b5563',
        300: '#6b7280',
        400: '#9ca3af',
        500: '#d1d5db',
        600: '#e5e7eb',
        700: '#f3f4f6',
        800: '#f9fafb',
        900: '#ffffff',
      },
      background: {
        primary: '#111827',
        secondary: '#1f2937',
        tertiary: '#374151',
      },
      text: {
        primary: '#f9fafb',
        secondary: '#e5e7eb',
        muted: '#9ca3af',
      },
      border: {
        primary: '#374151',
        secondary: '#4b5563',
      },
    },
  },
  {
    id: 'green',
    name: 'Nature',
    description: 'Fresh green theme',
    colors: {
      primary: {
        50: '#f0fdf4',
        100: '#dcfce7',
        200: '#bbf7d0',
        300: '#86efac',
        400: '#4ade80',
        500: '#22c55e',
        600: '#16a34a',
        700: '#15803d',
        800: '#166534',
        900: '#14532d',
      },
      background: {
        primary: '#ffffff',
        secondary: '#f0fdf4',
        tertiary: '#dcfce7',
      },
      text: {
        primary: '#064e3b',
        secondary: '#065f46',
        muted: '#047857',
      },
      border: {
        primary: '#bbf7d0',
        secondary: '#dcfce7',
      },
    },
  },
  {
    id: 'purple',
    name: 'Royal',
    description: 'Elegant purple theme',
    colors: {
      primary: {
        50: '#faf5ff',
        100: '#f3e8ff',
        200: '#e9d5ff',
        300: '#d8b4fe',
        400: '#c084fc',
        500: '#a855f7',
        600: '#9333ea',
        700: '#7c3aed',
        800: '#6b21a8',
        900: '#581c87',
      },
      background: {
        primary: '#ffffff',
        secondary: '#faf5ff',
        tertiary: '#f3e8ff',
      },
      text: {
        primary: '#581c87',
        secondary: '#6b21a8',
        muted: '#7c3aed',
      },
      border: {
        primary: '#e9d5ff',
        secondary: '#f3e8ff',
      },
    },
  },
  {
    id: 'orange',
    name: 'Sunset',
    description: 'Warm orange theme',
    colors: {
      primary: {
        50: '#fff7ed',
        100: '#ffedd5',
        200: '#fed7aa',
        300: '#fdba74',
        400: '#fb923c',
        500: '#f97316',
        600: '#ea580c',
        700: '#c2410c',
        800: '#9a3412',
        900: '#7c2d12',
      },
      background: {
        primary: '#ffffff',
        secondary: '#fff7ed',
        tertiary: '#ffedd5',
      },
      text: {
        primary: '#7c2d12',
        secondary: '#9a3412',
        muted: '#c2410c',
      },
      border: {
        primary: '#fed7aa',
        secondary: '#ffedd5',
      },
    },
  },
];

interface ThemeContextType {
  currentTheme: Theme;
  setTheme: (themeId: string) => void;
  availableThemes: Theme[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<Theme>(themes[0]);

  useEffect(() => {
    // Load saved theme from localStorage
    const savedThemeId = localStorage.getItem('theme');
    if (savedThemeId) {
      const savedTheme = themes.find(theme => theme.id === savedThemeId);
      if (savedTheme) {
        setCurrentTheme(savedTheme);
      }
    }
  }, []);

  useEffect(() => {
    // Apply theme to document
    const root = document.documentElement;
    
    // Set CSS custom properties for the theme
    Object.entries(currentTheme.colors.primary).forEach(([key, value]) => {
      root.style.setProperty(`--color-primary-${key}`, value);
    });
    
    Object.entries(currentTheme.colors.background).forEach(([key, value]) => {
      root.style.setProperty(`--color-background-${key}`, value);
    });
    
    Object.entries(currentTheme.colors.text).forEach(([key, value]) => {
      root.style.setProperty(`--color-text-${key}`, value);
    });
    
    Object.entries(currentTheme.colors.border).forEach(([key, value]) => {
      root.style.setProperty(`--color-border-${key}`, value);
    });

    // Save theme to localStorage
    localStorage.setItem('theme', currentTheme.id);
  }, [currentTheme]);

  const setTheme = (themeId: string) => {
    const theme = themes.find(t => t.id === themeId);
    if (theme) {
      setCurrentTheme(theme);
    }
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme, availableThemes: themes }}>
      {children}
    </ThemeContext.Provider>
  );
};
