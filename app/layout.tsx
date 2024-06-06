import type { Metadata } from "next";
import "./globals.css";

import { montserrat } from './ui/fonts';

export const metadata: Metadata = {
  title: "Tilt Exercise - Nicolas Robinson",
  description: "A Next.js web app to determine the daily energy usage of household appliances",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="w-screen h-screen">
        {children}
      </body>
    </html>
  );
}
