import Link from "next/link";
import { Metadata } from "next";
import IntentInternalLinks from "@/components/IntentInternalLinks";

export const metadata: Metadata = {
  title: "Gym Partner | Find a Workout Partner on InstantConnect",
  description:
    "Looking for a gym partner or workout buddy? Connect with people who share your fitness goals and stay motivated together.",
};

export default function GymPartnerIntentPage() {
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
                name: "What is a gym partner?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "A gym partner is someone who works out with you to stay motivated, accountable, and consistent with fitness routines.",
                },
              },
              {
                "@type": "Question",
                name: "Is a gym partner the same as a personal trainer?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "No. A gym partner is a peer for mutual motivation, not a paid trainer or coach.",
                },
              },
              {
                "@type": "Question",
                name: "How do I find a workout partner?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "After registering, you can choose the gym partner intent and connect with people who share similar fitness goals.",
                },
              },
            ],
          }),
        }}
      />

      {/* PAGE HEADER */}
      <header className="mb-6">
        <h1 className="text-4xl font-bold mb-4">
          Find a Gym Partner
        </h1>

        <p className="text-gray-600 mb-8">
          Stay consistent, motivated, and accountable by connecting with
          people looking for gym partners, workout buddies, and fitness
          companions.
        </p>
      </header>

      {/* PRIMARY CTA — SERVER SAFE */}
      <Link
        href="/auth/register"
        className="inline-block rounded-xl bg-red-600 px-6 py-4 text-white font-semibold hover:bg-red-700 transition"
      >
        Find a Workout Partner
      </Link>

      {/* 🔗 INTERNAL SEO LINKS */}
      <IntentInternalLinks currentSlug="gym-partner" />

      {/* INVISIBLE SEO SUPPORT */}
      <footer className="sr-only" aria-hidden="true">
        Gym partner, workout partner, fitness buddy, training partner,
        accountability partner, exercise companion.
      </footer>
    </section>
  );
}
