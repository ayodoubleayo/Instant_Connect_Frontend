import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "InstantConnect — Real Connections, Real Intentions",
    template: "%s | InstantConnect",
  },
  description:
    "InstantConnect is a modern dating platform for people looking for marriage, serious relationships, casual dating, and meaningful connections.",
  keywords: [
    "dating app",
    "marriage partner",
    "serious relationship",
    "casual dating",
    "online dating platform",
  ],
  openGraph: {
    title: "InstantConnect — Real Connections, Real Intentions",
    description:
      "Meet people who want the same type of relationship you do.",
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

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-[100dvh] flex flex-col">

      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
