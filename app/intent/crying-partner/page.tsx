import Link from "next/link";
import { Metadata } from "next";
import IntentInternalLinks from "@/components/IntentInternalLinks";

export const metadata: Metadata = {
  title: "Crying Partner | Someone to Talk To and Be Heard",
  description:
    "Looking for a crying partner? Connect with someone who can listen, understand, and be there during emotional moments.",
};

export default function CryingPartnerIntentPage() {
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
                name: "What is a crying partner?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "A crying partner is someone who listens without judgment and offers emotional presence during difficult or overwhelming moments.",
                },
              },
              {
                "@type": "Question",
                name: "Do I need to explain everything to a crying partner?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "No. A crying partner focuses on listening and understanding, not fixing or questioning your feelings.",
                },
              },
              {
                "@type": "Question",
                name: "Is talking to a crying partner confidential?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "Yes. Emotional safety, respect, and privacy are essential parts of a crying partner connection.",
                },
              },
            ],
          }),
        }}
      />

      {/* PAGE HEADER */}
      <header className="mb-6">
        <h1 className="text-4xl font-bold mb-4">
          Find a Crying Partner
        </h1>

        <p className="text-gray-600 mb-8">
          Sometimes you don’t need solutions — you just need someone
          who will listen, understand, and sit with you through the moment.
        </p>
      </header>

      {/* PRIMARY CTA */}
      <Link
        href="/auth/register"
        className="inline-block rounded-xl bg-red-600 px-6 py-4 text-white font-semibold hover:bg-red-700 transition"
      >
        Find Someone Who Listens
      </Link>

      {/* 🔗 INTERNAL SEO LINKS */}
      <IntentInternalLinks currentSlug="crying-partner" />

      {/* INVISIBLE SEO CONTEXT */}
      <footer className="sr-only" aria-hidden="true">
        Crying partner, emotional companion, someone to talk to, emotional
        support, listening partner, understanding friend, safe space.
      </footer>
    </section>
  );
}
