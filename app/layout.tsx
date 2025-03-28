'use client';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Gentium_Book_Plus } from "next/font/google";
import "./globals.css";

const gentium = Gentium_Book_Plus({
  weight: ['400', '700'],
  subsets: ["latin"],
  variable: "--font-gentium",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html data-theme="my-theme" lang="en">
      <body className={`${gentium.variable} antialiased`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
