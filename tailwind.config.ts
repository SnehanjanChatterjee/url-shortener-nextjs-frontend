import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      "light",
      "dark", // Good
      "cupcake",
      "bumblebee",
      "emerald", // Good. Like geeks for geeks in light mode
      "corporate",
      "synthwave",
      "retro",
      "cyberpunk",
      "valentine",
      "halloween",
      "garden", // Good (Light + Pink)
      "forest", // Good. Like geeks for geeks in dark mode
      "aqua",
      "lofi",
      "pastel",
      "fantasy",
      "wireframe", // Best light version
      "black",
      "luxury",
      "dracula", // Good (Dark + Pink)
      "cmyk",
      "autumn",
      "business",
      "acid",
      "lemonade", // Okayish
      "night", // Good
      "coffee",
      "winter", // Better light version
      "dim",
      "nord",
      "sunset",
    ],
  },
} satisfies Config;
