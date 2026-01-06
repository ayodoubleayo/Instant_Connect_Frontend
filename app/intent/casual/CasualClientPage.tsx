"use client";


import Link from "next/link";
import { Metadata } from "next";
import { useEffect } from "react";
import IntentInternalLinks from "@/components/IntentInternalLinks";

export const metadata: Metadata = {
  title: "Casual Dating | Relaxed Connections on InstantConnect",
  description:
    "Explore casual dating and meet people interested in relaxed, pressure-free connections on InstantConnect.",
};

export default function CasualIntentPage() {


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
                "name": "What is casual dating?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text":
                    "Casual dating focuses on relaxed connections, getting to know people, and enjoying companionship without long-term pressure."
                }
              },
              {
                "@type": "Question",
                "name": "Is casual dating serious?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text":
                    "Casual dating is typically low-pressure and flexible, allowing people to connect naturally without immediate commitment."
                }
              },
              {
                "@type": "Question",
                "name": "Who is casual dating for?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text":
                    "Casual dating is for people who want to meet others, socialize, and explore connections at their own pace."
                }
              }
            ]
          }),
        }}
      />

      {/* HEADER */}
      <header className="mb-6">
        <h1 className="text-4xl font-bold mb-4">
          Casual Dating
        </h1>

        <p className="text-gray-600 mb-8">
          Meet people interested in dating, conversations,
          and seeing where things go naturally.
        </p>
      </header>

      {/* CTA */}
      <Link
        href="/auth/register"
        className="inline-block rounded-xl bg-red-600 px-6 py-4 text-white font-semibold hover:bg-red-700 transition"
        onClick={() =>
          console.log("➡️ [Intent:Casual] CTA CLICKED → Navigating to register")
        }
      >
        Start Dating
      </Link>

      {/* 🔗 INTERNAL SEO LINKS */}
      <IntentInternalLinks currentSlug="casual" />

      {/* SEO SUPPORT (NON-VISIBLE) */}
      <footer className="sr-only">
        <span>
          Casual dating, relaxed relationships, pressure-free connections,
          social dating platform.
        </span>
      </footer>
    </section>
  );
}
