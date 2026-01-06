import Link from "next/link";
import { Metadata } from "next";
import IntentInternalLinks from "@/components/IntentInternalLinks";

export const metadata: Metadata = {
  title: "Adult Student Partner | Mature Student Dating",
  description:
    "Looking for an adult student partner? Connect with mature students seeking understanding, balance, and real connections.",
};

export default function AdultStudentPartnerPage() {
  console.log("[SEO] Adult student partner intent page rendered");

  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      {/* ✅ FAQ SCHEMA — SEO ONLY */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Who is an adult student partner?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text":
                    "An adult student partner is someone who understands the balance between education, work, and personal life while building meaningful connections."
                }
              },
              {
                "@type": "Question",
                "name": "Is this for mature students only?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text":
                    "Yes, this space is designed for mature or adult learners who value understanding, flexibility, and real-life balance."
                }
              },
              {
                "@type": "Question",
                "name": "What kind of connections are common here?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text":
                    "Connections range from companionship and dating to supportive partnerships built around shared life responsibilities."
                }
              }
            ]
          }),
        }}
      />

      {/* HEADER */}
      <h1 className="text-4xl font-bold mb-4">
        Adult Student Partner
      </h1>

      <p className="text-gray-600 mb-8">
        Designed for mature students balancing education, work,
        and meaningful relationships.
      </p>

      {/* PRIMARY CTA */}
      <Link
        href="/auth/register"
        className="inline-block rounded-xl bg-red-600 px-6 py-4 text-white font-semibold hover:bg-red-700 transition"
      >
        Join Now
      </Link>

      {/* 🔗 INTERNAL SEO LINKS (AUTO) */}
      <IntentInternalLinks currentSlug="adult-student-partner" />
    </section>
  );
}
