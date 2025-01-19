'use client';

import { Sun, Moon } from 'lucide-react';
import { useState } from 'react';

export default function ManualThemeSwitcher() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    const theme = isDarkMode ? 'wireframe' : 'dark';
    document.documentElement.setAttribute('data-theme', theme);
  };

  return (
    <div className="fixed top-4 right-4 z-50">
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
