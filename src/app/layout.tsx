import type { Metadata } from "next";
import React from "react";
import { Geist, Geist_Mono } from "next/font/google";
import { Inter } from "next/font/google";

import "./globals.css";

const inter = Inter({subsets: ['latin']})


export const metadata: Metadata = {
  title: "CloneX",
  description: "A clone of the CloneX website",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="en">
      <body
        className={inter.className}>
        {children}
      </body>
    </html>
  );
}
