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
      <div className="min-h-screen flex items-center justify-center text-sm text-gray-400 animate-pulse">
        Loading profile…
      </div>
    );
  }

  const photos: Photo[] = me.photos ?? [];

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-50 flex justify-center px-4 py-10">
        <div className="w-full max-w-md bg-white/90 backdrop-blur rounded-3xl shadow-xl p-6 space-y-6 relative border border-gray-100">

          {isUploading && (
            <div className="absolute inset-0 z-50 bg-white/90 flex items-center justify-center rounded-3xl">
              <div className="flex flex-col items-center gap-3">
                <div className="h-10 w-10 animate-spin rounded-full border-2 border-black border-t-transparent" />
                <p className="text-sm text-gray-600 font-medium">
                  Uploading photo…
                </p>
              </div>
            </div>
          )}

          {/* PROFILE HEADER */}
          <div className="flex flex-col items-center text-center">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-black to-gray-400 blur-md opacity-30" />
              <img
                src={me.profilePhoto || "/avatar-placeholder.png"}
                alt={me.username}
                className="relative h-32 w-32 rounded-full object-cover border-4 border-white shadow-lg"
              />
            </div>

            <h2 className="mt-5 text-2xl font-bold tracking-tight">
              {me.username}, {me.age}
            </h2>

            {me.location && (
              <p className="mt-1 text-sm text-gray-500">
                📍 {me.location}
              </p>
            )}
          </div>

          {/* BIO */}
          {me.bio && (
            <div className="border-t pt-4">
              <p className="text-sm text-gray-700 leading-relaxed text-center">
                {me.bio}
              </p>
            </div>
          )}

          {/* PHOTOS */}
          {photos.length > 0 && (
            <div className="border-t pt-4">
              <h3 className="text-sm font-semibold mb-3 text-gray-700">
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
                    className={`h-24 w-full rounded-xl object-cover transition-all duration-200
                      ${isUploading
                        ? "opacity-40"
                        : "cursor-pointer hover:scale-105 hover:shadow-lg"}
                    `}
                  />
                ))}
              </div>
            </div>
          )}

          {/* ACTION BUTTONS */}
          <div className="grid grid-cols-2 gap-3 pt-4">
            <Link
              href="/profile/edit/photos"
              className="text-center rounded-2xl py-2.5 text-sm font-semibold
                         border border-gray-300 hover:border-black
                         hover:shadow-md transition-all"
            >
              Upload / Edit Photos
            </Link>

            <Link
              href="/profile/edit/details"
              className="text-center rounded-2xl py-2.5 text-sm font-semibold
                         bg-black text-white
                         hover:bg-gray-900 hover:shadow-lg
                         transition-all"
            >
              UPdate / Edit Details
            </Link>
          </div>
        </div>
      </div>

      {/* IMAGE MODAL */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-sm flex items-center justify-center animate-fadeIn"
        >
          <img
            src={selectedImage}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[90vh] max-w-[90vw] rounded-2xl shadow-2xl animate-scaleIn"
          />
        </div>
      )}
    </>
  );
}
