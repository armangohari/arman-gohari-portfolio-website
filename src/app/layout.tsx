import { poppins } from "@/lib/fonts";
import "@/styles/globals.css";
import { cn } from "@/utils/helpers";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Arman Gohari - Portfolio Website",
  description:
    "Explore the portfolio of Arman Gohari. Showcasing his skills, interests, tools and contact information. Get to know him more now!",
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
    title: "Arman Gohari",
    description: "Arman Gohari Portfolio Website",
    siteName: "Arman Gohari Portfolio",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          poppins.className,
          "bg-smooth-black font-extralight tracking-wider text-smooth-white",
        )}
      >
        {children}
      </body>
    </html>
  );
}
