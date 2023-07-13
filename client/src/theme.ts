// eslint-disable-next-line
import { Palette, PaletteColor } from "@mui/material/styles/createPalette";

/* cmd-k cmd-g to have a selected color shades 
    customization 
*/

// color design tokens export
export const tokens = {
    grey: {
      100: "#e0e0e0",
      200: "#c2c2c2",
      300: "#a3a3a3",
      400: "#858585",
      500: "#666666",
      600: "#525252",
      700: "#3d3d3d",
      800: "#292929",
      900: "#141414",
    },
};

// mui theme settings
export const themeSettings = {
  palette: { 
    /* Primary is the color displayed most frequently across the app's screens and components 
    where using this color as the background */
    primary: {
      main: "#27263899",
      dark: "#040405eb",
    },
    blue: {
      main: "#065fff",
    },
    greenStatus: {
      light: '#00C48C4D',
      main: '#00C48C',
    },
    orangeStatus: {
      light: '#EE84224D',
      main: '#EE8422',
    },
    redStatus: {
      light: '#D0173E4D',
      main: '#D0173E',
    },
    grey: {
      ...tokens.grey,
      main: tokens.grey[500],
    },
  },
  typography: {
    fontFamily: ["Inter", "sans-serif"].join(","),
    fontSize: 12,
    h1: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 32,
    },
    h2: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 24,
    },
    h3: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 20,
      fontWeight: 800,
      color: 'white',
    },
    h4: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 14,
      fontWeight: 600,
      color: 'white',
    },
    h5: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 12,
      fontWeight: 400,
      color: 'white',
    },
    h6: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 10,
      color: 'white',
    },
  },
};
