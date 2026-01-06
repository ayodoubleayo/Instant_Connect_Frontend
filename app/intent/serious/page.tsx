import Link from "next/link";
import { Metadata } from "next";
import IntentInternalLinks from "@/components/IntentInternalLinks";

export const metadata: Metadata = {
  title: "Serious Relationship | Meaningful Dating on InstantConnect",
  description:
    "Looking for a serious relationship? Connect with people who want long-term, meaningful relationships on InstantConnect.",
};

export default function SeriousIntentPage() {
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
                name: "What is a serious relationship?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "A serious relationship is focused on commitment, emotional connection, and long-term partnership rather than casual dating.",
                },
              },
              {
                "@type": "Question",
                name: "Is this for people looking to settle down?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "Yes. This intent is designed for people who want meaningful, long-term relationships and clear relationship goals.",
                },
              },
              {
                "@type": "Question",
                name: "How do I find a serious partner here?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "After registering, you can set your intent to serious relationship and connect with others seeking the same level of commitment.",
                },
              },
            ],
          }),
        }}
      />

      {/* HEADER */}
      <header className="mb-6">
        <h1 className="text-4xl font-bold mb-4">
          Serious Relationships
        </h1>

        <p className="text-gray-600 mb-8">
          No games. No confusion. Meet people who want commitment,
          emotional connection, and long-term relationships.
        </p>
      </header>

      {/* CTA */}
      <Link
        href="/auth/register"
        className="inline-block rounded-xl bg-red-600 px-6 py-4 text-white font-semibold hover:bg-red-700 transition"
      >
        Find Your Match
      </Link>

      {/* 🔗 INTERNAL SEO LINKS */}
      <IntentInternalLinks currentSlug="serious" />

      {/* SEO SUPPORT (NON-VISIBLE) */}
      <footer className="sr-only" aria-hidden="true">
        Serious dating, long-term relationships, commitment-focused
        matchmaking, meaningful connections.
      </footer>
    </section>
  );
}
