'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { pageview } from '@/lib/analytics';

/**
 * Analytics Page Tracker
 *
 * PURPOSE:
 * - Automatically tracks page views when user navigates
 * - Works with Next.js App Router
 *
 * USAGE:
 * - Add to root layout as client component
 * - Listens to route changes
 * - Sends page view events to Google Analytics
 */

export default function AnalyticsPageTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname) {
      const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
      pageview(url);
      
      // Debug log (remove in production)
      console.log('📊 [Analytics] Page view tracked:', url);
    }
  }, [pathname, searchParams]);

  return null; // This component doesn't render anything
}