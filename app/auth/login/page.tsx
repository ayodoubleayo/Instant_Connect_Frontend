"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { useUserStore } from "@/store/user.store";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();

  const fetchMe = useUserStore((s) => s.fetchMe);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /* =========================
     SESSION CHECK (ON LOAD)
     ========================= */
  useEffect(() => {
    let cancelled = false;

    const timeout = setTimeout(() => {
      if (!cancelled) setCheckingSession(false);
    }, 8000);

  api("/users/me")
  .then(async () => {
    await fetchMe();
    setCheckingSession(false); // ✔️ JUST STOP LOADING
  })

      .catch(() => {
        setCheckingSession(false);
      })
      .finally(() => clearTimeout(timeout));

    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
  }, [router, fetchMe]);

  /* =========================
     LOGIN SUBMIT
     ========================= */
  async function submit() {
    try {
      setLoading(true);
      setError(null);

      await login(email, password);
      await fetchMe();

      router.replace("/discover");
    } catch (err: any) {
      setError(err.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  }

  /* =========================
     FULLSCREEN LOADER
     ========================= */
  if (checkingSession) {
    return (
      <div className="min-h-[100dvh] flex flex-col items-center justify-center
        bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50"
      >
        <div
          className="h-10 w-10 animate-spin rounded-full border-2
          border-black border-t-transparent mb-4"
        />
        <p className="text-sm text-gray-600">
          Checking your account…
        </p>
      </div>
    );
  }

  /* =========================
     LOGIN FORM
     ========================= */
  return (
    <div className="min-h-[100dvh] flex px-4 pt-16 sm:items-center sm:justify-center
      bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50"
    >
      <div className="w-full max-w-md">

        <div className="bg-white rounded-3xl shadow-xl border border-white/60
          p-8 space-y-8"
        >


          {/* Access Explanation */}
<div className="rounded-2xl bg-indigo-50 border border-indigo-100 p-4 text-sm text-gray-700">
  <p className="font-medium text-gray-900 mb-1">
    🔒 Private community
  </p>
  <p>
    InstantConnect is a private space.  
    You need to sign in to view profiles, matches, and messages.
  </p>
</div>

          {/* Header */}
          <div className="text-center space-y-2">
            <div className="mx-auto w-12 h-12 rounded-full
              bg-black text-white flex items-center justify-center
              text-xl font-bold"
            >
              IC
            </div>

            <h1 className="text-2xl font-semibold text-gray-900">
              Welcome back
            </h1>

            <p className="text-sm text-gray-500">
              Sign in to continue your journey
            </p>
          </div>

          {/* Form */}
          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-600">
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="
                  w-full rounded-xl border border-gray-300
                  px-4 py-3 text-sm
                  focus:outline-none focus:ring-2
                  focus:ring-black/20 focus:border-black
                  transition
                "
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-600">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="
                  w-full rounded-xl border border-gray-300
                  px-4 py-3 text-sm
                  focus:outline-none focus:ring-2
                  focus:ring-black/20 focus:border-black
                  transition
                "
              />
            </div>

            {error && (
              <div className="rounded-xl bg-red-50 px-4 py-3
                text-sm text-red-600"
              >
                {error}
              </div>
            )}
          </div>

          {loading && (
  <div className="flex items-center justify-center gap-3 text-sm text-gray-600">
    <div
      className="h-4 w-4 animate-spin rounded-full border-2
      border-black border-t-transparent"
    />
    <span>Signing you in, please wait…</span>
  </div>
)}


          {/* Submit */}
          <button
            onClick={submit}
            disabled={!email || !password || loading}
            className="
              w-full rounded-xl bg-black py-3 text-sm
              font-medium text-white hover:bg-gray-800
              transition
              disabled:opacity-50 disabled:cursor-not-allowed
            "
          >
            {loading ? "Signing you in…" : "Log in"}
          </button>

          {/* Footer */}
          <div className="text-center text-sm text-gray-500">
            Don’t have an account?{" "}
            <a
              href="/auth/register"
              className="font-medium text-black hover:underline"
            >
              Create one
            </a>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-gray-400">
          InstantConnect — meaningful connections, respectfully built
        </p>
      </div>
    </div>
  );
}
