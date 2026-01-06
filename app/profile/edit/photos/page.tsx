"use client";

import { useState } from "react";
import ImageUploader from "@/components/ImageUploader";
import { useUserStore } from "@/store/user.store";

export default function EditPhotosPage() {
  const {
    me,
    fetchMe,
    setProfilePhoto,
    deletePhoto,
    deletingPhoto,
    isUploading,
  } = useUserStore();

  const [uploadingPreview, setUploadingPreview] = useState<string | null>(null);

  if (!me) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-sm">Loading photos…</p>
      </div>
    );
  }

  const images = me.photos || [];

  async function onUploaded() {
    setUploadingPreview(null);
    await fetchMe();
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-2xl font-semibold">Manage Photos</h1>

        <section className="bg-white rounded-2xl shadow p-6 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="font-semibold">
              Gallery{" "}
              <span className="text-gray-400 text-sm">
                ({images.length}/5)
              </span>
            </h2>
            <span className="text-xs text-gray-400">
              Tap image to set profile photo
            </span>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {images.map((img) => {
              const isDeleting = deletingPhoto === img.id;

              return (
                <div key={img.id} className="relative group">
                  <img
                    src={img.url}
                    onClick={() =>
                      !isDeleting && setProfilePhoto(img.url)
                    }
                    className={`h-36 w-full rounded-xl object-cover cursor-pointer border-4 transition ${
                      me.profilePhoto === img.url
                        ? "border-green-500"
                        : "border-transparent group-hover:border-gray-300"
                    } ${isDeleting ? "opacity-40 pointer-events-none" : ""}`}
                  />

                  {!isDeleting && (
                    <button
                      onClick={() => deletePhoto(img.id)}
                      className="absolute top-2 right-2 bg-black/70 text-white rounded-full h-7 w-7 flex items-center justify-center text-sm opacity-0 group-hover:opacity-100 transition"
                      title="Delete photo"
                    >
                      ×
                    </button>
                  )}

                  {isDeleting && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="h-8 w-8 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    </div>
                  )}

                  {me.profilePhoto === img.url && (
                    <span className="absolute top-2 left-2 bg-green-600 text-white text-xs px-2 py-1 rounded-full">
                      Profile
                    </span>
                  )}
                </div>
              );
            })}

            {uploadingPreview && (
              <div className="relative h-36 rounded-xl overflow-hidden border">
                <img
                  src={uploadingPreview}
                  className="h-full w-full object-cover opacity-50"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-8 w-8 border-2 border-black border-t-transparent rounded-full animate-spin" />
                </div>
              </div>
            )}
          </div>

          {images.length < 5 && (
            <div
              className={`pt-4 ${
                isUploading ? "opacity-60 pointer-events-none" : ""
              }`}
            >
              <ImageUploader
                onUpload={onUploaded}
                onUploading={(preview) =>
                  setUploadingPreview(preview)
                }
              />
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
