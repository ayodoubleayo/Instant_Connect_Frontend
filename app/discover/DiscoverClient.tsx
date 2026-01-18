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
  const router = useRouter();
  const { me, fetchMe, loading } = useUserStore();

  const [users, setUsers] = useState<DiscoverUser[]>([]);
  const [discoverLoading, setDiscoverLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [photoRequired, setPhotoRequired] = useState(false);

  const fetchedRef = useRef(false);

  /* =========================
     AUTH FETCH
  ========================= */
  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;
    fetchMe();
  }, [fetchMe]);

  /* =========================
     AUTH GUARD
  ========================= */
  useEffect(() => {
    if (!loading && me === null) {
      router.push("/auth/login");
    }
  }, [me, loading, router]);

  /* =========================
     DISCOVER FETCH
  ========================= */
  useEffect(() => {
    if (!me) return;

    setDiscoverLoading(true);
    setPhotoRequired(false);

    api("/users/discover")
      .then((res: any) => {
        const list = Array.isArray(res?.users) ? res.users : [];
        setUsers(list);
      })
      .catch((err) => {
        if (err?.status === 403 || err?.code === "PHOTO_REQUIRED") {
          setPhotoRequired(true);
          setUsers([]);
          return;
        }
        console.error("Discover fetch failed", err);
      })
      .finally(() => {
        setDiscoverLoading(false);
      });
  }, [me]);

  /* =========================
     SEARCH FILTER
  ========================= */
  const filteredUsers = useMemo(() => {
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

  /* =========================
     PHOTO REQUIRED UI
  ========================= */
  if (photoRequired) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        <div className="max-w-md rounded-2xl bg-white p-8 shadow-lg text-center space-y-4">
          <div className="text-5xl">📸</div>
          <h2 className="text-2xl font-bold text-gray-900">
            Add a profile photo to continue
          </h2>
          <p className="text-gray-600">
            To keep Discover safe and authentic, only users with a
            profile photo can view other profiles.
          </p>
          <button
            onClick={() => router.push("/profile/me")}
            className="mt-4 w-full rounded-xl bg-black px-6 py-3 text-white font-medium hover:bg-black/90"
          >
            Go to profile & upload photo
          </button>
        </div>
      </div>
    );
  }

  /* =========================
     NORMAL UI
  ========================= */
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <section className="mx-auto max-w-7xl px-6 py-12">

        {/* CENTERED GLOW HEADER */}
        <div className="mb-12 flex justify-center">
          <div
            className="
              max-w-2xl w-full text-center rounded-3xl
              border-2 border-pink-400
              bg-white/80 px-8 py-8
              shadow-[0_0_40px_rgba(236,72,153,0.35)]
            "
          >
            <h1 className="text-4xl font-bold text-gray-900">
              Discover Connections
            </h1>
            <p className="mt-3 text-gray-600">
              Explore meaningful profiles curated based on shared values,
              location, and mutual interests.
            </p>
          </div>
        </div>

        {/* SEARCH */}
        <div className="mb-12 flex justify-center">
          <div className="relative max-w-2xl w-full rounded-2xl bg-white shadow-lg border border-white/70">
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, location, tribe, religion…"
              className="w-full rounded-2xl px-5 py-4 text-sm outline-none focus:ring-2 focus:ring-black/10"
            />
            <span className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400">
              🔍
            </span>
          </div>
        </div>

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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredUsers.map((u) => (
              <ProfileCard key={u.id} user={u} me={me} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
