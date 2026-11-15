import "@/styles/globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata, Viewport } from "next";
import { site } from "@/content/story";
import { cn } from "@/lib/cn";
import { cormorant, italiana, poppins } from "@/lib/fonts";
import { GLASS_TIER_SCRIPT } from "@/lib/liquid-glass/glassTier";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#0b0a08",
  colorScheme: "dark",
};

const title = "Arman Gohari — Founder, AI Architect & Full-Stack Engineer";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title,
  description: site.description,
  alternates: { canonical: "/" },
  manifest: "/manifest.json",
  keywords: [
    "Arman Gohari",
    "Arman Gohari portfolio",
    "armangohari",
    "armangohari.com",
    "Aramito",
    "Aramito founder",
    "HealthTech",
    "AI architect",
    "full-stack engineer",
    "LeviTutor",
    "LeviTutor co-founder",
    "University of Tehran",
    "technology entrepreneurship",
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  openGraph: {
    type: "website",
    url: site.url,
    title,
    description: site.description,
    siteName: site.name,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: site.description,
    creator: "@armanigohari",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(italiana.variable, cormorant.variable, poppins.variable)}
    >
      <head>
        {/* Decides the device tier and whether motion is welcome, before first paint. */}
        <script dangerouslySetInnerHTML={{ __html: GLASS_TIER_SCRIPT }} />
      </head>
      <body className="overflow-x-clip">
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
