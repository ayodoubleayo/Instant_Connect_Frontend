"use client";

import Script from "next/script";

interface FAQItem {
  question: string;
  answer: string;
}

export default function IntentFAQSchema({
  pageTitle,
  faqs,
}: {
  pageTitle: string;
  faqs: FAQItem[];
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "name": pageTitle,
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };

  return (
    <Script
      id={`faq-schema-${pageTitle}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}
