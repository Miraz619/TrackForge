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
  title: {
    default: "TrackForge",
    template: "%s | TrackForge",
  },

  description:
    "TrackForge is a developer issue and feature request management platform for reporting, prioritizing, and resolving software issues.",

  applicationName: "TrackForge",

  keywords: [
    "TrackForge",
    "issue tracker",
    "bug tracker",
    "feature requests",
    "developer tools",
    "issue management",
    "software development",
  ],

  authors: [
    {
      name: "TrackForge",
    },
  ],

  creator: "TrackForge",

  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  ),

  openGraph: {
    title: "TrackForge",
    description:
      "Developer issue and feature request management platform.",
    type: "website",
    siteName: "TrackForge",
  },

  twitter: {
    card: "summary_large_image",
    title: "TrackForge",
    description:
      "Developer issue and feature request management platform.",
  },

  robots: {
    index: true,
    follow: true,
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}