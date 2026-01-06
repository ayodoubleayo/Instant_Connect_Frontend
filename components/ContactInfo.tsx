"use client";

import { useRouter } from "next/navigation";
import { ContactInfoUI } from "@/components/ContactInfoUI";
import { useContactUnlock } from "@/hooks/useContactUnlock";

interface Props {
  matchId: string;
  price: number;
  highlight?: boolean;
}

export function ContactInfo({ matchId, price, highlight = false }: Props) {
  const router = useRouter();

  console.log("[ContactInfo] Mounted", { matchId });

  /* ============================================================
     🔐 UNLOCK STATE (BACKEND DECIDES)
     - no status
     - no inference
     - no guessing
  ============================================================ */
  const { unlocked } = useContactUnlock(matchId);

  console.log("[ContactInfo] Unlock state", {
    matchId,
    unlocked,
  });

  /* ============================================================
     💳 REDIRECT TO PAYMENT
     - backend controls amount
     - frontend sends ONLY matchId
  ============================================================ */
  function handleUnlock() {
    console.log("[ContactInfo] Redirecting to payment", {
      matchId,
    });

    router.push(`/payment?matchId=${matchId}`);
  }

  return (
    <div
      className={
        highlight
          ? "ring-2 ring-red-400 rounded-lg animate-pulse"
          : ""
      }
    >
      <ContactInfoUI
        unlocked={unlocked}
        price={price}
        onUnlock={handleUnlock}
      />
    </div>
  );
}
