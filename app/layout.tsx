import "./globals.css";
import Navbar from "@/components/Navbar";
import ClientProviders from "./ClientProviders";
import { SocketProvider } from "@/components/SocketProvider";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "InstantConnect — Real Connections, Real Intentions",
    template: "%s | InstantConnect",
  },
  description:
    "InstantConnect is a modern dating platform for people looking for marriage, serious relationships, casual dating, and real connections.",

  // ✅ ADDED: SEO base URL
  metadataBase: new URL("https://instantconnect.jaodr.com"),

  // ✅ ADDED: Open Graph (WhatsApp, Facebook, LinkedIn)
  openGraph: {
    title: "InstantConnect — Real Connections, Real Intentions",
    description:
      "A modern dating platform for serious relationships, marriage, and real connections.",
    url: "https://instantconnect.jaodr.com",
    siteName: "InstantConnect",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "InstantConnect",
      },
    ],
    type: "website",
  },

  // ✅ ADDED: Twitter/X preview
  twitter: {
    card: "summary_large_image",
    title: "InstantConnect — Real Connections, Real Intentions",
    description:
      "A modern dating platform for serious relationships, marriage, and real connections.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-[100dvh]">
        <ClientProviders>
          <SocketProvider />

          {/* ✅ GLOBAL NAV */}
          <Navbar />

          {/* ✅ CONTENT AREA */}
          <main className="pt-[64px]">
            {children}
          </main>
        </ClientProviders>
      </body>
    </html>
  );
}
