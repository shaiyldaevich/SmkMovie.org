import type { Metadata } from "next";
import localFont from "next/font/local";
import "keen-slider/keen-slider.min.css";
import "./globals.scss";

const interSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-inter-sans",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Smk-Movie",
  description:
    "Откройте для себя мир кино! Просматривайте новинки, любимые жанры и рейтинги, а также получайте рекомендации, чтобы сделать ваш вечер незабываемым.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` ${interSans.variable}`}>{children}</body>
    </html>
  );
}
