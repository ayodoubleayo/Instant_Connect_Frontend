"use client";

import { useEffect, useState } from "react";
import { usePWAInstall } from "@/hooks/usePWAInstall";

const DISMISS_KEY = "pwa-install-dismiss-count";
const MAX_DISMISS = 3;

export default function PWAInstallBanner() {
  const { isInstallable, install } = usePWAInstall();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissCount = Number(localStorage.getItem(DISMISS_KEY) || "0");

    if (isInstallable && dismissCount < MAX_DISMISS) {
      setVisible(true);
    }
  }, [isInstallable]);

  const dismiss = () => {
    const current = Number(localStorage.getItem(DISMISS_KEY) || "0");
    localStorage.setItem(DISMISS_KEY, String(current + 1));
    setVisible(false);
  };

  const handleInstall = async () => {
    await install();
    localStorage.setItem(DISMISS_KEY, String(MAX_DISMISS));
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-6 md:max-w-sm">
      <div className="rounded-2xl bg-red-600 shadow-2xl p-5 flex flex-col gap-3 text-white">

        <div className="text-sm font-semibold">
          Install InstantConnect
        </div>

        <p className="text-sm text-white/90">
          Faster access, smoother chats, and a real app-like experience.
        </p>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            onClick={dismiss}
            className="text-sm text-white/80 hover:text-white transition"
          >
            Not now
          </button>

          <button
            onClick={handleInstall}
            className="rounded-lg bg-green-500 px-4 py-2 text-sm font-semibold text-white hover:bg-green-600 transition"
          >
            Install
          </button>
        </div>
      </div>
    </div>
  );
}
