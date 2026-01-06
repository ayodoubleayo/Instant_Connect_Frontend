"use client";

import { api } from "@/lib/api";
import { useState } from "react";

export default function FeedbackPage() {
  const [type, setType] = useState<"COMPLAINT" | "SUGGESTION">("COMPLAINT");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function submit() {
    if (!message.trim()) return;

    setLoading(true);
    await api("/feedback", {
      method: "POST",
      body: JSON.stringify({ type, message }),
    });
    setLoading(false);
    setSent(true);
    setMessage("");
  }

  if (sent) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-green-50 to-emerald-100">
        <div className="max-w-md w-full bg-white rounded-2xl p-6 text-center space-y-3 shadow-lg">
          <div className="text-4xl">🎉</div>
          <h2 className="text-xl font-semibold text-green-700">
            Feedback received
          </h2>
          <p className="text-sm text-green-600">
            Thanks for taking the time to help us improve.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4
      bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50"
    >
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-xl border border-white/60 p-6 space-y-6">
        {/* HEADER */}
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold text-gray-800">
            Share your feedback
          </h1>
          <p className="text-sm text-gray-500">
            Your voice helps shape a better experience.
          </p>
        </div>

        {/* TYPE */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">
            Feedback type
          </label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as any)}
            className="w-full rounded-xl px-3 py-2 border
              focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <option value="COMPLAINT">🚨 Complaint</option>
            <option value="SUGGESTION">💡 Suggestion</option>
          </select>
        </div>

        {/* MESSAGE */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">
            Your message
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={5}
            placeholder="Tell us what’s on your mind…"
            className="w-full rounded-xl px-3 py-3 resize-none border
              focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        {/* BUTTON */}
        <button
          onClick={submit}
          disabled={loading}
          className="w-full py-3 rounded-xl font-medium text-white
            bg-gradient-to-r from-indigo-500 to-purple-500
            hover:opacity-90 transition disabled:opacity-50"
        >
          {loading ? "Sending…" : "Submit feedback"}
        </button>
      </div>
    </div>
  );
}
