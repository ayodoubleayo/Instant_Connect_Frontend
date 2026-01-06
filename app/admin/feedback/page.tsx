"use client";

import { api } from "@/lib/api";
import { useEffect, useState } from "react";

export default function AdminFeedbackPage() {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    api("/feedback").then((data) => {
      setItems(data as any[]);
    });
  }, []);

  async function resolve(id: string) {
    await api(`/feedback/${id}/resolve`, { method: "PATCH" });

    setItems((s) =>
      s.map((i) => (i.id === id ? { ...i, resolved: true } : i))
    );
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">User Feedback</h1>

      {items.map((f) => (
        <div key={f.id} className="border p-4 rounded bg-white">
          <p className="text-sm text-gray-500">
            {f.type} • {f.user.username}
          </p>

          <p className="mt-2">{f.message}</p>

          {!f.resolved && (
            <button
              onClick={() => resolve(f.id)}
              className="mt-3 text-sm text-green-600"
            >
              Mark as resolved
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
