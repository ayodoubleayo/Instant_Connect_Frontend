import { Metadata } from "next";

/**
 * SEO Metadata Utilities
 *
 * PURPOSE:
 * - Generate consistent metadata across all pages
 * - Ensure canonical URLs are always correct
 * - Prevent duplicate content penalties
 * - Optimize for social sharing
 */

const SITE_URL = "https://instantconnect.jaodr.com";
const SITE_NAME = "InstantConnect";
const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`;

type MetadataConfig = {
  title: string;
  description: string;
  keywords?: string[];
  path: string;
  image?: string;
  noIndex?: boolean;
};

/**
 * Generate full metadata object with canonical, OG, Twitter
 */
export function generateMetadata(config: MetadataConfig): Metadata {
  const {
    title,
    description,
    keywords = [],
    path,
    image = DEFAULT_IMAGE,
    noIndex = false,
  } = config;

  const url = `${SITE_URL}${path}`;
  const fullTitle = `${title} | ${SITE_NAME}`;

  return {
    metadataBase: new URL(SITE_URL),

    // 🎯 Core SEO
    title: fullTitle,
    description,
    keywords: keywords.join(", "),

    // 🔗 CRITICAL: Canonical URL (prevents duplicate content)
    alternates: {
      canonical: url,
    },

    // 🤖 Indexing rules
    robots: noIndex
      ? {
          index: false,
          follow: false,
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": 160,
          },
        },

    // 📱 Open Graph (Facebook, LinkedIn)
    openGraph: {
      type: "website",
      url,
      title: fullTitle,
      description,
      siteName: SITE_NAME,
      locale: "en_US",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },

    // 🐦 Twitter Card
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
      creator: "@instantconnect", // Update when you have Twitter
    },

    // 📧 Additional meta tags
    other: {
      "google-site-verification": "YOUR_VERIFICATION_CODE", // Add after GSC setup
    },
  };
}

/**
 * Intent page metadata generator
 */
export function generateIntentMetadata(
  slug: string,
  title: string,
  description: string,
  keywords: string[]
): Metadata {
  return generateMetadata({
    title,
    description,
    keywords,
    path: `/intent/${slug}`,
    image: `${SITE_URL}/intent/${slug}-og.jpg`, // Create these later
  });
}

/**
 * Blog post metadata generator (for future use)
 */
export function generateBlogMetadata(
  slug: string,
  title: string,
  description: string,
  publishedTime: string,
  author: string = "InstantConnect Team"
): Metadata {
  const url = `${SITE_URL}/blog/${slug}`;

  return {
    ...generateMetadata({
      title,
      description,
      path: `/blog/${slug}`,
    }),

    // 📰 Article-specific metadata
    openGraph: {
      type: "article",
      url,
      title,
      description,
      publishedTime,
      authors: [author],
      siteName: SITE_NAME,
    },
  };
}

// Export constants for reuse
export { SITE_URL, SITE_NAME, DEFAULT_IMAGE };