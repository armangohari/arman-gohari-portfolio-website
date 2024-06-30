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
      },
    },
  },
  plugins: [],
};
export default config;
