import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "FeetScope - Find Your Perfect Heel Height",
  description: "Calculate safe heel heights based on foot measurements and experience",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="/html5up-forty/assets/css/main.css" />
        <noscript><link rel="stylesheet" href="/html5up-forty/assets/css/noscript.css" /></noscript>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
