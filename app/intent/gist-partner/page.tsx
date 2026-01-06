import Link from "next/link";
import { Metadata } from "next";
import IntentInternalLinks from "@/components/IntentInternalLinks";

export const metadata: Metadata = {
  title: "Friends With Benefits | Open & Honest Connections on InstantConnect",
  description:
    "Looking for friends with benefits? Connect with like-minded people interested in open, respectful, no-pressure connections.",
};

export default function FriendsWithBenefitsIntentPage() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      {/* ✅ FAQ SCHEMA — SEO ONLY */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What does friends with benefits mean?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "Friends with benefits means a mutual, honest connection where both people agree on casual intimacy without long-term commitment.",
                },
              },
              {
                "@type": "Question",
                name: "Is friends with benefits the same as a relationship?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "No. Friends with benefits focuses on clear boundaries and flexibility, without the expectations of a traditional relationship.",
                },
              },
              {
                "@type": "Question",
                name: "Is friends with benefits safe?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "Yes, when both people communicate openly, respect boundaries, and prioritize honesty and consent.",
                },
              },
            ],
          }),
        }}
      />

      {/* PAGE HEADER */}
      <header className="mb-6">
        <h1 className="text-4xl font-bold mb-4">
          Friends With Benefits
        </h1>

        <p className="text-gray-600 mb-8">
          Meet people who value honesty, clear boundaries, and relaxed
          connections without long-term pressure.
        </p>
      </header>

      {/* PRIMARY CTA */}
      <Link
        href="/auth/register"
        className="inline-block rounded-xl bg-red-600 px-6 py-4 text-white font-semibold hover:bg-red-700 transition"
      >
        Get Started
      </Link>

      {/* 🔗 INTERNAL SEO LINKS */}
      <IntentInternalLinks currentSlug="friends-with-benefits" />

      {/* INVISIBLE SEO CONTEXT */}
      <footer className="sr-only" aria-hidden="true">
        Friends with benefits, open relationships, casual connections,
        honest dating, no-pressure relationships, adult connections.
      </footer>
    </section>
  );
}
