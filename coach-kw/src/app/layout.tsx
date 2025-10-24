import type { Metadata } from "next";
import { Inter, Playfair_Display, Cairo } from "next/font/google";
import ClientDir from "@/components/ClientDir";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const cairo = Cairo({ subsets: ["arabic"], variable: "--font-cairo", weight: ["400","600","700"] });

export const metadata: Metadata = {
  title: {
    default: "Juhainah Al-Shawaf — Self-Development Coach (Kuwait)",
    template: "%s • Juhainah Al-Shawaf",
  },
  description: "Bilingual Arabic/English coaching and programs in Kuwait — awareness, mind reprogramming, energy.",
  metadataBase: new URL("https://example.com"),
  openGraph: {
    title: "Juhainah Al-Shawaf",
    description: "Self-Development Coach in Kuwait — Arabic & English",
    type: "website",
    locale: "en_KW",
  },
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let locale: "en" | "ar" = "ar";
  if (typeof window !== "undefined") {
    try {
      const saved = localStorage.getItem("locale");
      if (saved === "ar" || saved === "en") locale = saved;
    } catch {}
  }
  return (
    <html lang="ar" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${playfair.variable} ${cairo.variable} antialiased`}
      >
        <ClientDir locale={locale} />
        {children}
      </body>
    </html>
  );
}
