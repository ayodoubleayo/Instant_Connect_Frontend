/**
 * Intent Page Content Database
 *
 * PURPOSE:
 * - Centralized content management for all intent pages
 * - Easy to update without touching code
 * - SEO-optimized structure for each intent
 *
 * USAGE:
 * import { intentContent } from "@/data/intentContent";
 * const data = intentContent["marriage"];
 */

export type IntentContent = {
  slug: string;
  title: string;
  subtitle: string;
  metaDescription: string;
  keywords: string[];
  
  // 📝 Hero Section
  hero: {
    heading: string;
    subheading: string;
    cta: string;
  };
  
  // ❓ What is X?
  whatIsIt: {
    title: string;
    paragraphs: string[];
  };
  
  // ✨ Why Choose InstantConnect?
  whyUs: {
    title: string;
    benefits: Array<{
      title: string;
      description: string;
    }>;
  };
  
  // 🔄 How It Works
  howItWorks: {
    title: string;
    steps: Array<{
      number: number;
      title: string;
      description: string;
    }>;
  };
  
  // 💬 Success Stories
  testimonials: Array<{
    name: string;
    age: number;
    location: string;
    story: string;
    image?: string; // Optional for future use
  }>;
  
  // ❓ FAQ
  faqs: Array<{
    question: string;
    answer: string;
  }>;
  
  // 📍 Location-specific content
  locations: {
    intro: string;
    cities: string[]; // e.g., ["Lagos", "Abuja", "Port Harcourt"]
  };
};

