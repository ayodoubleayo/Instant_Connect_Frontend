"use client";

import { useState } from "react";
import ImageUploader from "@/components/ImageUploader";
import { useUserStore } from "@/store/user.store";

export default function EditProfilePhoto() {
  const { me, fetchMe } = useUserStore();

  const [isUploading, setIsUploading] = useState(false);
  const [tempPreview, setTempPreview] = useState<string | null>(null);

  if (!me) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sm text-gray-500">
        Loading…
      </div>
    );
  }

  async function onUploaded() {
    await fetchMe();
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow p-6 space-y-6">

        <h1 className="text-xl font-semibold text-center">
          Profile Photo
        </h1>

        {/* Avatar */}
        <div className="flex justify-center relative">
          <img
            src={tempPreview || me.profilePhoto || "/avatar-placeholder.png"}
            className={`h-40 w-40 rounded-full object-cover border transition ${
              isUploading ? "opacity-50" : ""
            }`}
          />

          {isUploading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-8 w-8 border-2 border-black border-t-transparent rounded-full animate-spin" />
            </div>
          )}
        </div>

        {/* Uploading indicator */}
        {isUploading && (
          <div className="text-center text-sm text-gray-600 animate-pulse">
            Uploading photo… please wait
          </div>
        )}

        {/* Upload button */}
        <div className={isUploading ? "pointer-events-none opacity-60" : ""}>
          <ImageUploader
            onUpload={onUploaded}
            onUploading={(preview) => {
              if (preview) {
                setTempPreview(preview);
                setIsUploading(true);
              } else {
                setTempPreview(null);
                setIsUploading(false);
              }
            }}
          />
        </div>

      </div>
    </div>
  );
}
