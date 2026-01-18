import Script from "next/script";
import { GA_MEASUREMENT_ID } from "@/lib/analytics";
import AnalyticsPageTracker from "@/components/AnalyticsPageTracker";
import "@/app/globals.css";
import { Analytics } from "@vercel/analytics/react";

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

      {/* ================= APP CONTENT ================= */}
      {children}

      {/* ================= ANALYTICS ================= */}
      <Analytics />
      <AnalyticsPageTracker />
    </>
  );
}
