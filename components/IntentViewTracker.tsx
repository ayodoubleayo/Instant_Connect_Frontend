'use client';

import { useEffect } from 'react';
import { analytics } from '@/lib/analytics';

type Props = {
  intent: string;
};

export default function IntentViewTracker({ intent }: Props) {
  useEffect(() => {
    analytics.trackIntentView(intent);
  }, [intent]);

  return null;
}
