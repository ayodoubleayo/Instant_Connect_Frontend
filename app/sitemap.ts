import { MetadataRoute } from "next";

/**
 * Sitemap - PRODUCTION READY
 *
 * CRITICAL CHANGES:
 * - ✅ Fixed domain to instantconnect.jaodr.com
 * - ✅ Added /privacy, /terms (Google Trust Signals)
 * - ✅ Dynamic lastModified for intent pages
 * - ✅ Optimized priorities based on conversion value
 *
 * FLOW:
 * Google → /sitemap.xml → crawl priority pages → index → rank
 */

const SITE_URL = "https://instantconnect.jaodr.com";

export default function sitemap(): MetadataRoute.Sitemap {
  console.log("🗺️ [sitemap] Generating sitemap for:", SITE_URL);

  const now = new Date();
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  return [
    // 🌍 CORE PAGES (Highest Priority)
    {
      url: `${SITE_URL}/`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/discover`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },

    // 📄 TRUST/LEGAL PAGES (Required by Google)
    {
      url: `${SITE_URL}/privacy`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.4,
    },

    // 💍 RELATIONSHIP INTENTS (High Conversion)
    {
      url: `${SITE_URL}/intent/marriage`,
      lastModified: weekAgo,
      changeFrequency: "weekly",
      priority: 0.95, // Boosted - highest intent
    },
    {
      url: `${SITE_URL}/intent/serious`,
      lastModified: weekAgo,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/intent/casual`,
      lastModified: weekAgo,
      changeFrequency: "weekly",
      priority: 0.85,
    },

    // 🏃 ACTIVITY PARTNERS (Medium Priority)
    {
      url: `${SITE_URL}/intent/walk-partner`,
      lastModified: weekAgo,
      changeFrequency: "weekly",
      priority: 0.75,
    },
    {
      url: `${SITE_URL}/intent/gym-partner`,
      lastModified: weekAgo,
      changeFrequency: "weekly",
      priority: 0.75,
    },
    {
      url: `${SITE_URL}/intent/reading-partner`,
      lastModified: weekAgo,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/intent/travel-partner`,
      lastModified: weekAgo,
      changeFrequency: "weekly",
      priority: 0.78,
    },
    {
      url: `${SITE_URL}/intent/clubbing-partner`,
      lastModified: weekAgo,
      changeFrequency: "weekly",
      priority: 0.72,
    },

    // 🧑‍🤝‍🧑 SOCIAL/COMPANIONSHIP
    {
      url: `${SITE_URL}/intent/gist-partner`,
      lastModified: weekAgo,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/intent/laughter-partner`,
      lastModified: weekAgo,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/intent/crying-partner`,
      lastModified: weekAgo,
      changeFrequency: "weekly",
      priority: 0.68,
    },
    {
      url: `${SITE_URL}/intent/street-friend`,
      lastModified: weekAgo,
      changeFrequency: "weekly",
      priority: 0.72,
    },

    // 🙏 FAITH/SPIRITUAL
    {
      url: `${SITE_URL}/intent/praying-partner`,
      lastModified: weekAgo,
      changeFrequency: "weekly",
      priority: 0.65,
    },
  ];
}