"use client";

import { Lock } from "lucide-react";
import clsx from "clsx";

interface ContactInfoUIProps {
  unlocked: boolean;
  price: number;
  onUnlock: () => void;
}

export function ContactInfoUI({
  unlocked,
  price,
  onUnlock,
}: ContactInfoUIProps) {
  /* ============================================================
     🔓 UNLOCKED STATE
     - backend already approved
     - frontend only reflects truth
  ============================================================ */
  if (unlocked) {
    return (
      <div className="mx-4 mt-3 rounded-xl border bg-green-50 px-4 py-3 text-sm">
        <p className="font-medium text-green-700">
          ✅ Contact details unlocked
        </p>
        <p className="text-xs text-green-600 mt-1">
          You can now safely share phone number and address.
        </p>
      </div>
    );
  }

  /* ============================================================
     🔒 LOCKED STATE
     - no pending
     - no guessing
     - clear CTA
  ============================================================ */
  return (
    <div
      className={clsx(
        "mx-4 mt-3 rounded-2xl border bg-white p-4 shadow-sm",
        "flex items-center justify-between gap-4"
      )}
    >
      <div className="flex items-start gap-3">
        <div className="bg-black text-white p-2 rounded-full">
          <Lock size={16} />
        </div>

        <div>
          <p className="text-sm font-semibold">
            Contact details locked
          </p>
          <p className="text-xs text-gray-500 mt-0.5">
            Unlock to share phone number & address safely
          </p>
        </div>
      </div>

      <button
        onClick={onUnlock}
        className="bg-black text-white text-sm px-4 py-2 rounded-full hover:opacity-90 transition"
      >
        Unlock ₦{price}
      </button>
    </div>
  );
}
