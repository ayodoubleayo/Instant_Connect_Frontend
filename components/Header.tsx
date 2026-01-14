"use client";

import { usePWAInstall } from "@/hooks/usePWAInstall";

export function Header() {
  const { isInstallable, install } = usePWAInstall();

  return (
    <header className="flex items-center justify-between px-4 py-3 border-b">
      <h1 className="font-semibold text-lg">InstantConnect</h1>

      {isInstallable && (
        <button
          onClick={install}
          className="rounded-lg bg-black px-4 py-2 text-white text-sm"
        >
          Install App
        </button>
      )}
    </header>
  );
}
