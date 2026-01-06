import Link from "next/link";
import { Metadata } from "next";
import IntentInternalLinks from "@/components/IntentInternalLinks";

export const metadata: Metadata = {
  title: "Marriage Partner | Find a Life Partner on InstantConnect",
  description:
    "Looking for a serious marriage partner? InstantConnect helps you meet people who want commitment, trust, and long-term relationships.",
};

export default function MarriageIntentPage() {
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
                name: "What is a marriage partner?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "A marriage partner is someone seeking a serious, committed relationship with the intention of marriage.",
                },
              },
              {
                "@type": "Question",
                name: "Is this platform for serious commitment only?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "Yes. This intent is designed for people who are serious about commitment, trust, and building a long-term future together.",
                },
              },
              {
                "@type": "Question",
                name: "How do I find a marriage partner here?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "After registering, you can choose the marriage intent and connect with others who share the same long-term goals.",
                },
              },
            ],
          }),
        }}
      />

      {/* HEADER */}
      <header className="mb-6">
        <h1 className="text-4xl font-bold mb-4">
          Find a Marriage Partner
        </h1>

        <p className="text-gray-600 mb-8">
          Meet people who are serious about commitment, marriage,
          and building a future together.
        </p>
      </header>

      {/* CTA */}
      <Link
        href="/auth/register"
        className="inline-block rounded-xl bg-red-600 px-6 py-4 text-white font-semibold hover:bg-red-700 transition"
      >
        Start Your Journey
      </Link>

      {/* 🔗 INTERNAL SEO LINKS */}
      <IntentInternalLinks currentSlug="marriage" />

      {/* SEO SUPPORT (NON-VISIBLE) */}
      <footer className="sr-only" aria-hidden="true">
        Marriage partner, life partner, serious commitment,
        long-term relationship dating platform.
      </footer>
    </section>
  );
}
