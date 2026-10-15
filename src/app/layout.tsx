import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "List Your Business on LiveCalicut | Free Registration",
  description:
    "Register your business with LiveCalicut and help more people discover local businesses and services across Calicut, Kerala.",
  keywords: [
    "LiveCalicut",
    "Calicut business listing",
    "Calicut local discovery",
    "Calicut business directory",
    "Calicut shops",
    "Kerala local businesses",
    "SM Street",
    "Calicut Cyberpark",
    "Mavoor Road",
  ],
  authors: [{ name: "LiveCalicut Team", url: "https://livecalicut.com" }],
  creator: "LiveCalicut",
  publisher: "LiveCalicut",
  metadataBase: new URL("https://livecalicut.com"),
  alternates: {
    canonical: "https://livecalicut.com",
  },
  openGraph: {
    title: "List Your Business on LiveCalicut | Free Registration",
    description:
      "Register your business with LiveCalicut and help more people discover local businesses and services across Calicut, Kerala.",
    url: "https://livecalicut.com",
    siteName: "LiveCalicut",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/heroes/calicut-hero.jpg",
        width: 1200,
        height: 630,
        alt: "LiveCalicut — Calicut Local Discovery Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "List Your Business on LiveCalicut | Free Registration",
    description:
      "Register your business with LiveCalicut and help more people discover local businesses and services across Calicut, Kerala.",
    images: ["/heroes/calicut-hero.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/favicon.svg",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      { url: "/apple-icon.svg", type: "image/svg+xml" },
    ],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#2c3691",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full scroll-smooth ${poppins.variable}`}>
      <body className={`${poppins.className} min-h-full flex flex-col bg-white text-[#0f172a] antialiased selection:bg-[#ec2028]/15 selection:text-[#131b3b]`}>
        {children}
      </body>
    </html>
  );
}
