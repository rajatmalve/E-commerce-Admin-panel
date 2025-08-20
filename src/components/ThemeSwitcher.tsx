import React, { useState } from 'react';
import { useTheme, themes } from '../contexts/ThemeContext';

const ThemeSwitcher: React.FC = () => {
  const { currentTheme, setTheme } = useTheme();
  const [showThemeMenu, setShowThemeMenu] = useState(false);

  const toggleThemeMenu = () => {
    setShowThemeMenu(!showThemeMenu);
  };

  const handleThemeChange = (themeId: string) => {
    setTheme(themeId);
    setShowThemeMenu(false);
  };

  const getThemePreviewColors = (theme: typeof themes[0]) => {
    return {
      primary: theme.colors.primary[500],
      secondary: theme.colors.primary[200],
      accent: theme.colors.primary[100],
    };
  };

  return (
    <div className="relative">
      {/* Theme Toggle Button */}
      <button
        onClick={toggleThemeMenu}
        className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors relative flex items-center gap-2"
        aria-label="Change theme"
      >
        <i className="fas fa-palette text-lg"></i>
        <span className="hidden sm:inline text-sm font-medium">Theme</span>
        <i className={`fas fa-chevron-down text-xs transition-transform ${showThemeMenu ? 'rotate-180' : ''}`}></i>
      </button>

      {/* Theme Dropdown */}
      {showThemeMenu && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
          {/* Header */}
          <div className="px-4 py-3 border-b border-gray-100">
            <h3 className="text-sm font-semibold text-gray-900">Choose Theme</h3>
            <p className="text-xs text-gray-500 mt-1">Customize your dashboard appearance</p>
          </div>

          {/* Current Theme Display */}
          <div className="px-4 py-3 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">Current Theme:</span>
              <span className="text-sm font-medium text-gray-900">{currentTheme.name}</span>
            </div>
            <div className="flex gap-2 mt-2">
              <div 
                className="w-4 h-4 rounded-full border border-gray-200"
                style={{ backgroundColor: currentTheme.colors.primary[500] }}
              ></div>
              <div 
                className="w-4 h-4 rounded-full border border-gray-200"
                style={{ backgroundColor: currentTheme.colors.primary[200] }}
              ></div>
              <div 
                className="w-4 h-4 rounded-full border border-gray-200"
                style={{ backgroundColor: currentTheme.colors.primary[100] }}
              ></div>
            </div>
          </div>

          {/* Theme Options */}
          <div className="py-1 max-h-64 overflow-y-auto">
            {themes.map((theme) => {
              const previewColors = getThemePreviewColors(theme);
              const isActive = theme.id === currentTheme.id;
              
              return (
                <div
                  key={theme.id}
                  className={`px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors ${
                    isActive ? 'bg-primary-50 border-l-4 border-primary-500' : ''
                  }`}
                  onClick={() => handleThemeChange(theme.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        {/* Theme Color Preview */}
                        <div className="flex gap-1">
                          <div 
                            className="w-3 h-3 rounded-full border border-gray-200"
                            style={{ backgroundColor: previewColors.primary }}
                          ></div>
                          <div 
                            className="w-3 h-3 rounded-full border border-gray-200"
                            style={{ backgroundColor: previewColors.secondary }}
                          ></div>
                          <div 
                            className="w-3 h-3 rounded-full border border-gray-200"
                            style={{ backgroundColor: previewColors.accent }}
                          ></div>
                        </div>
                        
                        {/* Theme Info */}
                        <div>
                          <div className={`text-sm font-medium ${isActive ? 'text-primary-700' : 'text-gray-900'}`}>
                            {theme.name}
                          </div>
                          <div className="text-xs text-gray-500">{theme.description}</div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Active Indicator */}
                    {isActive && (
                      <i className="fas fa-check text-primary-600 text-sm"></i>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer */}
          <div className="px-4 py-2 border-t border-gray-100">
            <div className="text-xs text-gray-500 text-center">
              Theme changes apply immediately
            </div>
          </div>
        </div>
      )}

      {/* Click outside to close */}
      {showThemeMenu && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowThemeMenu(false)}
        ></div>
      )}
    </div>
  );
};

export default ThemeSwitcher;
