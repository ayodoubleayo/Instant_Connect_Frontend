import { Metadata } from "next";
import { generateMetadata } from "@/lib/metadata";

/**
 * Privacy Policy - Enhanced for SEO & Trust
 *
 * WHY THIS MATTERS:
 * - Google checks for privacy policy before ranking
 * - Users need to trust your platform
 * - Required for app stores (future)
 * - Legal compliance
 */

export const metadata: Metadata = generateMetadata({
  title: "Privacy Policy",
  description:
    "InstantConnect Privacy Policy. Learn how we protect your data, handle personal information, and keep your dating profile secure.",
  path: "/privacy",
  noIndex: false, // DO index this (trust signal)
});

export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-4xl px-6 py-12 prose prose-lg">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-gray-600">
          Last updated: <time dateTime="2025-01-12">January 12, 2025</time>
        </p>
      </header>

      <section>
        <h2>Our Commitment to Your Privacy</h2>
        <p>
          At InstantConnect, your privacy is our top priority. This policy
          explains how we collect, use, protect, and share your information when
          you use our dating platform.
        </p>
      </section>

      <section>
        <h2>Information We Collect</h2>
        <h3>Account Information</h3>
        <p>When you create an account, we collect:</p>
        <ul>
          <li>Email address</li>
          <li>Name and date of birth</li>
          <li>Photos you upload</li>
          <li>Relationship intent (marriage, serious, casual, etc.)</li>
          <li>Location (city, state)</li>
          <li>Optional: religious preferences, interests, bio</li>
        </ul>

        <h3>Usage Data</h3>
        <p>
          We automatically collect data about how you use InstantConnect,
          including pages visited, features used, and interactions with other
          users.
        </p>

        <h3>Communication Data</h3>
        <p>
          Messages, photos, and other content you share through our chat system
          are stored securely. We do not read your private messages unless
          required by law or to investigate abuse reports.
        </p>
      </section>

      <section>
        <h2>How We Use Your Information</h2>
        <p>We use your data to:</p>
        <ul>
          <li>Match you with compatible partners based on your preferences</li>
          <li>Improve our matching algorithm and user experience</li>
          <li>Send you notifications about matches and messages</li>
          <li>Prevent fraud, spam, and abusive behavior</li>
          <li>Comply with legal obligations</li>
        </ul>
      </section>

      <section>
        <h2>Information Sharing</h2>
        <p>We <strong>never sell your data</strong> to third parties.</p>
        <p>We only share your information:</p>
        <ul>
          <li>With other users as part of your public profile</li>
          <li>With service providers who help operate our platform (hosting, analytics)</li>
          <li>When required by law or to protect safety</li>
        </ul>
      </section>

      <section>
        <h2>Data Security</h2>
        <p>
          We use industry-standard encryption (HTTPS, SSL/TLS) to protect your
          data during transmission. Your password is hashed and never stored in
          plain text. We regularly update our security practices to protect
          against unauthorized access.
        </p>
      </section>

      <section>
        <h2>Your Rights</h2>
        <p>You have the right to:</p>
        <ul>
          <li>Access the personal data we hold about you</li>
          <li>Request corrections to inaccurate information</li>
          <li>Delete your account and associated data</li>
          <li>Opt out of marketing emails</li>
          <li>Export your data in a portable format</li>
        </ul>
        <p>
          To exercise these rights, contact us at{" "}
          <a href="mailto:privacy@instantconnect.jaodr.com">
            privacy@instantconnect.jaodr.com
          </a>
        </p>
      </section>

      <section>
        <h2>Cookies and Tracking</h2>
        <p>
          We use cookies to keep you logged in and improve your experience. You
          can disable cookies in your browser settings, but some features may
          not work properly.
        </p>
      </section>

      <section>
        <h2>Children's Privacy</h2>
        <p>
          InstantConnect is only for users aged 18 and older. We do not
          knowingly collect data from anyone under 18.
        </p>
      </section>

      <section>
        <h2>Changes to This Policy</h2>
        <p>
          We may update this privacy policy as our platform evolves. We'll
          notify you of significant changes via email or in-app notification.
        </p>
      </section>

      <section>
        <h2>Contact Us</h2>
        <p>Questions about your privacy? Contact us:</p>
        <p>
          <strong>Email:</strong>{" "}
          <a href="mailto:privacy@instantconnect.jaodr.com">
            privacy@instantconnect.jaodr.com
          </a>
          <br />
          <strong>Address:</strong> Lagos, Nigeria
        </p>
      </section>
    </article>
  );
}