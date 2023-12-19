import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      screens: {},
    },
    extend: {
      screens: {
        "3xl": "1920px",
      },
      colors: {
        chkogreen: "#2ECC71",
        chkogreenHover: "#00D65B",
        chkogreenFocus: "#29BC67",
        chkored: "#E74C3C",
        chkoorange: "#F39C12",
        chkosearch: "#AAAAAA",
        chkoyellow: "#F1C40F",
        chkobg: "#EFEFEF",
        offwhite: "#FBFBFB",
      },
    },
  },
  plugins: [
    plugin(({ addBase, addComponents, addUtilities, theme }) => {
      addUtilities({
        ".nazev-120": {
          fontFamily: "Arial",
          fontSize: "120px",
          letterSpacing: "-2%",
        },
        ".nadpis-80": {
          fontFamily: "Arial",
          fontSize: "80px",
        },
        ".nadpis-50": {
          fontFamily: "Arial",
          fontSize: "50px",
        },
        ".podnadpis-40": {
          fontFamily: "Arial",
          fontSize: "40px",
        },
        ".text-32": {
          fontFamily: "Arial",
          fontSize: "32px",
          lineHeight: "normal",
        },
        ".text-24": {
          fontFamily: "Arial",
          fontSize: "24px",
          lineHeight: "normal",
        },
        ".text-18": {
          fontFamily: "Arial",
          fontSize: "18px",
        },
        ".text-16": {
          fontFamily: "Arial",
          fontSize: "16px",
        },
        ".popisky-13": {
          fontSize: "13px",
          lineHeight: "17px",
          letterSpacing: "2.86px",
          textTransform: "uppercase",
        },
        ".popisky-pdf-8": {
          fontSize: "12px",
          lineHeight: "13.5px",
          letterSpacing: "2.2px",
          textTransform: "uppercase",
        },
        ".mobil-popisky-11": {
          fontSize: "11px",
        },
      });
    }),
  ],
};
export default config;
