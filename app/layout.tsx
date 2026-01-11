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

          {/* ✅ CONTENT AREA (no flex trapping) */}
          <main className="pt-[64px]">
            {children}
          </main>

        </ClientProviders>
      </body>
    </html>
  );
}
