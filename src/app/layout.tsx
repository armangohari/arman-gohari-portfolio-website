import { italiana } from "@/lib/fonts";
import "@/styles/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Arman Gohari",
  description: "Arman Gohari Portfolio Website",
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
      <body className={`${italiana.className} bg-black text-white`}>
        {children}
      </body>
    </html>
  );
}
