import { MetadataRoute } from "next";

/**
 * Robots.txt - PRODUCTION READY
 *
 * CRITICAL CHANGES:
 * - ✅ Fixed sitemap URL to instantconnect.jaodr.com
 * - ✅ Added crawl-delay for politeness
 * - ✅ Explicitly allowed /intent/* for SEO juice
 * - ✅ Blocked API routes and internal paths
 */

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        
        // ✅ ALLOW: Public SEO pages
        allow: [
          "/",
          "/discover",
          "/about",
          "/privacy",
          "/terms",
          "/intent/*", // CRITICAL: Allow all intent pages
        ],
        
        // 🔒 DISALLOW: Private/sensitive areas
        disallow: [
          "/api/*",        // Backend routes
          "/auth/*",       // Login/register
          "/chat/*",       // Private messages
          "/profile/*",    // User profiles
          "/admin/*",      // Admin panel
          "/payment/*",    // Billing
          "/_next/*",      // Next.js internals
          "/static/*",     // Build artifacts
        ],
        
        // ⏱️ Crawl delay (be polite to your server)
        crawlDelay: 1,
      },
      
      // 🤖 Special rules for aggressive bots
      {
        userAgent: ["GPTBot", "ChatGPT-User"],
        disallow: ["/"], // Block AI scrapers
      },
    ],
    
    // 🗺️ Sitemap reference
    sitemap: "https://instantconnect.jaodr.com/sitemap.xml",
  };
}