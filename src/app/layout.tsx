import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://keywrd.ca"),
  alternates: {
    canonical: "/",
  },
  title: "KeyWRD | Performance-Driven Advertising Agency",
  description:
    "Performance advertising powered by direct expertise, smarter strategy, and ClickSensei technology to help businesses generate stronger results.",
  keywords: [
    "performance advertising agency",
    "digital advertising management",
    "paid media agency",
    "ClickSensei",
    "performance marketing",
  ],
  openGraph: {
    title: "Smarter campaigns. Stronger results. | KeyWRD",
    description:
      "Performance advertising powered by direct expertise, smarter strategy, and ClickSensei technology.",
    type: "website",
    siteName: "KeyWRD",
    url: "/",
    images: [
      {
        url: "/og.png",
        width: 1729,
        height: 910,
        alt: "KeyWRD — Smarter campaigns. Stronger results.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Smarter campaigns. Stronger results. | KeyWRD",
    description:
      "Performance advertising powered by smarter strategy and ClickSensei technology.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
