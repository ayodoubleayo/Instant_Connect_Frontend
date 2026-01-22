"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // ✅ Added for redirect
import { supabase } from "@/lib/supabase";   // ✅ Added Supabase client
import GlobalRealtime from "@/app/GlobalRealtime";

export default function ClientProviders({
  children,
}: {
  children: ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  const router = useRouter(); // ✅ router instance

  useEffect(() => {
    console.log("[ClientProviders] mounted");
    setMounted(true);

    // ===================== SUPABASE AUTH LISTENER =====================
    // ✅ Added: Detect password recovery and redirect to /reset-password
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event) => {
        console.log("[Auth event]", event);

        if (event === "PASSWORD_RECOVERY") {
          console.log("✅ PASSWORD_RECOVERY detected → redirecting");
          router.push("/reset-password");
        }
      }
    );

    // ✅ Cleanup on unmount
    return () => subscription.unsubscribe();
  }, [router]);

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
