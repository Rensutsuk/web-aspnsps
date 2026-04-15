'use client';
import { useEffect, useState } from 'react';
import { Poppins } from "next/font/google";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Loading from './components/Loading';
import "./globals.css";

type ThemeName = 'mytheme' | 'mytheme-dark';

const THEME_STORAGE_KEY = 'theme';

const poppins = Poppins({
  weight: ['400', '700'],
  subsets: ["latin"],
  variable: "--font-gentium",
});

export default function RootLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [theme, setTheme] = useState<ThemeName>('mytheme');

  useEffect(() => {
    const saved = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (saved === 'mytheme' || saved === 'mytheme-dark') {
      setTheme(saved);
      return;
    }

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(prefersDark ? 'mytheme-dark' : 'mytheme');
  }, []);

  useEffect(() => {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'mytheme' ? 'mytheme-dark' : 'mytheme'));
  }; 

  return (
    <html data-theme={theme} lang="en">
      <body className={`${poppins.variable} antialiased bg-base-100 text-base-content`}>
        {isLoading && <Loading />}
        <Navbar theme={theme} onToggleTheme={toggleTheme} />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}