import Script from "next/script";
import { GA_MEASUREMENT_ID } from "@/lib/analytics";
import AnalyticsPageTracker from "@/components/AnalyticsPageTracker";
import "@/app/globals.css";
import { Analytics } from "@vercel/analytics/react";

const OG_IMAGE_VERSION = "v1.0.0";

export const metadata = {
  title: "InstantConnect — Real Connections, Real Intentions",
  description:
    "A modern dating platform for people looking for marriage, serious relationships, casual dating, and real connections.",
  openGraph: {
    title: "InstantConnect — Real Connections, Real Intentions",
    description:
      "A modern dating platform for serious relationships, marriage, and real connections.",
    url: "https://instantconnect.jaodr.com",
    siteName: "InstantConnect",
    images: [
      {
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
      `https://instantconnect.jaodr.com/og-image.png?ver=${OG_IMAGE_VERSION}`,
    ],
  },
};

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* ================= GOOGLE ANALYTICS ================= */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />

      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>

      {/* ================= SERVICE WORKER (PWA) ================= */}
      <Script id="service-worker" strategy="afterInteractive">
        {`
          if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
              navigator.serviceWorker
                .register('/sw.js')
                .then(() => {
                  console.log('[PWA] Service Worker registered');
                })
                .catch((err) => {
                  console.error('[PWA] Service Worker registration failed', err);
                });
            });
          }
        `}
      </Script>

      {/* ================= JSON-LD Structured Data ================= */}
      <Script id="json-ld" type="application/ld+json" strategy="beforeInteractive">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          url: "https://instantconnect.jaodr.com",
          name: "InstantConnect",
          description:
            "InstantConnect is a modern dating platform for serious relationships, marriage, and real connections.",
          image: "https://instantconnect.jaodr.com/og-image.png",
        })}
      </Script>

      {/* ================= APP CONTENT ================= */}
      {children}

      {/* ================= ANALYTICS ================= */}
      <Analytics />
      <AnalyticsPageTracker />
    </>
  );
}
