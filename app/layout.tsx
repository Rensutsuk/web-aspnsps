'use client';
import { useState, useEffect } from 'react';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Poppins } from "next/font/google";
import Loading from './components/Loading';
import "./globals.css";

const poppins = Poppins({
  weight: ['400', '700'],
  subsets: ["latin"],
  variable: "--font-gentium",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <html data-theme="my-theme" lang="en">
      <body className={`${poppins.variable} antialiased`}>
        {isLoading && <Loading />}
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
