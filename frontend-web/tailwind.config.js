/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0084FF",
          light: "#4DA3FF",
          dark: "#006ED9",
          50: "#E6F4FF",
          100: "#BAE0FF",
          200: "#91CAFF",
          300: "#69B1FF",
          400: "#4096FF",
          500: "#0084FF",
          600: "#006ED9",
          700: "#0058B3",
          800: "#00428C",
          900: "#002C66",
        },
        secondary: {
          DEFAULT: "#F5F7FB",
          light: "#FFFFFF",
          dark: "#E4E9F0",
        },
        textPrimary: "#081C36",
        textSecondary: "#5B6B79",
        textTertiary: "#A0ABBF",
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};
