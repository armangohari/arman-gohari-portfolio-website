import { poppins } from "@/lib/fonts";
import "@/styles/globals.css";
import { cn } from "@/utils/helpers";
import { SpeedInsights } from "@vercel/speed-insights/next";
import SmoothScroll from "@/components/smooth-scroll";
import type { Metadata, Viewport } from "next";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export const metadata: Metadata = {
  title: "Arman Gohari - Portfolio Website",
  description:
    "Explore the portfolio of Arman Gohari. Showcasing his skills, interests, tools and contact information. Get to know me more now!",
  keywords: [
    "Arman Gohari",
    "Arman Gohari Website",
    "Arman Gohari Portfolio",
    "Arman Gohari Portfolio Website",
    "armangohari",
    "armangohari portfolio",
    "armangohari website",
    "armangohari portfolio website",
    "ArmanGohari",
    "armangohari.com",
    "ArmanGohari.com",
    "آرمان گوهری",
    "وبسایت آرمان گوهری",
    "سایت آرمان گوهری",
    "Arman",
    "Gohari",
    "آرمان",
    "گوهری",
  ],
  openGraph: {
    type: "website",
    url: "https://armangohari.com",
    title: "Arman Gohari - Portfolio Website",
    description:
      "Explore the portfolio of Arman Gohari. Showcasing his skills, interests, tools and contact information. Get to know me more now!",
    siteName: "Arman Gohari",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* Vercel Speed Insights */}
      <SpeedInsights />

      <body
        className={cn(
          poppins.className,
          "bg-smooth-black text-smooth-white overflow-x-hidden font-extralight tracking-wider",
        )}
      >
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
