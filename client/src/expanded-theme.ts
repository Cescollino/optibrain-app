// eslint-disable-next-line
import { Palette, PaletteColor } from "@mui/material/styles/createPalette";

/* This is used for creating the customized palette */
declare module "@mui/material/styles/createPalette" {
    interface PaletteColor {
        [key: number]: string;
    }
    
    interface Palette {
        greenStatus: SimplePaletteColorOptions;
        orangeStatus: SimplePaletteColorOptions;
        redStatus: SimplePaletteColorOptions;
        blue: SimplePaletteColorOptions;
    }
}