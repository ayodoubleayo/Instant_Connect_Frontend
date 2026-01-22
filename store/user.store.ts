"use client";

import { create } from "zustand";
import { api } from "@/lib/api";

/* ================= TYPES ================= */

export interface Photo {
  id: string;
  url: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  gender: "MALE" | "FEMALE";
  age: number | null;
  location: string | null;
  latitude: number | null;
  longitude: number | null;
  bio?: string | null;
  profilePhoto?: string | null;
  photos?: Photo[];
  photoCount?: number;
  relationshipIntent?: string | null;
  religion?: string | null;
  preferredTribes?: string[] | null;
  role: string;
  verifiedId: boolean;
  createdAt: string;
  phone?: string | null;
}

/* ================= STATE ================= */

interface UserState {
  /* auth */
  me: User | null;
  loading: boolean;
  hydrated: boolean;

  /* presence */
  onlineUsers: Record<
    string,
    { online: boolean; lastSeen?: string }
  >;

  /* uploads */
  isUploading: boolean;
  deletingPhoto: string | null;

  /* actions */
  setUploading: (v: boolean) => void;

  fetchMe: () => Promise<void>;
  setProfilePhoto: (url: string) => Promise<void>;
  deletePhoto: (photoId: string) => Promise<void>;
  updateProfileDetails: (data: Partial<User>) => Promise<void>;
  clear: () => void;

  /* presence actions */
  setUserOnline: (userId: string) => void;
  setUserOffline: (userId: string, lastSeen: string) => void;
}

/* ================= STORE ================= */

export const useUserStore = create<UserState>((set) => ({
  me: null,
  loading: false,
  hydrated: false,

  onlineUsers: {},

  isUploading: false,
  deletingPhoto: null,

  /* ================= BASIC ================= */

  setUploading: (v) => {
    console.log("🟡 [UserStore] setUploading →", v);
    set({ isUploading: v });
  },

fetchMe: async () => {
  if (typeof window !== "undefined") {
    const path = window.location.pathname;
    const hash = window.location.hash; // ✅ ADDED

    // ✅ HARD STOP during password recovery
    if (
      path.startsWith("/reset-password") || // ✅ KEEP
      hash.includes("type=recovery")         // ✅ ADDED
    ) {
      console.log(
        "🟡 [UserStore] Recovery mode detected → SKIP fetchMe"
      );
      set({ hydrated: true }); // ✅ IMPORTANT
      return;                  // ✅ HARD EXIT
    }
  }

  console.log("🟣 [UserStore] fetchMe START");
  set({ loading: true });

  try {
    const user = await api<User>("/users/me");
    console.log("🟢 [UserStore] fetchMe SUCCESS", user.id);
    set({ me: user, hydrated: true });
  } catch {
    console.warn("🔴 [UserStore] fetchMe FAILED");
    set({ me: null, hydrated: true });
  } finally {
    set({ loading: false });
  }
},

  /* ================= PROFILE ================= */

  setProfilePhoto: async (url) => {
    console.log("🟡 [UserStore] setProfilePhoto", url);

    await api("/users/me", {
      method: "PUT",
      body: JSON.stringify({ profilePhoto: url }),
    });

    set((s) =>
      s.me ? { me: { ...s.me, profilePhoto: url } } : {}
    );
  },

  deletePhoto: async (photoId) => {
    console.log("🗑️ [UserStore] deletePhoto START", photoId);
    set({ deletingPhoto: photoId });

    try {
      await api(`/users/me/photos/${photoId}`, {
        method: "DELETE",
      });

      set((s) => {
        if (!s.me) return { deletingPhoto: null };

        const deleted = s.me.photos?.find(
          (p) => p.id === photoId
        );

        console.log("🟢 [UserStore] deletePhoto SUCCESS");

        return {
          deletingPhoto: null,
          me: {
            ...s.me,
            photos: s.me.photos?.filter(
              (p) => p.id !== photoId
            ),
            profilePhoto:
              s.me.profilePhoto === deleted?.url
                ? null
                : s.me.profilePhoto,
          },
        };
      });
    } catch (err) {
      console.error("❌ [UserStore] deletePhoto FAILED", err);
      set({ deletingPhoto: null });
      throw err;
    }
  },

  updateProfileDetails: async (data) => {
    console.log("🟡 [UserStore] updateProfileDetails", data);
    const updated = await api<User>("/users/me", {
      method: "PUT",
      body: JSON.stringify(data),
    });
    set({ me: updated });
  },

  clear: () => {
    console.log("🧹 [UserStore] clear");
    set({ me: null, hydrated: true });
  },

  /* ================= PRESENCE ================= */

  setUserOnline: (userId) => {
    console.log("🟢 [Presence] user ONLINE →", userId);

    set((s) => ({
      onlineUsers: {
        ...s.onlineUsers,
        [userId]: { online: true },
      },
    }));
  },

  setUserOffline: (userId, lastSeen) => {
    console.log("🔴 [Presence] user OFFLINE →", {
      userId,
      lastSeen,
    });

    set((s) => ({
      onlineUsers: {
        ...s.onlineUsers,
        [userId]: {
          online: false,
          lastSeen,
        },
      },
    }));
  },
}));
