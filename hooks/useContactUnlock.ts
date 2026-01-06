"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

export function useContactUnlock(matchId: string) {
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    if (!matchId) return;

    api(`/matches/${matchId}`)
      .then((res: any) => {
        setUnlocked(!!res?.unlocked);
      })
      .catch(() => {
        setUnlocked(false);
      });
  }, [matchId]);

  return {
    unlocked,
  };
}