export const intentContent: Record<string, IntentContent> = {
  marriage: {
    slug: "marriage",
    title: "Marriage Partner",
    subtitle: "Find Your Life Partner in Nigeria",
    metaDescription:
      "Looking for a serious marriage partner in Nigeria? InstantConnect helps Christian, Muslim, and faith-based singles find committed relationships leading to marriage in Lagos, Abuja, and across Nigeria.",
    keywords: [
      "marriage partner Nigeria",
      "find wife Lagos",
      "find husband Abuja",
      "Christian marriage partner",
      "Muslim marriage Nigeria",
      "serious relationship Nigeria",
      "marriage-minded singles",
      "life partner Africa",
      "Nigerian dating for marriage",
      "halal dating Nigeria",
    ],

    hero: {
      heading: "Find Your Marriage Partner in Nigeria",
      subheading:
        "Connect with serious, marriage-minded singles who share your values, faith, and vision for a committed future together.",
      cta: "Start Your Journey to Marriage",
    },

    whatIsIt: {
      title: "What is a Marriage Partner?",
      paragraphs: [
        "A marriage partner is someone seeking a serious, committed relationship with the clear intention of getting married. Unlike casual dating or short-term relationships, finding a marriage partner means you're ready to build a future with someone who shares your values, goals, and life vision.",
        "On InstantConnect, the marriage intent is designed specifically for Nigerians who want to skip the uncertainty and connect with people who are equally serious about commitment. Whether you're a Christian looking for a Godly spouse, a Muslim seeking a halal relationship, or simply someone ready to settle down, our platform helps you find matches who want the same thing.",
        "Marriage partnerships require trust, compatibility, shared faith, and long-term commitment. InstantConnect filters out casual daters and connects you only with people who have selected the marriage intent, ensuring everyone you meet is on the same page from day one.",
      ],
    },

    whyUs: {
      title: "Why Choose InstantConnect for Finding a Marriage Partner?",
      benefits: [
        {
          title: "Clear Intent Matching",
          description:
            "Unlike Tinder or other generic dating apps, everyone you meet on InstantConnect has explicitly stated they want marriage. No guessing, no wasted time, no mixed signals.",
        },
        {
          title: "Faith-Friendly Platform",
          description:
            "Whether you're Christian, Muslim, or hold other spiritual beliefs, our platform respects your faith. Filter by religious values, denomination, and find someone who shares your spiritual journey.",
        },
        {
          title: "Nigerian-Focused Community",
          description:
            "Built specifically for Nigerians in Lagos, Abuja, Port Harcourt, and beyond. Find matches who understand your culture, values, and the unique challenges of building a life together in Nigeria.",
        },
        {
          title: "Safety & Verification",
          description:
            "Profile verification, background checks, and community reporting ensure you're meeting real, serious people. Your safety and peace of mind come first.",
        },
        {
          title: "Smart Compatibility Matching",
          description:
            "Our algorithm considers your values, lifestyle, career goals, family plans, and spiritual beliefs to suggest highly compatible marriage partners.",
        },
      ],
    },

    howItWorks: {
      title: "How to Find Your Marriage Partner",
      steps: [
        {
          number: 1,
          title: "Create Your Profile",
          description:
            "Sign up in under 2 minutes. Add your photos, share your values, faith background, and what you're looking for in a life partner. Be honest and authentic.",
        },
        {
          number: 2,
          title: "Select Marriage Intent",
          description:
            "Choose the 'Marriage Partner' intent to ensure you only see other marriage-minded singles. Set your preferences for age, location, faith, and lifestyle.",
        },
        {
          number: 3,
          title: "Connect & Build Trust",
          description:
            "Browse compatible matches in Lagos, Abuja, or anywhere in Nigeria. Send messages, video chat, and take your time getting to know someone before meeting in person. Build a foundation of trust and shared values.",
        },
      ],
    },

    testimonials: [
      {
        name: "Amara & Chidi",
        age: 29,
        location: "Lagos, Nigeria",
        story:
          "We both joined InstantConnect looking for serious commitment. After 6 months of getting to know each other, we knew we wanted to build a future together. We're now engaged and planning our traditional marriage ceremony. Thank you, InstantConnect!",
      },
      {
        name: "Fatima",
        age: 26,
        location: "Abuja, Nigeria",
        story:
          "As a Muslim woman, it was important for me to find a halal relationship with someone who shared my faith. InstantConnect made it easy to filter by religious values. I met my husband here, and we've been happily married for 1 year now. Alhamdulillah!",
      },
      {
        name: "Emmanuel",
        age: 32,
        location: "Port Harcourt, Nigeria",
        story:
          "I wasted 2 years on other dating apps meeting people who weren't serious. On InstantConnect, I knew everyone had the same goal: marriage. I found my wife in 3 months. Best decision I ever made.",
      },
    ],

    faqs: [
      {
        question: "How is this different from Tinder or other dating apps?",
        answer:
          "InstantConnect is built specifically for people seeking marriage, not casual hookups or short-term dating. Everyone you match with has selected the marriage intent, so you never have to wonder if someone is wasting your time. We also focus on faith, values, and long-term compatibility rather than just swipes.",
      },
      {
        question: "Is this platform only for Christians?",
        answer:
          "No! InstantConnect welcomes Christians, Muslims, and people of all faith backgrounds. You can filter by religion and denomination to find someone who shares your spiritual beliefs and values.",
      },
      {
        question: "How long does it typically take to find a marriage partner?",
        answer:
          "It varies by individual, but most serious users who actively engage with matches and communicate openly find a potential life partner within 3-6 months. The key is being honest, patient, and intentional about who you connect with.",
      },
      {
        question: "Do you verify profiles?",
        answer:
          "Yes. We require email verification, and we offer optional ID verification for added trust. We also have community reporting features to ensure everyone on the platform is genuine and respectful.",
      },
      {
        question: "Can I search for marriage partners in specific Nigerian cities?",
        answer:
          "Absolutely! You can filter by location to find marriage-minded singles in Lagos, Abuja, Port Harcourt, Ibadan, Kano, and other major Nigerian cities. Long-distance matches are also possible if you're open to relocating.",
      },
      {
        question: "What if I'm not ready for marriage right now but want something serious?",
        answer:
          "If you're looking for a serious relationship but not ready for immediate marriage, select our 'Serious Relationship' intent instead. This is for people committed to long-term partnerships who may need more time before taking the final step.",
      },
      {
        question: "Is this app free to use?",
        answer:
          "Basic features are free, including browsing profiles and sending messages. Premium features like advanced filters, unlimited matches, and priority visibility are available with a subscription.",
      },
    ],

    locations: {
      intro:
        "Find marriage-minded singles across Nigeria. Whether you're in the bustling streets of Lagos, the political heart of Abuja, or the vibrant city of Port Harcourt, InstantConnect connects you with serious partners in your area.",
      cities: [
        "Lagos",
        "Abuja",
        "Port Harcourt",
        "Ibadan",
        "Kano",
        "Benin City",
        "Enugu",
        "Kaduna",
        "Jos",
        "Calabar",
      ],
    },
  },

  // 🚨 TODO: Add content for other intents (serious, casual, gym-partner, etc.)
  // For now, I'm showing you the COMPLETE structure for marriage.
  // You'll copy this pattern for each intent and customize the content.
};