"use client";

import { useUserStore } from "@/store/user.store";
import Link from "next/link";
import { useState } from "react";

type Photo = {
  id: string;
  url: string;
};

export default function MyProfilePage() {
  const { me, isUploading } = useUserStore();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (!me) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sm text-gray-500">
        Loading profile…
      </div>
    );
  }

  const photos: Photo[] = me.photos ?? [];

  return (
    <>
      <div className="min-h-screen bg-gray-50 flex justify-center px-4 py-10">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-sm p-6 space-y-6 relative">

          {isUploading && (
            <div className="absolute inset-0 z-50 bg-white/80 flex items-center justify-center rounded-2xl">
              <div className="flex flex-col items-center gap-2">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-black border-t-transparent" />
                <p className="text-sm text-gray-600">Uploading photo…</p>
              </div>
            </div>
          )}

          <div className="flex flex-col items-center text-center">
            <img
              src={me.profilePhoto || "/avatar-placeholder.png"}
              alt={me.username}
              className="h-28 w-28 rounded-full object-cover border"
            />

            <h2 className="mt-4 text-xl font-semibold">
              {me.username}, {me.age}
            </h2>

            {me.location && (
              <p className="text-sm text-gray-500">{me.location}</p>
            )}
          </div>

          {me.bio && (
            <div className="border-t pt-4">
              <p className="text-sm text-gray-700 leading-relaxed">
                {me.bio}
              </p>
            </div>
          )}

          {photos.length > 0 && (
            <div className="border-t pt-4">
              <h3 className="text-sm font-medium mb-3">
                Photos ({photos.length})
              </h3>

              <div className="grid grid-cols-3 gap-3">
                {photos.map((photo) => (
                  <img
                    key={photo.id}
                    src={photo.url}
                    onClick={() =>
                      !isUploading && setSelectedImage(photo.url)
                    }
                    className={`h-24 w-full rounded-lg object-cover transition
                      ${isUploading
                        ? "opacity-50 pointer-events-none"
                        : "cursor-pointer hover:opacity-80"}
                    `}
                  />
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-3 pt-4">
            <Link
              href="/profile/edit/photos"
              className="text-center border rounded-xl py-2 text-sm font-medium hover:border-black transition"
            >
              Edit Photos
            </Link>

            <Link
              href="/profile/edit/details"
              className="text-center bg-black text-white rounded-xl py-2 text-sm font-medium hover:bg-gray-800 transition"
            >
              Edit Details
            </Link>
          </div>
        </div>
      </div>

      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center"
        >
          <img
            src={selectedImage}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[90vh] max-w-[90vw] rounded-xl"
          />
        </div>
      )}
    </>
  );
}
