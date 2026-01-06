import Link from "next/link";
import { Metadata } from "next";
import IntentInternalLinks from "@/components/IntentInternalLinks";

export const metadata: Metadata = {
  title: "Reading Partner | Find a Reading Buddy on InstantConnect",
  description:
    "Looking for a reading partner or study buddy? Connect with people who enjoy reading, studying, and learning together.",
};

export default function ReadingPartnerIntentPage() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      {/* 🔍 FAQ SCHEMA — SEO ONLY */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What is a reading partner?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "A reading partner is someone you read, study, or learn with, helping each other stay focused and motivated.",
                },
              },
              {
                "@type": "Question",
                name: "Is this for students or book lovers?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "Yes. This is for students, book lovers, and anyone who enjoys reading or studying with a companion.",
                },
              },
              {
                "@type": "Question",
                name: "How do I find a reading partner here?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "After registering, you can choose the reading partner intent and connect with others who share your learning interests.",
                },
              },
            ],
          }),
        }}
      />

      {/* PAGE HEADER */}
      <header className="mb-6">
        <h1 className="text-4xl font-bold mb-4">
          Find a Reading Partner
        </h1>

        <p className="text-gray-600 mb-8">
          Whether you enjoy books, academic reading, or quiet study sessions,
          meet people who value learning, focus, and shared intellectual growth.
        </p>
      </header>

      {/* PRIMARY CTA */}
      <Link
        href="/auth/register"
        className="inline-block rounded-xl bg-red-600 px-6 py-4 text-white font-semibold hover:bg-red-700 transition"
      >
        Find a Reading Buddy
      </Link>

      {/* 🔗 INTERNAL SEO LINKS */}
      <IntentInternalLinks currentSlug="reading-partner" />

      {/* INVISIBLE SEO SUPPORT */}
      <footer className="sr-only" aria-hidden="true">
        Reading partner, reading buddy, study partner, book companion,
        learning partner, academic support, quiet study connections.
      </footer>
    </section>
  );
}
