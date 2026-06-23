import type { Metadata } from "next";
import "./globals.css";

import { cookies } from "next/headers";

import { AppProviders } from "@/providers/AppProviders";
import { siteConfig } from "@/lib/siteConfig";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: "ASPNSPS Website",
    template: "%s | ASPNSPS",
  },
  description:
    "Archdiocesan Shrine and Parish of Nuestra Señora del Perpetuo Socorro",
  openGraph: {
    title: "ASPNSPS Website",
    description:
      "Archdiocesan Shrine and Parish of Nuestra Señora del Perpetuo Socorro",
    url: siteConfig.siteUrl,
    siteName: siteConfig.parishNameShort,
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const cookieString = cookieStore
    .getAll()
    .map((c: { name: string; value: string }) => `${c.name}=${c.value}`)
    .join("; ");

  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <AppProviders cookies={cookieString}>{children}</AppProviders>
      </body>
    </html>
  );
}
