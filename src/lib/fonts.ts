import { Cormorant_Garamond, Italiana, Poppins } from "next/font/google";

/** Display: names, chapter titles, anything set large. */
export const italiana = Italiana({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-italiana",
});

/** Editorial italic for the storytelling voice. */
export const cormorant = Cormorant_Garamond({
  weight: ["400", "500"],
  style: ["italic", "normal"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-cormorant",
});

/** Interface and body. */
export const poppins = Poppins({
  weight: ["300", "400", "500"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
});
