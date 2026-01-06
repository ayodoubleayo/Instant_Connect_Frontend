import Link from "next/link";
import { Metadata } from "next";
import IntentInternalLinks from "@/components/IntentInternalLinks";

export const metadata: Metadata = {
  title: "Laughter Partner | Find Someone to Laugh With",
  description:
    "Looking for a laughter partner? Meet people who enjoy jokes, fun conversations, positive energy, and shared laughter.",
};

export default function LaughterPartnerIntentPage() {
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
                name: "What is a laughter partner?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "A laughter partner is someone who enjoys sharing jokes, humor, and positive conversations to create joy and lighthearted social connection.",
                },
              },
              {
                "@type": "Question",
                name: "Is a laughter partner for dating or friendship?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "This intent focuses on friendship and positive social bonding, not dating or romantic commitment.",
                },
              },
              {
                "@type": "Question",
                name: "How do I find a laughter partner?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "After registering, you can select the laughter partner intent and connect with people who value humor, fun, and joyful conversations.",
                },
              },
            ],
          }),
        }}
      />

      {/* PAGE HEADER */}
      <header className="mb-6">
        <h1 className="text-4xl font-bold mb-4">
          Find a Laughter Partner
        </h1>

        <p className="text-gray-600 mb-8">
          Life is better with laughter. Connect with people who love jokes,
          humor, playful conversations, and spreading positive vibes.
        </p>
      </header>

      {/* PRIMARY CTA */}
      <Link
        href="/auth/register"
        className="inline-block rounded-xl bg-red-600 px-6 py-4 text-white font-semibold hover:bg-red-700 transition"
      >
        Find Someone to Laugh With
      </Link>

      {/* 🔗 INTERNAL SEO LINKS */}
      <IntentInternalLinks currentSlug="laughter-partner" />

      {/* INVISIBLE SEO SUPPORT */}
      <footer className="sr-only" aria-hidden="true">
        Laughter partner, fun companion, humor, jokes, positivity, joyful
        conversations, social connection, friendship.
      </footer>
    </section>
  );
}
