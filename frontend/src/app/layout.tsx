import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";

import { SIDE_NAME } from "@/shared/constants/seo.constants";

import { Provider } from "./providers/Provider";

import "./globals.css";

const monoFont = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: {
    absolute: SIDE_NAME,
    template: `%s | ${SIDE_NAME}`
  },
  description: "A web application for managing your daily tasks and activities."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${monoFont.variable} antialiased`}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
