"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

// Create Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // ✅ Extract access_token and refresh_token from URL hash
    const hash = window.location.hash; // e.g. #access_token=…&refresh_token=…&type=recovery
    const params = new URLSearchParams(hash.replace("#", ""));
    const access_token = params.get("access_token");
    const refresh_token = params.get("refresh_token");

    if (access_token && refresh_token) {
      console.log("🔑 Recovery tokens found");
      // ✅ Set recovery session in Supabase
      supabase.auth.setSession({ access_token, refresh_token });
    }

    // Optional: listen to auth state changes
    const { data } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        console.log("✅ Recovery session active");
      }
    });

    return () => data.subscription.unsubscribe();
  }, []);

  async function submit() {
    if (!password) return;

    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password });

      if (error) {
        console.error("❌ Update password failed", error);
        alert(error.message);
        return;
      }

      setDone(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow">
        <h1 className="text-xl font-semibold mb-2">
          Set a new password
        </h1>

        {done ? (
          <p className="text-sm text-gray-600">
            Password updated. You can now log in.
          </p>
        ) : (
          <>
            <input
              type="password"
              placeholder="New password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-lg px-4 py-3 mb-4"
            />

            <button
              onClick={submit}
              disabled={!password || loading}
              className="w-full bg-black text-white py-3 rounded-lg"
            >
              {loading ? "Updating…" : "Update password"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
