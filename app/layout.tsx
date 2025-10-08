import { Metadata } from 'next';
import RootLayoutClient from './RootLayoutClient';

export const metadata: Metadata = {
  title: "ASPNSPS",
  description: "Official website of the Archdiocesan Shrine and Parish of Nuestra Senora del Perpetuo Socorro.",
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RootLayoutClient>{children}</RootLayoutClient>
  );
}