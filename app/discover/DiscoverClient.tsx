"use client";


import { useEffect, useRef, useState, useMemo } from "react";
import { api } from "@/lib/api";
import { useUserStore } from "@/store/user.store";
import { useRouter } from "next/navigation";
import ProfileCard from "@/components/ProfileCard";

/* =========================
   TYPES
   ========================= */
interface DiscoverUser {
  id: string;
  username: string;
  age: number;
  location: string;
  distanceKm: number;

  profilePhoto?: string | null;
  religion?: string | null;
  preferredTribes?: string[] | null;
  bio?: string | null;

  matchId: string | null;
}

/* =========================
   SKELETON
   ========================= */
function DiscoverSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse rounded-2xl border bg-white p-4 shadow-sm"
        >
          <div className="h-48 w-full rounded-xl bg-gray-200" />
          <div className="mt-4 h-4 w-3/4 rounded bg-gray-200" />
          <div className="mt-2 h-4 w-1/2 rounded bg-gray-200" />
          <div className="mt-4 h-10 w-full rounded bg-gray-200" />
        </div>
      ))}
    </div>
  );
}

/* =========================
   PAGE
   ========================= */
export default function DiscoverClient() {
  console.log("🟢 [DiscoverPage] MOUNT");

  const router = useRouter();
  const { me, fetchMe, loading } = useUserStore();

  const [users, setUsers] = useState<DiscoverUser[]>([]);
  const [discoverLoading, setDiscoverLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchedRef = useRef(false);

  /* =========================
     AUTH FETCH
     ========================= */
  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;

    console.log("🔐 [DiscoverPage] fetchMe START");
    fetchMe();
  }, [fetchMe]);

  /* =========================
     AUTH GUARD
     ========================= */
  useEffect(() => {
    if (!loading && me === null) {
      console.warn("⛔ [DiscoverPage] UNAUTHORIZED → redirect");
      router.push("/auth/login");
    }
  }, [me, loading, router]);

  /* =========================
     DISCOVER FETCH
     ========================= */
  useEffect(() => {
    if (!me) return;

    const requestId = crypto.randomUUID();
    console.log("🔎 [DiscoverPage] DISCOVER FETCH START", { requestId });

    setDiscoverLoading(true);

    api(`/users/discover`)
      .then((res: any) => {
        console.log("📦 [DiscoverPage] RAW RESPONSE", res);

        // ✅ NORMALIZE RESPONSE (CRITICAL FIX)
   const list = Array.isArray(res?.users) ? res.users : [];

        console.log(
          "🟢 [DiscoverPage] NORMALIZED USERS",
          list.length
        );

        setUsers(list);
      })
      .catch((err) => {
        console.error("❌ [DiscoverPage] DISCOVER FETCH FAILED", err);
      })
      .finally(() => {
        console.log("🏁 [DiscoverPage] DISCOVER FETCH END", requestId);
        setDiscoverLoading(false);
      });
  }, [me]);

  /* =========================
     SEARCH FILTER
     ========================= */
  const filteredUsers = useMemo(() => {
    if (!Array.isArray(users)) {
      console.warn("⚠️ [Search] users is not array", users);
      return [];
    }

    if (!searchTerm.trim()) return users;

    const term = searchTerm.toLowerCase();

    return users.filter((u) =>
      [
        u.username,
        u.location,
        u.bio,
        u.religion,
        ...(u.preferredTribes || []),
      ]
        .filter(Boolean)
        .some((field) =>
          field!.toString().toLowerCase().includes(term)
        )
    );
  }, [searchTerm, users]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-gray-500">Checking your account…</p>
      </div>
    );
  }

  if (!me) return null;

  console.log("🎨 [DiscoverPage] RENDER", {
    total: users.length,
    filtered: filteredUsers.length,
  });

return (
  <div className="min-h-screen
    bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50"
  >
    <section className="mx-auto max-w-7xl px-6 py-12">

      {/* HERO */}
      <div className="mb-10 space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">
          Discover Connections
        </h1>
        <p className="max-w-2xl text-gray-600">
          Explore meaningful profiles curated based on shared values,
          location, and mutual interests.
        </p>
      </div>

      {/* SEARCH BAR */}
      <div className="mb-10">
        <div className="
          relative max-w-2xl
          rounded-2xl bg-white shadow-lg
          border border-white/70
        ">
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name, location, tribe, religion…"
            className="
              w-full rounded-2xl px-5 py-4 text-sm
              outline-none
              focus:ring-2 focus:ring-black/10
            "
          />
          <span className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400">
            🔍
          </span>
        </div>
      </div>

      {/* CONTENT */}
      {discoverLoading ? (
        <DiscoverSkeleton />
      ) : filteredUsers.length === 0 ? (
        <div className="mt-24 text-center space-y-3">
          <div className="text-4xl">🌱</div>
          <p className="text-lg font-medium text-gray-700">
            No profiles found
          </p>
          <p className="text-sm text-gray-500">
            Try adjusting your search or check back later.
          </p>
        </div>
      ) : (
        <div
          className="
            grid grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            gap-10
          "
        >
          {filteredUsers.map((u) => (
            <ProfileCard key={u.id} user={u} me={me} />
          ))}
        </div>
      )}
    </section>
  </div>
);
}