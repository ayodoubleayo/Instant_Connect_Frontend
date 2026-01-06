import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ClientProviders from "./ClientProviders";
import { SocketProvider } from "@/components/SocketProvider";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "InstantConnect — Real Connections, Real Intentions",
    template: "%s | InstantConnect",
  },
  description:
    "InstantConnect is a modern dating platform for people looking for marriage, serious relationships, casual dating, one-night connections, friends with benefits, and adult student partners.",
  keywords: [
    "dating app",
    "marriage partner",
    "serious relationship",
    "casual dating",
    "one night stand",
    "friends with benefits",
    "adult student dating",
    "relationship intent dating",
    "online dating platform",
  ],
  openGraph: {
    title: "InstantConnect — Real Connections, Real Intentions",
    description:
      "Meet people who want the same type of relationship you do. Marriage, serious dating, casual, or short-term connections.",
    url: "https://yourdomain.com",
    siteName: "InstantConnect",
    images: [
      {
        url: "/hero.jpg",
        width: 1200,
        height: 630,
        alt: "InstantConnect dating platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "InstantConnect — Real Connections, Real Intentions",
    description:
      "A dating app built around clarity of relationship intent.",
    images: ["/hero.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen flex flex-col">
        <ClientProviders>
          <SocketProvider />
          <Navbar />
          <div className="flex-1">{children}</div>
          <Footer />
        </ClientProviders>
      </body>
    </html>
  );
}
