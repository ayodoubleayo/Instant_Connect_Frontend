import Link from "next/link";
import { Metadata } from "next";
import IntentInternalLinks from "@/components/IntentInternalLinks";

export const metadata: Metadata = {
  title: "Clubbing Partner | Find a Party Buddy on InstantConnect",
  description:
    "Looking for a clubbing or party partner? Meet people who enjoy nightlife, events, and fun social experiences together.",
};

export default function ClubbingPartnerIntentPage() {
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
                name: "What is a clubbing partner?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "A clubbing partner is someone who enjoys nightlife, parties, music, and social events and wants company for fun nights out.",
                },
              },
              {
                "@type": "Question",
                name: "Is a clubbing partner about dating?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "Not necessarily. Many people look for clubbing partners simply for socializing, events, and shared nightlife experiences.",
                },
              },
              {
                "@type": "Question",
                name: "Can I find people with similar nightlife interests?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "Yes. Clubbing partners usually connect over shared music tastes, party styles, and preferred nightlife scenes.",
                },
              },
            ],
          }),
        }}
      />

      {/* PAGE HEADER */}
      <header className="mb-6">
        <h1 className="text-4xl font-bold mb-4">
          Find a Clubbing Partner
        </h1>

        <p className="text-gray-600 mb-8">
          Love nightlife, music, parties, and social vibes? Connect with people
          who enjoy clubbing, events, and fun nights out together.
        </p>
      </header>

      {/* PRIMARY CTA */}
      <Link
        href="/auth/register"
        className="inline-block rounded-xl bg-red-600 px-6 py-4 text-white font-semibold hover:bg-red-700 transition"
      >
        Find a Party Partner
      </Link>

      {/* 🔗 INTERNAL SEO LINKS */}
      <IntentInternalLinks currentSlug="clubbing-partner" />

      {/* INVISIBLE SEO SUPPORT */}
      <footer className="sr-only" aria-hidden="true">
        Clubbing partner, party buddy, nightlife partner, event companion,
        social nightlife, party lifestyle, club events.
      </footer>
    </section>
  );
}
