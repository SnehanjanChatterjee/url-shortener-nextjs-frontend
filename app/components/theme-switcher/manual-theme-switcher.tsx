'use client';

import { Sun, Moon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { THEMES } from '../../constants/UrlShortenerConstants';
import { setHtmlThemeTag } from '../../utils/UrlShortenerUtils';

export default function ManualThemeSwitcher() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  useEffect(() => {
    const savedTheme = localStorage.getItem('isDarkMode');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'true'); // Use stored theme value (true/false)
    }
    const theme = isDarkMode ? THEMES.dark : THEMES.light;
    setHtmlThemeTag(theme);
  }, []); // Only run on mount

  // Effect for updating localStorage and applying theme when `isDarkMode` changes
  useEffect(() => {
    localStorage.setItem('isDarkMode', isDarkMode ? 'true' : 'false');
    const theme = isDarkMode ? THEMES.dark : THEMES.light;
    setHtmlThemeTag(theme);
  }, [isDarkMode]); // Run when `isDarkMode` changes

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev); // Toggle theme between dark and light
  };

  return (
    <div className="fixed top-4 left-4 z-50">
      <label className="inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={isDarkMode}
          onChange={toggleTheme}
          className="sr-only peer"
        />
        <div className="relative w-20 h-10 bg-gray-200 dark:bg-gray-700 rounded-full transition-all duration-300">
          {/* Circle */}
          <div
            className={`absolute top-1 left-1 bg-white border border-gray-300 rounded-full w-8 h-8 transition-all duration-300 ${
              isDarkMode ? 'transform translate-x-10' : ''
            }`}
          ></div>
          {/* Icons */}
          <div className="absolute inset-0 flex justify-between items-center px-2">
            <Sun className="text-yellow-400 w-6 h-5" />
            <Moon className="text-blue-300 w-6 h-5" />
          </div>
        </div>
      </label>
    </div>
  );
}
