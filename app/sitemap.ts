import { MetadataRoute } from "next";

/**
 * Sitemap
 *
 * PURPOSE:
 * - Tell search engines which pages matter
 * - Define priority & update frequency
 * - Accelerate correct indexing
 *
 * FLOW (CRAWLER):
 * Google → /sitemap.xml → URL discovery → crawl → index → rank
 *
 * MAINTENANCE RULE (IMPORTANT):
 * - Every NEW public intent page MUST be added here
 * - NEVER add auth, chat, inbox, profile, or admin routes
 */

export default function sitemap(): MetadataRoute.Sitemap {
  console.log("🗺️ [sitemap] Sitemap requested by crawler");
  console.log("📌 [sitemap] Generating public, indexable URLs only");

  const baseUrl = "https://instantconnect.com"; // change when live

  const urls: MetadataRoute.Sitemap = [
    // 🌍 CORE PUBLIC PAGES
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/discover`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.4,
    },

    // 💍 RELATIONSHIP / DATING INTENTS
    {
      url: `${baseUrl}/intent/marriage`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/intent/serious`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/intent/casual`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },

    // 🏃 ACTIVITY PARTNERS
    {
      url: `${baseUrl}/intent/walk-partner`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/intent/gym-partner`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/intent/reading-partner`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/intent/travel-partner`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/intent/clubbing-partner`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },

    // 🧑‍🤝‍🧑 SOCIAL / COMPANIONSHIP
    {
      url: `${baseUrl}/intent/gist-partner`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/intent/laughter-partner`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/intent/crying-partner`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.65,
    },
    {
      url: `${baseUrl}/intent/street-friend`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },

    // 🙏 FAITH / LIFE
    {
      url: `${baseUrl}/intent/praying-partner`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  console.log("✅ [sitemap] Public URLs prepared:", urls.length);
  console.log("🎯 [sitemap] Intent clusters fully indexed");
  console.log("🚫 [sitemap] Private routes excluded by design");

  return urls;
}
