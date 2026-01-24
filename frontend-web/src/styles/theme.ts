// OTT Platform Theme Colors
export const theme = {
  primary: {
    main: "#0084FF", // Blue primary
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
    main: "#F5F7FB",
    light: "#FFFFFF",
    dark: "#E4E9F0",
  },
  text: {
    primary: "#081C36",
    secondary: "#5B6B79",
    tertiary: "#A0ABBF",
    white: "#FFFFFF",
  },
  background: {
    primary: "#FFFFFF",
    secondary: "#F5F7FB",
    tertiary: "#E8EDF5",
  },
  border: {
    light: "#E4E9F0",
    main: "#D1D9E6",
    dark: "#A0ABBF",
  },
  status: {
    online: "#00D95F",
    offline: "#8A96A3",
    away: "#FFA940",
    busy: "#FF4D4F",
  },
  accent: {
    info: "#1890FF",
    success: "#52C41A",
    warning: "#FAAD14",
    error: "#F5222D",
  },
  shadow: {
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
    xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
  },
};

export type Theme = typeof theme;
