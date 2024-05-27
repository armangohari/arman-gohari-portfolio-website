import { Calistoga, Italiana, Poppins } from "next/font/google";
import local from "next/font/local";

/* English Fonts */
export const calistoga = Calistoga({ subsets: ["latin"], weight: "400" });
export const poppins = Poppins({ subsets: ["latin"], weight: "400" });
export const italiana = Italiana({ subsets: ["latin"], weight: "400" });

/* Persian Fonts */
export const iranSans = local({
  src: [
    {
      path: "../../public/assets/fonts/IRANSans-UltraLight.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../public/assets/fonts/IRANSans-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/assets/fonts/IRANSans-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/assets/fonts/IRANSans-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/assets/fonts/IRANSans-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/assets/fonts/IRANSans-Black.ttf",
      weight: "900",
      style: "normal",
    },
  ],
});
