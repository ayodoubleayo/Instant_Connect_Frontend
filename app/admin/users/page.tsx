"use client";

import { api } from "@/lib/api";
import { useEffect, useState } from "react";

interface User {
  id: string;
  username: string;
  email: string;
  role: string;
  suspended: boolean;
  blocked: boolean;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    api<{ users: User[] }>("/admin/users?page=" + page)
      .then((res) => setUsers(res.users));
  }, [page]);

  function toggle(id: string, type: "suspend" | "block") {
    api(`/admin/users/${id}/${type}`, { method: "POST" }).then(() =>
      setUsers((prev) =>
        prev.map((u) =>
          u.id === id
            ? {
                ...u,
                [type === "suspend" ? "suspended" : "blocked"]:
                  !u[type === "suspend" ? "suspended" : "blocked"],
              }
            : u
        )
      )
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Users</h1>

      <div className="space-y-3">
        {users.map((u) => (
          <div
            key={u.id}
            className="flex justify-between bg-white p-4 rounded shadow"
          >
            <div>
              <p className="font-semibold">{u.username}</p>
              <p className="text-sm text-gray-500">{u.email}</p>
              <p className="text-xs">
                {u.blocked
                  ? "🚫 Blocked"
                  : u.suspended
                  ? "⏸ Suspended"
                  : "✅ Active"}
              </p>
            </div>

            <div className="space-x-2">
              <button
                onClick={() => toggle(u.id, "suspend")}
                className="px-3 py-1 bg-yellow-500 text-white rounded"
              >
                {u.suspended ? "Unsuspend" : "Suspend"}
              </button>

              <button
                onClick={() => toggle(u.id, "block")}
                className="px-3 py-1 bg-red-600 text-white rounded"
              >
                {u.blocked ? "Unblock" : "Block"}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex gap-4">
        <button onClick={() => setPage((p) => Math.max(1, p - 1))}>
          ◀ Prev
        </button>
        <button onClick={() => setPage((p) => p + 1)}>Next ▶</button>
      </div>
    </div>
  );
}
