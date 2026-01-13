/**
 * Google Analytics 4 Integration
 *
 * PURPOSE:
 * - Track page views across the app
 * - Track user events (sign-ups, matches, messages)
 * - Measure conversion rates
 *
 * USAGE:
 * - Automatically tracks page views via root layout
 * - Call event() function for custom tracking
 */

export const GA_MEASUREMENT_ID = 'G-BNHC4X97C5';

// Extend Window interface for TypeScript
declare global {
  interface Window {
    gtag: (
      command: string,
      targetId: string,
      config?: Record<string, any>
    ) => void;
    dataLayer: any[];
  }
}

/**
 * Track page view
 * Called automatically on route changes
 */
export const pageview = (url: string) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
};

/**
 * Track custom events
 * 
 * EXAMPLES:
 * - event({ action: 'sign_up', category: 'engagement', label: 'marriage_intent' })
 * - event({ action: 'profile_view', category: 'user_action', label: 'from_discover' })
 * - event({ action: 'message_sent', category: 'chat', value: 1 })
 */
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

/**
 * Pre-built event trackers for common actions
 */
export const analytics = {
  // User signs up
  trackSignUp: (intent: string) => {
    event({
      action: 'sign_up',
      category: 'engagement',
      label: intent,
    });
  },

  // User views an intent page
  trackIntentView: (intentSlug: string) => {
    event({
      action: 'view_intent',
      category: 'page_view',
      label: intentSlug,
    });
  },

  // User clicks CTA button
  trackCTA: (location: string, intentSlug?: string) => {
    event({
      action: 'click_cta',
      category: 'engagement',
      label: `${location}_${intentSlug || 'general'}`,
    });
  },

  // User views profile
  trackProfileView: (source: string) => {
    event({
      action: 'view_profile',
      category: 'user_action',
      label: source,
    });
  },

  // User sends message
  trackMessage: () => {
    event({
      action: 'send_message',
      category: 'chat',
      value: 1,
    });
  },

  // User completes profile
  trackProfileComplete: () => {
    event({
      action: 'complete_profile',
      category: 'engagement',
      value: 1,
    });
  },
};