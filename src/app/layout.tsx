import type { Metadata } from "next";
import { Playfair_Display, Mulish } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
});

const mulish = Mulish({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Met Museum Explorer",
  description: "Explore the Metropolitan Museum of Art archives",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${mulish.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
