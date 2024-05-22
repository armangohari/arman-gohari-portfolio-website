import { calistoga } from "@/lib/fonts";
import "@/styles/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Arman Gohari",
  description: "Arman Gohari Portfolio Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${calistoga.className} bg-black text-white`}>{children}</body>
    </html>
  );
}
