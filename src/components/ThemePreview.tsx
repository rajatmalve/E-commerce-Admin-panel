import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const ThemePreview: React.FC = () => {
  const { currentTheme } = useTheme();

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-xl font-semibold" style={{ color: currentTheme.colors.text.primary }}>
        Theme Preview - {currentTheme.name}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Primary Colors */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium" style={{ color: currentTheme.colors.text.secondary }}>
            Primary Colors
          </h3>
          <div className="grid grid-cols-5 gap-2">
            {Object.entries(currentTheme.colors.primary).map(([key, color]) => (
              <div key={key} className="text-center">
                <div 
                  className="w-8 h-8 rounded border border-gray-200 mx-auto mb-1"
                  style={{ backgroundColor: color }}
                ></div>
                <span className="text-xs" style={{ color: currentTheme.colors.text.muted }}>
                  {key}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Background Colors */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium" style={{ color: currentTheme.colors.text.secondary }}>
            Background Colors
          </h3>
          <div className="space-y-2">
            {Object.entries(currentTheme.colors.background).map(([key, color]) => (
              <div key={key} className="flex items-center gap-2">
                <div 
                  className="w-6 h-6 rounded border border-gray-200"
                  style={{ backgroundColor: color }}
                ></div>
                <span className="text-xs" style={{ color: currentTheme.colors.text.muted }}>
                  {key}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Text Colors */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium" style={{ color: currentTheme.colors.text.secondary }}>
            Text Colors
          </h3>
          <div className="space-y-2">
            {Object.entries(currentTheme.colors.text).map(([key, color]) => (
              <div key={key} className="flex items-center gap-2">
                <div 
                  className="w-6 h-6 rounded border border-gray-200"
                  style={{ backgroundColor: color }}
                ></div>
                <span className="text-xs" style={{ color: currentTheme.colors.text.muted }}>
                  {key}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Component Preview */}
      <div className="mt-6 space-y-4">
        <h3 className="text-lg font-medium" style={{ color: currentTheme.colors.text.primary }}>
          Component Preview
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Buttons */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium" style={{ color: currentTheme.colors.text.secondary }}>
              Buttons
            </h4>
            <div className="space-x-2">
              <button 
                className="px-4 py-2 rounded-lg font-medium transition-colors"
                style={{ 
                  backgroundColor: currentTheme.colors.primary[500],
                  color: 'white'
                }}
              >
                Primary Button
              </button>
              <button 
                className="px-4 py-2 rounded-lg font-medium transition-colors"
                style={{ 
                  border: `1px solid ${currentTheme.colors.border.primary}`,
                  color: currentTheme.colors.text.secondary
                }}
              >
                Secondary Button
              </button>
            </div>
          </div>

          {/* Input Fields */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium" style={{ color: currentTheme.colors.text.secondary }}>
              Input Fields
            </h4>
            <input 
              type="text"
              placeholder="Sample input"
              className="w-full px-3 py-2 rounded-lg border transition-colors"
              style={{ 
                borderColor: currentTheme.colors.border.primary,
                color: currentTheme.colors.text.primary,
                backgroundColor: currentTheme.colors.background.primary
              }}
            />
          </div>
        </div>

        {/* Card Preview */}
        <div className="mt-4">
          <h4 className="text-sm font-medium mb-3" style={{ color: currentTheme.colors.text.secondary }}>
            Card Component
          </h4>
          <div 
            className="p-4 rounded-lg border"
            style={{ 
              backgroundColor: currentTheme.colors.background.primary,
              borderColor: currentTheme.colors.border.primary
            }}
          >
            <h5 className="font-medium mb-2" style={{ color: currentTheme.colors.text.primary }}>
              Sample Card Title
            </h5>
            <p className="text-sm" style={{ color: currentTheme.colors.text.secondary }}>
              This is a sample card that shows how your content will look with the current theme.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemePreview;
