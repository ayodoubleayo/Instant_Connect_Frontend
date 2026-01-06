import Link from "next/link";
import { Metadata } from "next";
import IntentInternalLinks from "@/components/IntentInternalLinks";

/**
 * Walk Partner Intent Page
 *
 * PURPOSE:
 * - SEO landing page for users searching walking partners
 * - Entry point for activity-based connections
 *
 * FLOW (HUMAN):
 * Google → /intent/walk-partner → Reads → CTA → Register
 *
 * FLOW (SYSTEM):
 * mount → metadata → render → internal links → CTA → unmount
 */

export const metadata: Metadata = {
  title: "Walk Partner | Find a Walking Buddy on InstantConnect",
  description:
    "Looking for a walk partner or walking buddy? Connect with people who enjoy daily walks, fitness strolls, and healthy routines.",
};

export default function WalkPartnerIntentPage() {
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
                name: "What is a walk partner?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "A walk partner is someone you connect with to enjoy regular walks together for fitness, motivation, and healthy routines.",
                },
              },
              {
                "@type": "Question",
                name: "Can I choose when and where to walk?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "Yes. You decide your preferred walking time, pace, and location before connecting with a compatible walk partner.",
                },
              },
              {
                "@type": "Question",
                name: "Is a walk partner only for fitness?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "Not at all. Walk partners can be for fitness, relaxation, conversation, or simply enjoying daily routines together.",
                },
              },
            ],
          }),
        }}
      />

      {/* PAGE HEADER */}
      <header className="mb-6">
        <h1 className="text-4xl font-bold mb-4">
          Find a Walk Partner
        </h1>

        <p className="text-gray-600 mb-8">
          Whether it’s morning walks, evening strolls, or fitness routines,
          meet people who enjoy walking together and staying active.
        </p>
      </header>

      {/* PRIMARY CTA (NO EVENT HANDLERS) */}
      <Link
        href="/auth/register"
        className="inline-block rounded-xl bg-red-600 px-6 py-4 text-white font-semibold hover:bg-red-700 transition"
      >
        Find a Walking Buddy
      </Link>

      {/* 🔗 INTERNAL SEO LINKS */}
      <IntentInternalLinks currentSlug="walk-partner" />

      {/* INVISIBLE SEO SUPPORT */}
      <footer className="sr-only" aria-hidden="true">
        Walk partner, walking buddy, daily walks, fitness walking,
        accountability partner, healthy lifestyle companion.
      </footer>
    </section>
  );
}
