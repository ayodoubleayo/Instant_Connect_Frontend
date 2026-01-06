"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { useUserStore } from "@/store/user.store"; // ✅ ADD

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();

  // ✅ GLOBAL USER STORE
  const fetchMe = useUserStore((s) => s.fetchMe);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ✅ BLOCK LOGIN PAGE IF ALREADY LOGGED IN
  useEffect(() => {
    api("/users/me")
      .then(async () => {
        await fetchMe();              // ✅ hydrate store
        router.replace("/discover"); // ✅ redirect
      })
      .catch(() => {
        // not logged in → stay here
      });
  }, [router, fetchMe]);

  async function submit() {
    try {
      setLoading(true);
      setError(null);

      await login(email, password); // sets cookie
      await fetchMe();              // 🔑 THIS IS THE FIX

      router.replace("/discover");
    } catch (err: any) {
      setError(err.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  }

  return (
  <div className="min-h-screen flex items-center justify-center px-4
    bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50"
  >
    <div className="w-full max-w-md">

      {/* Card */}
      <div className="bg-white rounded-3xl shadow-xl border border-white/60 p-8 space-y-8">

        {/* Brand / Header */}
        <div className="text-center space-y-2">
          <div className="mx-auto w-12 h-12 rounded-full
            bg-black text-white flex items-center justify-center text-xl font-bold">
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
                w-full rounded-xl border border-gray-300 px-4 py-3 text-sm
                focus:outline-none focus:ring-2 focus:ring-black/20
                focus:border-black transition
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
                w-full rounded-xl border border-gray-300 px-4 py-3 text-sm
                focus:outline-none focus:ring-2 focus:ring-black/20
                focus:border-black transition
              "
            />
          </div>

          {error && (
            <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}
        </div>

        {/* Submit */}
        <button
          onClick={submit}
          disabled={!email || !password || loading}
          className="
            w-full rounded-xl bg-black py-3 text-sm font-medium text-white
            hover:bg-gray-800 transition
            disabled:opacity-50 disabled:cursor-not-allowed
          "
        >
          {loading ? "Signing you in…" : "Log in"}
        </button>

        {/* Footer */}
        <div className="text-center space-y-2">
          <p className="text-sm text-gray-500">
            Don’t have an account?
          </p>
          <a
            href="/auth/register"
            className="inline-block text-sm font-medium text-black hover:underline"
          >
            Create an account
          </a>
        </div>

      </div>

      {/* Subtle footer note */}
      <p className="mt-6 text-center text-xs text-gray-400">
        InstantConnect — meaningful connections, respectfully built
      </p>
    </div>
  </div>
);}
