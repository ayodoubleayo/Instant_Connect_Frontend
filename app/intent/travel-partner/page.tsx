import Link from "next/link";
import { Metadata } from "next";
import IntentInternalLinks from "@/components/IntentInternalLinks";

/**
 * Travel Partner Intent Page
 *
 * PURPOSE:
 * - SEO landing page for users searching for travel partners
 * - Connects people who want to travel together safely and intentionally
 *
 * FLOW (HUMAN):
 * Google → /intent/travel-partner → Reads → CTA → Register
 *
 * FLOW (SYSTEM):
 * render → metadata → internal links → CTA
 */

export const metadata: Metadata = {
  title: "Travel Partner | Find a Travel Buddy on InstantConnect",
  description:
    "Looking for a travel partner or travel buddy? Connect with people who enjoy trips, adventures, and exploring together.",
};

export default function TravelPartnerIntentPage() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      {/* ✅ FAQ SCHEMA (JSON-LD) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What is a travel partner?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "A travel partner is someone you connect with to plan trips, vacations, or adventures together while sharing costs, experiences, and companionship.",
                },
              },
              {
                "@type": "Question",
                name: "Is it safe to find a travel partner online?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "Yes, when using platforms that encourage clear communication, shared expectations, and verified profiles, finding a travel partner online can be safe and rewarding.",
                },
              },
              {
                "@type": "Question",
                name: "Can I choose where and how I want to travel?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "Absolutely. You decide your travel style, destination, pace, and preferences before connecting with a compatible travel partner.",
                },
              },
            ],
          }),
        }}
      />

      {/* PAGE HEADER */}
      <header className="mb-6">
        <h1 className="text-4xl font-bold mb-4">
          Find a Travel Partner
        </h1>

        <p className="text-gray-600 mb-8">
          Whether you’re planning a vacation, road trip, or adventure abroad,
          meet people who enjoy traveling, exploration, and shared experiences.
        </p>
      </header>

      {/* PRIMARY CTA */}
      <Link
        href="/auth/register"
        className="inline-block rounded-xl bg-red-600 px-6 py-4 text-white font-semibold hover:bg-red-700 transition"
      >
        Find a Travel Buddy
      </Link>

      {/* 🔗 INTERNAL SEO LINKS */}
      <IntentInternalLinks currentSlug="travel-partner" />

      {/* INVISIBLE SEO SUPPORT */}
      <footer className="sr-only" aria-hidden="true">
        Travel partner, travel buddy, trip companion, adventure partner,
        vacation partner, group travel, shared travel experiences.
      </footer>
    </section>
  );
}
