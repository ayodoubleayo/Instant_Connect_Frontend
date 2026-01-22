"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase"; // ✅ centralized client

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // ✅ toggle
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  // ✅ Extract tokens from URL hash for password recovery
  useEffect(() => {
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.replace("#", ""));
    const access_token = params.get("access_token");
    const refresh_token = params.get("refresh_token");

    if (access_token && refresh_token) {
      supabase.auth.setSession({ access_token, refresh_token });
    }
  }, []);

  async function submit() {
    if (!password) return;
    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      setDone(true);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow">
        <h1 className="text-xl font-semibold mb-2">Set a new password</h1>

        {done ? (
          <p className="text-sm text-gray-600">Password updated. You can now log in.</p>
        ) : (
          <>
            <div className="relative mb-4">
              <input
                type={showPassword ? "text" : "password"} // ✅ toggle type
                placeholder="New password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border rounded-lg px-4 py-3 pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500 hover:text-black"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

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
