'use client';

import { useEffect } from "react";
import { THEMES } from "../constants/UrlShortenerConstants";

export default function AutoThemeSwitcher() {
  useEffect(() => {
    const savedTheme = localStorage.getItem('isDarkMode');
    if (savedTheme === null) {
      const currentHour = new Date().getHours();
      const theme = (currentHour >= 18 && currentHour < 6) ? THEMES.dark : THEMES.wireframe;
      
      // Set the data-theme attribute on the <html> tag
      document.documentElement.setAttribute("data-theme", theme);
    }
  }, []);

  return null; // No need to render anything, just applying the theme
}
