import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#00ffff",
        "smooth-black": "#0e0e0e",
        "smooth-gray": "#999999",
        "smooth-white": "#eeeeee",
      },
      keyframes: {
        "expand-inactive": {
          "0%": { transform: "scaleY(1)" },
          "10%": { transform: "scaleY(2)" },
          "20%": { transform: "scaleY(1)" },
          "30%": { transform: "scaleY(1)" },
          "40%": { transform: "scaleY(2)" },
          "50%": { transform: "scaleY(1)" },
          "60%": { transform: "scaleY(1)" },
          "70%": { transform: "scaleY(2)" },
          "80%": { transform: "scaleY(1)" },
          "90%": { transform: "scaleY(2)" },
          "100%": { transform: "scaleY(1)" },
        },
        "expand-active": {
          "0%": { transform: "scaleY(1)" },
          "10%": { transform: "scaleY(3)" },
          "20%": { transform: "scaleY(5)" },
          "30%": { transform: "scaleY(2)" },
          "40%": { transform: "scaleY(5)" },
          "50%": { transform: "scaleY(3)" },
          "60%": { transform: "scaleY(3)" },
          "70%": { transform: "scaleY(5)" },
          "80%": { transform: "scaleY(2)" },
          "90%": { transform: "scaleY(2)" },
          "100%": { transform: "scaleY(1)" },
        },
        orbit: {
          from: {
            transform: "rotate(0deg) translateX(100%) rotate(0deg)",
          },
          to: {
            transform: "rotate(360deg) translateX(100%) rotate(-360deg)",
          },
        },
      },
      animation: {
        orbit: "orbit 4.1s linear infinite forwards",
        "orbit-delayed": "orbit 5.3s linear infinite forwards",
        "expand-1-inactive": "expand-inactive 3s linear infinite",
        "expand-2-inactive": "expand-inactive 2.5s linear infinite",
        "expand-3-inactive": "expand-inactive 4s linear infinite",
        "expand-4-inactive": "expand-inactive 5s linear infinite",
        "expand-1-active": "expand-active 3s linear infinite",
        "expand-2-active": "expand-active 2.5s linear infinite",
        "expand-3-active": "expand-active 4s linear infinite",
        "expand-4-active": "expand-active 5s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
