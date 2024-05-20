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
        primary: "#ffcc00",
      },
      keyframes: {
        orbit: {
          from: {
            transform: "rotate(0deg) translateX(75%) rotate(0deg)",
          },
          to: {
            transform: "rotate(360deg) translateX(75%) rotate(-360deg)",
          },
        },
      },
      animation: {
        orbit: "orbit 2.8s linear infinite forwards",
        "orbit-delayed": "orbit 3.6s linear infinite backwards",
      },
    },
  },
  plugins: [],
};
export default config;
