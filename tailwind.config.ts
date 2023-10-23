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
        chkogreen: "#27AE60",
        chkored: "#E74C3C",
        chkoorange: "#F39C12",
        chkosearch: "#AAAAAA",
        chkoyellow: "#F1C40F",
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
        ".text-18": {
          fontFamily: "Arial",
          fontSize: "18px",
        },
        ".popisky-13": {
          fontFamily: "Arial",
          fontSize: "13px",
          lineHeight: "17px",
          letterSpacing: "2.86px",
        },
        ".mobil-popisky-11": {
          fontFamily: "Arial",
          fontSize: "11px",
          lineHeight: "15px",
        },
      });
    }),
  ],
};
export default config;
