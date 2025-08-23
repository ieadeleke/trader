import type { Metadata } from "next";
import { Geist, Geist_Mono, IBM_Plex_Sans, Ubuntu } from "next/font/google";
import "./globals.css";
import TawkLayout from "./documents";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const ibm_plex_sans = IBM_Plex_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-ibm-plex-sans",
  weight: ["300", "400", "500", "600", "700"],
});

const ubuntu = Ubuntu({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-ubuntu",
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Moneday | Daily Earning Trading Platform",
  description:
    "Moneday is a daily earning trading platform designed for traders, entrepreneurs, and everyday people. With automated strategies, fast payouts, and bank-grade security, we make trading simple, transparent, and rewarding.",
  keywords: [
    "Moneday",
    "daily trading platform",
    "earn daily trading",
    "automated trading strategies",
    "fast trading payouts",
    "secure trading platform",
    "trading for entrepreneurs",
    "simple trading solutions",
    "reliable trading income",
    "bank-grade trading security",
  ],
  openGraph: {
    title: "Moneday | Daily Earning Trading Platform",
    description:
      "Trade smart, earn daily, and live freely with Moneday. Automated strategies, fast deposits & withdrawals, and secure trading built for everyone.",
    url: "https://www.moneday.com",
    type: "website",
    images: [
      {
        url: "/hero.png",
        width: 1200,
        height: 630,
        alt: "Moneday Daily Earning Trading Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Moneday | Daily Earning Trading Platform",
    description:
      "With Moneday, every day is a payday. Trade with automated strategies, enjoy instant payouts, and experience bank-grade security.",
    images: ["/main.png"],
  },
  metadataBase: new URL("https://www.moneday.com"),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${ibm_plex_sans.variable} ${ubuntu.variable} antialiased`}
      >
        {/* <TawkLayout /> */}
        {children}
      </body>
    </html>
  );
}
