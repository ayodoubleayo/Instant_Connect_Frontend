import "./globals.css";
import Navbar from "@/components/Navbar";
import ClientProviders from "./ClientProviders";
import { SocketProvider } from "@/components/SocketProvider";
import type { Metadata } from "next";

const OG_IMAGE_VERSION = "v1.0.0";

export const metadata: Metadata = {
  title: {
    default: "InstantConnect — Real Connections, Real Intentions",
    template: "%s | InstantConnect",
  },
  description:
    "InstantConnect is a modern dating platform for people looking for marriage, serious relationships, casual dating, and real connections.",
  metadataBase: new URL("https://instantconnect.jaodr.com"),

  openGraph: {
    title: "InstantConnect — Real Connections, Real Intentions",
    description:
      "A modern dating platform for serious relationships, marriage, and real connections.",
    url: "https://instantconnect.jaodr.com",
    siteName: "InstantConnect",
    images: [
      {
        // ✅ TikTok-friendly (no query params)
        url: "https://instantconnect.jaodr.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "InstantConnect",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "InstantConnect — Real Connections, Real Intentions",
    description:
      "A modern dating platform for serious relationships, marriage, and real connections.",
    images: [
      // ✅ Cache-busting still useful for Twitter/X
      `https://instantconnect.jaodr.com/og-image.png?ver=${OG_IMAGE_VERSION}`,
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* ✅ Structured Data (Google SEO) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              url: "https://instantconnect.jaodr.com",
              name: "InstantConnect",
              description:
                "InstantConnect is a modern dating platform for serious relationships, marriage, and real connections.",
              image: "https://instantconnect.jaodr.com/og-image.png",
            }),
          }}
        />
      </head>

      <body className="bg-gray-50 min-h-[100dvh]">
        <ClientProviders>
          <SocketProvider />
          <Navbar />
          <main className="pt-[64px]">{children}</main>
        </ClientProviders>
      </body>
    </html>
  );
}
