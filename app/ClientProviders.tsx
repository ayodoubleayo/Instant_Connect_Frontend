"use client";

import { ReactNode, useEffect, useState } from "react";
import GlobalRealtime from "@/app/GlobalRealtime";

export default function ClientProviders({
  children,
}: {
  children: ReactNode;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
      console.log("[ClientProviders] mounted");

    setMounted(true);
  }, []);

  // ⛔ Prevent hydration mismatch
  if (!mounted) return null;

  return (
    <>
      {/* ✅ GLOBAL SOCKET LIVES HERE */}
      <GlobalRealtime />

      {children}
    </>
  );
}
