"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase"; // ✅ Import centralized client

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function submit() {
    if (!email) return;
    setLoading(true);

    await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/reset-password`,
    });

    setSent(true);
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow">
        <h1 className="text-xl font-semibold mb-2">Reset your password</h1>

        {sent ? (
          <p className="text-sm text-gray-600">
            If this email exists, a reset link has been sent.
          </p>
        ) : (
          <>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-lg px-4 py-3 mb-4"
            />
            <button
              onClick={submit}
              disabled={!email || loading}
              className="w-full bg-black text-white py-3 rounded-lg"
            >
              {loading ? "Sending…" : "Send reset link"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
