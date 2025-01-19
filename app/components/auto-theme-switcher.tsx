'use client';

import { useEffect } from "react";

export default function AutoThemeSwitcher() {
  useEffect(() => {
    const currentHour = new Date().getHours();
    const theme = (currentHour >= 18 && currentHour < 6) ? "dark" : "wireframe";
    
    // Set the data-theme attribute on the <html> tag
    document.documentElement.setAttribute("data-theme", theme);
  }, []);

  return null; // No need to render anything, just applying the theme
}
