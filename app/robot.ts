import { MetadataRoute } from "next";

/**
 * Robots.txt
 *
 * PURPOSE:
 * - Define what search engines can crawl
 * - Protect private/authenticated areas
 * - Expose public marketing & SEO pages
 *
 * FLOW (SERVER / CRAWLER):
 * crawler request → robots generation → rules returned → sitemap linked
 */

export default function robots(): MetadataRoute.Robots {
  console.log("🤖 [robots] robots.txt requested by crawler");
  console.log("📌 [robots] Preparing crawl rules for public visibility");
  console.log("🔒 [robots] Blocking private/authenticated areas");

  const rules: MetadataRoute.Robots["rules"] = [
    {
      userAgent: "*",

      // ✅ Public, SEO-valuable pages
      allow: ["/", "/discover", "/about"],

      // 🔒 Private / user-specific / sensitive
      disallow: [
        "/auth",
        "/chat",
        "/profile",
        "/admin",
        "/payment",
      ],
    },
  ];

  console.log("🧭 [robots] Crawl rules prepared:", rules);
  console.log("🗺️ [robots] Sitemap reference attached");

  return {
    rules,
    sitemap: "https://instantconnect.com/sitemap.xml", // update when live
  };
}
