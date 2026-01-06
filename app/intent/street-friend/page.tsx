import Link from "next/link";
import { Metadata } from "next";
import IntentInternalLinks from "@/components/IntentInternalLinks";

export const metadata: Metadata = {
  title: "Street Friend | Find Someone to Hang Out With",
  description:
    "Looking for a street friend? Meet someone to walk, gist, hang out, and share everyday moments with no pressure.",
};

export default function StreetFriendIntentPage() {
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
                name: "What is a street friend?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "A street friend is someone you can casually walk with, talk with, hang out, and share everyday moments without pressure or expectations.",
                },
              },
              {
                "@type": "Question",
                name: "Do I need to commit to anything?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "No. Street friendship is casual and flexible. You connect only when you want to.",
                },
              },
              {
                "@type": "Question",
                name: "How do I find a street friend?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "You can register, set your intent as street friend, and get matched with people nearby looking for the same casual connection.",
                },
              },
            ],
          }),
        }}
      />

      {/* PAGE HEADER */}
      <header className="mb-6">
        <h1 className="text-4xl font-bold mb-4">
          Find a Street Friend
        </h1>

        <p className="text-gray-600 mb-8">
          Sometimes you just want someone to walk with, talk with,
          laugh with, or kill time together — no labels, no pressure.
        </p>
      </header>

      {/* PRIMARY CTA */}
      <Link
        href="/auth/register"
        className="inline-block rounded-xl bg-gray-900 px-6 py-4 text-white font-semibold hover:bg-black transition"
      >
        Find a Street Friend
      </Link>

      {/* 🔗 INTERNAL SEO LINKS */}
      <IntentInternalLinks currentSlug="street-friend" />

      {/* INVISIBLE SEO CONTEXT */}
      <footer className="sr-only" aria-hidden="true">
        Street friend, casual friend, hangout partner, walking friend,
        everyday friendship, real life companion, social connection.
      </footer>
    </section>
  );
}
