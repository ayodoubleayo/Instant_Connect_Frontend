"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { api } from "@/lib/api";

type Photo = {
  id: string;
  url: string;
};

type PublicUser = {
  id: string;
  username: string;
  age: number;
  location?: string | null;
  bio?: string | null;
  religion?: string | null;
  relationshipIntent?: string | null;
  profilePhoto?: string | null;
  photos: Photo[];
};

export default function PublicProfilePage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [user, setUser] = useState<PublicUser | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    api<PublicUser>(`/users/${id}`)
      .then(setUser)
      .catch(() => router.push("/discover"));
  }, [id, router]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-sm text-gray-400">
          Loading profile…
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden">

          {/* HERO IMAGE */}
          <div className="relative">
            <img
              src={user.profilePhoto || "/avatar-placeholder.png"}
              alt={user.username}
              className="w-full h-[460px] object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent" />

            {/* Name overlay */}
            <div className="absolute bottom-5 left-6 text-white">
              <h1 className="text-3xl font-semibold">
                {user.username}, {user.age}
              </h1>
              {user.location && (
                <p className="text-sm opacity-90">{user.location}</p>
              )}
            </div>
          </div>

          {/* CONTENT */}
          <div className="p-6 space-y-6">

            {/* BADGES */}
            <div className="flex flex-wrap gap-2">
              {user.relationshipIntent && (
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-black text-white">
                  {user.relationshipIntent.replaceAll("_", " ")}
                </span>
              )}

              {user.religion && (
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                  {user.religion}
                </span>
              )}
            </div>

            {/* BIO */}
            {user.bio && (
              <p className="text-sm text-gray-700 leading-relaxed">
                {user.bio}
              </p>
            )}

            {/* GALLERY */}
            {user.photos?.length > 0 && (
              <div>
                <h3 className="text-sm font-medium mb-2 text-gray-600">
                  Photos
                </h3>

                <div className="grid grid-cols-3 gap-3">
                  {user.photos.map((photo) => (
                    <button
                      key={photo.id}
                      onClick={() => setSelectedImage(photo.url)}
                      className="relative overflow-hidden rounded-xl group"
                    >
                      <img
                        src={photo.url}
                        alt=""
                        className="h-32 w-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ACTION */}
            <button
              onClick={() => router.push(`/chat/start/${user.id}`)}
              className="w-full bg-black text-white py-3 rounded-xl font-medium hover:bg-gray-800 active:scale-[0.98] transition"
            >
              Start Chat
            </button>
          </div>
        </div>
      </div>

      {/* IMAGE MODAL */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center px-4"
        >
          <img
            src={selectedImage}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[90vh] max-w-[90vw] rounded-2xl shadow-2xl"
          />

          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 text-white text-4xl leading-none"
          >
            ×
          </button>
        </div>
      )}
    </>
  );
}
