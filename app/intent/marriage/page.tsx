import Link from "next/link";
import { Metadata } from "next";
import { intentContent } from "@/data/intentContent";
import { generateIntentMetadata } from "@/lib/metadata";
import IntentInternalLinks from "@/components/IntentInternalLinks";
import IntentFAQSchema from "@/components/IntentFAQSchema";
import IntentViewTracker from "@/components/IntentViewTracker";

/**
 * Marriage Intent Page - PRODUCTION READY
 *
 * SEO FEATURES:
 * - ✅ 1200+ words of unique content
 * - ✅ Canonical URL via metadata
 * - ✅ FAQ Schema markup
 * - ✅ Location-specific keywords
 * - ✅ Internal linking strategy
 * - ✅ H1, H2, H3 hierarchy
 * - ✅ Call-to-action optimization
 */

const data = intentContent["marriage"];

export const metadata: Metadata = generateIntentMetadata(
  data.slug,
  data.title,
  data.metaDescription,
  data.keywords
);

export default function MarriageIntentPage() {
  return (
    <article className="mx-auto max-w-4xl px-6 py-12 lg:py-16">
      {/* 📊 Track Marriage Intent View (Client-side only) */}
      <IntentViewTracker intent="marriage" />

      {/* 🔍 FAQ Schema for Rich Results */}
      <IntentFAQSchema pageTitle={data.title} faqs={data.faqs} />

      {/* 🎯 HERO SECTION */}
      <header className="mb-12 text-center">
        <h1 className="text-4xl lg:text-5xl font-bold mb-4 text-gray-900">
          {data.hero.heading}
        </h1>
        <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          {data.hero.subheading}
        </p>
        <Link
          href="/auth/register"
          className="inline-block rounded-xl bg-red-600 px-8 py-4 text-lg font-semibold text-white hover:bg-red-700 transition-colors shadow-lg hover:shadow-xl"
        >
          {data.hero.cta} →
        </Link>
      </header>

      {/* 📖 WHAT IS A MARRIAGE PARTNER? */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-6 text-gray-900">
          {data.whatIsIt.title}
        </h2>
        <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
          {data.whatIsIt.paragraphs.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>
      </section>

      {/* ✨ WHY CHOOSE INSTANTCONNECT? */}
      <section className="mb-16 bg-gray-50 -mx-6 px-6 py-12 lg:-mx-12 lg:px-12 rounded-2xl">
        <h2 className="text-3xl font-bold mb-8 text-gray-900 text-center">
          {data.whyUs.title}
        </h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {data.whyUs.benefits.map((benefit, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold mb-3 text-red-600">
                {benefit.title}
              </h3>
              <p className="text-gray-700">{benefit.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 🔄 HOW IT WORKS */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-gray-900 text-center">
          {data.howItWorks.title}
        </h2>
        <div className="space-y-8 max-w-3xl mx-auto">
          {data.howItWorks.steps.map((step) => (
            <div key={step.number} className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                {step.number}
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">
                  {step.title}
                </h3>
                <p className="text-gray-700">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 💬 SUCCESS STORIES */}
      <section className="mb-16 bg-gradient-to-br from-red-50 to-pink-50 -mx-6 px-6 py-12 lg:-mx-12 lg:px-12 rounded-2xl">
        <h2 className="text-3xl font-bold mb-8 text-gray-900 text-center">
          Real Couples, Real Marriages
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {data.testimonials.map((testimonial, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl shadow-md">
              <div className="mb-4">
                <h3 className="font-semibold text-lg text-gray-900">
                  {testimonial.name}
                </h3>
                <p className="text-sm text-gray-600">
                  {testimonial.age} • {testimonial.location}
                </p>
              </div>
              <p className="text-gray-700 italic">
                "{testimonial.story}"
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ❓ FAQ SECTION */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-gray-900 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6 max-w-3xl mx-auto">
          {data.faqs.map((faq, idx) => (
            <details
              key={idx}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
            >
              <summary className="font-semibold text-lg cursor-pointer text-gray-900 hover:text-red-600 transition-colors">
                {faq.question}
              </summary>
              <p className="mt-4 text-gray-700">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      {/* 📍 LOCATION-SPECIFIC CONTENT */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-6 text-gray-900 text-center">
          Find Marriage Partners Across Nigeria
        </h2>
        <p className="text-lg text-gray-700 mb-6 text-center max-w-3xl mx-auto">
          {data.locations.intro}
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {data.locations.cities.map((city) => (
            <span
              key={city}
              className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg text-sm font-medium"
            >
              {city}
            </span>
          ))}
        </div>
      </section>

      {/* 🔗 INTERNAL LINKING (SEO) */}
      <IntentInternalLinks currentSlug={data.slug} />

      {/* 🎯 FINAL CTA */}
      <section className="mt-16 text-center bg-red-600 text-white -mx-6 px-6 py-12 lg:-mx-12 lg:px-12 rounded-2xl">
        <h2 className="text-3xl font-bold mb-4">
          Ready to Find Your Life Partner?
        </h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
          Join thousands of marriage-minded Nigerians who have found love,
          trust, and commitment on InstantConnect.
        </p>
        <Link
          href="/auth/register"
          className="inline-block rounded-xl bg-white text-red-600 px-8 py-4 text-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg"
        >
          Create Your Free Profile Now
        </Link>
      </section>

      {/* 🔍 SEO FOOTER (Hidden from users, visible to Google) */}
      <footer className="sr-only">
        <p>
          Keywords: {data.keywords.join(", ")} | Find marriage partner Nigeria,
          Christian marriage Lagos, Muslim marriage Abuja, serious relationship
          Nigeria, life partner Africa, Nigerian dating for marriage
        </p>
      </footer>
    </article>
  );
}
