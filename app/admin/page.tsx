"use client";

import { api } from "@/lib/api";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface AdminStats {
  users?: number;
  payments?: number;
}

export default function AdminPage() {
  const router = useRouter();

  const [stats, setStats] = useState<AdminStats>({});
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api("/admin/stats")
      .then((data) => {
        setStats(data as AdminStats);
      })
      .catch((err) => {
        if (err?.status === 401 || err?.status === 403) {
          router.replace("/");
          return;
        }
        setError("Failed to load admin stats");
      })
      .finally(() => setLoading(false));
  }, [router]);

  if (loading) {
    return <p className="p-6">Loading admin dashboard…</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      {error && (
        <p className="mb-4 text-red-600 bg-red-100 p-3 rounded">
          {error}
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm text-gray-500">Total Users</p>
          <p className="text-3xl font-semibold mt-2">
            {stats.users ?? 0}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm text-gray-500">Payments</p>
          <p className="text-3xl font-semibold mt-2">
            {stats.payments ?? 0}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Admin Actions</h2>

        <div className="space-y-2">
          <Link
            href="/admin/users"
            className="block text-blue-600 hover:underline"
          >
            → View Users
          </Link>

          <Link
            href="/admin/payments"
            className="block text-blue-600 hover:underline"
          >
            → View & Approve Payments
          </Link>

          <Link
            href="/admin/feedback"
            className="block text-blue-600 hover:underline"
          >
            → View Feedback
          </Link>
        </div>
      </div>
    </div>
  );
}
